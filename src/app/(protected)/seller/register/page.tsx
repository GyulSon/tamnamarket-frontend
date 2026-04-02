'use client';

import { Box, Text, VStack } from '@vapor-ui/core';
import { useEffect, useMemo, useState } from 'react';

import PhotoStep from '@/features/seller/register/components/steps/PhotoStep';
import PreviewStep from '@/features/seller/register/components/steps/PreviewStep';
import VoiceStep from '@/features/seller/register/components/steps/VoiceStep';

type RegisterStep = 'photo' | 'voice' | 'loading' | 'preview' | 'complete';

const SellerRegisterPage = () => {
  const [step, setStep] = useState<RegisterStep>('photo');
  const [photoNames, setPhotoNames] = useState<string[]>([]);
  const [voiceText, setVoiceText] = useState('');
  const stepIndexMap: Record<RegisterStep, number> = {
    photo: 0,
    voice: 1,
    loading: 2,
    preview: 3,
    complete: 4,
  };

  useEffect(() => {
    if (step !== 'loading') {
      return;
    }

    const timer = window.setTimeout(() => {
      setStep('preview');
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [step]);

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
          <PhotoStep
            fileNames={photoNames}
            onFileChange={setPhotoNames}
            onNext={() => setStep('voice')}
          />
        </Box>

        <Box $css={{ flex: '0 0 100%' }}>
          <VoiceStep
            voiceText={voiceText}
            onVoiceTextChange={setVoiceText}
            onNext={() => setStep('loading')}
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
            <Box
              $css={{
                width: '32px',
                height: '32px',
                borderStyle: 'solid',
                borderWidth: '1px',
              }}
            />
            <Text render={<h1 />} typography="heading5">
              AI 응답 결과 생성중
            </Text>
          </VStack>
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
