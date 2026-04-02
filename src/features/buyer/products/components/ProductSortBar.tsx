import { HStack, Text, Box } from '@vapor-ui/core';
import { PresetOutlineIcon } from '@vapor-ui/icons';

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
  const handleSortClick = () => {
    const currentIndex = OPTIONS.indexOf(selected);
    const nextIndex = (currentIndex + 1) % OPTIONS.length;
    onChange?.(OPTIONS[nextIndex]);
  };

  return (
    <HStack
      $css={{
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '$100',
        paddingBottom: '$100',
      }}
    >
      <Text typography="heading5" $css={{ fontWeight: '700' }}>
        총{' '}
        <Text
          typography="heading5"
          $css={{ color: 'var(--vapor-color-orange-500)', fontWeight: '700' }}
        >
          {total}
        </Text>
        개
      </Text>

      <Box
        render={<button onClick={handleSortClick} />}
        $css={{
          background: 'none',
          border: 'none',
          padding: '$000',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '$050',
        }}
      >
        <PresetOutlineIcon width="16" height="16" style={{ color: '#000' }} />
        <Text
          typography="subtitle2"
          $css={{ color: '#000', fontWeight: '500' }}
        >
          {selected}
        </Text>
      </Box>
    </HStack>
  );
}
