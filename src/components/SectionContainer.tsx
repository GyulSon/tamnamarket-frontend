import { Box } from '@vapor-ui/core';
import { ComponentProps } from 'react';

type SectionContainerProps = ComponentProps<typeof Box> & {
  pl?: boolean;
  pr?: boolean;
  pt?: boolean;
  pb?: boolean;
};

const SectionContainer = ({
  children,
  $css,
  pt = true,
  pb = true,
  pl = true,
  pr = true,
  ...props
}: SectionContainerProps) => {
  return (
    <Box
      $css={{
        width: '100%',
        paddingTop: pt ? '20px' : '0',
        paddingBottom: pb ? '20px' : '0',
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
