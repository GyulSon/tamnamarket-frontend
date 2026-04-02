'use client';

import { useQuery } from '@tanstack/react-query';
import { mainscreenApi } from '../api/mainscreen.api';
import { farmerApi } from '../api/farmer.api';
import type { ApiResponse } from '@/lib/api/types';
import type { MainscreenProduct, FarmerDetail } from './types';

export const mainscreenKeys = {
  all: ['mainscreen'] as const,
  content: (buyerId: number) =>
    [...mainscreenKeys.all, 'content', buyerId] as const,
};

export const farmerKeys = {
  all: ['farmer'] as const,
  detail: (sellerId: number) =>
    [...farmerKeys.all, 'detail', sellerId] as const,
};

/** 5. 메인 화면 목록 조회 */
export const useMainscreenContent = (buyerId: number) => {
  return useQuery<ApiResponse<MainscreenProduct[]>>({
    queryKey: mainscreenKeys.content(buyerId),
    queryFn: () => mainscreenApi.getContent(buyerId),
  });
};

/** 6. 농부 프로필 상세 조회 */
export const useFarmerDetail = (sellerId: number) => {
  return useQuery<ApiResponse<FarmerDetail>>({
    queryKey: farmerKeys.detail(sellerId),
    queryFn: () => farmerApi.getDetail(sellerId),
  });
};
