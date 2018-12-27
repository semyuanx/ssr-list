
import { API_PREFIX_V2, API_PREFIX_V1 } from '@/constant/api';


export const login = () => `${API_PREFIX_V1}/auth/signin-status`;
export const rankList = () => `${API_PREFIX_V2}/trade/rank/prime`;
export const customConfig = () => `${API_PREFIX_V2}/trade/rank/custom-config`;
export const customRankList = () => `${API_PREFIX_V2}/trade/rank/custom`;

export default {
  login, rankList, customConfig, customRankList,
};
