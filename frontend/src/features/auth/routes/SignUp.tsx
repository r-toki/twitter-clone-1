import { Button, Center, Divider, Stack } from '@chakra-ui/react';
import { z } from 'zod';

import { Form, InputField } from '@/components/Form';
import { AppHeading } from '@/components/Heading';

import { Layout } from '../components';
import { useSignUp } from '../hooks/use-sign-up';

const schema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be over 3 characters')
      .max(15, 'Name must be no more than 15 characters'),
    password: z.string().min(8, 'Password must be over 8 characters'),
    confirm: z.string().min(1, 'Required'),
  })
  .refine((fields) => fields.password === fields.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

type RegisterValue = {
  name: string;
  password: string;
  confirm: string;
};

export const SignUp = () => {
  const { signUp } = useSignUp();

  const onSubmit = ({ name, password }: RegisterValue) => {
    signUp(name, password);
  };

  return (
    <Layout>
      <Center>
        <Stack w="md" mx="4" p="8" borderRadius="md" bg="white">
          <AppHeading alignSelf="center">Twitter Clone</AppHeading>

          <Form<RegisterValue, typeof schema> onSubmit={onSubmit} schema={schema}>
            {({ register, formState: { errors } }) => (
              <Stack spacing="6">
                <Stack spacing="4">
                  <InputField label="Name" registration={register('name')} error={errors.name} />

                  <InputField
                    type="password"
                    label="Password"
                    registration={register('password')}
                    error={errors.password}
                  />

                  <InputField
                    type="password"
                    label="Confirm"
                    registration={register('confirm')}
                    error={errors.confirm}
                  />
                </Stack>

                <Divider />

                <Button type="submit">Sign Up</Button>
              </Stack>
            )}
          </Form>
        </Stack>
      </Center>
    </Layout>
  );
};
