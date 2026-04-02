import { Icon } from '@iconify/react';

interface FarmerVoiceButtonProps {
  onClick?: () => void;
}

export const FarmerVoiceButton = ({ onClick }: FarmerVoiceButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '6px',
        padding: '10px 12px',
        backgroundColor: '#393939',
        border: 'none',
        borderRadius: '24px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = '#4a4a4a';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = '#393939';
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          flex: 1,
        }}
      >
        <Icon
          icon="mdi:volume-high"
          width="18"
          height="18"
          style={{
            color: '#FFFFFF',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          농부가 구매자에게 하고 싶은 말
        </span>
      </div>
      <Icon
        icon="mdi:chevron-right"
        width="20"
        height="20"
        style={{
          color: '#FFFFFF',
          flexShrink: 0,
        }}
      />
    </button>
  );
};
