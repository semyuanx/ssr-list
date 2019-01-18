import {
  State, Repository, Action, Getter, Mutation, Set,
} from '@/utils/store-class-annotation';
import { Commit, ActionTree } from 'vuex';
import {
  getCustomConfig, getCustomRankList, getMasterFollowerService, getRankFollowersService,
  getRankDynamicsService,
} from '@/service/home';
import { getAllProducts } from '@/service/manager';

@Repository('HomeStore')
export default class HomeStore {
  @State([])
  public configs: Array<any> = [];

  @State([])
  public progressProducts: Array<any> = [];

  @State([])

  public masterFollower: Array<any> = []; // 交易大师

  @Set('configs')
  public setConfig(): any | null { }

  @Set('progressProducts')
  public setProgressProducts(): any | null { }

  @Set('masterFollower')
  public setMasterFollower(): any | null { }

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
    const key = 'home-page-config';
    if (typeof localStorage !== 'undefined') {
      const cacheData = localStorage.getItem(key);
      try {
        if (cacheData) {
          const result = JSON.parse(cacheData);
          context.commit('setConfig', result);
        }
      } catch (e) {
        console.log(e);
      }
    }

    getCustomConfig().then((res: any) => {
      if (res && res.cfgs) {
        const data: Array<any> = Array.isArray(res.cfgs) ? res.cfgs.sort((a: any, b: any) => (a.RankIndex - b.RankIndex > 0 ? 1 : -1)) : [];

        const dPromise: Array<Promise<any>> = data.map(async (element:any) => {
          if (element.RankIndex) {
            try {
              const resp: Promise<any> = await getCustomRankList({ rankIndex: element.RankIndex });
              console.log(resp, 'resp');
              return { ...element, listData: resp };
            } catch (e) {
              return { element };
            }
          } else {
            return { element };
          }
        });

        Promise.all(dPromise).then((result: any) => {
          console.log(result, 'result');

          if (result && typeof localStorage !== 'undefined') {
            try {
              localStorage.setItem(key, JSON.stringify(result));
            } catch (e) {
              console.log(e);
            }
          }

          context.commit('setConfig', result);
        });
      }
    }).catch(() => {});
  }


  @Action
  public async getProductsAsync(context: any, params: any) {
    const { commit } = context;
    let data: any = {};
    try {
      data = await getAllProducts(params);
    } catch (e) {
      console.log(e);
    }
    if (data.items) {
      console.log(data, 'progressProducts');
      commit('setProgressProducts', data.items);
    }
    return data;
  }

  @Action
  public async getMasterFollower(context: any, params: any) {
    const { commit } = context;
    let data: any = {};
    try {
      data = await getMasterFollowerService(params);
    } catch (e) {
      console.log(e);
    }
    if (data.items) {
      console.log(data, 'setMasterFollower');
      commit('setMasterFollower', data.items);
    }
    return data;
  }

  @Action
  public async getRankFollowers(context: any, params: any) {
    const { commit } = context;
    let data: any = {};
    try {
      data = await getRankFollowersService(params);
    } catch (e) {
      console.log(e);
    }
    // if (data.items) {
    //   // console.log(data, 'setMasterFollower');
    //   // commit('setMasterFollower', data.items);
    // }
    return data;
  }

  @Action
  public async getRankDynamics(context: any, params: any) {
    const { commit } = context;
    let data: any = {};
    try {
      data = await getRankDynamicsService(params);
    } catch (e) {
      console.log(e);
    }
    // if (data.items) {
    //   // console.log(data, 'setMasterFollower');
    //   // commit('setMasterFollower', data.items);
    // }
    return { data };
  }
}
