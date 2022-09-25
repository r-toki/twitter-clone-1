import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type LayoutProps = {
  left: ReactNode;
  main: ReactNode;
  right: ReactNode;
};

export const Layout = ({ left, main, right }: LayoutProps) => {
  return (
    <Flex h="full">
      <Box w="xs" position="relative">
        <Box position="fixed" top="0" bottom="0" w="xs">
          {left}
        </Box>
      </Box>

      <Box flex="1">
        <Box>{main}</Box>
      </Box>

      <Box w="xs" position="relative">
        <Box position="fixed" top="0" bottom="0" w="xs">
          {right}
        </Box>
      </Box>
    </Flex>
  );
};
