import {
  State, Repository, Action, Getter, Mutation, Set,
} from '@/utils/store-class-annotation';
import { Commit } from 'vuex';
import {
  getLoginStatus,
  getRankList,
  getRelations,
  addOrCancelAttentionService,
  checkCanFollowService,
  getBrokersList,
  getSepRankConfigService,
} from '@/service/home';
import { toNumber } from '@/utils/util';
import propMaps from '@/constant/propMap';
import { needHighlight, suffixProps } from '@/constant/propFormat';
import { processConfig } from '@/utils/format';

@Repository('RankStore')
export default class RankStore {
  @State({})
  public rankParams: object = {
    Score: '',
    Roi: '',
    Retracement: '',
    Weeks: '',
    Equity: '',
    expSymbol: '',
    brokerId: '',
  };

  @State(1)
  public pageIndex: number = 1;

  @State(false)
  public rankListLoading: boolean = false;

  @State(true)
  public hasMore: boolean = true;

  @State([])
  public rankList: Array<any> = [];

  @State(0)
  public rankTotal: number = 0;

  @State(0)
  public rankParamHash: any = 0;

  // 经纪商列表
  @State([])
  public brokersList: any[] = [];

  // 已经勾选的经纪商
  @State([])
  public checkedBrokers: any[] = [];

  // 过滤结果数据
  @State([])
  public filterRes: any[] = [];

  @State([])
  public showProps: any[] = [];

  @State(true)
  public useDefaultParams: boolean = true;

  // @Set('pageIndex') public setPageIndex: any;
  @Mutation
  public setPageIndex(state: any, payload: any[]) {
    // console.log(payload, 'payload');
    state.pageIndex = payload;
  }

  @Set('rankListLoading') public setRankLoading: any;

  @Set('useDefaultParams') public setUseDefaultParams: any;

  @Set('hasMore') public setHasMore: any;

  @Set('filterRes') public setFilterRes: any;

  @Set('checkedBrokers') public setCheckedBrokers: any;

  @Set('rankList') public setRankList: any;

  @Set('rankTotal') public setRankTotal: any;

  @Set('rankParamHash') public setRankParamHash: any;

  @Set('showProps') public setShowProps: any;

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
  public getRankList(context: { commit: Commit, state: any }, payload: any) {
    if (context.state.rankListLoading) return;
    const { state } = context;
    const hash = toNumber(payload);

    const { rankParamHash, pageIndex: pageIndexState } = state;

    const pageIndex = payload.index;
    const pageSize = payload.size || 20;

    if (hash === rankParamHash && pageIndexState === pageIndex) {
      return;
    }

    context.commit('setRankLoading', true);
    // eslint-disable-next-line
    return getRankList(payload)
      .then((res: any) => {
        const list = Array.isArray(res.List) ? res.List : [];

        let totalList = context.state.rankList;
        // console.log(pageIndex, 'pageIndex', context.state.pageIndex);
        if (pageIndex === 1) {
          totalList = list;
        } else {
          totalList = totalList.concat(list);
        }
        // totalList = res.List;
        if (Array.isArray(list) && list.length < pageSize) {
          context.commit('setHasMore', false);
        }
        if (list.length > pageSize - 3) {
          context.commit('setPageIndex', pageIndex + 1);
        }
        context.commit('setRankList', totalList || []);
        context.commit('setRankTotal', res.TotalCount || 0);
        return res;
      })
      .then((res: any) => {
        context.commit('setRankLoading', false);
        return res;
      })
      .catch(() => {
        context.commit('setRankLoading', false);
        return { error: 100 };
      });
  }

  @Action
  public getLoginStatus(context: { commit: Commit }): any {
    return getLoginStatus().then((res: any) => res);
  }

  // 特殊绑定设置
  @Action
  public async getSepRankConfig(context: { commit: Commit, state: any}, payload: any) {
    const { commit, state } = context;
    return getSepRankConfigService(payload).then((res: any) => {
      if (res && res.HideConfig) {
        const hideConfig = res.HideConfig;
        const blackList: any = [];
        const showProps = Object.keys(hideConfig).filter((i: any) => !hideConfig[i] && !blackList.includes(i)).map((i: any) => ({
          label: (propMaps as any)[i] || ' ',
          prop: i,
          highlight: needHighlight.includes(i),
          suffix: suffixProps[i] || '',
        }));
        // console.log(showProps, propMaps, 'showProps');
        commit('setShowProps', showProps);
      }

      if (res && res.CondCfg) {
        const { CondCfg } = res;
        const { rankParams, useDefaultParams } = state;
        let params: any = {};

        params = processConfig(CondCfg);

        params = { ...rankParams, ...params };
        // console.log(params, 'ppp***pp', useDefaultParams);
        if (useDefaultParams) {
          commit('setRankParams', params);
        }
      }
      return res;
    });
  }

  @Action
  public getRelations(context: { commit: Commit }, payload: any): any {
    return getRelations(payload).then((res: any) => res);
  }

  @Action
  public getBrokersList(context: { commit: Commit }, payload: any): any {
    getBrokersList(payload)
      .then((res: any) => {
        // console.log(res, 'brokersList');
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
