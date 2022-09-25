import { createContext, useContext, useEffect, useState } from 'react';

import { axios } from '@/lib/axios';
import { WithChildren } from '@/types';
import { assertDefined } from '@/utils/assert-defined';

type User = { name: string };

type State = {
  initialized: boolean;
  user: User | undefined;
  setUser: (v: User | undefined) => void;
};

const useAuthProvider = () => {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get<User>('user');
        setUser(res.data);
      } finally {
        setInitialized(true);
      }
    })();
  }, []);

  return { initialized, user, setUser };
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
