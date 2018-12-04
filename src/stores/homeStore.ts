import {
  State, Repository, Action, Getter, Mutation, Set,
} from '@/utils/store-class-annotation';
import { getLoginStatus } from '@/service/home';

@Repository('homeStore')
export default class HomeStore {
  @State
  public isLogin: boolean = false;

  @Mutation
  /**
   * setLoginStatus
   */
  public setLoginStatus(state: any, isLogin: boolean) {
    state.isLogin = isLogin;
  }

  @Action
  /**
   * getLoginInfo
   */
  public getLoginInfo({ commit }: any, payload: any) {
    getLoginStatus().then((res: any) => {
      if (res) {
        commit('setLoginStatus', res.isLogin);
      }
    }).catch(() => {});
  }
}
