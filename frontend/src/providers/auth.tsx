import { createContext, useContext, useState } from 'react';

import { WithChildren } from '@/types';
import { assertDefined } from '@/utils/assert-defined';

type State = {
  initialized: boolean;
};

const useAuthProvider = () => {
  const [initialized, setInitialized] = useState(false);

  return { initialized };
};

const AuthContext = createContext<State | undefined>(undefined);

export const AuthProvider = ({ children }: WithChildren) => {
  const state = useAuthProvider();
  if (!state) return null;
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const state = useContext(AuthContext);
  assertDefined(state);
  return state;
};
