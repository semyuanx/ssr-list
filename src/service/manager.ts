import { get } from '@/request';
import { panelsList } from '@/api/manager';

export const getAllProducts = (params?: object): any => get(panelsList(), {
  params,
});

export const none = () => {};
