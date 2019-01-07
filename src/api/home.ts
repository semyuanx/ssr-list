
import { API_PREFIX_V2, API_PREFIX_V1, API_PREFIX_V3 } from '@/constant/api';


export const login = () => `${API_PREFIX_V1}/auth/signin-status`;
export const rankList = () => `${API_PREFIX_V2}/trade/rank/prime`;
export const customConfig = () => `${API_PREFIX_V2}/trade/rank/custom-config`;
export const customRankList = () => `${API_PREFIX_V2}/trade/rank/custom`;
export const brokersList = () => `${API_PREFIX_V2}/trade/search-brokers`;


export const relations = () => `${API_PREFIX_V1}/me/relations`;
export const addOrCancelAttentionApi = () => `${API_PREFIX_V3}/social/attentions`;
export const checkCanFollowApi = () => `${API_PREFIX_V1}/trade/check/follow`;


export const getMasterFollowerApi = () => `${API_PREFIX_V2}/trade/rank/followers`;

export const getRankFollowersApi = () => `${API_PREFIX_V2}/trade/rank/followers`;
export const getRankDynamicsApi = () => `${API_PREFIX_V1}/trade/dynamics`;

export default {
  login,
  rankList,
  customConfig,
  customRankList,
  checkCanFollowApi,
  brokersList,
  getMasterFollowerApi,
  getRankFollowersApi,
  getRankDynamicsApi,
};
