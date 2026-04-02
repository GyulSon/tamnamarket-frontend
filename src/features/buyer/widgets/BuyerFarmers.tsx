'use client';

import { useState } from 'react';
import { Box, VStack, Text, Tabs } from '@vapor-ui/core';
import { AppHeader } from '../../../components/AppHeader';
import { FarmerCard } from '../farmers/components';

type FilterOption = '전체' | '재구매율 높은' | '판매 많은' | '신규 농부';

const MOCK_FARMERS = [
  {
    id: '1',
    name: '김순자 할망',
    location: '애월읍',
    description: '3대째 이어온 감귤 농부. 햇청귤, 한라봉 전문.',
    percent: 87,
    totalSellCnt: 568,
    tags: ['감귤류', '친환경'],
    imageUrl: '/images/mock/buyer/product1.png',
    isSubscribe: true,
  },
  {
    id: '2',
    name: '이제주 농부',
    location: '구좌읍',
    description: '친환경 무농약 재배. 유기농 인증 보유.',
    percent: 63,
    totalSellCnt: 162,
    tags: ['유기농', '당근'],
    imageUrl: '/images/mock/buyer/product2.png',
    isSubscribe: false,
  },
  {
    id: '3',
    name: '박영수 삼촌',
    location: '서귀포',
    description: '당일 수확 당일 배송. 봄동, 양배추 전문.',
    percent: 95,
    totalSellCnt: 22,
    tags: ['봄동', '신선배송'],
    imageUrl: '/images/mock/buyer/product3.png',
    isSubscribe: true,
  },
  {
    id: '4',
    name: '오분자기 해녀',
    location: '구좌읍',
    description: '30년 경력 해녀. 해산물 당일 채취.',
    percent: 78,
    totalSellCnt: 310,
    tags: ['해산물', '해녀'],
    imageUrl: '/images/mock/buyer/product4.png',
    isSubscribe: true,
  },
  {
    id: '5',
    name: '강한라 농부',
    location: '한림읍',
    description: '전복, 성게 전문 어부. 자연산만 취급.',
    percent: 82,
    totalSellCnt: 95,
    tags: ['전복', '자연산'],
    imageUrl: '/images/mock/buyer/product5.png',
    isSubscribe: false,
  },
  {
    id: '6',
    name: '김순자 할망',
    location: '애월읍',
    description: '3대째 이어온 감귤 농부. 햇청귤, 한라봉 전문.',
    percent: 87,
    totalSellCnt: 568,
    tags: ['감귤류', '친환경'],
    imageUrl: '/images/mock/buyer/product1.png',
    isSubscribe: true,
  },
  {
    id: '7',
    name: '이제주 농부',
    location: '구좌읍',
    description: '친환경 무농약 재배. 유기농 인증 보유.',
    percent: 63,
    totalSellCnt: 162,
    tags: ['유기농', '당근'],
    imageUrl: '/images/mock/buyer/product2.png',
    isSubscribe: false,
  },
];

function sortFarmers(farmers: typeof MOCK_FARMERS, filter: FilterOption) {
  if (filter === '재구매율 높은')
    return [...farmers].sort((a, b) => b.percent - a.percent);
  if (filter === '판매 많은')
    return [...farmers].sort((a, b) => b.totalSellCnt - a.totalSellCnt);
  if (filter === '신규 농부')
    return [...farmers].sort((a, b) => a.totalSellCnt - b.totalSellCnt);
  return farmers;
}

export function BuyerFarmers() {
  const [filter, setFilter] = useState<FilterOption>('전체');
  const [activeTab, setActiveTab] = useState('all');

  // 탭에 따라 필터링된 농부 목록
  const filteredByTab =
    activeTab === 'favorites'
      ? MOCK_FARMERS.filter((farmer) => farmer.isSubscribe)
      : MOCK_FARMERS;

  const sorted = sortFarmers(filteredByTab, filter);

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
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <VStack
          $css={{
            paddingBottom: '84px',
            overflow: 'auto',
          }}
        >
          {/* 헤더 */}
          <AppHeader />

          {/* 탭 네비게이션 */}
          <Box
            $css={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              borderBottom: '1px solid $line-50',
            }}
          >
            <Tabs.List
              $css={{
                width: '100%',
                maxWidth: '375px',
                display: 'flex',
                gap: '$000',
                padding: '$000',
              }}
            >
              <Tabs.Button
                value="all"
                $css={{
                  flex: 1,
                  padding: '$150 $000',
                  fontSize: '$200',
                  textAlign: 'center',
                  fontWeight: '600',
                  borderBottom:
                    activeTab === 'all' ? '3px solid $normal-900' : 'none',
                  color: activeTab === 'all' ? '$normal-900' : '$hint-100',
                  transition: 'all 0.2s ease',
                }}
              >
                전체 농부 찾기
              </Tabs.Button>
              <Tabs.Button
                value="favorites"
                $css={{
                  flex: 1,
                  padding: '$150 $000',
                  fontSize: '$200',
                  textAlign: 'center',
                  fontWeight: '600',
                  borderBottomStyle: 'solid',
                  borderBottomColor:
                    activeTab === 'favorites' ? '$basic-blue-100' : 'White',
                  borderBottom: activeTab === 'favorites' ? '3px' : 'none',
                  color: activeTab === 'favorites' ? '$black' : '$hint-100',
                  transition: 'all 0.2s ease',
                }}
              >
                내 단골 농부
              </Tabs.Button>
            </Tabs.List>
          </Box>

          {/* 전체 농부 찾기 탭 */}
          <Tabs.Panel value="all">
            <VStack
              $css={{
                paddingBottom: '$000',
              }}
            >
              {/* 농부 목록 */}
              <VStack
                $css={{
                  gap: '$200',
                  paddingLeft: '$250',
                  paddingRight: '$250',
                }}
              >
                {sorted.map((farmer) => (
                  <FarmerCard key={farmer.id} farmer={farmer} />
                ))}
              </VStack>
            </VStack>
          </Tabs.Panel>

          {/* 내 단골 농부 탭 */}
          <Tabs.Panel value="favorites">
            <VStack
              $css={{
                padding: '$300 $250',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
              }}
            >
              <Text
                typography="heading5"
                foreground="hint-100"
                $css={{ textAlign: 'center' }}
              >
                아직 단골 농부를 찜하지 않았어요
              </Text>
              <Text
                typography="body4"
                foreground="hint-100"
                $css={{ marginTop: '$150', textAlign: 'center' }}
              >
                마음에 드는 농부를 찜하면 여기서 만날 수 있습니다
              </Text>
            </VStack>
          </Tabs.Panel>
        </VStack>
      </Tabs.Root>
    </Box>
  );
}
