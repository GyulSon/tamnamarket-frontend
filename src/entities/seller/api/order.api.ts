import { BASE_URL } from '@/lib/constants/app';

export const orderApi = {
  /** 4. 상품 주문 및 구매 */
  create: async (productId: number, buyerId: number) => {
    const res = await fetch(`${BASE_URL}/api/order/product`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, buyer_id: buyerId }),
    });

    if (!res.ok) throw new Error('주문에 실패했습니다.');
    return res.json();
  },
};
