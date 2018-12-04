
import { get } from '@/request';
import { login } from '@/api/home';

export const getLoginStatus = (params?: object) => get(login(), {
  params,
});

export const a = 12;
