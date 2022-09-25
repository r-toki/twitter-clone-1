import { Box, Button, Center, Divider, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Form, InputField } from '@/components/Form';
import { AppHeading } from '@/components/Heading';
import { Link } from '@/components/Link';
import { useAuth } from '@/providers/auth';

import { Layout } from '../components';

const schema = z.object({
  name: z
    .string()
    .min(3, 'Name must be over 3 characters')
    .max(15, 'Name must be no more than 15 characters'),
  password: z.string().min(8, 'Password must be over 8 characters'),
});

type RegisterValue = {
  name: string;
  password: string;
};

export const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const onSubmit = async ({ name, password }: RegisterValue) => {
    await signIn(name, password);
    navigate('/');
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
                </Stack>

                <Divider />

                <Button type="submit" colorScheme="blue">
                  Sign In
                </Button>
              </Stack>
            )}
          </Form>

          <Box>
            <Link to="/auth/sign-up">to Sign Up</Link>
          </Box>
        </Stack>
      </Center>
    </Layout>
  );
};
