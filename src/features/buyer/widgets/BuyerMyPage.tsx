'use client';

import Image from 'next/image';
import { Box, HStack, VStack, Text } from '@vapor-ui/core';
import { AppHeader } from '../../../components/AppHeader';
import {
  CreditCardOutlineIcon,
  HeartOutlineIcon,
  BellOnOutlineIcon,
  LocationOutlineIcon,
  OutOutlineIcon,
  ChevronRightOutlineIcon,
} from '@vapor-ui/icons';

export function BuyerMyPage() {
  const MENU_ITEMS = [
    { icon: CreditCardOutlineIcon, label: '주문 내역' },
    { icon: HeartOutlineIcon, label: '찜한 농산물 관리' },
    { icon: BellOnOutlineIcon, label: '알림 설정' },
    { icon: LocationOutlineIcon, label: '배송지 관리' },
    { icon: OutOutlineIcon, label: '로그아웃' },
  ];

  return (
    <Box
      $css={{
        backgroundColor: '$white',
        minHeight: '100dvh',
        maxWidth: '375px',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
      }}
    >
      <VStack $css={{ paddingBottom: '84px' }}>
        {/* 상태 바 + 헤더 */}
        <AppHeader />

        {/* 프로필 섹션 */}
        <HStack
          $css={{
            gap: '$150',
            paddingLeft: '$250',
            paddingRight: '$250',
            paddingTop: '$200',
            paddingBottom: '$200',
            alignItems: 'flex-start',
          }}
        >
          {/* 프로필 이미지 */}
          <Box
            $css={{
              width: '60px',
              height: '60px',
              backgroundColor: '$gray-200',
              borderRadius: '$300',
              overflow: 'hidden',
              flexShrink: '0',
              position: 'relative',
            }}
          >
            <Image
              src="/images/mock/buyer/product5.png"
              alt="profile"
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>

          {/* 사용자 정보 + 버튼 */}
          <HStack
            $css={{
              gap: '$150',
              flex: '1',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <VStack $css={{ gap: '$025' }}>
              <Text
                typography="body2"
                foreground="normal-200"
                $css={{ fontWeight: '700' }}
              >
                김지훈 님
              </Text>
              <Text typography="body4" foreground="hint-100">
                카카오 계정으로 로그인
              </Text>
            </VStack>
            <Box
              render={<button />}
              $css={{
                paddingTop: '$075',
                paddingBottom: '$075',
                paddingLeft: '$150',
                paddingRight: '$150',
                backgroundColor: '$canvas-100',
                borderRadius: '$200',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Text
                typography="body4"
                $css={{
                  color: 'var(--vapor-color-orange-500)',
                  fontWeight: '600',
                }}
              >
                변경
              </Text>
            </Box>
          </HStack>
        </HStack>

        {/* 메뉴 섹션 */}
        <VStack
          $css={{
            gap: '$000',
            paddingTop: '$100',
            paddingLeft: '$250',
            paddingRight: '$250',
            paddingBottom: '$100',
          }}
        >
          {MENU_ITEMS.map((item) => {
            const IconComponent = item.icon;
            return (
              <HStack
                key={item.label}
                render={<button onClick={() => {}} />}
                $css={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  paddingTop: '$150',
                  paddingBottom: '$150',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid var(--vapor-color-border-normal)',
                  cursor: 'pointer',
                }}
              >
                <HStack $css={{ gap: '$100', alignItems: 'center' }}>
                  <IconComponent
                    width={20}
                    height={20}
                    style={{ color: 'var(--vapor-color-gray-600)' }}
                  />
                  <Text
                    typography="body3"
                    foreground="normal-200"
                    $css={{ fontWeight: '500' }}
                  >
                    {item.label}
                  </Text>
                </HStack>
                <ChevronRightOutlineIcon
                  width={20}
                  height={20}
                  style={{ color: 'var(--vapor-color-gray-500)' }}
                />
              </HStack>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
}
