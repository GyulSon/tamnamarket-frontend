'use client';

import { BuyerHome } from '@/features/buyer/widgets/BuyerHome';
import { BuyerFarmers } from '@/features/buyer/widgets/BuyerFarmers';
import { BuyerProducts } from '@/features/buyer/widgets/BuyerProducts';
import { BuyerMyPage } from '@/features/buyer/widgets/BuyerMyPage';
import { useState } from 'react';
import { BottomNav, BottomNavTab } from '@/components/BottomNav';
import SectionContainer from '@/components/SectionContainer';
import { AppHeader } from '@/components/AppHeader';
import { VStack } from '@vapor-ui/core';

const SCREENS: Record<BottomNavTab, React.ReactNode> = {
  home: <BuyerHome />,
  farmers: <BuyerFarmers />,
  products: <BuyerProducts />,
  my: <BuyerMyPage />,
};

const BuyerPage = () => {
  const [activeTab, setActiveTab] = useState<BottomNavTab>('home');
  return (
    <div style={{ position: 'relative' }}>
      <SectionContainer pb={false}>
        <VStack $css={{ paddingBottom: '84px' }}>
          <AppHeader />
          {SCREENS[activeTab]}
        </VStack>
      </SectionContainer>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default BuyerPage;
