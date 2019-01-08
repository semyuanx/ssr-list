import {
  State, Repository, Action, Mutation, Set,
} from '@/utils/store-class-annotation';
import { Commit } from 'vuex';
import { getAllProducts, getAllAccountsService, getCardInfoService } from '@/service/manager';

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

  @State([])
  public mamAccounts: any[] = [];

  @State({})
  public userInfo: any = {};

  @State() public total: number = 0;


  @Set('inProcessProducts')
  resetInProcessProducts: any;

  @Set('mamAccounts')
  setMamAccounts: any;

  @Set('userInfo')
  setUserInfo: any;

  @Mutation
  public setInProcessProducts(state: any, { products, type }: any) {
    const res = products.map((v: any) => ({
      Status: v.Status,
      Equity: v.Equity,
      Days: v.Days,
      FollowerProfit: v.FollowerProfit,
      FollowerMaxRisk: v.FollowerMaxRisk,
      MinFollowBalance: v.MinFollowBalance,
      ExpectStartTime: v.ExpectStartTime,
      ExpectTraderProfit: v.ExpectTraderProfit,
      ExpectFollowerProfit: v.ExpectFollowerProfit,
      ExpectFollowerCount: v.ExpectFollowerCount,
      ExpectROI: v.ExpectROI,
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
      Trader: v.Trader,
    }));
    state.inProcessProducts = type !== 'reset' ? [...state.inProcessProducts, ...res] : res;
  }

  @Mutation
  public setSettledProducts(state: any, { products, type }: any) {
    const res = products.map((v: any) => ({
      Status: v.Status,
      Equity: v.Equity,
      Days: v.Days,
      FollowerProfit: v.FollowerProfit,
      FollowerMaxRisk: v.FollowerMaxRisk,
      MinFollowBalance: v.MinFollowBalance,
      ExpectStartTime: v.ExpectStartTime,
      ExpectTraderProfit: v.ExpectTraderProfit,
      ExpectFollowerProfit: v.ExpectFollowerProfit,
      ExpectFollowerCount: v.ExpectFollowerCount,
      ExpectROI: v.ExpectROI,
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
      Trader: v.Trader,
    }));
    state.settledProducts = type !== 'reset' ? [...state.settledProducts, ...res] : res;
  }

  @Mutation
  public setTotal(state: any, count: number) {
    state.total = count;
  }

  @Action
  public async getProductsAsync(context: any, params: any) {
    const { commit } = context;
    let data: any = {};
    const { pageIndex } = params;
    try {
      data = await getAllProducts(params);
      commit('setTotal', data.total);
    } catch (e) {
      console.log(e);
    }
    if (data.items) {
      const type = `set${params.status || 'InProcess'}Products`;
      const tt = pageIndex === 1 ? 'reset' : 'set';
      commit(type, { products: data.items, type: tt });
    }
    return data;
  }

  @Action
  public async getAllAccounts(context: any, params: any) {
    const { commit } = context;
    let data: any = {};
    try {
      data = await getAllAccountsService(params);
    } catch (e) {
      console.log(e);
    }
    let accounts: any = [];
    if (data.accounts) {
      const { accounts: ats } = data;
      accounts = ats;
    }
    commit('setMamAccounts', accounts);
    return data;
  }

  @Action
  public async getCardInfoAction(context: any, params: any) {
    const { commit } = context;
    let data: any = {};
    try {
      data = await getCardInfoService(params);
    } catch (e) {
      console.log(e);
    }

    let userInfo: any = {};
    if (data && data.useraccount && data.useraccount.User) {
      userInfo = data.useraccount.User;
    }
    commit('setUserInfo', userInfo);

    return data;
  }
}
