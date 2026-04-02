'use client';

import { VStack } from '@vapor-ui/core';
import Image from 'next/image';

interface BuyerCompletedProps {
  storeName?: string;
  price?: number;
  onConfirm?: () => void;
}

export default function BuyerCompleted({
  storeName = '한국전력공사',
  price = 25000,
  onConfirm,
}: BuyerCompletedProps) {
  return (
    <VStack
      $css={{
        width: '100%',
        minHeight: '100dvh',
        maxWidth: '375px',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 배경 이미지 */}
      <Image
        onClick={onConfirm}
        src="/images/onboarding/completed.png"
        alt="배경"
        fill
        style={{ objectFit: 'cover', zIndex: 0 }}
      />
    </VStack>
  );
}
