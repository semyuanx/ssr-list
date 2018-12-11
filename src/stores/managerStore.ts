import {
  State, Repository, Action, Mutation,
} from '@/utils/store-class-annotation';
import { Commit } from 'vuex';
import { getAllProducts } from '@/service/manager';

const numeral = require('numeral');


/**
 *  获取投资管家产品列表
 */
@Repository('ManagerStore')
export default class ManagerStore {
  @State([])
  public allProducts: any[] | undefined;

  @Mutation
  public setAllProducts(state: any, allProducts: any[]) {
    const res = allProducts.filter(v => ({
      Name: v.Name,
      Nickname: `${v.Trader.Nickname}-#${v.Trader.AccountIndex}`,
      ProductCount: v.Trader.Summary.ProductCount,
      AverageROI: v.Trader.Summary.AverageROI,
      Balance: v.Balance, // 产品资金
      DaysLeft: v.DaysLeft, // 剩余时间
      FollowerCount: v.FollowerCount, // 参与人数
    }));
    state.allProducts = res;
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
    if (data.items) {
      commit('setAllProducts', data.items);
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
