import { Box, HStack, VStack, Text } from '@vapor-ui/core';
import { Icon } from '@iconify/react';

interface CategoryItem {
  id: string;
  label: string;
  icon: string;
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 'citrus', label: '감귤류', icon: 'lucide:citrus' },
  { id: 'radish', label: '무', icon: 'lucide:salad' },
  { id: 'cabbage', label: '양배추', icon: 'lucide:leaf' },
  { id: 'carrot', label: '당근', icon: 'lucide:carrot' },
];

interface CategoryListProps {
  categories?: CategoryItem[];
  onCategoryClick?: (id: string) => void;
}

export function CategoryList({
  categories = DEFAULT_CATEGORIES,
  onCategoryClick,
}: CategoryListProps) {
  return (
    <Box
      $css={{ paddingLeft: '$250', paddingRight: '$250', paddingTop: '$250' }}
    >
      <HStack $css={{ gap: '$250' }}>
        {categories.map((cat) => (
          <VStack
            key={cat.id}
            render={<button onClick={() => onCategoryClick?.(cat.id)} />}
            $css={{
              alignItems: 'center',
              gap: '$075',
              flex: '1',
              background: 'none',
              border: 'none',
              padding: '$000',
              cursor: 'pointer',
            }}
          >
            <Box
              $css={{
                width: '36px',
                height: '36px',
                backgroundColor: '$white',
                borderRadius: '$900',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                overflow: 'hidden',
              }}
            >
              <Icon icon={cat.icon} width={24} height={24} />
            </Box>
            <Text
              typography="body3"
              foreground="hint-100"
              $css={{ fontWeight: '500' }}
            >
              {cat.label}
            </Text>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
}
