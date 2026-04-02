import { useState } from 'react';
import Image from 'next/image';
import { Box, VStack, Text, IconButton } from '@vapor-ui/core';
import { useRouter } from 'next/navigation';
import { HeartIcon } from '@vapor-ui/icons';

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
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    router.push('/buyer/products/1');
  };

  return (
    <VStack
      onClick={handleClick}
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
        <IconButton
          shape="circle"
          aria-label="Like"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            setLiked((prev) => !prev);
          }}
          $css={{
            position: 'absolute',
            top: '$075',
            right: '$075',
            backgroundColor: '$basic-gray-800',
          }}
        >
          <HeartIcon
            style={{
              color: liked ? '#FF761B' : undefined,
              fill: liked ? '#FF761B' : undefined,
            }}
          />
        </IconButton>
      </Box>

      {/* 상품 정보 */}
      <VStack $css={{ gap: '$025', width: '100%' }}>
        {location && farmerName && (
          <Text
            typography="heading5"
            $css={{ fontWeight: '700', color: '#000' }}
          >
            {title}
          </Text>
        )}
        <Box
          $css={{
            gap: '$025',
            display: 'flex',
            alignContent: 'center',
          }}
        >
          <Text
            typography="subtitle2"
            foreground="normal-200"
            $css={{
              fontWeight: '500',
              textAlign: 'left',
              color: '#4C4C4C',
              backgroundColor: '#F2F2F2',
              padding: '$025',
              borderRadius: '$200',
            }}
          >
            {location}
          </Text>
          <Text
            typography="subtitle2"
            foreground="normal-200"
            $css={{
              fontWeight: '500',
              textAlign: 'center',
              color: '#767676',
              padding: '$025',
            }}
          >
            {farmerName}
          </Text>
        </Box>
        {price !== undefined && (
          <Text
            typography="heading6"
            foreground="normal-200"
            $css={{ fontWeight: '500' }}
          >
            <Text
              typography="heading6"
              $css={{ color: '#FF761B', fontWeight: '500' }}
            >
              {salePercent}%
            </Text>{' '}
            {price.toLocaleString()}원
          </Text>
        )}
      </VStack>
    </VStack>
  );
}
