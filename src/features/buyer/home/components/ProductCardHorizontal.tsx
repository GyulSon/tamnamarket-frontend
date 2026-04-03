import Image from 'next/image';
import { Box, VStack, Text, HStack } from '@vapor-ui/core';

interface ProductCardProps {
  imageUrl?: string;
  title?: string;
  regesterDate: string;
  salePercent?: number;
  price?: number;
  onClick?: () => void;
}

export function ProductCardHorizontal({
  imageUrl = '/images/mock/buyer/product1.png',
  title = '상품명',
  regesterDate,
  salePercent,
  price,
  onClick,
}: ProductCardProps) {
  return (
    <HStack
      render={<button onClick={onClick} />}
      $css={{
        gap: '$075',
        height: '128px',
        background: 'none',
        border: 'none',
        padding: '$000',
        cursor: 'pointer',
      }}
    >
      {/* 상품 이미지 */}
      <Box
        $css={{
          width: '128px',
          height: '128px',
          flexShrink: 0,
          backgroundColor: '$gray-200',
          borderRadius: '$400',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} />
      </Box>

      {/* 상품 정보 */}
      <VStack
        $css={{
          gap: '$050',
          width: '100%',
          justifyContent: 'space-between',
          padding: '$150',
        }}
      >
        <Text
          typography="heading5"
          foreground="normal-200"
          $css={{ fontWeight: '700', textAlign: 'left' }}
        >
          {title}
        </Text>
        {regesterDate && (
          <Text
            typography="body4"
            foreground="hint-100"
            $css={{ textAlign: 'left' }}
          >
            등록일 {regesterDate}
          </Text>
        )}

        {price !== undefined && (
          <HStack $css={{ gap: '$100' }}>
            {salePercent !== undefined && (
              <Text
                typography="heading6"
                $css={{
                  color: 'var(--vapor-color-orange-500)',
                  fontWeight: '500',
                }}
              >
                {salePercent}%
              </Text>
            )}
            <Text
              typography="heading6"
              foreground="normal-200"
              $css={{ fontWeight: '500' }}
            >
              {price.toLocaleString()}원
            </Text>
          </HStack>
        )}
      </VStack>
    </HStack>
  );
}
