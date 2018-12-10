import {
  State, Repository, Action, Getter, Set,
} from '@/utils/store-class-annotation';
import { Commit } from 'vuex';
import { getAllProducts } from '@/service/manager';

/**
 *  获取投资管家产品列表
 */
@Repository('managerStore')
export default class ManagerStore {
  @State(() => [1, 2, 3])
  public allProducts: Array<any> = [1, 2, 3];

  @Set('allProducts')
  public setAllProducts(): any | null {

  }

  @Action
  public getAllProductsAsync(context: { commit: Commit }, payload: any): any {
    getAllProducts().then((res: any) => {
      if (res) {
        context.commit('setAllProducts', res);
      }
    }).catch(() => {});
  }
}
