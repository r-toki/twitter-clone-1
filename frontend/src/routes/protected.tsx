import { HomeRoutes } from '@/features/home/routes';

export const protectedRoutes = [
  {
    path: '',
    element: <HomeRoutes />,
  },
];
