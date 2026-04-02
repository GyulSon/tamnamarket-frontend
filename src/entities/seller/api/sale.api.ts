import { BASE_URL } from '@/lib/constants/app';

export const saleApi = {
  /** 1. 사진 품종 분석 */
  classification: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${BASE_URL}/api/sale/classification`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('품종 분석에 실패했습니다.');
    return res.json();
  },

  /** 2. 음성 분석 및 판매글 생성 */
  text: async (productId: number, voices: File[]) => {
    const formData = new FormData();
    formData.append('product_id', String(productId));
    voices.forEach((voice) => formData.append('voices', voice));

    const res = await fetch(`${BASE_URL}/api/sale/text`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('음성 분석에 실패했습니다.');
    return res.json();
  },

  /** 3. AI 가격 추천 */
  price: async (productId: number) => {
    const res = await fetch(`${BASE_URL}/api/sale/price`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId }),
    });

    if (!res.ok) throw new Error('가격 추천에 실패했습니다.');
    return res.json();
  },
};
