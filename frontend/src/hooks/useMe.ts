import { useAuth } from '@/providers/auth';
import { assertDefined } from '@/utils/assert-defined';

export const useMe = () => {
  const { user } = useAuth();
  assertDefined(user);
  return { me: user };
};
