import { HomeRoutes } from '@/features/home';

export const protectedRoutes = [
  {
    path: '/*',
    element: <HomeRoutes />,
  },
];
