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
    const res = allProducts.map(v => ({
      ID: v.ID,
      Type: v.Trader.Type,
      UserID: v.Trader.UserID,
      AccountIndex: v.Trader.AccountIndex,
      BrokerID: v.Trader.BrokerID,
      Name: v.Name, // 标题
      Nickname: `${v.Trader.Nickname} ${v.Trader.Broker}-#${v.Trader.AccountIndex}`, // 副标题
      ProductCount: v.Trader.Summary.ProductCount, // 历史发起
      AverageROI: numeral(v.Trader.Summary.AverageROI).format('0%'), // 平均收益率
      Profit: numeral(v.Profit).format('$0.00'), // 当前产品收益
      ROI: numeral(v.ROI).format('0.00%'), // 当前收益率
      Balance: numeral(v.Balance).format('0.00'), // 产品资金
      DaysLeft: v.DaysLeft, // 剩余时间
      FollowerCount: v.FollowerCount, // 跟随人数
      TakeProfitRatio: v.ProfitMode.TakeProfitRatio,
      StopLossRatio: v.ProfitMode.StopLossRatio,
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
  }
}
