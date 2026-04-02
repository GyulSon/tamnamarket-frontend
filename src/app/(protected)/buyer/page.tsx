import { Text, VStack } from '@vapor-ui/core';

import SectionContainer from '@/components/SectionContainer';

const BuyerPage = () => {
  return (
    <SectionContainer>
      <VStack $css={{ gap: '$150' }}>
        <Text render={<h1 />} typography="heading5">
          구매자 페이지
        </Text>
        <Text typography="body2" $css={{ color: 'var(--muted-foreground)' }}>
          구매자 페이지입니다.
        </Text>
      </VStack>
    </SectionContainer>
  );
};

export default BuyerPage;
