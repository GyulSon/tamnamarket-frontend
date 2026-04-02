'use client';

import { Box, Button, Text, VStack } from '@vapor-ui/core';

type ImageResultStepProps = {
  classificationError?: string;
  classificationResult?: string;
  previewUrl: string;
  onConfirm: () => void;
};

const ImageResultStep = ({
  classificationError,
  classificationResult,
  previewUrl,
  onConfirm,
}: ImageResultStepProps) => {
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
        }}
      />

      <Box
        $css={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(17, 17, 17, 0.2) 0%, rgba(17, 17, 17, 0.7) 100%)',
        }}
      />

      <VStack
        $css={{
          position: 'relative',
          minHeight: '100dvh',
          justifyContent: 'flex-end',
          padding: '20px',
        }}
      >
        <VStack
          $css={{
            gap: '18px',
            paddingTop: '24px',
            paddingBottom: '24px',
            paddingLeft: '20px',
            paddingRight: '20px',
            borderRadius: '28px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
        >
          <VStack $css={{ gap: '8px' }}>
            <Text typography="heading4">사진 인식이 완료됐어요</Text>
            <Text typography="body3" $css={{ color: '#4b5563' }}>
              사진 업로드와 1차 분석을 마쳤다. 다음 단계에서 음성으로 상품의 무게,
              수확일, 맛 특징을 이어서 입력하면 된다.
            </Text>
          </VStack>

          <VStack
            $css={{
              gap: '10px',
              padding: '16px',
              borderRadius: '20px',
              backgroundColor: '#f3f4f6',
            }}
          >
            <Text typography="body2">AI 인식 결과</Text>
            {classificationError ? (
              <Text typography="body3" $css={{ color: '#dc2626' }}>
                {classificationError}
              </Text>
            ) : (
              <>
                <Text typography="body3" $css={{ color: '#4b5563' }}>
                  사진 기반 분류를 완료했다.
                </Text>
                <Text typography="body3" $css={{ color: '#111111' }}>
                  분류 결과: {classificationResult ?? '-'}
                </Text>
              </>
            )}
          </VStack>

          <Button onClick={onConfirm}>확인</Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default ImageResultStep;
