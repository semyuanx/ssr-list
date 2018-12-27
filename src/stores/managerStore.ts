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
  public inProcessProducts: any[] = [];

  @State([])
  public settledProducts: any[] = [];

  @State() public total: number = 0;


  @Mutation
  public setInProcessProducts(state: any, products: any[]) {
    const res = products.map(v => ({
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
    state.inProcessProducts = [...state.inProcessProducts, ...res];
  }

  @Mutation
  public setSettledProducts(state: any, products: any[]) {
    const res = products.map(v => ({
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
    state.settledProducts = [...state.settledProducts, ...res];
  }

  @Mutation
  public setTotal(state: any, count: number) {
    state.total = count;
  }

  @Action
  public async getProductsAsync(context: any, params: any) {
    const { commit } = context;
    let data: any = {};
    try {
      data = await getAllProducts(params);
      commit('setTotal', data.total);
    } catch (e) {
      console.log(e);
    }
    if (data.items) {
      const type = `set${params.status || 'InProcess'}Products`;

      commit(type, data.items);
    }
    return data;
  }
}
