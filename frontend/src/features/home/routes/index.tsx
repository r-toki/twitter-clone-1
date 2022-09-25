import { Route, Routes } from 'react-router-dom';

import { Show } from './Show';

export const HomeRoutes = () => (
  <Routes>
    <Route path="" element={<Show />} />
  </Routes>
);
