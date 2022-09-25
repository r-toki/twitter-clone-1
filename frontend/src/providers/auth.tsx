import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { axios } from '@/lib/axios';
import { Tokens, WithChildren } from '@/types';
import { assertDefined } from '@/utils/assert-defined';
import storage from '@/utils/storage';

type User = { name: string };

type State = {
  initialized: boolean;
  user: User | undefined;
  signUp: (name: string, password: string) => Promise<void>;
  signIn: (name: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const useAuthProvider = () => {
  const navigate = useNavigate();

  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<User>();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get<User>('user');
      setUser(data);
    } catch {
      storage.clear('access_token');
      storage.clear('refresh_token');
      navigate('auth/sign-in');
    }
  };

  const signUp = async (name: string, password: string) => {
    const { data } = await axios.post<Tokens>('users/registrations', { name, password });

    storage.set('access_token', data.accessToken);
    storage.set('refresh_token', data.refreshToken);

    await fetchUser();
  };

  const signIn = async (name: string, password: string) => {
    const { data } = await axios.post<Tokens>('users/sessions', { name, password });

    storage.set('access_token', data.accessToken);
    storage.set('refresh_token', data.refreshToken);

    await fetchUser();
  };

  const signOut = async () => {
    await axios.delete('users/sessions');

    storage.clear('access_token');
    storage.clear('refresh_token');

    setUser(undefined);
  };

  useEffect(() => {
    (async () => {
      try {
        await fetchUser();
      } finally {
        setInitialized(true);
      }
    })();
  }, []);

  return { initialized, user, signUp, signIn, signOut };
};

const AuthContext = createContext<State | undefined>(undefined);

export const AuthProvider = ({ children }: WithChildren) => {
  const state = useAuthProvider();
  if (!state) return null;
  if (!state.initialized) return null;
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const state = useContext(AuthContext);
  assertDefined(state);
  return state;
};
