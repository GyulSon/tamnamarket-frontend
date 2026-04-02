// 'use client';

import Link from 'next/link';

import { Box, Card, HStack, Text, VStack } from '@vapor-ui/core';

const MainPage = () => {
  return (
    <VStack
      render={<main />}
      $css={{
        minHeight: '100vh',
        padding: '$400',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card.Root
        $css={{
          width: '100%',
          maxWidth: '480px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--border)',
          backgroundColor: 'var(--card)',
        }}
      >
        <Card.Header>
          <VStack $css={{ gap: '$100' }}>
            <HStack
              $css={{
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '$200',
              }}
            >
              <VStack $css={{ gap: '$050' }}>
                <Text render={<h1 />} typography="heading5">
                  메인페이지
                </Text>
                <Text
                  typography="body2"
                  $css={{ color: 'var(--muted-foreground)' }}
                >
                  더미 텍스트 더미 텍스트 더미 텍스트
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </Card.Header>
        <Card.Body>
          <VStack
            render={<nav aria-label="메인 메뉴" />}
            $css={{ gap: '$100' }}
          >
            <Box
              render={<Link href="/seller" />}
              $css={{
                display: 'block',
                padding: '$150',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'var(--border)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Text typography="body2">판매자페이지 이동</Text>
            </Box>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
};

export default MainPage;
