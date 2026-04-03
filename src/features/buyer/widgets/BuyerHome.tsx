'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, IconButton, VStack } from '@vapor-ui/core';
import { useBuyerStore } from '@/store/buyerStore';
import {
  CategoryList,
  SectionHeader,
  ProductCard,
  FarmerCard,
} from '../home/components';
import Image from 'next/image';
import { HeartIcon } from '@vapor-ui/icons';
import { MOCK_PRODUCTS, MOCK_FARMERS } from '@/mocks';

export function BuyerHome() {
  const router = useRouter();
  const { setActiveTab } = useBuyerStore();
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Box
      $css={{
        backgroundColor: '$basic-white',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        // maxWidth: '375px',
        paddingTop: '$150',
        // marginLeft: 'auto',
        // marginRight: 'auto',
        position: 'relative',
      }}
    >
      {/* 스크롤 영역 */}
      <VStack
        $css={{
          flex: 1,
          overflow: 'auto',
        }}
      >
        {/* 히어로 배너 */}
        <Box
          $css={{
            paddingTop: '$150',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* <HeroBanner /> */}
          <Image
            src="/images/main_banner.png"
            alt="메인배너"
            width={335}
            height={190}
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
        <div
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#d6d6d6',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '6px',
              padding: '0 16px',
              justifyContent: 'center',
            }}
          >
            {[0, 1, 2].map((_, index) => (
              <div
                key={index}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: index === 0 ? '#FFFFFF' : '#C6C6C6',
                  transition: 'background-color 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* 카테고리 */}
        <CategoryList />

        {/* 섹션 구분선 */}
        <Box
          $css={{
            height: '8px',
            backgroundColor: '$canvas-200',
            marginTop: '$250',
          }}
        />

        {/* 신상품 섹션 */}
        <VStack
          $css={{
            gap: '$250',
            paddingTop: '$250',
          }}
        >
          <SectionHeader
            title="방금 수확했어요!"
            subtitle="신선한 제주 산지 직송 신상품이에요"
            onMoreClick={() => setActiveTab('products')}
          />
          <Box $css={{ display: 'flex', gap: '$150', overflowX: 'auto' }}>
            {MOCK_PRODUCTS.map((product) => (
              <Box
                key={product.id}
                onClick={() => router.push(`/buyer/products/${product.id}`)}
                $css={{
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <ProductCard
                  title={product.title}
                  location={product.location}
                  name={product.farmerName}
                  salePercent={product.salePercent}
                  price={product.price}
                />
                {/*하트버튼 */}
                <IconButton
                  shape="circle"
                  aria-label="Like"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    toggleLike(product.id);
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
                      color: likedProducts.has(product.id) ? '#FF761B' : undefined,
                      fill: likedProducts.has(product.id) ? '#FF761B' : undefined,
                    }}
                  />
                </IconButton>
              </Box>
            ))}
          </Box>
        </VStack>

        {/* 섹션 구분선 */}
        <Box
          $css={{
            height: '8px',
            backgroundColor: '$canvas-200',
            marginTop: '$250',
          }}
        />

        {/* 인기 농부 섹션 */}
        <VStack
          $css={{
            gap: '$250',
            paddingTop: '$250',
          }}
        >
          <SectionHeader
            title="동네 인기 농부들"
            subtitle="단골이 많은 농부님들을 만나보세요"
            onMoreClick={() => setActiveTab('farmers')}
          />
          <VStack $css={{ gap: '$200' }}>
            {MOCK_FARMERS.map((farmer) => (
              <FarmerCard
                key={farmer.id}
                name={farmer.name}
                location={farmer.location}
                description={farmer.description}
                percent={farmer.percent}
                totalSellCnt={farmer.totalSellCnt}
              />
            ))}
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
}
