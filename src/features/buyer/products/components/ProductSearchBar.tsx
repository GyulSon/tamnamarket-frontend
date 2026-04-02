import { HStack, Box, Text } from '@vapor-ui/core';
import { Icon } from '@iconify/react';

interface ProductSearchBarProps {
  placeholder?: string;
  onClick?: () => void;
}

export function ProductSearchBar({
  placeholder = '찾으시는 농산물을 검색해보세요',
  onClick,
}: ProductSearchBarProps) {
  return (
    <Box $css={{ paddingLeft: '$250', paddingRight: '$250', paddingTop: '$150' }}>
      <HStack
        render={<button onClick={onClick} />}
        $css={{
          gap: '$100',
          alignItems: 'center',
          backgroundColor: '$canvas-200',
          borderRadius: '$300',
          paddingTop: '$125',
          paddingBottom: '$125',
          paddingLeft: '$150',
          paddingRight: '$150',
          width: '100%',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <Icon icon="lucide:search" width={18} height={18} color="var(--vapor-color-gray-500)" />
        <Text typography="body3" foreground="hint-100">
          {placeholder}
        </Text>
      </HStack>
    </Box>
  );
}
