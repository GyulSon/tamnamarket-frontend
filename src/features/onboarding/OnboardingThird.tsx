'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, Button, HStack, Text, VStack } from '@vapor-ui/core';

type UserRole = 'seller' | 'buyer' | null;

export default function OnboardingThird() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const router = useRouter();

  const handleStartClick = () => {
    if (selectedRole === 'seller') {
      router.push('/seller');
    } else if (selectedRole === 'buyer') {
      router.push('/buyer');
    }
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        padding: '0',
      }}
    >
      {/* 스크롤 가능한 컨텐츠 */}
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          padding: '160px 20px 40px 20px',
          overflow: 'hidden',
        }}
      >
        <VStack style={{ gap: '60px' }}>
          {/* 상단 타이틀 섹션 */}
          <VStack style={{ gap: '8px' }}>
            <Text
              typography="heading6"
              style={{
                color: '#FF761B',
                fontFamily: "'Jalnan2'",
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '1.3',
                letterSpacing: '-0.2px',
              }}
            >
              안녕하우꽈!
            </Text>

            <Text
              style={{
                fontFamily: "'Jalnan2'",
                fontSize: '28px',
                fontWeight: '400',
                lineHeight: '1.4',
                letterSpacing: '-0.1px',
                color: '#000000',
              }}
            >
              탐라장터에 오신 것을
              <br /> 환영합니다
            </Text>

            <Text
              typography="subtitle1"
              style={{
                color: '#262626',
                fontWeight: '500',
                letterSpacing: '-1px',
              }}
            >
              원하시는 목적에 맞게 하단의 선택지를 선택해주세요
            </Text>
          </VStack>

          {/* 역할 선택 섹션 */}
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '80px',
            }}
          >
            {/* 판매자 옵션 */}
            <HStack
              onClick={() => setSelectedRole('seller')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px',
                borderRadius: '12px',
                border:
                  selectedRole === 'seller'
                    ? '2px solid #FF761B'
                    : '2px solid #E8E8E8',
                backgroundColor:
                  selectedRole === 'seller' ? '#FFF0E5' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <Box
                style={{
                  position: 'relative',
                  width: '60px',
                  height: '60px',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/images/onboarding/onboarding1.png"
                  alt="판매자"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <VStack style={{ textAlign: 'left', flex: 1, gap: '2px' }}>
                <Text
                  typography="subtitle1"
                  style={{
                    fontSize: '12px',
                    color: '#393939',
                    margin: '0 0 4px 0',
                    fontWeight: '400',
                  }}
                >
                  제주의 특산품을 판매하고자 하신다면
                </Text>
                <Text
                  typography="heading5"
                  style={{
                    fontWeight: '700',
                    margin: '0',
                    color: selectedRole === 'seller' ? '#FF761B' : '#333333',
                  }}
                >
                  판매자로 시작하기
                </Text>
              </VStack>
            </HStack>

            {/* 구매자 옵션 */}
            <HStack
              onClick={() => setSelectedRole('buyer')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px',
                borderRadius: '12px',
                border:
                  selectedRole === 'buyer'
                    ? '2px solid #FF761B'
                    : '2px solid #E8E8E8',
                backgroundColor:
                  selectedRole === 'buyer' ? '#FFF0E5' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <Box
                style={{
                  position: 'relative',
                  width: '60px',
                  height: '60px',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/images/onboarding/onboarding2.png"
                  alt="구매자"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <VStack style={{ textAlign: 'left', flex: 1 }}>
                <Text
                  typography="subtitle1"
                  style={{
                    fontSize: '12px',
                    color: '#393939',
                    margin: '0 0 4px 0',
                    fontWeight: '400',
                  }}
                >
                  제주의 특산품을 구매하고자 하신다면
                </Text>
                <Text
                  typography="heading5"
                  style={{
                    fontWeight: '700',
                    margin: '0',
                    color: selectedRole === 'buyer' ? '#FF761B' : '#333333',
                  }}
                >
                  구매자로 시작하기
                </Text>
              </VStack>
            </HStack>
          </Box>
        </VStack>

        {/* 하단 버튼 */}
        <Button
          size="xl"
          onClick={handleStartClick}
          disabled={!selectedRole}
          style={{
            width: '100%',
            backgroundColor: '#FF761B',
            marginBottom: '40px',
          }}
        >
          <Text
            typography="heading6"
            $css={{
              fontWeight: '500',
              color: 'white',
            }}
          >
            탐라장터 시작하기
          </Text>
        </Button>
      </Box>
    </Box>
  );
}
