export interface MockFarmer {
  id: string;
  name: string;
  location: string;
  description: string;
  percent: number;
  totalSellCnt: number;
  profileUrls: string[];
}

export const MOCK_FARMERS: MockFarmer[] = [
  {
    id: '1',
    name: '김순자 할망',
    location: '애월읍',
    description: '감귤 농사 40년, 3대째 농장 운영',
    percent: 92,
    totalSellCnt: 1247,
    profileUrls: ['/mock/인물/1.png', '/mock/인물/2.png', '/mock/인물/3.png'],
  },
  {
    id: '2',
    name: '박영수 삼촌',
    location: '서귀포',
    description: '유기농 인증 농부, 친환경 재배 전문',
    percent: 87,
    totalSellCnt: 892,
    profileUrls: ['/mock/인물/4.png', '/mock/인물/5.png', '/mock/인물/6.png'],
  },
  {
    id: '3',
    name: '이제주 농부',
    location: '구좌읍',
    description: '당근·고사리 복합영농 20년',
    percent: 85,
    totalSellCnt: 634,
    profileUrls: ['/mock/인물/7.jpg', '/mock/인물/8.jpg', '/mock/인물/9.jpg'],
  },
  {
    id: '4',
    name: '오분자기 해녀',
    location: '우도',
    description: '우도 땅콩 재배 15년, 해녀 출신',
    percent: 94,
    totalSellCnt: 1583,
    profileUrls: ['/mock/인물/2.png', '/mock/인물/3.png', '/mock/인물/4.png'],
  },
  {
    id: '5',
    name: '강한라 농부',
    location: '한림읍',
    description: '한라봉·천혜향 명인, GAP 인증',
    percent: 91,
    totalSellCnt: 1105,
    profileUrls: ['/mock/인물/3.png', '/mock/인물/4.png', '/mock/인물/5.png'],
  },
  {
    id: '6',
    name: '홍감귤 할르방',
    location: '남원읍',
    description: '레드향 전문 재배 25년',
    percent: 88,
    totalSellCnt: 743,
    profileUrls: ['/mock/인물/5.png', '/mock/인물/6.png', '/mock/인물/7.jpg'],
  },
  {
    id: '7',
    name: '고순이 할망',
    location: '조천읍',
    description: '고사리 채취·건조 명인',
    percent: 83,
    totalSellCnt: 412,
    profileUrls: ['/mock/인물/6.png', '/mock/인물/7.jpg', '/mock/인물/8.jpg'],
  },
  {
    id: '8',
    name: '양태풍 삼촌',
    location: '성산읍',
    description: '감귤·당근 복합영농, 청년 농부',
    percent: 79,
    totalSellCnt: 298,
    profileUrls: ['/mock/인물/8.jpg', '/mock/인물/9.jpg', '/mock/인물/1.png'],
  },
  {
    id: '9',
    name: '현미자 할망',
    location: '표선면',
    description: '친환경 우도 땅콩 가공 전문',
    percent: 90,
    totalSellCnt: 967,
    profileUrls: ['/mock/인물/9.jpg', '/mock/인물/1.png', '/mock/인물/2.png'],
  },
];
