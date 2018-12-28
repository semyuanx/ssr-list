
import { get } from '@/request';
import {
  login, rankList, customConfig, customRankList, brokersList,
} from '@/api/home';

export const getLoginStatus = (params?: object): any => get(login(), {
  params,
});

export const getRankList = (params?: object): any => get(rankList(), {
  params,
});
export const getCustomConfig = (params?: object): any => get(customConfig(), {
  params,
});
export const getCustomRankList = (params?: object): any => get(customRankList(), {
  params,
});
export const getBrokersList = (params?: object): any => get(brokersList(), {
  params,
});
