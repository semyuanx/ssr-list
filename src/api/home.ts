
import { API_PREFIX_V2, API_PREFIX_V1 } from '@/constant/api';


export const login = () => `${API_PREFIX_V1}/auth/signin-status`;

export default {
  login,
};
