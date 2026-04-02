'use client';

import { useState } from 'react';
import { Box, VStack } from '@vapor-ui/core';
import { AppHeader } from '../../../components/AppHeader';
import {
  ProductSearchBar,
  ProductCategoryChips,
  ProductSortBar,
  ProductGridItem,
} from '../products/components';

type Category = '전체' | '감귤류' | '채소' | '해산물' | '과일' | '곡물';
type SortOption = '최신순' | '인기순' | '낮은가격순' | '높은가격순';

const MOCK_PRODUCTS = [
  {
    id: '1',
    title: '애월 햇청귤',
    location: '애월읍',
    farmerName: '김순자 할망',
    salePercent: 17,
    price: 28000,
    category: '감귤류',
    imageUrl: '/images/mock/buyer/product1.png',
  },
  {
    id: '2',
    title: '구좌 유기농 당근',
    location: '구좌읍',
    farmerName: '이제주 농부',
    salePercent: 25,
    price: 15000,
    category: '채소',
    imageUrl: '/images/mock/buyer/product2.png',
  },
  {
    id: '3',
    title: '서귀포 봄동',
    location: '서귀포',
    farmerName: '박영수 삼촌',
    salePercent: 12,
    price: 12000,
    category: '채소',
    imageUrl: '/images/mock/buyer/product3.png',
  },
  {
    id: '4',
    title: '구좌 자연산 전복',
    location: '구좌읍',
    farmerName: '오분자기 해녀',
    salePercent: 0,
    price: 45000,
    category: '해산물',
    imageUrl: '/images/mock/buyer/product4.png',
  },
  {
    id: '5',
    title: '한림 신선 한라봉',
    location: '한림읍',
    farmerName: '강한라 농부',
    salePercent: 10,
    price: 22000,
    category: '감귤류',
    imageUrl: '/images/mock/buyer/product5.png',
  },
  {
    id: '6',
    title: '제주 흑돼지 감자',
    location: '조천읍',
    farmerName: '홍길동 농부',
    salePercent: 5,
    price: 8000,
    category: '채소',
    imageUrl: '/images/mock/buyer/product6.png',
  },
];

function filterAndSort(
  products: typeof MOCK_PRODUCTS,
  category: Category,
  sort: SortOption
) {
  const result =
    category === '전체'
      ? products
      : products.filter((p) => p.category === category);
  if (sort === '낮은가격순')
    return [...result].sort((a, b) => a.price - b.price);
  if (sort === '높은가격순')
    return [...result].sort((a, b) => b.price - a.price);
  if (sort === '인기순')
    return [...result].sort((a, b) => b.salePercent - a.salePercent);
  return result;
}

export function BuyerProducts() {
  const [category, setCategory] = useState<Category>('전체');
  const [sort, setSort] = useState<SortOption>('최신순');

  const filtered = filterAndSort(MOCK_PRODUCTS, category, sort);

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
      <VStack $css={{ paddingBottom: '84px', overflow: 'auto' }}>
        <AppHeader />
        <ProductSearchBar />
        <ProductCategoryChips selected={category} onChange={setCategory} />
        <ProductSortBar
          total={filtered.length}
          selected={sort}
          onChange={setSort}
        />
        <Box
          $css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '$200',
            paddingLeft: '$250',
            paddingRight: '$250',
            paddingTop: '$100',
          }}
        >
          {filtered.map((product) => (
            <ProductGridItem
              key={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              location={product.location}
              farmerName={product.farmerName}
              salePercent={
                product.salePercent > 0 ? product.salePercent : undefined
              }
              price={product.price}
            />
          ))}
        </Box>
      </VStack>
    </Box>
  );
}
