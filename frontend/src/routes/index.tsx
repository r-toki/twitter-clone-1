import { useRoutes } from 'react-router-dom';

import { useAuth } from '@/providers/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const { user } = useAuth();

  const routes = user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes]);

  return element;
};
