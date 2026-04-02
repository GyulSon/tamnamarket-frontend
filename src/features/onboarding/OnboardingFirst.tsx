import { Box } from '@vapor-ui/core';
import Image from 'next/image';

export default function OnboardingFirst() {
  return (
    <Box
      $css={{
        backgroundColor: '#262626',
        display: 'flex',
        height: '100dvh',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        src="/images/onboarding/onboarding0.png"
        alt="온보딩탐라장터"
        width={216}
        height={48}
      />
    </Box>
  );
}
