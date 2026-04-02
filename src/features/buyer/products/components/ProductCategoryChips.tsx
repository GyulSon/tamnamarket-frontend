import { HStack, Box, Text } from '@vapor-ui/core';

type Category = '전체' | '감귤류' | '우도 땅콩' | '고사리' | '구좌 당근';

const CATEGORIES: Category[] = [
  '전체',
  '감귤류',
  '우도 땅콩',
  '고사리',
  '구좌 당근',
];

interface ProductCategoryChipsProps {
  selected?: Category;
  onChange?: (category: Category) => void;
}

export function ProductCategoryChips({
  selected = '전체',
  onChange,
}: ProductCategoryChipsProps) {
  return (
    <HStack
      $css={{
        gap: '$075',
        paddingTop: '$150',
        paddingBottom: '$075',
        overflowX: 'auto',
        flexShrink: '0',
      }}
      className="hide-scrollbar"
    >
      {CATEGORIES.map((category) => {
        const active = selected === category;
        return (
          <Box
            key={category}
            render={<button onClick={() => onChange?.(category)} />}
            $css={{
              width: '80px',
              height: '44px',
              borderBottom: active ? '2px solid #000' : 'none',
              backgroundColor: '$basic-white',
              cursor: 'pointer',
              flexShrink: '0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              typography="heading6"
              $css={{
                fontWeight: active ? '700' : '500',
                color: active ? '#000' : '#4C4C4C',
                whiteSpace: 'nowrap',
              }}
            >
              {category}
            </Text>
          </Box>
        );
      })}
    </HStack>
  );
}
