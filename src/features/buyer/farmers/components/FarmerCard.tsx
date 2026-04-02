'use client';

import { Box, VStack, HStack, Text, Badge, Card } from '@vapor-ui/core';
import { Icon } from '@iconify/react';

export interface FarmerCardProps {
  farmer: {
    id: string;
    name: string;
    location: string;
    description: string;
    percent: number;
    totalSellCnt: number;
    tags: string[];
    imageUrl: string;
    isSubscribe: boolean;
  };
}

export function FarmerCard({ farmer }: FarmerCardProps) {
  return (
    <Card.Root
      $css={{
        display: 'flex',
        gap: '$300',
        padding: '$250',
        borderRadius: '$150',
        backgroundColor: '$canvas-0',
        border: '1px solid $line-50',
      }}
    >
      {/* 이미지 */}
      <Box
        $css={{
          flexShrink: 0,
          width: '80px',
          height: '80px',
          borderRadius: '$100',
          overflow: 'hidden',
          backgroundColor: '$canvas-50',
        }}
      >
        <img
          src={farmer.imageUrl}
          alt={farmer.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* 컨텐츠 */}
      <VStack
        $css={{
          flex: 1,
          gap: '$200',
          justifyContent: 'space-between',
        }}
      >
        {/* 상단: 이름, 경력 */}
        <VStack $css={{ gap: '$150' }}>
          <HStack
            $css={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              typography="body2"
              foreground="normal-200"
              $css={{ fontWeight: '600' }}
            >
              {farmer.name}
            </Text>
            <Icon
              icon="lucide:chevron-right"
              width={20}
              height={20}
              color="var(--vapor-color-gray-500)"
            />
          </HStack>

          <Badge
            size="sm"
            shape="pill"
            colorPalette="hint"
            $css={{
              width: 'fit-content',
              fontSize: '$075',
              padding: '$050 $100',
            }}
          >
            {farmer.tags[0]}
          </Badge>
        </VStack>

        {/* 하단: 재구매율, 판매량 */}
        <HStack
          $css={{
            gap: '$300',
          }}
        >
          <HStack
            $css={{
              gap: '$075',
              alignItems: 'center',
            }}
          >
            <Icon
              icon="lucide:repeat-2"
              width={16}
              height={16}
              color="var(--vapor-color-gray-500)"
            />
            <Text typography="body4" foreground="hint-100">
              재구매율 {farmer.percent}%
            </Text>
          </HStack>

          <HStack
            $css={{
              gap: '$075',
              alignItems: 'center',
            }}
          >
            <Icon
              icon="lucide:package"
              width={16}
              height={16}
              color="var(--vapor-color-gray-500)"
            />
            <Text typography="body4" foreground="hint-100">
              누적판매 {farmer.totalSellCnt}건
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Card.Root>
  );
}
