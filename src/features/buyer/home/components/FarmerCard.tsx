import Image from 'next/image';
import { Box, HStack, VStack, Text } from '@vapor-ui/core';
import {
  ChevronRightOutlineIcon,
  SignalPowerOutlineIcon,
  CheckCartOutlineIcon,
} from '@vapor-ui/icons';

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
        <Image src={imageUrl} alt={name} fill style={{ objectFit: 'cover' }} />
      </Box>

      {/* 농부 정보 */}
      <VStack $css={{ gap: '$200', flex: '1', alignItems: 'flex-start' }}>
        {/* 농부 이름 + 화살표 */}
        <HStack
          $css={{
            gap: '$100',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Text typography="body1" $css={{ fontWeight: '800' }}>
            {name}
          </Text>
          <ChevronRightOutlineIcon
            width="24"
            height="24"
            style={{ color: '#000' }}
          />
        </HStack>

        {/* 위치 + 설명 (뱃지) */}
        <HStack $css={{ gap: '$050', alignItems: 'center', flexWrap: 'wrap' }}>
          <HStack
            $css={{
              gap: '$050',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {location && (
              <Box
                $css={{
                  backgroundColor: '$basic-grape-050',
                  borderRadius: '$200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text typography="body4" $css={{ color: '#4C4C4C' }}>
                  {location}
                </Text>
              </Box>
            )}
            {description && (
              <Text
                typography="body4"
                $css={{ color: '#4C4C4C', fontWeight: '500' }}
              >
                {description}
              </Text>
            )}
          </HStack>
        </HStack>

        {/* 재구매율 + 누적판매 */}
        <HStack $css={{ gap: '$300', alignItems: 'center' }}>
          {percent !== undefined && (
            <HStack $css={{ gap: '$075', alignItems: 'center' }}>
              <SignalPowerOutlineIcon
                width="16"
                height="16"
                style={{ color: '#4C4C4C' }}
              />
              <Text
                typography="body4"
                $css={{ color: '#000', fontWeight: '600' }}
              >
                재구매율
              </Text>
              <Text
                typography="body4"
                $css={{ color: '#FF761B', fontWeight: '600' }}
              >
                {percent}%
              </Text>
            </HStack>
          )}
          {totalSellCnt !== undefined && (
            <HStack $css={{ gap: '$075', alignItems: 'center' }}>
              <CheckCartOutlineIcon
                width="16"
                height="16"
                style={{ color: '#4C4C4C' }}
              />
              <Text
                typography="body4"
                $css={{ color: '#000', fontWeight: '600' }}
              >
                누적판매
              </Text>
              <Text
                typography="body4"
                $css={{ color: '#FF761B', fontWeight: '600' }}
              >
                {totalSellCnt.toLocaleString()}건
              </Text>
            </HStack>
          )}
        </HStack>
      </VStack>
    </HStack>
  );
}
