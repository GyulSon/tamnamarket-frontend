'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Box, Button, Text, VStack } from '@vapor-ui/core';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type SpeechRecognitionAlternativeLike = {
  transcript: string;
};

type SpeechRecognitionResultLike =
  ArrayLike<SpeechRecognitionAlternativeLike> & {
    isFinal?: boolean;
  };

type SpeechRecognitionEventLike = {
  resultIndex?: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionErrorEventLike = {
  error?: string;
};

type BrowserSpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onstart: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

type BrowserWindow = Window &
  typeof globalThis & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };

const VOICE_QUESTIONS = [
  '특산품의 무게는 몇 킬로그램인가요?',
  '특산품의 수확일은 언제인가요?',
  '특산품 맛의 특징을 알려주세요.',
] as const;

const QUESTION_EXAMPLES = [
  '예시  한 박스 4kg이에요',
  '예시  어제 새벽에 수확했어요',
  '예시  과즙이 많고 달콤해요',
] as const;

const VOICE_PROGRESS_SEGMENTS = 4;

const ANSWER_SILENCE_DELAY = 1500;
const EMPTY_ANSWER_TIMEOUT = 7000;

type VoiceStepProps = {
  voiceText: string;
  onVoiceTextChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

const VoiceStep = ({
  voiceText,
  onVoiceTextChange,
  onNext,
  onBack,
}: VoiceStepProps) => {
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const silenceTimerRef = useRef<number | null>(null);
  const emptyAnswerTimerRef = useRef<number | null>(null);
  const answerTranscriptRef = useRef('');
  const answersRef = useRef<string[]>([]);
  const currentQuestionIndexRef = useRef(0);
  const shouldHandleRecognitionEndRef = useRef(false);
  const utteranceTokenRef = useRef(0);
  const speakQuestionRef = useRef<(questionIndex: number) => void>(
    () => undefined
  );
  const isUnmountedRef = useRef(false);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [flowStatus, setFlowStatus] = useState<
    'idle' | 'requesting' | 'speaking' | 'listening' | 'completed'
  >('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);

  const getRecognitionConstructor = useCallback(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const browserWindow = window as BrowserWindow;

    return (
      browserWindow.SpeechRecognition ??
      browserWindow.webkitSpeechRecognition ??
      null
    );
  }, []);

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current !== null) {
      window.clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const clearEmptyAnswerTimer = useCallback(() => {
    if (emptyAnswerTimerRef.current !== null) {
      window.clearTimeout(emptyAnswerTimerRef.current);
      emptyAnswerTimerRef.current = null;
    }
  }, []);

  const stopAudioStream = useCallback(() => {
    audioStreamRef.current?.getTracks().forEach((track) => track.stop());
    audioStreamRef.current = null;
  }, []);

  const stopRecognition = useCallback(
    (shouldHandleEnd = false) => {
      clearSilenceTimer();
      clearEmptyAnswerTimer();

      if (!recognitionRef.current) {
        return;
      }

      shouldHandleRecognitionEndRef.current = shouldHandleEnd;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    },
    [clearEmptyAnswerTimer, clearSilenceTimer]
  );

  const syncVoiceText = useCallback(
    (answers: string[]) => {
      onVoiceTextChange(answers.filter(Boolean).join('\n'));
    },
    [onVoiceTextChange]
  );

  const completeAnswer = useCallback(
    (questionIndex: number) => {
      const answer = answerTranscriptRef.current.trim();

      if (!answer) {
        setFlowStatus('idle');
        setStatusMessage(
          '답변이 인식되지 않았어요. 다시 듣기를 눌러 현재 질문을 다시 진행해주세요.'
        );
        return;
      }

      const nextAnswers = [...answersRef.current];
      nextAnswers[questionIndex] = answer;
      answersRef.current = nextAnswers;
      setCurrentAnswer(answer);
      syncVoiceText(nextAnswers);

      if (questionIndex >= VOICE_QUESTIONS.length - 1) {
        setFlowStatus('completed');
        setStatusMessage(
          '모든 답변을 받았어요. 내용을 확인한 뒤 다음으로 넘어가면 됩니다.'
        );
        return;
      }

      const nextQuestionIndex = questionIndex + 1;
      currentQuestionIndexRef.current = nextQuestionIndex;
      setCurrentQuestionIndex(nextQuestionIndex);
      setCurrentAnswer(nextAnswers[nextQuestionIndex] ?? '');

      window.setTimeout(() => {
        if (isUnmountedRef.current) {
          return;
        }

        speakQuestionRef.current(nextQuestionIndex);
      }, 300);
    },
    [syncVoiceText]
  );

  const startListening = useCallback(
    (questionIndex: number) => {
      const RecognitionConstructor = getRecognitionConstructor();

      if (!RecognitionConstructor) {
        setFlowStatus('idle');
        setStatusMessage(
          '이 브라우저는 음성 인식을 지원하지 않아요. 크롬에서 다시 시도해주세요.'
        );
        return;
      }

      answerTranscriptRef.current = '';
      shouldHandleRecognitionEndRef.current = false;
      clearSilenceTimer();
      clearEmptyAnswerTimer();

      const recognition = new RecognitionConstructor();
      recognition.lang = 'ko-KR';
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        if (isUnmountedRef.current) {
          return;
        }

        setFlowStatus('listening');
        setStatusMessage(
          '자연스럽게 대답해주세요. 잠시 조용해지면 답변이 끝난 것으로 보고 다음 질문으로 넘어가요.'
        );

        clearEmptyAnswerTimer();
        emptyAnswerTimerRef.current = window.setTimeout(() => {
          stopRecognition(true);
        }, EMPTY_ANSWER_TIMEOUT);
      };

      recognition.onresult = (event) => {
        let transcript = '';

        for (let index = 0; index < event.results.length; index += 1) {
          const result = event.results[index];
          const nextTranscript = result?.[0]?.transcript?.trim();

          if (!nextTranscript) {
            continue;
          }

          transcript += `${nextTranscript} `;
        }

        answerTranscriptRef.current = transcript.trim();
        setCurrentAnswer(transcript.trim());

        clearEmptyAnswerTimer();
        clearSilenceTimer();
        silenceTimerRef.current = window.setTimeout(() => {
          stopRecognition(true);
        }, ANSWER_SILENCE_DELAY);
      };

      recognition.onerror = (event) => {
        if (isUnmountedRef.current) {
          return;
        }

        shouldHandleRecognitionEndRef.current = false;
        setFlowStatus('idle');
        setStatusMessage(
          event.error === 'not-allowed'
            ? '마이크 권한이 필요해요. 브라우저에서 마이크를 허용해주세요.'
            : '답변을 인식하지 못했어요. 다시 듣기를 눌러 다시 시도해주세요.'
        );
      };

      recognition.onend = () => {
        if (isUnmountedRef.current) {
          return;
        }

        clearSilenceTimer();
        clearEmptyAnswerTimer();
        recognitionRef.current = null;

        if (!shouldHandleRecognitionEndRef.current) {
          return;
        }

        shouldHandleRecognitionEndRef.current = false;
        completeAnswer(questionIndex);
      };

      recognitionRef.current = recognition;

      try {
        recognition.start();
      } catch {
        setFlowStatus('idle');
        setStatusMessage('마이크를 시작하지 못했어요. 다시 시도해주세요.');
      }
    },
    [
      clearEmptyAnswerTimer,
      clearSilenceTimer,
      completeAnswer,
      getRecognitionConstructor,
      stopRecognition,
    ]
  );

  const speakQuestion = useCallback(
    (questionIndex: number) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setFlowStatus('idle');
        setStatusMessage(
          '이 브라우저는 질문 음성 재생을 지원하지 않아요. 다른 브라우저에서 다시 시도해주세요.'
        );
        return;
      }

      stopRecognition(false);
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
        setStatusMessage(
          `질문 ${questionIndex + 1}을 읽는 중이에요. 끝나면 바로 답변을 들을게요.`
        );
      };
      utterance.onend = () => {
        if (
          isUnmountedRef.current ||
          utteranceTokenRef.current !== nextUtteranceToken
        ) {
          return;
        }

        startListening(questionIndex);
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
    [startListening, stopRecognition]
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

  const handleStartVoiceFlow = useCallback(async () => {
    const RecognitionConstructor = getRecognitionConstructor();

    if (!RecognitionConstructor) {
      setFlowStatus('idle');
      setStatusMessage(
        '이 브라우저는 음성 인식을 지원하지 않아요. 크롬 브라우저에서 다시 시도해주세요.'
      );
      return;
    }

    setFlowStatus('requesting');
    setStatusMessage('마이크 권한을 확인하는 중이에요.');

    const hasPermission = await requestAudioPermission();

    if (!hasPermission || isUnmountedRef.current) {
      return;
    }

    answersRef.current = [];
    answerTranscriptRef.current = '';
    currentQuestionIndexRef.current = 0;
    setCurrentQuestionIndex(0);
    setCurrentAnswer('');
    onVoiceTextChange('');
    speakQuestion(0);
  }, [
    getRecognitionConstructor,
    onVoiceTextChange,
    requestAudioPermission,
    speakQuestion,
  ]);

  const handleReplayQuestion = useCallback(() => {
    speakQuestion(currentQuestionIndexRef.current);
  }, [speakQuestion]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = event.target.value;
    const nextAnswers = [...answersRef.current];
    nextAnswers[currentQuestionIndexRef.current] = nextValue;
    answersRef.current = nextAnswers;
    answerTranscriptRef.current = nextValue;
    setCurrentAnswer(nextValue);
    syncVoiceText(nextAnswers);
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setIsSpeechSupported(
      Boolean(
        'speechSynthesis' in window &&
        window.SpeechSynthesisUtterance &&
        getRecognitionConstructor()
      )
    );
  }, [getRecognitionConstructor]);

  useEffect(() => {
    const parsedAnswers = voiceText
      .split('\n')
      .map((answer) => answer.trim())
      .filter(Boolean);

    answersRef.current = parsedAnswers;

    if (flowStatus !== 'completed') {
      setCurrentAnswer(parsedAnswers[currentQuestionIndex] ?? '');
    }
  }, [currentQuestionIndex, flowStatus, voiceText]);

  useEffect(() => {
    return () => {
      isUnmountedRef.current = true;
      stopRecognition(false);

      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      stopAudioStream();
    };
  }, [stopAudioStream, stopRecognition]);

  const isCompleted = flowStatus === 'completed';
  const progressIndex = Math.min(currentQuestionIndex, VOICE_PROGRESS_SEGMENTS - 1);
  const showHelperAction = isSpeechSupported && !isCompleted;

  return (
    <Box
      $css={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        backgroundColor: '#ffffff',
      }}
    >
      <VStack
        $css={{
          minHeight: '100dvh',
          paddingTop: '18px',
          paddingBottom: '30px',
          paddingLeft: '18px',
          paddingRight: '18px',
          justifyContent: 'space-between',
        }}
      >
        <VStack $css={{ gap: '28px' }}>
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
                      index === progressIndex ? '#f68b3b' : '#e5e5e5',
                  }}
                />
              ))}
            </Box>

            <VStack $css={{ gap: '10px' }}>
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
            </VStack>

            <textarea
              value={currentAnswer}
              onChange={handleChange}
              placeholder={QUESTION_EXAMPLES[currentQuestionIndex]}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '12px 16px',
                border: '1px solid #d8d8d8',
                borderRadius: '14px',
                backgroundColor: '#ffffff',
                color: '#111111',
                fontSize: '16px',
                lineHeight: 1.4,
                resize: 'none',
                overflow: 'hidden',
              }}
            />
          </VStack>
        </VStack>

        <VStack
          $css={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Image
            src="/images/voice-visualizer.gif"
            alt="음성 인식 시각화"
            width={84}
            height={84}
            unoptimized
            style={{ objectFit: 'contain' }}
          />

          {statusMessage ? (
            <Text
              typography="body3"
              $css={{
                maxWidth: '260px',
                color: flowStatus === 'idle' && !isSpeechSupported ? '#dc2626' : '#7a7a7a',
                textAlign: 'center',
                lineHeight: 1.5,
                whiteSpace: 'pre-line',
              }}
            >
              {statusMessage}
            </Text>
          ) : null}

          {showHelperAction ? (
            <Button
              colorPalette="primary"
              size="sm"
              onClick={flowStatus === 'idle' ? () => void handleStartVoiceFlow() : handleReplayQuestion}
              $css={{
                minWidth: '112px',
                borderRadius: '999px',
              }}
            >
              {flowStatus === 'idle' ? '음성 시작' : '다시 듣기'}
            </Button>
          ) : null}
        </VStack>

        <Button
          disabled={!voiceText.trim()}
          onClick={onNext}
          $css={{
            width: '100%',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: voiceText.trim() ? '#f7caa8' : '#f6e5d7',
            color: '#ffffff',
            fontWeight: 700,
            border: 'none',
          }}
        >
          상품 등록하기
        </Button>
      </VStack>
    </Box>
  );
};

export default VoiceStep;
