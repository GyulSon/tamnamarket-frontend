import { useState, useRef, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
}

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const scrollPosition = container.scrollLeft;
    const index = Math.round(scrollPosition / containerWidth);
    setCurrentIndex(Math.max(0, Math.min(index, images.length - 1)));
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [images.length]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#d6d6d6',
      }}
    >
      {/* 이미지 스크롤 컨테이너 */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        style={{
          display: 'flex',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          width: '100%',
          aspectRatio: '1',
          userSelect: 'none',
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 100%',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              scrollSnapAlign: 'start',
              boxSizing: 'border-box',
            }}
          >
            <img
              src={image}
              alt={`Product ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* 인디케이터 */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '6px',
          padding: '0 16px',
          justifyContent: 'center',
        }}
      >
        {images.map((_, index) => (
          <div
            key={index}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? '#FFFFFF' : '#C6C6C6',
              transition: 'background-color 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};
