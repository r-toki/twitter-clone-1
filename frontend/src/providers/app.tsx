import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import { WithChildren } from '@/types';

import { AuthProvider } from './auth';

export const AppProvider = ({ children }: WithChildren) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
};
