/** 1. 사진 품종 분석 데이터 */
export interface ClassificationData {
  category: string;
}

/** 2. 음성 분석 및 판매글 생성 데이터 */
export interface SaleTextData {
  title: string;
  description: string;
  audio_url: string;
}

/** 3. AI 가격 추천 데이터 */
export interface PriceData {
  recommended_price: number;
  reason: string;
}

/** 4. 상품 주문 데이터 */
export interface OrderData {
  order_id: number;
  status: string;
}
