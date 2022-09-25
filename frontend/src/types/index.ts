import { ReactNode } from 'react';

// NOTE: for Domains
export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

// NOTE: for Components
export type WithChildren = { children: ReactNode };
