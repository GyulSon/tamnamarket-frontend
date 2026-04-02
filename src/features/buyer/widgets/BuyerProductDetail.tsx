import { VStack, Box } from '@vapor-ui/core';
import { Icon } from '@iconify/react';
import { ImageCarousel } from '../productDetail/components/ImageCarousel';
import { ProductBadge } from '../productDetail/components/ProductBadge';
import { ProductTitle } from '../productDetail/components/ProductTitle';
import { ProductPrice } from '../productDetail/components/ProductPrice';
import { ProductInfoItem } from '../productDetail/components/ProductInfoItem';
import { FarmerVoiceButton } from '../productDetail/components/FarmerVoiceButton';
import { ProductDescription } from '../productDetail/components/ProductDescription';
import { ProductActions } from '../productDetail/components/ProductActions';

export const BuyerProductDetail = () => {
  // Mock 데이터
  const mockProduct = {
    id: '1',
    title: '햇청귤 2kg 한 박스(특품)',
    currentPrice: '28,000원',
    originalPrice: '32,000원',
    images: [
      '/images/mock/buyer/product1.png',
      '/images/mock/buyer/product1.png',
      '/images/mock/buyer/product1.png',
      '/images/mock/buyer/product1.png',
    ],
    description:
      '애월읍 김순자 할망께서 40년 경력으로 정성껏 재배하신 햇청귤입니다. 올해는 일교차가 커서 당도가 특히 높으며, 비타민C가 풍부해 환절기 건강관리에 좋습니다. 농약을 최소화하고 유기농 퇴비로 키워 안심하고 드실 수 있습니다.',
    infoItems: [
      {
        label: '상품 정보',
        value: '새콤달콤한 제주 청귤\n싱싱함이 살아있는',
      },
      {
        label: '배송 정보',
        value: '오후 2시까지 주문시\n당일 배송 가능',
      },
    ],
  };

  const handleBuy = () => {
    console.log('구매 버튼 클릭');
    // 구매 로직
  };

  const handleLike = () => {
    console.log('찜 버튼 클릭');
    // 찜 로직
  };

  const handleFarmerVoice = () => {
    console.log('농부의 한 마디 클릭');
    // 음성 재생 로직
  };

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
        {/* 상태 바 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft: '16px',
            paddingRight: '16px',
            fontSize: '14px',
            color: '#000000',
          }}
        >
          <span>9:41</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <Icon icon="mdi:wifi" width="16" height="16" />
            <Icon icon="mdi:signal-cellular-3" width="16" height="16" />
            <Icon icon="mdi:battery" width="16" height="16" />
          </div>
        </div>

        {/* 헤더 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 20px 12px 20px',
            borderBottom: '1px solid #f0f0f0',
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
            <Icon icon="mdi:chevron-left" width="24" height="24" color="#000000" />
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
        }}
      >
        {/* 이미지 캐러셀 */}
        <ImageCarousel images={mockProduct.images} />

        {/* 내용 영역 */}
        <VStack
          gap="$300"
          $css={{
            padding: '$400 $500 $400 $500',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* 배지 + 제목 + 가격 섹션 */}
          <VStack
            gap="$200"
            $css={{
              width: '100%',
            }}
          >
            <ProductBadge label="특가상품" />

            <ProductTitle title={mockProduct.title} />

            <ProductPrice
              currentPrice={mockProduct.currentPrice}
              originalPrice={mockProduct.originalPrice}
            />
          </VStack>

          {/* 정보 카드 섹션 */}
          <VStack
            gap="$200"
            $css={{
              width: '100%',
            }}
          >
            {mockProduct.infoItems.map((item, index) => (
              <ProductInfoItem
                key={index}
                label={item.label}
                value={item.value}
              />
            ))}
          </VStack>

          {/* 농부의 한 마디 버튼 */}
          <FarmerVoiceButton onClick={handleFarmerVoice} />

          {/* 제품 설명 */}
          <ProductDescription description={mockProduct.description} />
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
          borderTop: '1px solid #f0f0f0',
          padding: '16px 20px 40px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <ProductActions onBuy={handleBuy} onLike={handleLike} />
      </div>
    </Box>
  );
};
