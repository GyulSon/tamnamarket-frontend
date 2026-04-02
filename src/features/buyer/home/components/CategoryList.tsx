import { Box, HStack, VStack, Text } from '@vapor-ui/core';
import Image from 'next/image';

interface CategoryItem {
  id: string;
  label: string;
  icon: string;
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 'orange', label: '감귤류', icon: '/images/icons/orange.svg' },
  { id: 'nuts', label: '우도 땅콩', icon: '/images/icons/nuts.svg' },
  { id: 'leaf', label: '고사리', icon: '/images/icons/leaf.svg' },
  { id: 'carrot', label: '구좌 당근', icon: '/images/icons/carrot.svg' },
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Image src={cat.icon} alt={cat.label} width={36} height={36} />
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
