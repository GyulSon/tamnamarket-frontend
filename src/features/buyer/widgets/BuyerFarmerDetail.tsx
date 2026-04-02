import { VStack, Box } from '@vapor-ui/core';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { ImageCarousel } from '../productDetail/components/ImageCarousel';
import { ProductActions } from '../productDetail/components/ProductActions';
import { FarmerCard, ProductCard } from '@/features/buyer/home/components';
import { ProductCardHorizontal } from '@/features/buyer/home/components/ProductCardHorizontal';

const mockProduct = {
  id: '1',
  farmer: {
    id: '3',
    name: '이제주 농부',
    location: '구좌읍',
    description: '농사 경력 40년',
    percent: 87,
    totalSellCnt: 582,
    profileUrls: [
      '/images/mock/buyer/product1.png',
      '/images/mock/buyer/product2.png',
      '/images/mock/buyer/product3.png',
      '/images/mock/buyer/product4.png',
    ],
  },
  products: [
    {
      id: '1',
      title: '애월 햇청귤',
      location: '애월읍',
      farmerName: '김순자 할망',
      salePercent: 17,
      price: 28000,
      category: '감귤류',
      regesterDate: '2023-01-01',
      imageUrl: '/images/mock/buyer/product1.png',
    },
    {
      id: '2',
      title: '구좌 유기농 당근',
      location: '구좌읍',
      farmerName: '이제주 농부',
      salePercent: 25,
      price: 15000,
      category: '채소',
      regesterDate: '2023-01-01',
      imageUrl: '/images/mock/buyer/product2.png',
    },
    {
      id: '3',
      title: '서귀포 봄동',
      location: '서귀포',
      farmerName: '박영수 삼촌',
      salePercent: 12,
      price: 12000,
      category: '채소',
      regesterDate: '2023-01-01',
      imageUrl: '/images/mock/buyer/product3.png',
    },
    {
      id: '4',
      title: '구좌 자연산 전복',
      location: '구좌읍',
      farmerName: '오분자기 해녀',
      salePercent: 0,
      price: 45000,
      category: '해산물',
      regesterDate: '2023-01-01',
      imageUrl: '/images/mock/buyer/product4.png',
    },
    {
      id: '5',
      title: '한림 신선 한라봉',
      location: '한림읍',
      farmerName: '강한라 농부',
      salePercent: 10,
      price: 22000,
      category: '감귤류',
      regesterDate: '2023-01-01',
      imageUrl: '/images/mock/buyer/product5.png',
    },
    {
      id: '6',
      title: '제주 흑돼지 감자',
      location: '조천읍',
      farmerName: '홍길동 농부',
      salePercent: 5,
      price: 8000,
      category: '채소',
      regesterDate: '2023-01-01',
      imageUrl: '/images/mock/buyer/product6.png',
    },
  ],
};

export const BuyerFarmerDetail = () => {
  const router = useRouter();
  const handleLike = () => {};

  return (
    <Box
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* 상단 고정 영역: 상태바 + 헤더 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 20px 12px 20px',
          }}
        >
          <button
            onClick={() => window.history.back()}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon
              icon="mdi:chevron-left"
              width="24"
              height="24"
              color="#000000"
            />
          </button>
        </div>
      </div>

      {/* 스크롤 가능한 영역 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          marginTop: '72px', // 상단 고정 영역의 높이
          paddingBottom: '100px', // 하단 고정 영역의 높이
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        {/* 이미지 캐러셀 */}
        <ImageCarousel
          images={mockProduct.farmer.profileUrls}
          indicatorBelow
          imageHeight="190px"
          borderRadius="16px"
        />

        <FarmerCard
          isFarmerDetail={true}
          name={mockProduct.farmer.name}
          location={mockProduct.farmer.location}
          description={mockProduct.farmer.description}
          percent={mockProduct.farmer.percent}
          totalSellCnt={mockProduct.farmer.totalSellCnt}
        />
        <Box
          $css={{
            height: '4px',
            marginTop: '$200',
            marginBottom: '$200',
            backgroundColor: '#F2F2F2',
          }}
        />

        {/* 내용 영역 */}
        <VStack
          $css={{
            paddingTop: '$200',
            backgroundColor: '#FFFFFF',
            gap: '$200',
          }}
        >
          {mockProduct.products.map((product) => (
            <ProductCardHorizontal
              key={product.id}
              title={product.title}
              regesterDate={product.regesterDate}
              salePercent={product.salePercent}
              price={product.price}
              onClick={() => router.push(`/buyer/products/${product.id}`)}
            />
          ))}
        </VStack>
      </div>

      {/* 하단 고정 영역: 액션 버튼 */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: '#FFFFFF',
          padding: '16px 20px 40px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <ProductActions
          isFarmer={true}
      
          onLike={handleLike}
        />
      </div>
    </Box>
  );
};
