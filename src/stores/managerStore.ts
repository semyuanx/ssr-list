import {
  State, Repository, Action, Mutation,
} from '@/utils/store-class-annotation';
import { Commit } from 'vuex';
import { getAllProducts } from '@/service/manager';

/**
 *  获取投资管家产品列表
 */
@Repository('managerStore')
export default class ManagerStore {
  @State([])
  public allProducts: any[] | undefined;

  @Mutation
  public setAccounts(state: any, allProducts: any[]) {
    state.allProducts = allProducts;
  }

  @Action
  public async getAllProductsAsync(context: any, params: any) {
    const { commit } = context;
    let data: any = {};
    try {
      data = await getAllProducts(params);
    } catch (e) {
      console.log(e);
    }
    if (data.accounts) {
      commit('setAccounts', data.accounts);
    }
    return data;

    // {
    //   status: '',
    //   profitRatio: '',
    //   followerMaxRisk: '',
    //   expectDays: '',
    //   minFollowBalance: '',
    //   roi: '',
    //   pageSize: '',
    //   pageIndex: '1',
    // }
  }
}
