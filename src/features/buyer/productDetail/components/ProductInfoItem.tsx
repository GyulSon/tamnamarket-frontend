interface ProductInfoItemProps {
  label: string;
  value: string;
  icon?: string;
}

export const ProductInfoItem = ({ label, value, icon }: ProductInfoItemProps) => {
  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid #f0f0f0',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}
      >
        {icon && (
          <div
            style={{
              width: '60px',
              height: '60px',
              minWidth: '60px',
              backgroundColor: '#d6d6d6',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={icon}
              alt={label}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '12px',
              color: '#959595',
              marginBottom: '4px',
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: '14px',
              color: '#1a1a1a',
              fontWeight: 500,
              lineHeight: '1.4',
            }}
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};
