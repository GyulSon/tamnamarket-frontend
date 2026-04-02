import Image from 'next/image';
import { Box, VStack, Text } from '@vapor-ui/core';
import { useRouter } from 'next/navigation';

interface ProductGridItemProps {
  imageUrl?: string;
  title?: string;
  location?: string;
  farmerName?: string;
  salePercent?: number;
  price?: number;
  onClick?: () => void;
}

export function ProductGridItem({
  imageUrl = '/images/mock/buyer/product1.png',
  title = '상품명',
  location,
  farmerName,
  salePercent,
  price,
}: ProductGridItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/buyer/products/1');
  };

  return (
    <VStack
      render={<button onClick={handleClick} />}
      $css={{
        gap: '$075',
        width: '100%',
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
          width: '100%',
          aspectRatio: '1 / 1',
          backgroundColor: '$gray-200',
          borderRadius: '$400',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} />
        {salePercent !== undefined && (
          <Box
            $css={{
              position: 'absolute',
              top: '$075',
              left: '$075',
              backgroundColor: 'var(--vapor-color-orange-500)',
              borderRadius: '$150',
              paddingTop: '$025',
              paddingBottom: '$025',
              paddingLeft: '$075',
              paddingRight: '$075',
            }}
          >
            <Text
              typography="body4"
              $css={{ color: '$white', fontWeight: '700' }}
            >
              {salePercent}%
            </Text>
          </Box>
        )}
      </Box>

      {/* 상품 정보 */}
      <VStack $css={{ gap: '$025', width: '100%' }}>
        {location && farmerName && (
          <Text typography="body4" foreground="hint-100">
            {location} · {farmerName}
          </Text>
        )}
        <Text
          typography="body3"
          foreground="normal-200"
          $css={{ fontWeight: '600', textAlign: 'left' }}
        >
          {title}
        </Text>
        {price !== undefined && (
          <Text
            typography="body3"
            foreground="normal-200"
            $css={{ fontWeight: '700' }}
          >
            {price.toLocaleString()}원
          </Text>
        )}
      </VStack>
    </VStack>
  );
}
