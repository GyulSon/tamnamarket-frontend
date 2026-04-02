import { create } from 'zustand';
import type { BottomNavTab } from '@/components/BottomNav';

type Category = '전체' | '감귤류' | '우도 땅콩' | '고사리' | '구좌 당근';

interface BuyerStore {
  activeTab: BottomNavTab;
  setActiveTab: (tab: BottomNavTab) => void;

  category: Category;
  setCategory: (category: Category) => void;
}

export const useBuyerStore = create<BuyerStore>((set) => ({
  activeTab: 'home',
  setActiveTab: (activeTab) => {
    set({ activeTab });
  },

  category: '전체',
  setCategory: (category) => set({ category }),
}));
