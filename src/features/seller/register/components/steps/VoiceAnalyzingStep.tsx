'use client';

import Image from 'next/image';
import { Box, Text, VStack } from '@vapor-ui/core';

const VoiceAnalyzingStep = () => {
  return (
    <Box
      $css={{
        width: '100%',
        minHeight: '100dvh',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box',
      }}
    >
      <VStack
        $css={{
          minHeight: '100dvh',
          paddingTop: '72px',
          paddingBottom: '72px',
          paddingLeft: '24px',
          paddingRight: '24px',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          boxSizing: 'border-box',
        }}
      >
        <Box
          $css={{
            position: 'relative',
            width: '108px',
            height: '108px',
          }}
        >
          <Image
            src="/images/analysis-loading.gif"
            alt="AI 판매글 분석 중"
            fill
            unoptimized
            style={{ objectFit: 'contain' }}
          />
        </Box>

        <VStack $css={{ gap: '8px', alignItems: 'center' }}>
          <Text
            typography="body2"
            $css={{
              color: '#6b7280',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            잠시만 기다려주세요...
          </Text>
          <Text
            typography="heading4"
            $css={{
              color: '#111111',
              textAlign: 'center',
              fontWeight: 800,
              lineHeight: 1.35,
            }}
          >
            AI가 판매글을 작성중이에요!
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default VoiceAnalyzingStep;
