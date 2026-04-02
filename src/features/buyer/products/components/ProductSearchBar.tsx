import { HStack, Box, Text } from '@vapor-ui/core';
import { SearchOutlineIcon } from '@vapor-ui/icons';

interface ProductSearchBarProps {
  placeholder?: string;
  onClick?: () => void;
}

export function ProductSearchBar({
  placeholder = '지금 가장 맛있는 청귤 검색',
  onClick,
}: ProductSearchBarProps) {
  return (
    <Box $css={{ paddingTop: '$150' }}>
      <HStack
        render={<button onClick={onClick} />}
        $css={{
          gap: '$100',
          alignItems: 'center',
          backgroundColor: '$basic-white',

          borderRadius: '$300',
          paddingTop: '$150',
          paddingBottom: '$150',
          paddingLeft: '$150',
          paddingRight: '$150',
          width: '100%',
          border: '1px solid #E0E0E0',
          cursor: 'pointer',
        }}
      >
        <SearchOutlineIcon width={20.5} height={20.5} color="#000" />
        <Text
          typography="heading6"
          foreground="hint-100"
          $css={{
            fontWeight: 500,
          }}
        >
          {placeholder}
        </Text>
      </HStack>
    </Box>
  );
}
