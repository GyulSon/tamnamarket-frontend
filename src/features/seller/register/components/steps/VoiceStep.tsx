'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Box, Button, Text, VStack } from '@vapor-ui/core';
import { useCallback, useEffect, useRef, useState } from 'react';

const VOICE_QUESTIONS = [
  '특산품의 무게는 몇 킬로그램인가요?',
  '특산품의 수확일은 언제인가요?',
  '특산품 맛의 특징을 알려주세요.',
  '구매자에게 하고 싶은 말을 해주세요.',
] as const;

const VOICE_QUESTION_EXAMPLES = [
  '예시 2kg 한 박스예요. 알이 굵고 상태가 좋아요.',
  '예시 오늘 새벽에 직접 수확해서 바로 준비했어요.',
  '예시 새콤달콤하고 과즙이 풍부해서 생과로 먹기 좋아요.',
  '예시 우리 농장 귤 정말 달아요! 많이 사주세요~',
] as const;

const VOICE_PROGRESS_SEGMENTS = 4;
const ANSWER_SILENCE_DELAY = 1500;
const NO_SPEECH_TIMEOUT = 7000;
const MAX_RECORDING_DURATION = 30000;
const VOICE_LEVEL_THRESHOLD = 0.08;

const createMockVoiceAnswerFiles = () =>
  VOICE_QUESTIONS.map(
    (_, index) =>
      new File([`mock voice answer ${index + 1}`], `sale-answer-${index + 1}.webm`, {
        type: 'audio/webm',
      })
  );

type BrowserWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

type VoiceStepProps = {
  isActive: boolean;
  voiceAnswerFiles: File[];
  submitError?: string;
  isSubmitting: boolean;
  onVoiceAnswersChange: (files: File[]) => void;
  onSubmit: () => void;
  onBack: () => void;
};

