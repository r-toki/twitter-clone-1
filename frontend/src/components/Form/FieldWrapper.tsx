import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

type FieldWrapperProps = {
  children: ReactNode;
  label?: string;
  error?: FieldError;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'children'>;

export const FieldWrapper = ({ children, label, error }: FieldWrapperProps) => {
  return (
    <FormControl isInvalid={!!error?.message}>
      {label && <FormLabel>{label}</FormLabel>}
      {children}
      {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
