import Link from 'next/link';

import { Badge, Box, HStack, Text, VStack } from '@vapor-ui/core';
import { ChevronRightOutlineIcon } from '@vapor-ui/icons';

export interface SellerProductCardProps {
  id: string;
  title: string;
  createdAt: string;
  salePercent: number;
  price: number;
  href?: string;
}

export function SellerProductCard({
  id,
  title,
  createdAt,
  salePercent,
  price,
  href = '/seller/list',
}: SellerProductCardProps) {
  return (
    <HStack
      key={id}
      render={<Link href={href} />}
      $css={{
        width: '100%',
        gap: '$150',
        alignItems: 'center',
        textDecoration: 'none',
      }}
    >
      <Box
        $css={{
          width: '88px',
          height: '88px',
          flexShrink: 0,
          borderRadius: '$400',
          border: '1px solid var(--vapor-color-gray-200)',
          backgroundColor: '#D9D9D9',
        }}
      />

      <VStack
        $css={{
          flex: 1,
          minWidth: 0,
          gap: '$100',
        }}
      >
        <VStack $css={{ gap: '$025', width: '100%' }}>
          <HStack
            $css={{
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '$100',
              width: '100%',
            }}
          >
            <Text
              typography="heading5"
              $css={{
                fontWeight: '700',
                color: '$black',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </Text>
            <ChevronRightOutlineIcon
              width={24}
              height={24}
              style={{ color: 'var(--vapor-color-black)' }}
            />
          </HStack>

          <HStack $css={{ alignItems: 'center', gap: '$075' }}>
            <Badge
              size="sm"
              shape="pill"
              colorPalette="hint"
              $css={{
                height: '20px',
                paddingLeft: '$075',
                paddingRight: '$075',
                borderRadius: '$300',
                backgroundColor: '$gray-050',
              }}
            >
              <Text typography="subtitle2" $css={{ color: '$gray-700' }}>
                등록일
              </Text>
            </Badge>
            <Text typography="subtitle2" $css={{ color: '$gray-500' }}>
              {createdAt}
            </Text>
          </HStack>
        </VStack>

        <HStack $css={{ alignItems: 'center', gap: '$050' }}>
          <Text
            typography="heading6"
            $css={{
              fontWeight: '500',
              color: 'var(--vapor-color-orange-500)',
            }}
          >
            {salePercent}%
          </Text>
          <Text typography="heading6" $css={{ fontWeight: '500', color: '$black' }}>
            {price.toLocaleString()}원
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
