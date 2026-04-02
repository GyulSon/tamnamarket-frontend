import Image from 'next/image';
import { Box, VStack, Text } from '@vapor-ui/core';

interface ProductCardProps {
  imageUrl?: string;
  title?: string;
  location?: string;
  name?: string;
  salePercent?: number;
  price?: number;
  onClick?: () => void;
}

export function ProductCard({
  imageUrl = '/images/mock/buyer/product1.png',
  title = '상품명',
  location,
  name,
  salePercent,
  price,
  onClick,
}: ProductCardProps) {
  return (
    <VStack
      render={<button onClick={onClick} />}
      $css={{
        gap: '$075',
        width: '128px',
        background: 'none',
        border: 'none',
        padding: '$000',
        cursor: 'pointer',
        alignItems: 'flex-start',
      }}
    >
      {/* 상품 이미지 */}
      <Box
        $css={{
          width: '128px',
          height: '128px',
          backgroundColor: '$gray-200',
          borderRadius: '$400',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>

      {/* 상품 정보 */}
      <VStack $css={{ gap: '$050', width: '100%' }}>
        {location && (
          <Text typography="body4" foreground="hint-100">
            {location} · {name}
          </Text>
        )}
        <Text typography="body3" foreground="normal-200" $css={{ fontWeight: '600' }}>
          {title}
        </Text>
        {price !== undefined && (
          <VStack $css={{ gap: '$025' }}>
            {salePercent !== undefined && (
              <Text typography="body4" $css={{ color: 'var(--vapor-color-orange-500)', fontWeight: '700' }}>
                {salePercent}%
              </Text>
            )}
            <Text typography="body3" foreground="normal-200" $css={{ fontWeight: '700' }}>
              {price.toLocaleString()}원
            </Text>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
}
