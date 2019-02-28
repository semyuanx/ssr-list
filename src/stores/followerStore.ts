import {
  State, Repository, Action, Getter, Mutation, Set,
} from '@/utils/store-class-annotation';
import { Commit } from 'vuex';
import {
  // getRankList,
  getRankFollowersService,
} from '@/service/home';
// import { toNumber } from '@/utils/util';
// import propMaps from '@/constant/propMap';
@Repository('FollowerStore')
export default class FollowerStore {
  @State([])
  public followers: Array<any> = [];

  @State(1)
  public pageIndex: number = 1;

  @State(false)
  public followersLoading: boolean = false;

  @Set('followers') public setFollowers: any;

  @Set('hasMore') public setHasMore: any;

  @Set('followersLoading') public setFollowersLoading: any;

  @Action
  public getRankFollowers(context: { commit: Commit, state: any }, params: any) {
    const { commit, state } = context;
    commit('setFollowersLoading', true);
    return getRankFollowersService(params).then((res: any) => {
      let data: any = [];
      const { pageIndex } = params;
      const { followers } = state;
      // console.log(res, followers, 'followers');
      if (!res || !Array.isArray(res.items)) {
        return res;
      }
      if (pageIndex === 1) {
        data = res.items;
      } else {
        data = followers.concat(res.items);
      }
      commit('setFollowers', data);
      return res;
    })
      .then((res: any) => {
        commit('setFollowersLoading', false);
        return res;
      }).catch((e: any) => {
        commit('setFollowersLoading', false);
        return {
          error: 100,
        };
      });
  }
}
