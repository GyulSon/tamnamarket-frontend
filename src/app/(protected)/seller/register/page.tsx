'use client';

import { Box, Text, VStack } from '@vapor-ui/core';
import { useEffect, useMemo, useState } from 'react';

import CameraStep from '@/features/seller/register/components/steps/CameraStep';
import ImageAnalyzingStep from '@/features/seller/register/components/steps/ImageAnalyzingStep';
import ImageResultStep from '@/features/seller/register/components/steps/ImageResultStep';
import PreviewStep from '@/features/seller/register/components/steps/PreviewStep';
import VoiceStep from '@/features/seller/register/components/steps/VoiceStep';
import { classifySaleImage } from '@/lib/api/project';

type RegisterStep =
  | 'camera'
  | 'imageAnalyzing'
  | 'imageResult'
  | 'voice'
  | 'preview'
  | 'complete';

const SellerRegisterPage = () => {
  const [step, setStep] = useState<RegisterStep>('camera');
  const [capturedPhotoFile, setCapturedPhotoFile] = useState<File | null>(null);
  const [photoNames, setPhotoNames] = useState<string[]>([]);
  const [capturedPhotoPreviewUrl, setCapturedPhotoPreviewUrl] = useState('');
  const [classificationError, setClassificationError] = useState('');
  const [classificationResult, setClassificationResult] = useState('');
  const [voiceText, setVoiceText] = useState('');
  const stepIndexMap: Record<RegisterStep, number> = {
    camera: 0,
    imageAnalyzing: 1,
    imageResult: 2,
    voice: 3,
    preview: 4,
    complete: 5,
  };

  useEffect(() => {
    if (step !== 'imageAnalyzing' || !capturedPhotoFile) {
      return;
    }

    let isCancelled = false;

    const requestClassification = async () => {
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
        if (!isCancelled) {
          setStep('imageResult');
        }
      }
    };

    void requestClassification();

    return () => {
      isCancelled = true;
    };
  }, [capturedPhotoFile, step]);

  useEffect(() => {
    return () => {
      if (capturedPhotoPreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(capturedPhotoPreviewUrl);
      }
    };
  }, [capturedPhotoPreviewUrl]);

  const generatedPost = useMemo(() => {
    const trimmedVoiceText = voiceText.trim();

    return {
      title: trimmedVoiceText
        ? trimmedVoiceText.slice(0, 20)
        : 'AI가 생성한 상품 등록 제목',
      description: trimmedVoiceText
        ? `${trimmedVoiceText}\n\n사진과 음성 내용을 바탕으로 자동 정리된 상품 설명이다.`
        : '음성 인식 결과를 바탕으로 자동 생성된 상품 설명이다.',
    };
  }, [voiceText]);

  const currentStepIndex = stepIndexMap[step];

  return (
    <Box
      $css={{
        width: '100%',
        minHeight: '100dvh',
        overflow: 'hidden',
      }}
    >
      <Box
        $css={{
          display: 'flex',
          width: '100%',
          transform: `translateX(-${currentStepIndex * 100}%)`,
          transition: 'transform 300ms ease',
        }}
      >
        <Box $css={{ flex: '0 0 100%' }}>
          <CameraStep
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
              setStep('imageAnalyzing');
            }}
          />
        </Box>

        <Box $css={{ flex: '0 0 100%' }}>
          <ImageAnalyzingStep previewUrl={capturedPhotoPreviewUrl} />
        </Box>

        <Box $css={{ flex: '0 0 100%' }}>
          <ImageResultStep
            classificationError={classificationError}
            classificationResult={classificationResult}
            previewUrl={capturedPhotoPreviewUrl}
            onConfirm={() => setStep('voice')}
          />
        </Box>

        <Box $css={{ flex: '0 0 100%' }}>
          <VoiceStep
            voiceText={voiceText}
            onVoiceTextChange={setVoiceText}
            onBack={() => setStep('imageResult')}
            onNext={() => setStep('preview')}
          />
        </Box>

        <Box $css={{ flex: '0 0 100%' }}>
          <PreviewStep
            photoNames={photoNames}
            title={generatedPost.title}
            description={generatedPost.description}
            onSubmit={() => setStep('complete')}
          />
        </Box>

        <Box $css={{ flex: '0 0 100%' }}>
          <VStack
            $css={{
              width: '100%',
              minHeight: '100dvh',
              padding: '$200',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '$100',
            }}
          >
            <Text render={<h1 />} typography="heading4">
              글 등록 완료
            </Text>
            <Text typography="body2">등록이 완료됐다.</Text>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default SellerRegisterPage;
