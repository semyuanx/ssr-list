import {
  State, Repository, Action, Getter, Mutation, Set,
} from '@/utils/store-class-annotation';
import { Commit, ActionTree } from 'vuex';
import {
  getCustomConfig, getCustomRankList,
  getMasterFollowerService,
  getRankFollowersService,
  getRankDynamicsService,
  getSepRankConfigService,
} from '@/service/home';
import { getAllProducts } from '@/service/manager';
// import { processConfig } from '@/utils/format';
import storage from '@/utils/storage';
// import propMaps from '@/constant/propMap';

@Repository('HomeStore')
export default class HomeStore {
  @State([])
  public configs: Array<any> = [];

  @State([])
  public progressProducts: Array<any> = [];

  @State([])
  public masterFollower: Array<any> = [];

  // 交易大师
  @State({})
  public configsFollower: any = {};

  // 交易大师
  @State({})
  public configsInvest: any = {}; // 投资管家配置

  @Set('configs')
  public setConfig(): any | null { }

  @Set('configsInvest')
  public setSpecialConfig2(): any | null { }

  @Set('configsFollower')
  public setSpecialConfig3(): any | null { }

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
    let cacheData = storage.getValue(key);
    if (cacheData) {
      context.commit('setConfig', cacheData);
      cacheData = null;
    }

    getCustomConfig().then((res: any) => {
      if (res && res.cfgs) {
        const data: Array<any> = Array.isArray(res.cfgs) ? res.cfgs.sort((a: any, b: any) => (a.RankIndex - b.RankIndex > 0 ? 1 : -1)) : [];

        const dPromise: Array<Promise<any>> = data.map(async (element:any) => {
          if (element.RankIndex) {
            try {
              const resp: Promise<any> = await getCustomRankList({ rankIndex: element.RankIndex });
              // console.log(resp, 'resp');
              return { ...element, listData: resp };
            } catch (e) {
              return { element };
            }
          } else {
            return { element };
          }
        });

        Promise.all(dPromise).then((result: any) => {
          if (result) {
            storage.setValue(key, result);
          }
          context.commit('setConfig', result);
          result = null;
        });
      }
    }).catch(() => {});
  }


  @Action
  public async getProductsAsync(context: any, params: any) {
    const { commit } = context;
    const key = 'ovwew23awea';
    let cacheData = storage.getValue(key);
    if (cacheData) {
      context.commit('setProgressProducts', cacheData);
      cacheData = null;
    }
    let data: any = {};
    try {
      data = await getAllProducts(params);
    } catch (e) {
      console.log(e);
    }
    if (data.items) {
      commit('setProgressProducts', data.items);
      storage.setValue(key, data.items);
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
      // console.log(data, 'setMasterFollower');
      let items: any = data.items;
      items = items.map((i: any) => {
        if ('List' in i) {
          i.List = undefined;
        }
        return i;
      });
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

  // 特殊绑定设置
  @Action
  public async getSepRankConfig(context: { commit: Commit, state: any}, payload: any) {
    const { commit, state } = context;
    return getSepRankConfigService(payload).then((res: any) => {
      if (typeof payload !== 'object' && !payload.index) {
        return;
      }
      const { index } = payload;
      if (res) {
        commit(`setSpecialConfig${index}`, res);
      }
      // eslint-disable-next-line
      return res;
    });
  }
}
