import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box h="full" py="20" bg="gray.100">
      {children}
    </Box>
  );
};
