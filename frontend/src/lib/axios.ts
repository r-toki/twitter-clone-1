import Axios from 'axios';

import storage from '@/util/storage';

export const axios = Axios.create({ baseURL: import.meta.env.VITE_APP_BACKEND_URL });
