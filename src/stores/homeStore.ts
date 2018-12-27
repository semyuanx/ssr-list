import {
  State, Repository, Action, Getter, Mutation, Set,
} from '@/utils/store-class-annotation';
import { Commit, ActionTree } from 'vuex';
import { getCustomConfig, getCustomRankList } from '@/service/home';

@Repository('HomeStore')
export default class HomeStore {
  @State([])
  public configs: Array<any> = [];

  @Set('configs')
  public setConfig(): any | null { }

  // async retry(tryTime: number = 3) {
  //   const toGet = async (index: number) => {
  //     try {
  //       const data = await getCustomRankList({ rankIndex: index });
  //       return data;
  //     } catch (e) {
  //       return false;
  //     }
  //   };
  //   return async function (index: number) {
  //     for (let i = 0; i < tryTime; i++) {
  //       const data = await toGet(index);
  //       if (data) return data;
  //     }
  //   };
  // }

  @Action
  public getCustomConfig(context: { commit: Commit }, payload: any): any {
    getCustomConfig().then((res: any) => {
      if (res && res.cfgs) {
        const data: Array<any> = Array.isArray(res.cfgs) ? res.cfgs.sort((a: any, b: any) => (a.RankIndex - b.RankIndex > 0 ? 1 : -1)) : [];

        const dPromise: Array<Promise<any>> = data.map(async (element:any) => {
          if (element.RankIndex) {
            try {
              const resp: Promise<any> = await getCustomRankList({ rankIndex: element.RankIndex });
              console.log(resp, 'resp');
              return { element, data: resp };
            } catch (e) {
              return { element };
            }
          } else {
            return { element };
          }
        });

        Promise.all(dPromise).then((result: any) => {
          console.log(result, 'result');
          context.commit('setConfig', result);
        });
      }
    }).catch(() => {});
  }
}
