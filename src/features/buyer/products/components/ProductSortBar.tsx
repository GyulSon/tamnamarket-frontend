import { HStack, Text, Box } from '@vapor-ui/core';
import { Icon } from '@iconify/react';

type SortOption = '최신순' | '인기순' | '낮은가격순' | '높은가격순';

const OPTIONS: SortOption[] = ['최신순', '인기순', '낮은가격순', '높은가격순'];

interface ProductSortBarProps {
  total?: number;
  selected?: SortOption;
  onChange?: (option: SortOption) => void;
}

export function ProductSortBar({
  total = 0,
  selected = '최신순',
  onChange,
}: ProductSortBarProps) {
  return (
    <HStack
      $css={{
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '$250',
        paddingRight: '$250',
        paddingTop: '$100',
        paddingBottom: '$100',
      }}
    >
      <Text typography="body4" foreground="hint-100">
        총{' '}
        <Text
          typography="body4"
          $css={{ color: 'var(--vapor-color-orange-500)', fontWeight: '700' }}
        >
          {total}
        </Text>
        개
      </Text>

      <HStack $css={{ gap: '$075', overflowX: 'auto' }}>
        {OPTIONS.map((option) => {
          const active = selected === option;
          return (
            <Box
              key={option}
              render={<button onClick={() => onChange?.(option)} />}
              $css={{
                background: 'none',
                border: 'none',
                padding: '$000',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              {active && (
                <Icon
                  icon="lucide:check"
                  width={12}
                  height={12}
                  color="var(--vapor-color-orange-500)"
                />
              )}
              <Text
                typography="body4"
                $css={{
                  fontWeight: active ? '700' : '400',
                  color: active
                    ? 'var(--vapor-color-orange-500)'
                    : 'var(--vapor-color-gray-500)',
                  whiteSpace: 'nowrap',
                }}
              >
                {option}
              </Text>
            </Box>
          );
        })}
      </HStack>
    </HStack>
  );
}
