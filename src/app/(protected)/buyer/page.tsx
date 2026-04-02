'use client';

import { BuyerHome } from '@/features/buyer/widgets/BuyerHome';
import { BuyerFarmers } from '@/features/buyer/widgets/BuyerFarmers';
import { BuyerProducts } from '@/features/buyer/widgets/BuyerProducts';
import { BuyerMyPage } from '@/features/buyer/widgets/BuyerMyPage';
import { useEffect, useRef } from 'react';
import { BottomNav, type BottomNavTab } from '@/components/BottomNav';
import { useBuyerStore } from '@/store/buyerStore';
import SectionContainer from '@/components/SectionContainer';
import { AppHeader } from '@/components/AppHeader';
import { Box } from '@vapor-ui/core';

const SCREENS: Record<BottomNavTab, React.ReactNode> = {
  home: <BuyerHome />,
  farmers: <BuyerFarmers />,
  products: <BuyerProducts />,
  my: <BuyerMyPage />,
};

const BuyerPage = () => {
  const { activeTab, setActiveTab } = useBuyerStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [activeTab]);
  return (
    <Box
      $css={{
        position: 'relative',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box
        $css={{
          flex: 0,
          overflow: 'visible',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <AppHeader />
      </Box>
      <Box
        ref={scrollRef}
        $css={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingBottom: '80px',
        }}
      >
        <SectionContainer $css={{ marginBottom: 0 }} pt={false}>
          {SCREENS[activeTab]}
        </SectionContainer>
      </Box>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </Box>
  );
};

export default BuyerPage;
