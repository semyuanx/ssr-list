import { get } from '@/request';
import { panelsList, accountsApi, cardInfoApi } from '@/api/manager';

export const getAllProducts = (params?: object): any => get(panelsList(), {
  params,
});
export const getAllAccountsService = (params?: any): any => get(accountsApi(), {
  params,
});
export const getCardInfoService = (params?: any): any => get(cardInfoApi(), {
  params,
});
