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
        height: '100dvh',
        overflow: 'hidden',
        backgroundColor: '#111111',
        boxSizing: 'border-box',
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
          transform: 'scale(1.08)',
          filter: 'blur(18px)',
        }}
      />

      <Box
        $css={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(7, 7, 7, 0.56) 0%, rgba(7, 7, 7, 0.42) 34%, rgba(7, 7, 7, 0.62) 100%)',
        }}
      />

      <VStack
        $css={{
          position: 'relative',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          paddingTop: '40px',
          paddingBottom: '96px',
          paddingLeft: '24px',
          paddingRight: '24px',
          boxSizing: 'border-box',
        }}
      >
        <Box
          $css={{
            position: 'relative',
            width: '120px',
            height: '120px',
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

        <VStack $css={{ alignItems: 'center', gap: '8px' }}>
          <Text
            typography="body2"
            foreground="white"
            $css={{
              textAlign: 'center',
              fontSize: 'var(--vapor-typography-fontSize-100)',
              opacity: 0.72,
            }}
          >
            잠시만 기다려주세요...
          </Text>
          <Text
            typography="heading4"
            foreground="white"
            $css={{
              textAlign: 'center',
              fontSize: 'var(--vapor-typography-fontSize-400)',
              fontWeight: 700,
            }}
          >
            이미지를 분석하고 있어요
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default ImageAnalyzingStep;
