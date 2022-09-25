import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export const Link = (props: RouterLinkProps & ChakraLinkProps) => {
  return <ChakraLink as={RouterLink} {...props} />;
};
