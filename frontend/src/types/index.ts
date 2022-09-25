import { ReactNode } from 'react';

// NOTE: For Domains
export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

// NOTE: For Components
export type WithChildren = { children: ReactNode };
