'use client';

import { useState } from 'react';
import { Box, VStack, Text, Tabs } from '@vapor-ui/core';
import { FarmerCard } from '@/features/buyer/home/components';
import { MOCK_FARMERS } from '@/mocks';

export function BuyerFarmers() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <Box
      $css={{
        backgroundColor: '$canvas-100',
        minHeight: '100dvh',
        paddingTop: '$150',
        position: 'relative',
      }}
    >
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <VStack
          $css={{
            overflow: 'auto',
          }}
        >
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
                display: 'flex',
                gap: '$000',
                padding: '$000',
              }}
              indicatorElement={
                <Tabs.IndicatorPrimitive
                  style={{
                    height: '2px',
                    borderRadius: '2px',
                    backgroundColor: '#000000',
                  }}
                />
              }
            >
              <Tabs.Button
                value="all"
                $css={{
                  flex: 1,
                  padding: '$150 $000',
                  fontSize: '$200',
                  textAlign: 'center',
                  fontWeight: '600',
                  height: '46px',
                  borderBottom:
                    activeTab === 'all' ? '3px solid $normal-900' : 'none',
                  color: activeTab === 'all' ? '$normal-900' : '$hint-100',
                  transition: 'all 0.2s ease',
                }}
              >
                {activeTab === 'all' ? (
                  <Text $css={{ fontWeight: '800' }}>전체 농부 찾기</Text>
                ) : (
                  <Text $css={{ fontWeight: '400' }}>전체 농부 찾기</Text>
                )}
              </Tabs.Button>
              <Tabs.Button
                value="favorites"
                $css={{
                  flex: 1,
                  padding: '$150 $000',
                  fontSize: '$200',
                  textAlign: 'center',
                  height: '46px',
                  fontWeight: '600',
                  borderBottom:
                    activeTab === 'favorites'
                      ? '3px solid $normal-900'
                      : 'none',
                  color:
                    activeTab === 'favorites' ? '$normal-900' : '$hint-100',
                  transition: 'all 0.2s ease',
                }}
              >
                {activeTab === 'favorites' ? (
                  <Text $css={{ fontWeight: '800' }}>내 단골 농부</Text>
                ) : (
                  <Text $css={{ fontWeight: '400' }}>내 단골 농부</Text>
                )}
              </Tabs.Button>
            </Tabs.List>
          </Box>

          <Box
            $css={{
              marginTop: '$250',
            }}
          />

          {/* 전체 농부 찾기 탭 */}
          <Tabs.Panel value="all">
            <VStack $css={{ gap: '$200' }}>
              {MOCK_FARMERS.map((farmer) => (
                <FarmerCard
                  key={farmer.id}
                  imageUrl={farmer.profileUrls[0]}
                  name={farmer.name}
                  location={farmer.location}
                  description={farmer.description}
                  percent={farmer.percent}
                  totalSellCnt={farmer.totalSellCnt}
                />
              ))}
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
