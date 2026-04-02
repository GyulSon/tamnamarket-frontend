import { Icon } from '@iconify/react';
import { useState } from 'react';

interface ProductActionsProps {
  onBuy?: () => void;
  onLike?: () => void;
  isFarmer?: boolean;
}

export const ProductActions = ({
  onBuy,
  onLike,
  isFarmer = false,
}: ProductActionsProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {/* 찜 버튼 */}
      <button
        onClick={handleLikeClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
          minWidth: '44px',
          padding: '10px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '8px',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = '#f5f5f5';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            'transparent';
        }}
      >
        <Icon
          icon={isLiked ? 'mdi:heart' : 'mdi:heart-outline'}
          width="24"
          height="24"
          style={{
            color: isLiked ? '#FF7628' : '#000000',
          }}
        />
      </button>

      {/* 구매 버튼 */}
      <button
        onClick={onBuy}
        style={{
          flex: 1,
          backgroundColor: '#FF7628',
          color: '#FFFFFF',
          fontSize: '16px',
          fontWeight: 600,
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
        }}
      >
        {isFarmer ? '단골 등록하기' : '구매하기'}
      </button>
    </div>
  );
};
