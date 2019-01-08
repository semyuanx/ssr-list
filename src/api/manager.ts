import { API_PREFIX_V2, API_PREFIX_V1 } from '@/constant/api';

export const panelsList = () => `${API_PREFIX_V2}/trade/mam/all-products`;
export const accountsApi = () => `${API_PREFIX_V2}/trade/accounts`;
export const cardInfoApi = () => `${API_PREFIX_V1}/file/cardinfo`;

export default {
  panelsList, accountsApi, cardInfoApi,
};
