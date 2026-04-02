import { BASE_URL } from '@/lib/constants/app';

export const mainscreenApi = {
  /** 5. 메인 화면 목록 조회 */
  getContent: async (buyerId: number) => {
    const res = await fetch(
      `${BASE_URL}/api/mainscreen/content?buyer_id=${buyerId}`,
    );

    if (!res.ok) throw new Error('메인 화면 조회에 실패했습니다.');
    return res.json();
  },
};
