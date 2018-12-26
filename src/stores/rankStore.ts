import {
  State, Repository, Action, Getter, Mutation, Set,
} from '@/utils/store-class-annotation';
import { Commit, ActionTree } from 'vuex';
import { getRankList } from '@/service/home';

@Repository('RankStore')
export default class RankStore {
    @State([])
    public rankList: Array<any> = [];

    @State(0)
    public rankTotal: number = 0;

    @Set('rankList')
    public setRankList: any;

    @Set('rankTotal')
    public setRankTotal: any;

    @Action
    public getRankList(context: { commit: Commit }, payload: any): any {
      getRankList(payload).then((res: any) => {
        console.log(res, 'getRankList');
        context.commit('setRankList', res.List || []);
        context.commit('setRankTotal', res.TotalCount || 0);
      }).catch(() => {});
    }
}
