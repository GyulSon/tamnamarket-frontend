import { Text, VStack } from '@vapor-ui/core';

import SectionContainer from '@/components/SectionContainer';

const Sub1Page = () => {
  return (
    <SectionContainer>
      <VStack $css={{ gap: '$150' }}>
        <Text render={<h1 />} typography="heading5">
          서브1
        </Text>
        <Text typography="body2" $css={{ color: 'var(--muted-foreground)' }}>
          서브1 페이지입니다.
        </Text>
      </VStack>
    </SectionContainer>
  );
};

export default Sub1Page;
