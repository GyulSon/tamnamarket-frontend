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
} from '@/entities/seller';

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
const DEFAULT_PRODUCT_DESCRIPTION =
  '애월읍 김순자 할망께서 40년 경력으로 정성껏 재배하신 햇청귤입니다. 올해는 일교차가 커서 당도가 특히 높으며, 비타민C가 풍부해 환절기 건강관리에 좋습니다. 농약을 최소화하고 유기농 퇴비로 키워 안심하고 드실 수 있습니다.';
const getErrorMessage = (error: unknown, fallbackMessage: string) =>
  error instanceof Error ? error.message : fallbackMessage;

const formatRecommendedPrice = (
  recommendedPrice?: SaleDraftResponse['recommendedPrice']
) => {
  if (
    typeof recommendedPrice === 'number' &&
    Number.isFinite(recommendedPrice)
  ) {
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
    description: response.description?.trim() || DEFAULT_PRODUCT_DESCRIPTION,
    sellerMessage:
      response.sellerMessage?.trim() ||
      `${baseLabel} 정말 자신 있어요. 맛있게 드셔주세요!`,
  };
};

const SellerRegisterPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<RegisterStep>('camera');
  const [capturedPhotoFile, setCapturedPhotoFile] = useState<File | null>(null);
  const [capturedPhotoPreviewUrl, setCapturedPhotoPreviewUrl] = useState('');
  const [classificationError, setClassificationError] = useState('');
  const [classificationResult, setClassificationResult] = useState('');
  const [productId, setProductId] = useState<number | null>(null);
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
      try {
        const classificationResponse =
          await classifySaleImage(capturedPhotoFile);

        if (isCancelled) {
          return;
        }

        setClassificationResult(classificationResponse.result);
        setProductId(classificationResponse.productId ?? null);
        setClassificationError(
          classificationResponse.productId === undefined
            ? '상품 정보를 확인하지 못했어요. 사진을 다시 등록해주세요.'
            : ''
        );
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setClassificationResult('');
        setProductId(null);
        setClassificationError(
          getErrorMessage(error, '품종 분류에 실패했어요. 다시 시도해주세요.')
        );
      } finally {
        transitionTimeoutId = setTimeout(() => {
          if (!isCancelled) {
            setStep('imageResult');
          }
        }, 0);
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

    if (!classificationResult.trim()) {
      setSubmitError(
        '상품 정보를 확인하지 못했어요. 사진을 다시 등록해주세요.'
      );
      setStep('imageResult');
      return;
    }

    if (productId == null) {
      setSubmitError(
        '상품 정보를 확인하지 못했어요. 사진을 다시 등록해주세요.'
      );
      setStep('imageResult');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setStep('voiceAnalyzing');

    try {
      const nextDraftResponse: SaleDraftResponse = await submitSaleVoiceAnswers(
        productId,
        voiceAnswerFiles
      );
      const hasDraftContent = Object.values(nextDraftResponse).some((value) => {
        if (typeof value === 'string') {
          return value.trim().length > 0;
        }

        return value !== undefined && value !== null;
      });

      if (!hasDraftContent) {
        setSubmitError(
          '게시물 초안을 생성하지 못했어요. 음성 답변을 다시 전송해주세요.'
        );
        setStep('voice');
        return;
      }

      setSaleDraft(buildSaleDraft(nextDraftResponse, classificationResult));
      setStep('voiceResult');
    } catch {
      setSubmitError(
        '게시물 초안을 생성하지 못했어요. 음성 답변을 다시 전송해주세요.'
      );
      setStep('voice');
    } finally {
      setIsSubmitting(false);
    }
  }, [classificationResult, productId, voiceAnswerFiles]);

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
          minHeight: '100dvh',
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
              onCapture={({ file, previewUrl }) => {
                if (capturedPhotoPreviewUrl.startsWith('blob:')) {
                  URL.revokeObjectURL(capturedPhotoPreviewUrl);
                }

                setCapturedPhotoFile(file);
                setCapturedPhotoPreviewUrl(previewUrl);
                setClassificationResult('');
                setClassificationError('');
                setProductId(null);
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
              errorMessage={classificationError}
              classificationResult={classificationResult}
              isConfirmDisabled={
                !classificationResult.trim() ||
                productId == null ||
                Boolean(classificationError)
              }
              previewUrl={capturedPhotoPreviewUrl}
              onRetry={() => {
                setClassificationResult('');
                setClassificationError('');
                setProductId(null);
                setSubmitError('');
                setVoiceAnswerFiles([]);
                setSaleDraft(null);
                setStep('camera');
              }}
              onConfirm={() => {
                if (
                  !classificationResult.trim() ||
                  productId == null ||
                  classificationError
                ) {
                  return;
                }

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
