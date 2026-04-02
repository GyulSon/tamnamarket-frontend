'use client';

import { Box } from '@vapor-ui/core';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import CameraStep from '@/features/seller/register/components/steps/CameraStep';
import ImageAnalyzingStep from '@/features/seller/register/components/steps/ImageAnalyzingStep';
import ImageResultStep from '@/features/seller/register/components/steps/ImageResultStep';
import VoiceAnalyzingStep from '@/features/seller/register/components/steps/VoiceAnalyzingStep';
import VoiceResultStep from '@/features/seller/register/components/steps/VoiceResultStep';
import VoiceStep from '@/features/seller/register/components/steps/VoiceStep';
import {
  type SaleDraftResponse,
  classifySaleImage,
  submitSaleVoiceAnswers,
} from '@/lib/api/project';

type RegisterStep =
  | 'camera'
  | 'imageAnalyzing'
  | 'imageResult'
  | 'voice'
  | 'voiceAnalyzing'
  | 'voiceResult';

type SaleDraft = {
  categoryLabel: string;
  description: string;
  priceReason: string;
  recommendedPrice: string;
  sellerMessage: string;
  title: string;
};

const DEFAULT_RECOMMENDED_PRICE = '28,000원';

const formatRecommendedPrice = (
  recommendedPrice?: SaleDraftResponse['recommendedPrice']
) => {
  if (typeof recommendedPrice === 'number' && Number.isFinite(recommendedPrice)) {
    return `${recommendedPrice.toLocaleString('ko-KR')}원`;
  }

  if (typeof recommendedPrice !== 'string' || !recommendedPrice.trim()) {
    return DEFAULT_RECOMMENDED_PRICE;
  }

  const numericPrice = recommendedPrice.replace(/[^\d]/g, '');

  if (!numericPrice) {
    return recommendedPrice.trim();
  }

  return `${Number(numericPrice).toLocaleString('ko-KR')}원`;
};

const buildSaleDraft = (
  response: SaleDraftResponse,
  classificationResult: string
): SaleDraft => {
  const baseLabel =
    response.categoryLabel?.trim() || classificationResult.trim() || '특산품';

  return {
    categoryLabel: baseLabel,
    title: response.title?.trim() || `${baseLabel} 2kg 한 박스(특품)`,
    recommendedPrice: formatRecommendedPrice(response.recommendedPrice),
    priceReason:
      response.priceReason?.trim() || '지역 시세를 고려하여 책정했어요',
    description:
      response.description?.trim() ||
      `정성껏 재배한 ${baseLabel}이에요. AI가 음성 답변을 바탕으로 상품 소개를 먼저 정리했어요. 등록 전에 문구와 가격을 한 번 더 확인해주세요.`,
    sellerMessage:
      response.sellerMessage?.trim() ||
      `${baseLabel} 정말 자신 있어요. 맛있게 드셔주세요!`,
  };
};

const buildMockSaleDraft = (classificationResult: string): SaleDraft => {
  const baseLabel = classificationResult.trim() || '특산품';

  return {
    categoryLabel: baseLabel,
    title: `${baseLabel} 2kg 한 박스(특품)`,
    recommendedPrice: DEFAULT_RECOMMENDED_PRICE,
    priceReason: '지역 시세를 고려하여 책정했어요',
    description: `정성껏 재배한 ${baseLabel}이에요. 음성 답변 기반 문구는 API 연동 후 자동으로 채워질 예정이라, 지금은 등록 플로우 확인용 초안을 먼저 보여주고 있어요.`,
    sellerMessage: `${baseLabel} 신선하게 준비했어요. 곧 실제 음성 요약도 함께 반영할게요!`,
  };
};

const SellerRegisterPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<RegisterStep>('camera');
  const [capturedPhotoFile, setCapturedPhotoFile] = useState<File | null>(null);
  const [photoNames, setPhotoNames] = useState<string[]>([]);
  const [capturedPhotoPreviewUrl, setCapturedPhotoPreviewUrl] = useState('');
  const [classificationError, setClassificationError] = useState('');
  const [classificationResult, setClassificationResult] = useState('');
  const [voiceAnswerFiles, setVoiceAnswerFiles] = useState<File[]>([]);
  const [saleDraft, setSaleDraft] = useState<SaleDraft | null>(null);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stepIndexMap: Record<RegisterStep, number> = {
    camera: 0,
    imageAnalyzing: 1,
    imageResult: 2,
    voice: 3,
    voiceAnalyzing: 4,
    voiceResult: 5,
  };

  useEffect(() => {
    if (step !== 'imageAnalyzing' || !capturedPhotoFile) {
      return;
    }

    let isCancelled = false;
    let transitionTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const requestClassification = async () => {
      const analyzingStartedAt = Date.now();

      try {
        const response = await classifySaleImage(capturedPhotoFile);

        if (isCancelled) {
          return;
        }

        setClassificationResult(response.result);
        setClassificationError('');
      } catch {
        if (isCancelled) {
          return;
        }

        setClassificationResult('');
        setClassificationError('사진 분석 결과를 불러오지 못했다.');
      } finally {
        const elapsedTime = Date.now() - analyzingStartedAt;
        const remainingTime = Math.max(0, 5000 - elapsedTime);

        transitionTimeoutId = setTimeout(() => {
          if (!isCancelled) {
            setStep('imageResult');
          }
        }, remainingTime);
      }
    };

    void requestClassification();

    return () => {
      isCancelled = true;

      if (transitionTimeoutId) {
        clearTimeout(transitionTimeoutId);
      }
    };
  }, [capturedPhotoFile, step]);

  useEffect(() => {
    return () => {
      if (capturedPhotoPreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(capturedPhotoPreviewUrl);
      }
    };
  }, [capturedPhotoPreviewUrl]);

  const handleSubmitVoiceAnswers = useCallback(async () => {
    if (!voiceAnswerFiles.length) {
      setSubmitError('전송할 음성 답변이 없어요.');
      return;
    }

    const analyzingStartedAt = Date.now();

    setIsSubmitting(true);
    setSubmitError('');
    setStep('voiceAnalyzing');

    try {
      const response = await submitSaleVoiceAnswers(voiceAnswerFiles);
      const elapsedTime = Date.now() - analyzingStartedAt;
      const remainingTime = Math.max(0, 2000 - elapsedTime);

      if (remainingTime > 0) {
        await new Promise((resolve) => {
          setTimeout(resolve, remainingTime);
        });
      }

      setSaleDraft(buildSaleDraft(response, classificationResult));
      setStep('voiceResult');
    } catch {
      const elapsedTime = Date.now() - analyzingStartedAt;
      const remainingTime = Math.max(0, 2000 - elapsedTime);

      if (remainingTime > 0) {
        await new Promise((resolve) => {
          setTimeout(resolve, remainingTime);
        });
      }

      setSubmitError('');
      setSaleDraft(buildMockSaleDraft(classificationResult));
      setStep('voiceResult');
    } finally {
      setIsSubmitting(false);
    }
  }, [classificationResult, voiceAnswerFiles]);

  const currentStepIndex = stepIndexMap[step];

  return (
    <Box
      $css={{
        width: '100%',
        minHeight: '100dvh',
        overflowX: 'hidden',
        backgroundColor: '#ffffff',
      }}
    >
      <Box
        $css={{
          width: '100%',
          maxWidth: '1280px',
          minHeight: '100dvh',
          marginLeft: 'auto',
          marginRight: 'auto',
          overflowX: 'hidden',
          position: 'relative',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
        }}
      >
        <Box
          $css={{
            display: 'flex',
            width: '100%',
            minWidth: 0,
            transform: `translateX(-${currentStepIndex * 100}%)`,
            transition: 'transform 300ms ease',
          }}
        >
          <Box $css={{ flex: '0 0 100%', minWidth: 0 }}>
            <CameraStep
              isActive={step === 'camera'}
              fileNames={photoNames}
              onCapture={({ file, fileName, previewUrl }) => {
                if (capturedPhotoPreviewUrl.startsWith('blob:')) {
                  URL.revokeObjectURL(capturedPhotoPreviewUrl);
                }

                setCapturedPhotoFile(file);
                setPhotoNames([fileName]);
                setCapturedPhotoPreviewUrl(previewUrl);
                setClassificationResult('');
                setClassificationError('');
                setVoiceAnswerFiles([]);
                setSaleDraft(null);
                setSubmitError('');
                setStep('imageAnalyzing');
              }}
            />
          </Box>

          <Box $css={{ flex: '0 0 100%', minWidth: 0 }}>
            <ImageAnalyzingStep previewUrl={capturedPhotoPreviewUrl} />
          </Box>

          <Box $css={{ flex: '0 0 100%', minWidth: 0 }}>
            <ImageResultStep
              classificationError={classificationError}
              classificationResult={classificationResult}
              previewUrl={capturedPhotoPreviewUrl}
              onRetry={() => {
                setClassificationResult('');
                setClassificationError('');
                setSubmitError('');
                setVoiceAnswerFiles([]);
                setSaleDraft(null);
                setStep('camera');
              }}
              onConfirm={() => {
                setVoiceAnswerFiles([]);
                setSaleDraft(null);
                setSubmitError('');
                setStep('voice');
              }}
            />
          </Box>

          <Box $css={{ flex: '0 0 100%', minWidth: 0 }}>
            <VoiceStep
              isActive={step === 'voice'}
              voiceAnswerFiles={voiceAnswerFiles}
              submitError={submitError}
              isSubmitting={isSubmitting}
              onVoiceAnswersChange={setVoiceAnswerFiles}
              onBack={() => {
                setSubmitError('');
                setStep('imageResult');
              }}
              onSubmit={() => void handleSubmitVoiceAnswers()}
            />
          </Box>

          <Box $css={{ flex: '0 0 100%', minWidth: 0 }}>
            <VoiceAnalyzingStep />
          </Box>

          <Box $css={{ flex: '0 0 100%', minWidth: 0 }}>
            {saleDraft ? (
              <VoiceResultStep
                draft={saleDraft}
                previewUrl={capturedPhotoPreviewUrl}
                onBack={() => {
                  setSubmitError('');
                  setStep('voice');
                }}
                onSubmit={() => {
                  const nextTitle = saleDraft?.title?.trim();
                  const searchParams = new URLSearchParams();

                  if (nextTitle) {
                    searchParams.set('title', nextTitle);
                  }

                  router.push(
                    searchParams.toString()
                      ? `/seller/register/complete?${searchParams.toString()}`
                      : '/seller/register/complete'
                  );
                }}
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SellerRegisterPage;