const VoiceStep = ({
  isActive,
  voiceAnswerFiles,
  submitError,
  isSubmitting,
  onVoiceAnswersChange,
  onSubmit,
  onBack,
}: VoiceStepProps) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const volumeFrameRef = useRef<number | null>(null);
  const noSpeechTimerRef = useRef<number | null>(null);
  const maxRecordingTimerRef = useRef<number | null>(null);
  const answerChunksRef = useRef<Blob[]>([]);
  const recordedAnswersRef = useRef<File[]>([]);
  const utteranceTokenRef = useRef(0);
  const shouldFinalizeRecordingRef = useRef(false);
  const lastVoiceDetectedAtRef = useRef(0);
  const hasDetectedVoiceRef = useRef(false);
  const currentQuestionIndexRef = useRef(0);
  const speakQuestionRef = useRef<(questionIndex: number) => void>(
    () => undefined
  );
  const hasAutoStartedRef = useRef(false);
  const isUnmountedRef = useRef(false);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [flowStatus, setFlowStatus] = useState<
    'idle' | 'requesting' | 'speaking' | 'listening' | 'completed'
  >('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);

  const clearNoSpeechTimer = useCallback(() => {
    if (noSpeechTimerRef.current !== null) {
      window.clearTimeout(noSpeechTimerRef.current);
      noSpeechTimerRef.current = null;
    }
  }, []);

  const clearMaxRecordingTimer = useCallback(() => {
    if (maxRecordingTimerRef.current !== null) {
      window.clearTimeout(maxRecordingTimerRef.current);
      maxRecordingTimerRef.current = null;
    }
  }, []);

  const cleanupAudioMonitoring = useCallback(() => {
    if (volumeFrameRef.current !== null) {
      window.cancelAnimationFrame(volumeFrameRef.current);
      volumeFrameRef.current = null;
    }

    analyserRef.current?.disconnect();
    analyserRef.current = null;

    sourceNodeRef.current?.disconnect();
    sourceNodeRef.current = null;

    if (audioContextRef.current) {
      void audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, []);

  const stopAudioStream = useCallback(() => {
    audioStreamRef.current?.getTracks().forEach((track) => track.stop());
    audioStreamRef.current = null;
  }, []);

  const speakQuestion = useCallback(
    (questionIndex: number) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setFlowStatus('idle');
        setStatusMessage(
          '이 브라우저는 질문 음성 재생을 지원하지 않아요.'
        );
        return;
      }

      cleanupAudioMonitoring();
      window.speechSynthesis.cancel();

      const nextUtteranceToken = utteranceTokenRef.current + 1;
      utteranceTokenRef.current = nextUtteranceToken;

      const utterance = new SpeechSynthesisUtterance(
        VOICE_QUESTIONS[questionIndex]
      );
      utterance.lang = 'ko-KR';
      utterance.rate = 1;
      utterance.onstart = () => {
        if (
          isUnmountedRef.current ||
          utteranceTokenRef.current !== nextUtteranceToken
        ) {
          return;
        }

        setFlowStatus('speaking');
        setStatusMessage('');
      };
      utterance.onend = () => {
        if (
          isUnmountedRef.current ||
          utteranceTokenRef.current !== nextUtteranceToken
        ) {
          return;
        }

        const stream = audioStreamRef.current;

        if (!stream) {
          setFlowStatus('idle');
          setStatusMessage('마이크를 준비하지 못했어요. 다시 시도해주세요.');
          return;
        }

        try {
          const mimeTypeCandidates = [
            'audio/webm;codecs=opus',
            'audio/webm',
            'audio/mp4',
          ];
          const supportedMimeType = mimeTypeCandidates.find((mimeType) =>
            MediaRecorder.isTypeSupported(mimeType)
          );
          const mediaRecorder = supportedMimeType
            ? new MediaRecorder(stream, { mimeType: supportedMimeType })
            : new MediaRecorder(stream);

          answerChunksRef.current = [];
          shouldFinalizeRecordingRef.current = false;
          hasDetectedVoiceRef.current = false;
          lastVoiceDetectedAtRef.current = Date.now();

          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              answerChunksRef.current.push(event.data);
            }
          };

          mediaRecorder.onstart = () => {
            if (isUnmountedRef.current) {
              return;
            }

            setFlowStatus('listening');
            setStatusMessage('');

            clearNoSpeechTimer();
            clearMaxRecordingTimer();
            noSpeechTimerRef.current = window.setTimeout(() => {
              shouldFinalizeRecordingRef.current = true;
              mediaRecorder.stop();
            }, NO_SPEECH_TIMEOUT);
            maxRecordingTimerRef.current = window.setTimeout(() => {
              shouldFinalizeRecordingRef.current = true;
              mediaRecorder.stop();
            }, MAX_RECORDING_DURATION);

            try {
              const browserWindow = window as BrowserWindow;
              const AudioContextConstructor =
                window.AudioContext ?? browserWindow.webkitAudioContext;

              if (!AudioContextConstructor) {
                return;
              }

              const audioContext = new AudioContextConstructor();
              const sourceNode = audioContext.createMediaStreamSource(stream);
              const analyser = audioContext.createAnalyser();
              const volumeBuffer = new Uint8Array(analyser.fftSize);

              analyser.fftSize = 2048;
              sourceNode.connect(analyser);

              audioContextRef.current = audioContext;
              sourceNodeRef.current = sourceNode;
              analyserRef.current = analyser;

              const monitorVolume = () => {
                if (!analyserRef.current) {
                  return;
                }

                analyserRef.current.getByteTimeDomainData(volumeBuffer);

                let maxAmplitude = 0;

                volumeBuffer.forEach((value) => {
                  const normalizedAmplitude = Math.abs(value - 128) / 128;
                  maxAmplitude = Math.max(maxAmplitude, normalizedAmplitude);
                });

                if (maxAmplitude >= VOICE_LEVEL_THRESHOLD) {
                  hasDetectedVoiceRef.current = true;
                  lastVoiceDetectedAtRef.current = Date.now();
                  clearNoSpeechTimer();
                } else if (
                  hasDetectedVoiceRef.current &&
                  Date.now() - lastVoiceDetectedAtRef.current >=
                    ANSWER_SILENCE_DELAY
                ) {
                  shouldFinalizeRecordingRef.current = true;
                  mediaRecorder.stop();
                  return;
                }

                volumeFrameRef.current = window.requestAnimationFrame(
                  monitorVolume
                );
              };

              volumeFrameRef.current = window.requestAnimationFrame(
                monitorVolume
              );
            } catch {
              cleanupAudioMonitoring();
            }
          };

          mediaRecorder.onerror = () => {
            if (isUnmountedRef.current) {
              return;
            }

            setFlowStatus('idle');
            setStatusMessage('답변 녹음을 시작하지 못했어요. 다시 시도해주세요.');
          };

          mediaRecorder.onstop = () => {
            if (isUnmountedRef.current) {
              return;
            }

            clearNoSpeechTimer();
            clearMaxRecordingTimer();
            cleanupAudioMonitoring();
            mediaRecorderRef.current = null;

            if (!shouldFinalizeRecordingRef.current) {
              return;
            }

            shouldFinalizeRecordingRef.current = false;

            const blob = new Blob(answerChunksRef.current, {
              type: mediaRecorder.mimeType || 'audio/webm',
            });

            if (!hasDetectedVoiceRef.current || blob.size === 0) {
              setFlowStatus('idle');
              setStatusMessage('답변이 녹음되지 않았어요. 다시 시도해주세요.');
              return;
            }

            const file = new File(
              [blob],
              `sale-answer-${questionIndex + 1}.webm`,
              {
                type: blob.type || 'audio/webm',
              }
            );
            const nextAnswers = [...recordedAnswersRef.current];

            nextAnswers[questionIndex] = file;
            recordedAnswersRef.current = nextAnswers;
            onVoiceAnswersChange(nextAnswers);

            if (questionIndex >= VOICE_QUESTIONS.length - 1) {
              setFlowStatus('completed');
              setStatusMessage('');
              return;
            }

            const nextQuestionIndex = questionIndex + 1;

            currentQuestionIndexRef.current = nextQuestionIndex;
            setCurrentQuestionIndex(nextQuestionIndex);

            window.setTimeout(() => {
              if (isUnmountedRef.current) {
                return;
              }

              speakQuestionRef.current(nextQuestionIndex);
            }, 300);
          };

          mediaRecorderRef.current = mediaRecorder;
          mediaRecorder.start();
        } catch {
          setFlowStatus('idle');
          setStatusMessage('답변 녹음을 시작하지 못했어요. 다시 시도해주세요.');
        }
      };
      utterance.onerror = () => {
        if (isUnmountedRef.current) {
          return;
        }

        setFlowStatus('idle');
        setStatusMessage('질문 음성을 재생하지 못했어요. 다시 시도해주세요.');
      };

      window.speechSynthesis.speak(utterance);
    },
    [cleanupAudioMonitoring, clearMaxRecordingTimer, clearNoSpeechTimer, onVoiceAnswersChange]
  );

  useEffect(() => {
    speakQuestionRef.current = speakQuestion;
  }, [speakQuestion]);

  const requestAudioPermission = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatusMessage('이 브라우저에서는 마이크 권한을 요청할 수 없어요.');
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      return true;
    } catch {
      setFlowStatus('idle');
      setStatusMessage(
        '마이크 권한이 거부되었어요. 브라우저 설정에서 허용해주세요.'
      );
      return false;
    }
  }, []);

  const resetPendingVoiceFlow = useCallback(() => {
    clearNoSpeechTimer();
    clearMaxRecordingTimer();
    cleanupAudioMonitoring();

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      shouldFinalizeRecordingRef.current = false;
      mediaRecorderRef.current.stop();
    }

    mediaRecorderRef.current = null;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      utteranceTokenRef.current += 1;
      window.speechSynthesis.cancel();
    }

    stopAudioStream();
  }, [
    cleanupAudioMonitoring,
    clearMaxRecordingTimer,
    clearNoSpeechTimer,
    stopAudioStream,
  ]);

  const handleStartVoiceFlow = useCallback(async () => {
    if (
      typeof window === 'undefined' ||
      !('speechSynthesis' in window) ||
      typeof MediaRecorder === 'undefined'
    ) {
      setFlowStatus('idle');
      setStatusMessage(
        '이 브라우저는 음성 녹음을 지원하지 않아요. 크롬 브라우저에서 다시 시도해주세요.'
      );
      return;
    }

    setFlowStatus('requesting');
    setStatusMessage('마이크 권한을 확인하는 중이에요.');

    const hasPermission = await requestAudioPermission();

    if (!hasPermission || isUnmountedRef.current) {
      return;
    }

    recordedAnswersRef.current = [];
    currentQuestionIndexRef.current = 0;
    setCurrentQuestionIndex(0);
    onVoiceAnswersChange([]);
    setStatusMessage('');
    speakQuestion(0);
  }, [
    onVoiceAnswersChange,
    requestAudioPermission,
    speakQuestion,
  ]);

  const handleReplayQuestion = useCallback(() => {
    speakQuestion(currentQuestionIndexRef.current);
  }, [speakQuestion]);

  const handleSkipForTest = useCallback(() => {
    resetPendingVoiceFlow();

    const mockFiles = createMockVoiceAnswerFiles();

    recordedAnswersRef.current = mockFiles;
    currentQuestionIndexRef.current = VOICE_QUESTIONS.length - 1;
    setCurrentQuestionIndex(VOICE_QUESTIONS.length - 1);
    setFlowStatus('completed');
    setStatusMessage('');
    onVoiceAnswersChange(mockFiles);
  }, [onVoiceAnswersChange, resetPendingVoiceFlow]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setIsSpeechSupported(
      Boolean(
        'speechSynthesis' in window &&
        'SpeechSynthesisUtterance' in window &&
        Boolean(navigator.mediaDevices) &&
        typeof MediaRecorder !== 'undefined'
      )
    );
  }, []);

  useEffect(() => {
    recordedAnswersRef.current = voiceAnswerFiles;
  }, [voiceAnswerFiles]);

  useEffect(() => {
    isUnmountedRef.current = false;

    return () => {
      isUnmountedRef.current = true;
      resetPendingVoiceFlow();
    };
  }, [resetPendingVoiceFlow]);

  useEffect(() => {
    if (isActive) {
      return;
    }

    hasAutoStartedRef.current = false;
    resetPendingVoiceFlow();

    if (
      flowStatus === 'requesting' ||
      flowStatus === 'speaking' ||
      flowStatus === 'listening'
    ) {
      setFlowStatus('idle');
      setStatusMessage('');
    }
  }, [flowStatus, isActive, resetPendingVoiceFlow]);

  useEffect(() => {
    if (!isActive || hasAutoStartedRef.current || voiceAnswerFiles.length > 0) {
      return;
    }

    if (flowStatus !== 'idle') {
      return;
    }

    hasAutoStartedRef.current = true;
    void handleStartVoiceFlow();
  }, [flowStatus, handleStartVoiceFlow, isActive, voiceAnswerFiles.length]);

  const isCompleted = flowStatus === 'completed';
  const completedAnswerCount = voiceAnswerFiles.filter(Boolean).length;
  const canSubmit = completedAnswerCount === VOICE_QUESTIONS.length;
  const progressIndex = Math.min(currentQuestionIndex, VOICE_PROGRESS_SEGMENTS - 1);
  const showHelperAction =
    isSpeechSupported &&
    !isCompleted &&
    !isSubmitting &&
    flowStatus === 'idle';
  const displayedErrorMessage = submitError || statusMessage;
  const shouldShowStatusMessage = Boolean(displayedErrorMessage);

  return (
    <Box
      $css={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <VStack
        $css={{
          width: '100%',
          minHeight: '100dvh',
          paddingTop: '24px',
          paddingBottom: '28px',
          paddingLeft: '16px',
          paddingRight: '16px',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        <VStack
          $css={{
            width: '100%',
            maxWidth: '720px',
            gap: '28px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Box
            $css={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <button
              aria-label="이전 단계로 이동"
              onClick={onBack}
              style={{
                display: 'inline-flex',
                width: '32px',
                height: '32px',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                backgroundColor: 'transparent',
                padding: 0,
                cursor: 'pointer',
              }}
            >
              <Icon
                icon="mdi:chevron-left"
                width="24"
                height="24"
                color="#111111"
              />
            </button>

            <button
              type="button"
              aria-label="테스트용 다음 단계 이동"
              onClick={handleSkipForTest}
              style={{
                display: 'inline-flex',
                width: '32px',
                height: '32px',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                borderRadius: '999px',
                backgroundColor: '#dc2626',
                padding: 0,
                cursor: 'pointer',
              }}
            >
              <Icon
                icon="mdi:chevron-right"
                width="20"
                height="20"
                color="#ffffff"
              />
            </button>
          </Box>

          <VStack $css={{ gap: '30px' }}>
            <Box
              $css={{
                display: 'grid',
                gridTemplateColumns: `repeat(${VOICE_PROGRESS_SEGMENTS}, 1fr)`,
                gap: '8px',
                width: '100%',
              }}
            >
              {Array.from({ length: VOICE_PROGRESS_SEGMENTS }).map((_, index) => (
                <Box
                  key={`voice-progress-${index}`}
                  $css={{
                    height: '8px',
                    borderRadius: '999px',
                    backgroundColor:
                      index <= progressIndex ? '#f68b3b' : '#e5e5e5',
                  }}
                />
              ))}
            </Box>

            <VStack $css={{ gap: '12px' }}>
              <Text
                typography="body2"
                $css={{ color: '#666666', fontWeight: 700 }}
              >
                특산품 상세 설명
              </Text>
              <Text
                typography="heading4"
                $css={{
                  color: '#111111',
                  fontSize: '22px',
                  lineHeight: 1.4,
                  fontWeight: 800,
                }}
              >
                {VOICE_QUESTIONS[currentQuestionIndex]}
              </Text>

              <Box
                $css={{
                  width: '100%',
                  paddingTop: '11px',
                  paddingBottom: '11px',
                  paddingLeft: '14px',
                  paddingRight: '14px',
                  borderRadius: '14px',
                  border: '1px solid #dcdfe4',
                  backgroundColor: '#ffffff',
                }}
              >
                <Text
                  typography="body3"
                  $css={{
                    color: '#8a8a8a',
                    fontWeight: 600,
                    lineHeight: 1.45,
                  }}
                >
                  {VOICE_QUESTION_EXAMPLES[currentQuestionIndex]}
                </Text>
              </Box>
            </VStack>
          </VStack>
        </VStack>

        <VStack
          $css={{
            flex: 1,
            width: '100%',
            maxWidth: '720px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '18px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Image
            src="/images/voice-visualizer.gif"
            alt="음성 인식 시각화"
            width={88}
            height={88}
            unoptimized
            style={{ objectFit: 'contain' }}
          />

          {shouldShowStatusMessage ? (
            <Text
              typography="body3"
              $css={{
                maxWidth: '260px',
                color: '#dc2626',
                textAlign: 'center',
                lineHeight: 1.5,
                whiteSpace: 'pre-line',
              }}
            >
              {displayedErrorMessage}
            </Text>
          ) : null}

          {showHelperAction ? (
            <Button
              colorPalette="primary"
              size="sm"
              onClick={
                completedAnswerCount === 0
                  ? () => void handleStartVoiceFlow()
                  : handleReplayQuestion
              }
              $css={{
                minWidth: '112px',
                borderRadius: '999px',
              }}
            >
              {completedAnswerCount === 0 ? '음성 시작' : '다시 듣기'}
            </Button>
          ) : null}
        </VStack>

        <Button
          disabled={!canSubmit || isSubmitting}
          onClick={onSubmit}
          $css={{
            width: '100%',
            maxWidth: '720px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: canSubmit && !isSubmitting ? '#f68632' : '#e5e7eb',
            color: '#ffffff',
            fontWeight: 700,
            border: 'none',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {isSubmitting ? '등록 중...' : '상품 등록하기'}
        </Button>
      </VStack>
    </Box>
  );
};

export default VoiceStep;
