import type { CSSProperties } from 'react';
import { Box } from '@vapor-ui/core';
import Image from 'next/image';

type DecorativeImage = {
  src: string;
  alt: string;
  left: string;
  top: string;
  width: number;
  height: number;
  burstX?: number;
  burstY?: number;
  burstRotateStart?: string;
  transform?: string;
  zIndex: number;
};

const heroImage: DecorativeImage = {
  src: '/images/onboarding/Group 1739332498.png',
  alt: '알파카 캐릭터',
  left: '26%',
  top: '32.1%',
  width: 164,
  height: 400,
  zIndex: 2,
};

const burstImages: DecorativeImage[] = [
  {
    src: '/images/onboarding/onboarding-02.png',
    alt: '대파 일러스트',
    left: '5.8%',
    top: '48.1%',
    width: 132,
    height: 118,
    burstX: 84,
    burstY: 4,
    burstRotateStart: '-44deg',
    transform: 'rotate(-18deg)',
    zIndex: 1,
  },
  {
    src: '/images/onboarding/onboarding-03.png',
    alt: '귤 일러스트',
    left: '60.1%',
    top: '52.7%',
    width: 127,
    height: 104,
    burstX: -116,
    burstY: -26,
    burstRotateStart: '-18deg',
    zIndex: 1,
  },
  {
    src: '/images/onboarding/onboarding-01.png',
    alt: '귤 일러스트',
    left: '4.5%',
    top: '64.5%',
    width: 70,
    height: 75,
    burstX: 120,
    burstY: -108,
    burstRotateStart: '-24deg',
    zIndex: 3,
  },
  {
    src: '/images/onboarding/onboarding-04.png',
    alt: '당근 일러스트',
    left: '68.2%',
    top: '70.6%',
    width: 85,
    height: 86,
    burstX: -126,
    burstY: -162,
    burstRotateStart: '20deg',
    zIndex: 3,
  },
];

type OnboardingFirstProps = {
  isVisible?: boolean;
};

export default function OnboardingFirst({
  isVisible = true,
}: OnboardingFirstProps) {
  return (
    <Box
      $css={{
        height: '100dvh',
        width: '100%',
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        zIndex: 10,
        pointerEvents: 'none',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 180ms ease-out',
      }}
      aria-hidden={!isVisible}
    >
      {/*
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
      */}
      <Image
        src="/images/onboarding/onboarding-bg.svg"
        alt="온보딩 배경"
        fill
        priority
        style={{ objectFit: 'cover' }}
      />
      {burstImages.map(
        ({
          src,
          alt,
          left,
          top,
          width,
          height,
          burstX = 0,
          burstY = 0,
          burstRotateStart = '0deg',
          transform = 'rotate(0deg)',
          zIndex,
        }) => (
          <Box
            key={src}
            style={{
              position: 'absolute',
              left,
              top,
              width: `${width}px`,
              height: `${height}px`,
              transform,
              transformOrigin: 'center center',
              zIndex,
              pointerEvents: 'none',
              animation:
                'onboarding-burst 0.82s cubic-bezier(0.18, 0.88, 0.24, 1.08) both',
              ...({
                '--burst-x': `${burstX}px`,
                '--burst-y': `${burstY}px`,
                '--burst-rotate-start': burstRotateStart,
                '--burst-rotate-end': transform,
              } as CSSProperties),
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority
              style={{ objectFit: 'contain' }}
            />
          </Box>
        )
      )}
      <Box
        style={{
          position: 'absolute',
          left: heroImage.left,
          top: heroImage.top,
          width: `${heroImage.width}px`,
          height: `${heroImage.height}px`,
          zIndex: heroImage.zIndex,
          pointerEvents: 'none',
          animation: 'onboarding-hero 0.52s ease-out both',
        }}
      >
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          style={{ objectFit: 'contain' }}
        />
      </Box>
      <style>{`
        @keyframes onboarding-burst {
          0% {
            opacity: 0;
            transform: translate(var(--burst-x), var(--burst-y))
              scale(0.08) rotate(var(--burst-rotate-start));
          }
          18% {
            opacity: 0.04;
            transform: translate(calc(var(--burst-x) * 0.92), calc(var(--burst-y) * 0.92))
              scale(0.14) rotate(var(--burst-rotate-start));
          }
          56% {
            opacity: 1;
            transform: translate(calc(var(--burst-x) * -0.1), calc(var(--burst-y) * -0.1))
              scale(1.1) rotate(var(--burst-rotate-end));
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(var(--burst-rotate-end));
          }
        }

        @keyframes onboarding-hero {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>
    </Box>
  );
}
