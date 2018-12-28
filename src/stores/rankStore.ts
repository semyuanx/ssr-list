import {
  State, Repository, Action, Getter, Mutation, Set,
} from '@/utils/store-class-annotation';
import { Commit, ActionTree } from 'vuex';
import {
  getRankList,
  getRelations,
  addOrCancelAttentionService,
  checkCanFollowService,
  getBrokersList,
} from '@/service/home';

@Repository('RankStore')
export default class RankStore {
  @State({})
  public rankParams: object = {};

  @State([])
  public rankList: Array<any> = [];

  @State(0)
  public rankTotal: number = 0;

  @State([])
  public brokersList: any[] = [];

  @State([])
  public checkedBrokers: any[] = [];

  @State([])
  public filterRes:any[] =[];

  @Set('filterRes') public setFilterRes: any;

  @Set('checkedBrokers') public setCheckedBrokers: any;

  @Set('rankList') public setRankList: any;

  @Set('rankTotal') public setRankTotal: any;

  @Set('rankParams')
  public setRankParams(): any | null {}

  @Mutation
  public setBrokersList(state: any, payload: any[]) {
    const res = payload.map(v => ({
      Broker: v.Broker,
      BrokerId: v.BrokerId,
      BrokerName: v.BrokerName,
    }));
    state.brokersList = res;
  }

  @Action
  public getRankList(context: { commit: Commit }, payload: any): any {
    getRankList(payload)
      .then((res: any) => {
        console.log(res, 'getRankList');
        context.commit('setRankList', res.List || []);
        context.commit('setRankTotal', res.TotalCount || 0);
      })
      .catch(() => {});
  }

  @Action
  public getRelations(context: { commit: Commit }, payload: any): any {
    return getRelations(payload).then((res: any) => res);
  }

  @Action
  public getBrokersList(context: { commit: Commit }, payload: any): any {
    getBrokersList(payload)
      .then((res: any) => {
        console.log(res, 'brokersList');
        context.commit('setBrokersList', res.brokers || []);
      })
      .catch(() => {});
  }

  @Action
  public addOrCancelAttention(context: { commit: Commit }, data?: any, params?: any): any {
    return addOrCancelAttentionService(data, params).then((res: any) => res);
  }

  @Action
  public checkCanFollow(context: { commit: Commit }, data?: any, params?: any): any {
    return checkCanFollowService(data, params).then((res: any) => res);
  }
}
