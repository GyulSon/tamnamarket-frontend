/** 5. 메인 화면 상품 데이터 */
export interface MainscreenProduct {
  product_id: number;
  title: string;
  price: number;
  seller_name: string;
  image_url: string;
}

/** 6. 농부 프로필 데이터 */
export interface FarmerDetail {
  seller_id: number;
  name: string;
  profile_img: string;
  intro: string;
}
