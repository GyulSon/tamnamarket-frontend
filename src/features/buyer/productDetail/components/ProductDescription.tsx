import { Text } from '@vapor-ui/core';

interface ProductDescriptionProps {
  description: string;
}

export const ProductDescription = ({
  description,
}: ProductDescriptionProps) => {
  return (
    <Text
      style={{
        color: 'var(--fg-neutral-600)',
        lineHeight: '1.6',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {description}
    </Text>
  );
};
