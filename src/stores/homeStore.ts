import {
  State, Repository, Action, Getter, Mutation, Set,
} from '@/utils/store-class-annotation';
import { Commit, ActionTree } from 'vuex';
import { getLoginStatus } from '@/service/home';

@Repository('HomeStore')
export default class HomeStore {
  @State(true)
  public isLogin: boolean = false;

  @Set('isLogin')
  public setLoginStatus(): any | null {

  }

  @Action
  public getLoginInfo(context: { commit: Commit }, payload: any): any {
    getLoginStatus().then((res: any) => {
      if (res) {
        context.commit('setLoginStatus', res.isLogin);
      }
    }).catch(() => {});
  }
}
