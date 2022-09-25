import { Box } from '@chakra-ui/react';

import { WithChildren } from '@/types';

export const Layout = ({ children }: WithChildren) => {
  return (
    <Box h="full" py="20" bg="gray.100">
      {children}
    </Box>
  );
};
