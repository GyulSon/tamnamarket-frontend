'use client';

import Link from 'next/link';

import { Box, Button, HStack, Text, VStack } from '@vapor-ui/core';
import { MenuOutlineIcon } from '@vapor-ui/icons';

import { AppHeader } from '@/features/buyer/home/components';
import SectionContainer from '@/components/SectionContainer';

export function SellerHome() {
  return (
    <Box
      $css={{
        backgroundColor: '$white',
        minHeight: '100dvh',
        maxWidth: '375px',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
      }}
    >
      <Box
        $css={{
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <AppHeader>
          <MenuOutlineIcon width={24} height={24} />
        </AppHeader>
      </Box>
      <VStack
        $css={{
          alignItems: 'stretch',
          gap: '$000',
          paddingBottom: '$250',
        }}
      >
        <SectionContainer
          $css={{
            alignItems: 'stretch',
            gap: '12px',
            paddingTop: '40px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingBottom: '0',
          }}
        >
          <VStack
            $css={{
              alignItems: 'stretch',
              gap: '8px',
              width: '100%',
            }}
          >
            <Text
              typography="heading6"
              $css={{
                fontFamily: "'Jalnan2'",
                fontWeight: '400',
                lineHeight: '24px',
                fontSize: 'var(--vapor-typography-fontSize-075)',
                color: '#FF761B',
              }}
            >
              안녕하우꽈!
            </Text>
            <Text
              typography="heading3"
              $css={{
                fontFamily: "'Jalnan2'",
                color: '$gray-900',
                fontWeight: '400',
                fontSize: '24px',
                lineHeight: '140%',
                letterSpacing: '-0.1px',
                whiteSpace: 'pre-line',
              }}
            >
              {'오늘은 어떤 특산품을\n등록해볼까요?'}
            </Text>
            <Text
              typography="subtitle1"
              $css={{
                color: '$gray-700',
                fontWeight: '500',
                lineHeight: '26px',
              }}
            >
              원하시는 목적에 맞게 하단의 선택지를 선택해주세요
            </Text>
          </VStack>

          <Button
            size="lg"
            colorPalette="primary"
            nativeButton={false}
            render={<Link href="/seller/register" />}
            $css={{
              width: '100%',
              height: '48px',
              borderRadius: '$300',
              marginTop: '24px',
            }}
          >
            <Text
              typography="heading6"
              foreground="white"
              $css={{
                fontWeight: '500',
              }}
            >
              특산품 등록하기
            </Text>
          </Button>
        </SectionContainer>

        <SectionContainer
          $css={{
            paddingTop: '56px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingBottom: '0',
          }}
        >
          <HStack
            $css={{
              height: '82px',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              width: '100%',
              paddingTop: '16px',
              paddingBottom: '16px',
              paddingLeft: '16px',
              paddingRight: '16px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '$gray-200',
              borderRadius: '12px',
              backgroundColor: '$white',
              boxSizing: 'border-box',
            }}
          >
            <VStack
              $css={{
                alignItems: 'stretch',
                gap: '2px',
                minWidth: 0,
                flex: 1,
              }}
            >
              <Text
                typography="heading5"
                $css={{
                  color: '$black',
                  fontWeight: '700',
                  lineHeight: '26px',
                  letterSpacing: '-0.1px',
                }}
              >
                내 특산품 리스트
              </Text>
              <Text
                typography="body3"
                $css={{
                  color: '$gray-700',
                  fontWeight: '400',
                  lineHeight: '18px',
                }}
              >
                농부님이 직접 업로드한 특산품 리스트예요
              </Text>
            </VStack>

            <Link
              href="/seller/list"
              style={{ textDecoration: 'none', flexShrink: 0 }}
            >
              <Box
                $css={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '84px',
                  height: '40px',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  borderRadius: '8px',
                  backgroundColor: '#393939',
                }}
              >
                <Text
                  typography="body3"
                  foreground="white"
                  $css={{
                    fontWeight: '500',
                    lineHeight: '22px',
                  }}
                >
                  전체 보기
                </Text>
              </Box>
            </Link>
          </HStack>
        </SectionContainer>
      </VStack>
    </Box>
  );
}
