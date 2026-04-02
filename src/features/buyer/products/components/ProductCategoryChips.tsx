import { HStack, Box, Text } from '@vapor-ui/core';
import { Icon } from '@iconify/react';

type Category = '전체' | '감귤류' | '채소' | '해산물' | '과일' | '곡물';

const CATEGORIES: { id: Category; icon: string }[] = [
  { id: '전체', icon: 'lucide:layout-grid' },
  { id: '감귤류', icon: 'lucide:citrus' },
  { id: '채소', icon: 'lucide:leaf' },
  { id: '해산물', icon: 'lucide:fish' },
  { id: '과일', icon: 'lucide:apple' },
  { id: '곡물', icon: 'lucide:wheat' },
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
        paddingLeft: '$250',
        paddingRight: '$250',
        paddingTop: '$150',
        paddingBottom: '$075',
        overflowX: 'auto',
        flexShrink: '0',
      }}
    >
      {CATEGORIES.map(({ id, icon }) => {
        const active = selected === id;
        return (
          <Box
            key={id}
            render={<button onClick={() => onChange?.(id)} />}
            $css={{
              paddingTop: '$075',
              paddingBottom: '$075',
              paddingLeft: '$125',
              paddingRight: '$125',
              borderRadius: '$900',
              border: active
                ? '1.5px solid var(--vapor-color-orange-500)'
                : '1.5px solid var(--vapor-color-border-normal)',
              backgroundColor: active
                ? 'var(--vapor-color-orange-50)'
                : '$white',
              cursor: 'pointer',
              flexShrink: '0',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Icon
              icon={icon}
              width={14}
              height={14}
              color={
                active
                  ? 'var(--vapor-color-orange-500)'
                  : 'var(--vapor-color-gray-600)'
              }
            />
            <Text
              typography="body4"
              $css={{
                fontWeight: active ? '700' : '500',
                color: active
                  ? 'var(--vapor-color-orange-500)'
                  : 'var(--vapor-color-gray-600)',
                whiteSpace: 'nowrap',
              }}
            >
              {id}
            </Text>
          </Box>
        );
      })}
    </HStack>
  );
}
