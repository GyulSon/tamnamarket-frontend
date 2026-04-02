import { HStack, VStack, Text } from '@vapor-ui/core';
import { ChevronRightOutlineIcon } from '@vapor-ui/icons';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onMoreClick?: () => void;
}

export function SectionHeader({ title, subtitle, onMoreClick }: SectionHeaderProps) {
  return (
    <HStack $css={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <VStack $css={{ gap: '$025' }}>
        <Text typography="heading4" foreground="normal-200" $css={{ fontWeight: '700' }}>
          {title}
        </Text>
        {subtitle && (
          <Text typography="body4" foreground="hint-100">
            {subtitle}
          </Text>
        )}
      </VStack>
      <HStack
        render={<button onClick={onMoreClick} />}
        $css={{
          alignItems: 'center',
          gap: '$025',
          background: 'none',
          border: 'none',
          padding: '$000',
          cursor: 'pointer',
        }}
      >
        <Text typography="body3" foreground="normal-200" $css={{ fontWeight: '500' }}>
          더보기
        </Text>
        <ChevronRightOutlineIcon width={16} height={16} />
      </HStack>
    </HStack>
  );
}
