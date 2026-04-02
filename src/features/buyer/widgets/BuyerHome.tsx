'use client';

import { Box, IconButton, VStack } from '@vapor-ui/core';
import {
  CategoryList,
  SectionHeader,
  ProductCard,
  FarmerCard,
} from '../home/components';
import Image from 'next/image';
import { HeartIcon } from '@vapor-ui/icons';

const MOCK_PRODUCTS = [
  {
    id: '1',
    title: '애월 햇청귤',
    location: '애월읍',
    name: '김순자 할망',
    salePercent: 17,
    price: 28000,
  },
  {
    id: '2',
    title: '구좌 유기농 당근',
    location: '구좌읍',
    name: '이제주 농부',
    salePercent: 25,
    price: 15000,
  },
  {
    id: '3',
    title: '서귀포 봄동',
    location: '서귀포',
    name: '박영수 삼촌',
    salePercent: 12,
    price: 12000,
  },
];

const MOCK_FARMERS = [
  {
    id: '1',
    name: '김순자 할망',
    location: '애월읍',
    description: '농사 경력 40년',
    percent: 87,
    totalSellCnt: 582,
  },
  {
    id: '2',
    name: '박영수 삼촌',
    location: '서귀포',
    description: '농사 경력 40년',
    percent: 87,
    totalSellCnt: 582,
  },
  {
    id: '3',
    name: '이제주 농부',
    location: '구좌읍',
    description: '농사 경력 40년',
    percent: 87,
    totalSellCnt: 582,
  },
];

export function BuyerHome() {
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
            alt="탐라장터"
            width={335}
            height={190}
          />
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
              <Box
                key={product.id}
                $css={{
                  position: 'relative',
                }}
              >
                <ProductCard
                  title={product.title}
                  location={product.location}
                  name={product.name}
                  salePercent={product.salePercent}
                  price={product.price}
                />
                {/*하트버튼 */}
                <IconButton
                  shape="circle"
                  aria-label="Like"
                  $css={{
                    position: 'absolute',
                    top: '$075',
                    right: '$075',
                    backgroundColor: '$basic-gray-800',
                  }}
                >
                  <HeartIcon />
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
