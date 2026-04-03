import { VStack, Box } from '@vapor-ui/core';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { ImageCarousel } from '../productDetail/components/ImageCarousel';
import { ProductActions } from '../productDetail/components/ProductActions';
import { FarmerCard, ProductCard } from '@/features/buyer/home/components';
import { ProductCardHorizontal } from '@/features/buyer/home/components/ProductCardHorizontal';
import { MOCK_FARMERS, MOCK_PRODUCTS } from '@/mocks';

interface BuyerFarmerDetailProps {
  farmerId: string;
}

export const BuyerFarmerDetail = ({ farmerId }: BuyerFarmerDetailProps) => {
  const router = useRouter();
  const farmer = MOCK_FARMERS.find((f) => f.id === farmerId) ?? MOCK_FARMERS[0];
  const farmerProducts = MOCK_PRODUCTS.filter((p) => p.farmerId === farmer.id);
  const mockProduct = {
    id: farmer.id,
    farmer,
    products: farmerProducts,
  };
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
