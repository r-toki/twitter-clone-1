import { axios } from '@/lib/axios';
import { Tokens } from '@/types';
import storage from '@/utils/storage';

export const useSignUp = () => {
  const signUp = async (name: string, password: string) => {
    const { data } = await axios.post<Tokens>('users/registrations', { name, password });

    storage.set('access_token', data.accessToken);
    storage.set('refresh_token', data.refreshToken);
  };

  return { signUp };
};
