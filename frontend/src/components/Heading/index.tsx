import { Box, BoxProps } from '@chakra-ui/react';

type As = 'h1';

type AppHeadingProps = { as?: As } & BoxProps;

export const AppHeading = ({ as = 'h1', ...rest }: AppHeadingProps) => {
  const styles = getStyles(as);
  return <Box {...styles} {...rest} />;
};

const getStyles = (as: As) => {
  switch (as) {
    case 'h1':
      return { fontWeight: 'bold', fontSize: '2xl' };
    default:
      throw new Error('could not getStyles');
  }
};
