import {
  State, Repository, Action, Getter, Mutation, Set,
} from '@/utils/store-class-annotation';
import { Commit, ActionTree } from 'vuex';
import {
  getRankList, getRelations, addOrCancelAttentionService, checkCanFollowService,
} from '@/service/home';

@Repository('RankStore')
export default class RankStore {
  @State({})
  public rankParams: object = {};

  @State([])
  public rankList: Array<any> = [];

  @State(0)
  public rankTotal: number = 0;

  @Set('rankList') public setRankList: any;

  @Set('rankTotal') public setRankTotal: any;

  @Set('rankParams')
  public setRankParams(): any | null {}

  @Action
  public getRankList(context: { commit: Commit }, payload: any): any {
    getRankList(payload)
      .then((res: any) => {
        console.log(res, 'getRankList');
        context.commit('setRankList', res.List || []);
        context.commit('setRankTotal', res.TotalCount || 0);
      }).catch(() => {});
  }

    @Action
  public getRelations(context: { commit: Commit }, payload: any): any {
    return getRelations(payload).then((res: any) => res);
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
