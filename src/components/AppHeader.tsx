import { Box, HStack } from '@vapor-ui/core';
import { BellOnOutlineIcon } from '@vapor-ui/icons';
import Image from 'next/image';
import { ReactNode } from 'react';

interface AppHeaderProps {
  logo?: ReactNode;
  children?: ReactNode;
}

export function AppHeader({ logo, children }: AppHeaderProps) {
  return (
    <HStack
      $css={{
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '12px',
        paddingTop: '24px',
      }}
    >
      {logo ?? (
        <Image src="/images/logo.png" alt="탐라장터" width={94} height={28} />
      )}
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
          width: '$300',
          height: '$300',
        }}
        aria-label="알림"
      >
        {children ?? <BellOnOutlineIcon width={24} height={24} />}
      </Box>
    </HStack>
  );
}
