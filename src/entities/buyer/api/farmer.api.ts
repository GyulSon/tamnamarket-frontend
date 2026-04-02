import { BASE_URL } from '@/lib/constants/app';

export const farmerApi = {
  /** 6. 농부 프로필 상세 조회 */
  getDetail: async (sellerId: number) => {
    const res = await fetch(
      `${BASE_URL}/api/farmer/detail?seller_id=${sellerId}`,
    );

    if (!res.ok) throw new Error('농부 프로필 조회에 실패했습니다.');
    return res.json();
  },
};
