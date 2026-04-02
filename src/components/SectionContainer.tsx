import { Box } from '@vapor-ui/core';
import { ComponentProps } from 'react';

type SectionContainerProps = ComponentProps<typeof Box> & {
  pl?: boolean;
  pr?: boolean;
};

const SectionContainer = ({
  children,
  $css,
  pl = true,
  pr = true,
  ...props
}: SectionContainerProps) => {
  return (
    <Box
      $css={{
        width: '100%',
        paddingTop: '20px',
        paddingBottom: '20px',
        paddingLeft: pl ? '20px' : '0',
        paddingRight: pr ? '20px' : '0',
        ...$css,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default SectionContainer;
