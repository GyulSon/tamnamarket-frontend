'use client';

import { Icon } from '@iconify/react';
import { Box, Button, Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';

type ImageResultStepProps = {
  classificationError?: string;
  classificationResult?: string;
  previewUrl: string;
  onRetry: () => void;
  onConfirm: () => void;
};

const ImageResultStep = ({
  classificationError,
  classificationResult,
  previewUrl,
  onRetry,
  onConfirm,
}: ImageResultStepProps) => {
  const hasError = Boolean(classificationError);
  const resultLabel = classificationResult?.trim() || '특산품';

  return (
    <Box
      $css={{
        width: '100%',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        paddingTop: '22px',
        paddingBottom: '34px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <VStack
        $css={{
          flex: 1,
          gap: '48px',
        }}
      >
        <button
          type="button"
          onClick={onRetry}
          style={{
            display: 'flex',
            width: '32px',
            height: '32px',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            border: 'none',
            background: 'none',
            color: '#111111',
            cursor: 'pointer',
          }}
        >
          <Icon icon="mdi:chevron-left" width="24" height="24" />
        </button>

        <VStack
          $css={{
            flex: 1,
            gap: '28px',
          }}
        >
          <VStack $css={{ gap: '20px' }}>
            <VStack $css={{ gap: '6px' }}>
              <Text
                typography="body2"
                $css={{
                  color: '#6b7280',
                  fontWeight: 600,
                  fontSize: 'var(--vapor-typography-fontSize-100)',
                }}
              >
                이미지 분석 결과
              </Text>
              {hasError ? (
                <Text
                  typography="heading3"
                  $css={{
                    color: '#dc2626',
                    fontSize: 'var(--vapor-typography-fontSize-500)',
                    fontWeight: 700,
                    lineHeight: 1.25,
                  }}
                >
                  결과를 확인하지 못했어요
                </Text>
              ) : (
                <Text
                  typography="heading3"
                  $css={{
                    margin: 0,
                    fontSize: 'var(--vapor-typography-fontSize-500)',
                    fontWeight: 700,
                    lineHeight: 1.25,
                  }}
                >
                  <span style={{ color: '#ff7a2f' }}>
                    {resultLabel}
                  </span>
                  <span style={{ color: '#111111' }}>
                    로 인식했어요
                  </span>
                </Text>
              )}
            </VStack>

            <Box
              $css={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                borderRadius: '20px',
                backgroundColor: '#f3f4f6',
              }}
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="촬영한 상품 사진"
                  fill
                  unoptimized
                  style={{ objectFit: 'cover' }}
                />
              ) : null}
            </Box>

            {hasError ? (
              <Text
                typography="body3"
                $css={{
                  color: '#dc2626',
                  lineHeight: 1.5,
                }}
              >
                {classificationError}
              </Text>
            ) : null}
          </VStack>

          <VStack
            $css={{
              marginTop: 'auto',
              gap: '16px',
            }}
          >
            <Text
              typography="body2"
              $css={{
                color: '#5b5b5b',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 'var(--vapor-typography-fontSize-100)',
              }}
            >
              인식한 특산품이 맞나요?
            </Text>

            <Box
              $css={{
                display: 'flex',
                gap: '12px',
              }}
            >
              <Button
                onClick={onRetry}
                $css={{
                  flex: 1,
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cfd4dc',
                  color: '#222222',
                  fontWeight: 700,
                }}
              >
                아니에요
              </Button>

              <Button
                onClick={onConfirm}
                colorPalette="primary"
                $css={{
                  flex: 1,
                  height: '48px',
                  borderRadius: '12px',
                  fontWeight: 700,
                }}
              >
                네 맞아요
              </Button>
            </Box>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default ImageResultStep;
