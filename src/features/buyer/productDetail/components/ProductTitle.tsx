import { Text } from '@vapor-ui/core';

interface ProductTitleProps {
  title: string;
}

export const ProductTitle = ({ title }: ProductTitleProps) => {
  return (
    <Text
      style={{
        color: 'var(--fg-neutral-900)',
        lineHeight: '1.5',
      }}
    >
      {title}
    </Text>
  );
};
