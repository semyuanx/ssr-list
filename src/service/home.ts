
import { get, post } from '@/request';
import {
  login, rankList, customConfig, customRankList,
  relations, addOrCancelAttentionApi, checkCanFollowApi,
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


export const getRelations = (params?: object): any => get(relations(), {
  params,
});

export const addOrCancelAttentionService = (data?: any, params?: object): any => post(addOrCancelAttentionApi(), {
  data,
  params,
});
export const checkCanFollowService = (data?: Object, params?: object): any => post(checkCanFollowApi(), {
  data,
  params,
});
