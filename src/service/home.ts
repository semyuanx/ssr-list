
import { get } from '@/request';
import { login, rankList, customConfig } from '@/api/home';

export const getLoginStatus = (params?: object): any => get(login(), {
  params,
});

export const getRankList = (params?: object): any => get(rankList(), {
  params,
});
export const getCustomConfig = (params?: object): any => get(customConfig(), {
  params,
});
