'use client';

import { Box, VStack } from '@vapor-ui/core';
import {
  AppHeader,
  HeroBanner,
  CategoryList,
  SectionHeader,
  ProductCard,
  FarmerCard,
} from '../home/components';

const MOCK_PRODUCTS = [
  { id: '1', title: '애월 햇청귤', location: '애월읍', name: '김순자 할망', salePercent: 17, price: 28000 },
  { id: '2', title: '구좌 유기농 당근', location: '구좌읍', name: '이제주 농부', salePercent: 25, price: 15000 },
  { id: '3', title: '서귀포 봄동', location: '서귀포', name: '박영수 삼촌', salePercent: 12, price: 12000 },
];

const MOCK_FARMERS = [
  {
    id: '1',
    name: '김순자 할망',
    location: '애월읍',
    description: '3대째 이어온 감귤 농부',
    percent: 87,
    totalSellCnt: 568,
  },
  {
    id: '2',
    name: '이제주 농부',
    location: '구좌읍',
    description: '친환경 무농약 재배',
    percent: 63,
    totalSellCnt: 162,
  },
  {
    id: '3',
    name: '박영수 삼촌',
    location: '서귀포',
    description: '당일 수확 당일 배송',
    percent: 95,
    totalSellCnt: 22,
  },
];

export function BuyerHome() {
  return (
    <Box
      $css={{
        backgroundColor: '$canvas-100',
        minHeight: '100dvh',
        maxWidth: '375px',
        paddingTop: '$150',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
      }}
    >
      {/* 스크롤 영역 */}
      <VStack
        $css={{
          paddingBottom: '84px', // BottomNav 높이만큼 여백
          overflow: 'auto',
        }}
      >
        {/* 히어로 배너 */}
        <Box $css={{ paddingTop: '$150' }}>
          <HeroBanner />
        </Box>

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
            paddingLeft: '$250',
            paddingRight: '$250',
            paddingTop: '$250',
          }}
        >
          <SectionHeader
            title="방금 수확했어요!"
            subtitle="신선한 제주 산지 직송 신상품이에요"
            onMoreClick={() => {}}
          />
          <Box $css={{ display: 'flex', gap: '$150', overflowX: 'auto' }}>
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                location={product.location}
                name={product.name}
                salePercent={product.salePercent}
                price={product.price}
              />
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
            paddingLeft: '$250',
            paddingRight: '$250',
            paddingTop: '$250',
            paddingBottom: '$250',
          }}
        >
          <SectionHeader
            title="동네 인기 농부들"
            subtitle="단골이 많은 농부님들을 만나보세요"
            onMoreClick={() => {}}
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
