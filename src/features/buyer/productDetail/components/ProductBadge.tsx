import { Badge } from '@vapor-ui/core';

interface ProductBadgeProps {
  label: string;
}

export const ProductBadge = ({ label }: ProductBadgeProps) => {
  return (
    <Badge
      size="md"
      $css={{
        backgroundColor: 'var(--bg-input-100)',
        color: 'var(--fg-neutral-700)',
        fontSize: '12px',
        fontWeight: 500,
        paddingLeft: '$100',
        paddingRight: '$100',
      }}
    >
      {label}
    </Badge>
  );
};
