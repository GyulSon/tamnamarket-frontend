'use client';

import { BottomNav } from '@/features/buyer/home/components';
import { BuyerHome } from '@/features/buyer/widgets/BuyerHome';
import { BuyerFarmers } from '@/features/buyer/widgets/BuyerFarmers';
import { BuyerProducts } from '@/features/buyer/widgets/BuyerProducts';
import { BuyerMyPage } from '@/features/buyer/widgets/BuyerMyPage';
import { useState } from 'react';
import { BottomNavTab } from '@/features/buyer/widgets/BottomNav';
import SectionContainer from '@/components/SectionContainer';

const SCREENS: Record<BottomNavTab, React.ReactNode> = {
  home: <BuyerHome />,
  farmers: <BuyerFarmers />,
  products: <BuyerProducts />,
  my: <BuyerMyPage />,
};

const BuyerPage = () => {
  const [activeTab, setActiveTab] = useState<BottomNavTab>('home');
  return (
    <SectionContainer>
      {SCREENS[activeTab]}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </SectionContainer>
  );
};

export default BuyerPage;
