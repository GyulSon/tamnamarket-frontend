'use client';

import { useMutation } from '@tanstack/react-query';
import { saleApi } from '../api/sale.api';
import { orderApi } from '../api/order.api';
import type { ApiResponse } from '@/lib/api/types';
import type {
  ClassificationData,
  SaleTextData,
  PriceData,
  OrderData,
} from './types';

export const saleKeys = {
  all: ['sale'] as const,
  classification: () => [...saleKeys.all, 'classification'] as const,
  text: () => [...saleKeys.all, 'text'] as const,
  price: () => [...saleKeys.all, 'price'] as const,
};

export const orderKeys = {
  all: ['order'] as const,
  create: () => [...orderKeys.all, 'create'] as const,
};

/** 1. 사진 품종 분석 */
export const useClassification = () => {
  return useMutation<ApiResponse<ClassificationData>, Error, File>({
    mutationFn: (file) => saleApi.classification(file),
  });
};

/** 2. 음성 분석 및 판매글 생성 */
export const useSaleText = () => {
  return useMutation<
    ApiResponse<SaleTextData>,
    Error,
    { productId: number; voices: File[] }
  >({
    mutationFn: ({ productId, voices }) => saleApi.text(productId, voices),
  });
};

/** 3. AI 가격 추천 */
export const useSalePrice = () => {
  return useMutation<ApiResponse<PriceData>, Error, number>({
    mutationFn: (productId) => saleApi.price(productId),
  });
};

/** 4. 상품 주문 */
export const useCreateOrder = () => {
  return useMutation<
    ApiResponse<OrderData>,
    Error,
    { productId: number; buyerId: number }
  >({
    mutationFn: ({ productId, buyerId }) =>
      orderApi.create(productId, buyerId),
  });
};
