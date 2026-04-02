import { Text } from '@vapor-ui/core';

interface ProductPriceProps {
  currentPrice: string;
  originalPrice: string;
}

export const ProductPrice = ({
  currentPrice,
  originalPrice,
}: ProductPriceProps) => {
  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      <Text
        typography="body3"
        style={{
          color: '#FF7628',
        }}
      >
        {currentPrice}
      </Text>
      <Text
        typography="body3"
        style={{
          color: '#959595',
          textDecoration: 'line-through',
        }}
      >
        {originalPrice}
      </Text>
    </div>
  );
};
