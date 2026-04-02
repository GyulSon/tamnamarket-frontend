import { Box, HStack } from '@vapor-ui/core';
import { BellOnOutlineIcon } from '@vapor-ui/icons';
import Image from 'next/image';

export function AppHeader() {
  return (
    <HStack
      $css={{
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '$150',
      }}
    >
      <Image src="/images/logo.png" alt="탐라장터" width={120} height={32} />
      <Box
        render={<button />}
        $css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          padding: '$000',
          cursor: 'pointer',
          width: '24px',
          height: '24px',
        }}
        aria-label="알림"
      >
        <BellOnOutlineIcon width={24} height={24} />
      </Box>
    </HStack>
  );
}
