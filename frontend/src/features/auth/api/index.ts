import { axios } from '@/lib/axios';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export const signUp = (name: string, password: string): Promise<Tokens> => {
  return axios.post('users/registrations', { name, password });
};

export const signIn = (name: string, password: string): Promise<Tokens> => {
  return axios.post('users/sessions', { name, password });
};

export const signOut = () => {
  return axios.delete('users/sessions');
};

export const refresh = (): Promise<Tokens> => {
  return axios.put('users/sessions');
};
