/** 1. 사진 품종 분석 데이터 */
export interface ClassificationData {
  category: string;
}

/** 2. 음성 분석 및 판매글 생성 데이터 */
export interface SaleTextData {
  title: string;
  final_description: string;
}

/** 3. AI 가격 추천 데이터 */
export interface PriceData {
  product_id: number;
  recommended_price: number;
}

/** 4. 상품 주문 데이터 */
export interface OrderData {
  order_id: number;
  status: string;
}
