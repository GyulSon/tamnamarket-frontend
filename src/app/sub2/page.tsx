import { Text, VStack } from '@vapor-ui/core';

const Sub2Page = () => {
  return (
    <VStack $css={{ gap: '$150' }}>
      <Text render={<h1 />} typography="heading5">
        서브2
      </Text>
      <Text typography="body2" $css={{ color: 'var(--muted-foreground)' }}>
        서브2 페이지입니다.
      </Text>
    </VStack>
  );
};

export default Sub2Page;
