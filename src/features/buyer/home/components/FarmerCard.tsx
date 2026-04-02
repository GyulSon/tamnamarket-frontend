import Image from 'next/image';
import { Box, HStack, VStack, Text } from '@vapor-ui/core';

interface FarmerCardProps {
  imageUrl?: string;
  name?: string;
  location?: string;
  description?: string;
  percent?: number;
  totalSellCnt?: number;
  onClick?: () => void;
}

export function FarmerCard({
  imageUrl = '/images/mock/buyer/product5.png',
  name = '농부 이름',
  location,
  description,
  percent,
  totalSellCnt,
  onClick,
}: FarmerCardProps) {
  return (
    <HStack
      render={<button onClick={onClick} />}
      $css={{
        gap: '$150',
        width: '100%',
        background: 'none',
        border: 'none',
        padding: '$000',
        cursor: 'pointer',
        alignItems: 'flex-start',
      }}
    >
      {/* 농부 프로필 이미지 */}
      <Box
        $css={{
          width: '88px',
          height: '88px',
          backgroundColor: '$gray-200',
          borderRadius: '$400',
          overflow: 'hidden',
          flexShrink: '0',
          position: 'relative',
        }}
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>

      {/* 농부 정보 */}
      <VStack $css={{ gap: '$075', flex: '1', alignItems: 'flex-start' }}>
        <Text typography="body2" foreground="normal-200" $css={{ fontWeight: '600' }}>
          {name}
        </Text>
        {location && (
          <Text typography="body4" foreground="hint-100">
            {location}
          </Text>
        )}
        {description && (
          <Text typography="body4" foreground="hint-100">
            {description}
          </Text>
        )}
        {(percent !== undefined || totalSellCnt !== undefined) && (
          <HStack $css={{ gap: '$150', marginTop: '$050' }}>
            {percent !== undefined && (
              <VStack $css={{ gap: '$025', alignItems: 'flex-start' }}>
                <Text typography="body4" foreground="hint-100">재구매율</Text>
                <Text typography="body3" $css={{ fontWeight: '700', color: 'var(--vapor-color-orange-500)' }}>
                  {percent}%
                </Text>
              </VStack>
            )}
            {totalSellCnt !== undefined && (
              <VStack $css={{ gap: '$025', alignItems: 'flex-start' }}>
                <Text typography="body4" foreground="hint-100">누적판매</Text>
                <Text typography="body3" foreground="normal-200" $css={{ fontWeight: '700' }}>
                  {totalSellCnt.toLocaleString()}건
                </Text>
              </VStack>
            )}
          </HStack>
        )}
      </VStack>
    </HStack>
  );
}
