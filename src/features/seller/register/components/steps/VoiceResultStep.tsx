'use client';

import { Icon } from '@iconify/react';
import { Badge, Box, Button, HStack, Text, VStack } from '@vapor-ui/core';
import { useMemo, useState } from 'react';

type SaleDraft = {
  categoryLabel: string;
  description: string;
  priceReason: string;
  recommendedPrice: string;
  sellerMessage: string;
  title: string;
};

type VoiceResultStepProps = {
  draft: SaleDraft;
  previewUrl: string;
  onBack: () => void;
  onSubmit: () => void;
};

const formatManualPrice = (value: string) => {
  if (!value) {
    return '';
  }

  return `${Number(value).toLocaleString('ko-KR')}원`;
};

const VoiceResultStep = ({
  draft,
  previewUrl,
  onBack,
  onSubmit,
}: VoiceResultStepProps) => {
  const [isPriceEditorOpen, setIsPriceEditorOpen] = useState(false);
  const [manualPrice, setManualPrice] = useState('');
  const displayedPrice = useMemo(() => {
    if (!manualPrice) {
      return draft.recommendedPrice;
    }

    return formatManualPrice(manualPrice);
  }, [draft.recommendedPrice, manualPrice]);

  return (
    <Box
      $css={{
        width: '100%',
        minHeight: '100dvh',
        backgroundColor: '#f5f5f5',
        boxSizing: 'border-box',
      }}
    >
      <VStack
        $css={{
          width: '100%',
          minHeight: '100dvh',
          alignItems: 'stretch',
          boxSizing: 'border-box',
          paddingTop: '24px',
          paddingBottom: '28px',
          paddingLeft: '16px',
          paddingRight: '16px',
          justifyContent: 'space-between',
        }}
      >
        <VStack
          $css={{
            width: '100%',
            gap: '24px',
            alignItems: 'stretch',
            minWidth: 0,
          }}
        >
          <button
            type="button"
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

          <VStack $css={{ gap: '10px' }}>
            <Text
              typography="body2"
              $css={{
                color: '#f68632',
                fontWeight: 700,
              }}
            >
              마지막 단계예요!
            </Text>
            <Text
              typography="heading4"
              $css={{
                color: '#111111',
                fontWeight: 800,
                fontSize: '22px',
                lineHeight: 1.35,
              }}
            >
              최종 확인을 진행해주세요
            </Text>
          </VStack>

          <VStack
            $css={{
              width: '100%',
              minWidth: 0,
              alignItems: 'stretch',
              gap: '14px',
              padding: '16px',
              borderRadius: '18px',
              backgroundColor: '#ffffff',
              boxShadow: '0 6px 24px rgba(17, 17, 17, 0.06)',
            }}
          >
            <HStack
              $css={{
                width: '100%',
                minWidth: 0,
                alignItems: 'flex-start',
              }}
            >
              <VStack
                $css={{
                  gap: '6px',
                  alignItems: 'stretch',
                }}
              >
                <Text
                  typography="body4"
                  $css={{
                    color: '#7a7a7a',
                    fontWeight: 600,
                  }}
                >
                  {draft.categoryLabel}
                </Text>
                <Text
                  typography="heading5"
                  $css={{
                    color: '#111111',
                    fontWeight: 800,
                    lineHeight: 1.35,
                    wordBreak: 'keep-all',
                  }}
                >
                  {draft.title}
                </Text>
              </VStack>
            </HStack>

            <VStack
              $css={{
                width: '100%',
                alignItems: 'stretch',
                minWidth: 0,
                gap: '12px',
                padding: '16px',
                borderRadius: '14px',
                border: '1px solid #eceff3',
                backgroundColor: '#ffffff',
              }}
            >
              <HStack
                $css={{
                  width: '100%',
                  minWidth: 0,
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}
              >
                <Text
                  typography="body2"
                  $css={{
                    color: '#111111',
                    fontWeight: 700,
                    minWidth: 0,
                    flex: 1,
                    lineHeight: 1.4,
                    wordBreak: 'keep-all',
                  }}
                >
                  AI 특산품 가격 추천
                </Text>
                <Text
                  typography="heading5"
                  $css={{
                    color: '#f68632',
                    fontWeight: 800,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {displayedPrice}
                </Text>
              </HStack>

              <Text
                typography="body4"
                $css={{
                  color: '#7a7a7a',
                  lineHeight: 1.5,
                }}
              >
                {draft.priceReason}
              </Text>

              <Button
                colorPalette="primary"
                onClick={() => {
                  setIsPriceEditorOpen((previousState) => !previousState);

                  if (isPriceEditorOpen) {
                    setManualPrice('');
                  }
                }}
                $css={{
                  width: '100%',
                  height: '38px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #f5a067',
                  color: '#f68632',
                  fontWeight: 700,
                }}
              >
                직접 입력하기
              </Button>

              {isPriceEditorOpen ? (
                <VStack $css={{ gap: '8px' }}>
                  <input
                    inputMode="numeric"
                    placeholder="가격을 숫자로 입력해주세요"
                    value={manualPrice}
                    onChange={(event) => {
                      const nextValue = event.target.value.replace(/\D/g, '');
                      setManualPrice(nextValue);
                    }}
                    style={{
                      width: '100%',
                      height: '42px',
                      borderRadius: '12px',
                      border: '1px solid #d8dde3',
                      padding: '0 14px',
                      fontSize: '14px',
                      color: '#111111',
                      outline: 'none',
                    }}
                  />
                  <Text
                    typography="body4"
                    $css={{
                      color: '#7a7a7a',
                    }}
                  >
                    입력한 가격은 화면에서만 바로 확인할 수 있어요.
                  </Text>
                </VStack>
              ) : null}
            </VStack>

            <Box
              $css={{
                borderTop: '1px solid #f0f0f0',
                paddingTop: '16px',
              }}
            >
              <Text
                typography="body3"
                $css={{
                  color: '#3f3f46',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-line',
                }}
              >
                {draft.description}
              </Text>
            </Box>

            <Box
              $css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                width: '100%',
                paddingTop: '14px',
                paddingBottom: '14px',
                paddingLeft: '16px',
                paddingRight: '16px',
                borderRadius: '999px',
                backgroundColor: '#3f3f46',
              }}
            >
              <HStack
                $css={{
                  alignItems: 'center',
                  gap: '10px',
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <Box
                  $css={{
                    display: 'flex',
                    width: '28px',
                    height: '28px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    flexShrink: 0,
                  }}
                >
                  <Icon
                    icon="mdi:volume-high"
                    width="18"
                    height="18"
                    color="#ffffff"
                  />
                </Box>

                <Text
                  typography="body3"
                  $css={{
                    color: '#ffffff',
                    fontWeight: 700,
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {draft.sellerMessage}
                </Text>
              </HStack>

              <Icon
                icon="mdi:chevron-right"
                width="22"
                height="22"
                color="#ffffff"
              />
            </Box>
          </VStack>
        </VStack>

        <Button
          colorPalette="primary"
          onClick={onSubmit}
          $css={{
            width: '100%',
            height: '48px',
            borderRadius: '12px',
            fontWeight: 700,
          }}
        >
          등록하기
        </Button>
      </VStack>
    </Box>
  );
};

export default VoiceResultStep;
