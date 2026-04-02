import { VStack, Box, Text, HStack } from '@vapor-ui/core';
import { Icon } from '@iconify/react';
import { ImageCarousel } from '../productDetail/components/ImageCarousel';
import { ProductPrice } from '../productDetail/components/ProductPrice';
import { FarmerVoiceButton } from '../productDetail/components/FarmerVoiceButton';
import { ProductActions } from '../productDetail/components/ProductActions';
import { PublishOutlineIcon } from '@vapor-ui/icons';
import { FarmerCard } from '@/features/buyer/home/components';

export const BuyerProductDetail = () => {
  // Mock 데이터
  const mockProduct = {
    id: '1',
    title: '햇청귤 2kg 한 박스(특품)',
    category: '감귤류',
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
    farmer: {
      id: '3',
      name: '이제주 농부',
      location: '구좌읍',
      description: '농사 경력 40년',
      percent: 87,
      totalSellCnt: 582,
    },
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
        }}
      >
        {/* 이미지 캐러셀 */}
        <ImageCarousel images={mockProduct.images} />

        {/* 내용 영역 */}
        <VStack
          $css={{
            padding: '$200',
            backgroundColor: '#FFFFFF',
            gap: '$100',
          }}
        >
          {/* 배지 + 제목 + 가격 섹션 */}
          <VStack
            $css={{
              width: '100%',
            }}
          >
            <Text
              $css={{
                backgroundColor: '#F7F7F7',
                color: '#4C4C4C',
                fontSize: '12px',
                fontWeight: 500,
                marginRight: 'auto',
                borderRadius: '4px',
              }}
            >
              {mockProduct.category}
            </Text>

            <HStack
              $css={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Text
                typography="heading3"
                style={{
                  color: '#000',
                  lineHeight: '1.5',
                  fontWeight: 700,
                }}
              >
                {mockProduct.title}
              </Text>
              <PublishOutlineIcon width="28" height="28" />
            </HStack>

            <ProductPrice
              currentPrice={mockProduct.currentPrice}
              originalPrice={mockProduct.originalPrice}
            />
          </VStack>

          {/* 정보 카드 섹션 */}
          <Box
            $css={{
              width: '100%',
              padding: '$200',
              border: '1px solid #E1E1E1',
              borderRadius: '8px',
            }}
          >
            <FarmerCard
              radius={true}
              key={mockProduct.farmer.id}
              name={mockProduct.farmer.name}
              location={mockProduct.farmer.location}
              description={mockProduct.farmer.description}
              percent={mockProduct.farmer.percent}
              totalSellCnt={mockProduct.farmer.totalSellCnt}
            />
          </Box>

          {/* 농부의 한 마디 버튼 */}
          <FarmerVoiceButton onClick={handleFarmerVoice} />

          {/* 제품 설명 */}
          <Text
            typography="body2"
            style={{
              color: '#262626',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              marginTop: '16px',
            }}
          >
            {mockProduct.description}
          </Text>
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
        <ProductActions onBuy={handleBuy} onLike={handleLike} />
      </div>
    </Box>
  );
};
