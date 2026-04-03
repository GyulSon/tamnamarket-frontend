'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';

import { Box, Button, Text, VStack } from '@vapor-ui/core';

type RegisterCompletePageProps = {
  title?: string;
};

const RegisterCompletePage = ({ title }: RegisterCompletePageProps) => {
  return (
    <Box
      $css={{
        width: '100%',
        minHeight: '100dvh',
        backgroundColor: '#ffffff',
      }}
    >
      <VStack
        $css={{
          width: '100%',
          minHeight: '100dvh',
          paddingTop: '24px',
          paddingBottom: '24px',
          paddingLeft: '20px',
          paddingRight: '20px',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        <Box />

        <VStack
          $css={{
            alignItems: 'center',
            gap: '20px',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Box
            $css={{
              display: 'flex',
              width: '48px',
              height: '48px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '999px',
              backgroundColor: '#ee7238',
            }}
          >
            <Icon icon="lucide:check" width="28" height="28" color="#ffffff" />
          </Box>

          <VStack
            $css={{
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Text
              render={<h1 />}
              typography="heading4"
              $css={{
                color: '#111111',
                fontWeight: 800,
                fontSize: '24px',
                lineHeight: 1.35,
                textAlign: 'center',
                wordBreak: 'keep-all',
              }}
            >
              특산물이 등록되었습니다
            </Text>

            <Text
              typography="body2"
              $css={{
                color: '#666666',
                textAlign: 'center',
                lineHeight: 1.5,
                fontWeight: 600,
                whiteSpace: 'pre-line',
              }}
            >
              {'판매 완료 시 택배 픽업이\n자동으로 예약됩니다'}
            </Text>
          </VStack>
        </VStack>

        <Button
          colorPalette="primary"
          nativeButton={false}
          render={<Link href="/seller" style={{ color: '#ffffff' }} />}
          $css={{
            width: '100%',
            maxWidth: '340px',
            height: '48px',
            borderRadius: '12px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: 'var(--vapor-typography-fontSize-100)',
            fontWeight: 600,
            color: '#ffffff',
            textDecoration: 'none',
            // '& *': {
            //   color: '#ffffff',
            // },
          }}
        >
          홈 화면 바로가기
        </Button>
      </VStack>
    </Box>
  );
};

export default RegisterCompletePage;
