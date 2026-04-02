import { Text, VStack } from '@vapor-ui/core';

import SectionContainer from '@/components/SectionContainer';

const SellerPage = () => {
  return (
    <SectionContainer>
      <VStack $css={{ gap: '$150' }}>
        <Text render={<h1 />} typography="heading5">
          판매자 페이지
        </Text>
        <Text typography="body2" $css={{ color: 'var(--muted-foreground)' }}>
          판매자 페이지입니다.
        </Text>
      </VStack>
    </SectionContainer>
  );
};

export default SellerPage;
