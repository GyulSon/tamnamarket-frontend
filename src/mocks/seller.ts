type SaleClassificationMockResponse = {
  productId: number;
  result: string;
};

type SaleDraftMockResponse = {
  audioUrl?: string;
  categoryLabel: string;
  description: string;
  priceReason: string;
  recommendedPrice: number;
  sellerMessage: string;
  title: string;
};

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const saleClassificationMockResponse: SaleClassificationMockResponse = {
  productId: 1001,
  result: '감귤',
};

const saleDraftMockResponses: Record<number, SaleDraftMockResponse> = {
  1001: {
    categoryLabel: '감귤',
    title: '제주 햇감귤 2kg 한 박스',
    recommendedPrice: 28000,
    priceReason: '최근 제주 감귤 시세와 특품 기준 가격을 반영했어요.',
    description:
      '애월읍에서 아침에 바로 수확한 제주 햇감귤입니다. 껍질이 얇고 과즙이 풍부해서 생과로 먹기 좋고, 새콤달콤한 맛이 균형 있게 올라와 있어요.',
    sellerMessage:
      '오늘 수확한 감귤이라 더 신선해요. 상큼하고 달아서 가족끼리 드시기 좋아요!',
  },
};

export const getMockSaleClassificationResponse = async () => {
  await wait(1200);

  return saleClassificationMockResponse;
};

export const getMockSaleDraftResponse = async (productId: number) => {
  await wait(1500);

  return (
    saleDraftMockResponses[productId] ??
    saleDraftMockResponses[saleClassificationMockResponse.productId]
  );
};
