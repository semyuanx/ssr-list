import {
  State, Repository, Action, Getter, Mutation, Set,
} from '@/utils/store-class-annotation';
import { Commit, ActionTree } from 'vuex';
import { getCustomConfig } from '@/service/home';

@Repository('HomeStore')
export default class HomeStore {
  @State([])
  public configs: Array<any> = [];

  @Set('configs')
  public setConfig(): any | null { }

  @Action
  public getCustomConfig(context: { commit: Commit }, payload: any): any {
    getCustomConfig().then((res: any) => {
      console.log(res, 'getCustomConfig');
      if (res && res.cfgs) {
        context.commit('setConfig', res.cfgs || []);
      }
    }).catch(() => {});
  }
}
