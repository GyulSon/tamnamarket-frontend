'use client';

import { Box, Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';

type ImageAnalyzingStepProps = {
  previewUrl: string;
};

const ImageAnalyzingStep = ({ previewUrl }: ImageAnalyzingStepProps) => {
  return (
    <Box
      $css={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        overflow: 'hidden',
        backgroundColor: '#111111',
      }}
    >
      <Box
        $css={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${previewUrl})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          transform: 'scale(1.03)',
        }}
      />

      <Box
        $css={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(17, 17, 17, 0.16) 0%, rgba(17, 17, 17, 0.42) 42%, rgba(17, 17, 17, 0.72) 100%)',
        }}
      />

      <VStack
        $css={{
          position: 'relative',
          minHeight: '100dvh',
          justifyContent: 'flex-end',
          paddingTop: '40px',
          paddingBottom: '48px',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        <VStack
          $css={{
            width: '100%',
            alignItems: 'center',
            gap: '24px',
            paddingTop: '36px',
            paddingBottom: '36px',
            paddingLeft: '20px',
            paddingRight: '20px',
            borderRadius: '32px',
            backgroundColor: 'rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <Box
            $css={{
              position: 'relative',
              width: '180px',
              height: '180px',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/images/analysis-loading.gif"
              alt="AI 분석 로딩"
              fill
              unoptimized
              style={{ objectFit: 'contain' }}
            />
          </Box>

          <VStack $css={{ alignItems: 'center', gap: '10px' }}>
            <Text
              typography="heading4"
              foreground="white"
              $css={{ textAlign: 'center' }}
            >
              AI가 사진을 분석하고 있어요
            </Text>
            <Text
              typography="body2"
              foreground="white"
              $css={{
                textAlign: 'center',
                whiteSpace: 'pre-line',
                opacity: 0.92,
              }}
            >
              업로드한 이미지를 확인하고
              {'\n'}
              상품 정보를 정리하는 중이다.
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default ImageAnalyzingStep;
