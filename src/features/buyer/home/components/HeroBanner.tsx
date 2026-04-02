import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, HStack, VStack, Text } from '@vapor-ui/core';
import { LocationIcon, ChevronRightOutlineIcon } from '@vapor-ui/icons';

interface BannerSlide {
  location: string;
  title: string;
  onCtaClick?: () => void;
}

interface HeroBannerProps {
  slides?: BannerSlide[];
  autoPlayInterval?: number;
}

const defaultSlides: BannerSlide[] = [
  { location: '애월읍 김순자 할망의', title: '햇청귤이 왔어요' },
  { location: '한림읍 고재원 해녀의', title: '싱싱한 전복이요' },
  { location: '구좌읍 오분자기 어부의', title: '갓 잡은 해산물이요' },
];

export function HeroBanner({
  slides = defaultSlides,
  autoPlayInterval = 3000,
}: HeroBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isUserScrolling = useRef(false);
  const userScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.offsetWidth, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isUserScrolling.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % slides.length;
        scrollToIndex(next);
        return next;
      });
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [slides.length, autoPlayInterval, scrollToIndex]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    isUserScrolling.current = true;
    const index = Math.round(el.scrollLeft / el.offsetWidth);
    setActiveIndex(index);
    if (userScrollTimer.current) clearTimeout(userScrollTimer.current);
    userScrollTimer.current = setTimeout(() => {
      isUserScrolling.current = false;
    }, 1000);
  };

  return (
    <VStack $css={{ gap: '$125' }}>
      {/* 카로셀 트랙 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: 'flex',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          paddingLeft: 'var(--vapor-spacing-250)',
          paddingRight: 'var(--vapor-spacing-250)',
          gap: 'var(--vapor-spacing-150)',
          boxSizing: 'border-box',
        }}
      >
        {slides.map((slide, i) => (
          <Box
            key={i}
            $css={{
              backgroundColor: '$gray-800',
              borderRadius: '$400',
              padding: '$250',
              minHeight: '190px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flexShrink: '0',
              width: '100%',
              scrollSnapAlign: 'start',
              boxSizing: 'border-box',
            }}
          >
            <VStack $css={{ gap: '$100' }}>
              <VStack $css={{ gap: '$075' }}>
                {/* 위치 */}
                <HStack $css={{ gap: '$050', alignItems: 'center' }}>
                  <LocationIcon
                    width={20}
                    height={20}
                    style={{ color: 'var(--vapor-color-orange-500)' }}
                  />
                  <Text
                    typography="body3"
                    $css={{ fontWeight: '600', color: '$white' }}
                  >
                    {slide.location}
                  </Text>
                </HStack>
                {/* 타이틀 */}
                <Text
                  typography="heading2"
                  $css={{ color: '$white', fontWeight: '400' }}
                >
                  {slide.title}
                </Text>
              </VStack>
            </VStack>

            {/* 이미지 플레이스홀더 */}
            <Box
              $css={{
                position: 'absolute',
                right: '$250',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '87px',
                color: 'var(--vapor-color-pink-300)',
              }}
            >
              <Text
                typography="body4"
                $css={{
                  color: 'var(--vapor-color-pink-300)',
                  textAlign: 'center',
                }}
              >
                (그래픽 영역)
              </Text>
            </Box>

            {/* CTA 버튼 */}
            <HStack
              render={<button onClick={slide.onCtaClick} />}
              $css={{
                alignItems: 'center',
                gap: '$050',
                backgroundColor: 'var(--vapor-color-orange-500)',
                borderRadius: '$200',
                paddingTop: '$087',
                paddingBottom: '$087',
                paddingLeft: '$150',
                paddingRight: '$100',
                border: 'none',
                cursor: 'pointer',
                alignSelf: 'flex-start',
              }}
            >
              <Text
                typography="body4"
                $css={{ color: '$white', fontWeight: '700' }}
              >
                지금 만나러 가기
              </Text>
              <ChevronRightOutlineIcon
                width={16}
                height={16}
                style={{ color: 'var(--vapor-color-white)' }}
              />
            </HStack>
          </Box>
        ))}
      </div>

      {/* 인디케이터 */}
      <HStack $css={{ justifyContent: 'center', gap: '$075' }}>
        {slides.map((_, i) => (
          <Box
            key={i}
            $css={{
              width: '6px',
              height: '6px',
              borderRadius: '$900',
              backgroundColor:
                i === activeIndex
                  ? 'var(--vapor-color-orange-500)'
                  : 'var(--vapor-color-gray-500)',
            }}
          />
        ))}
      </HStack>
    </VStack>
  );
}
