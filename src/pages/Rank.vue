<template>
  <div class="rank-container">
    <div>
      <FilterHeader @filter="handleFilter" />
    </div>
    <div>
      <List :showProps="showProps" :getData="getData" @sortChange="sortChange" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import throttle from 'lodash.throttle';
import isequal from 'lodash.isequal';

import FilterHeader from '@/views/rank-list/FilterHeader.vue';
import List from '@/views/rank-list/List.vue';
import { getElementTop, animate } from '@/utils/util';

const RankStore = namespace('RankStore');

let isEnterLoad: boolean = false;

@Component({
  components: {
    FilterHeader,
    List,
  },
})
export default class RankList extends Vue {
  @RankStore.State
  rankListLoading: any;

  @RankStore.Action
  getRankList: any;

  @RankStore.Action
  getSepRankConfig: any;

  @RankStore.State
  rankParams: any;

  @RankStore.State
  pageIndex: any;

  @RankStore.Mutation
  setPageIndex: any;

  @RankStore.State
  checkedBrokers: any;

  @RankStore.State
  showProps: any;

  @RankStore.Mutation
  setFilterRes: any;

  params: any = {
    index: 1,
    size: 20,
  };

  setParams(params: any) {
    this.params = { ...this.params, ...params };
  }

  handleFilter() {
    this.resetIndex();
    this.filterResult();
    this.$nextTick(() => {
      this.getData();
    });
  }

  sortArr: any = [];

  startQueue: any = false;

  sortChange({ prop, order: ord }: any) {
    const order = ord === 'ascending' ? 0 : 1;
    const params = {
      orderby: prop,
      isDESC: order,
    };

    this.sortArr.push(params);
    if (!this.startQueue) {
      this.startQueue = true;
      this.$nextTick(() => {
        this.getSortData();
      });
    }
  }

  getSortData(param?: any) {
    let params = param;
    const len = this.sortArr.length;
    if (!params) {
      if (len > 1) {
        params = this.sortArr[len - 1];
        this.sortArr = [];
      } else {
        params = this.sortArr.shift();
      }
    }
    if (!params) {
      this.startQueue = false;
      return;
    }
    this.resetIndex();
    this.setParams(params);
    this.getRankList(
      this.refactor(params),
    ).then(() => {
      this.getSortData();
    });
  }

  public filterResult() {
    this.setFilterRes([
      {
        label: '交易能力值',
        val: this.refactorWord('', this.rankParams.Score),
      },
      {
        label: '账户净值',
        val: this.refactorWord('$', this.rankParams.Equity),
      },
      {
        label: '交易周期',
        val: this.refactorWord('周', this.rankParams.Weeks),
      },
      {
        label: '最大回撤比例',
        val: this.refactorWord('%', this.rankParams.Retracement),
      },
      { label: '收益率', val: this.refactorWord('%', this.rankParams.Roi) },
      { label: '经纪商', val: this.rankParams.brokerId },
    ]);
  }

  private refactorWord(unit: string, val: any) {
    if (!val) {
      return '不限';
    }
    const arr: string[] = val.split('-');
    if (arr[0] === '0') {
      return `< ${this.unitLocation(unit, arr[1])}`;
    }
    if (arr[1] === '0') {
      return `> ${this.unitLocation(unit, arr[0])}`;
    }
    return `${this.unitLocation(unit, arr[0])}-${this.unitLocation(
      unit,
      arr[1],
    )}`;
  }

  private unitLocation(unit: string, val: string) {
    return unit === '$' ? unit + val : val + unit;
  }

  @Watch('rankParams', { deep: true })
  handleRefresh() {
    this.resetIndex();
    this.getPageData();
  }

  resetIndex() {
    // this.index = 1;
    this.setPageIndex(1);
    this.hasMore = true;
    this.params.index = 1;
  }

  private get index() {
    return this.pageIndex || 1;
  }

  getPageData(page: number = 1) {
    this.$nextTick(() => {
      this.getData();
    });
  }

  hasMore: boolean = true;

  updatePageIndex() {
    const { index } = this.params;
    this.setParams({ index: index + 1 });
  }

  dataLoading: boolean = false;

  getData() {
    const params: any = this.refactor();
    const { size } = this.params;
    console.log(params, 'pppppp', this.hasMore);
    if (!this.hasMore) {
      return new Promise(() => ({}));
    }
    return this.getRankList(params)
      .then((res: any) => {
        if (res && !res.error) {
          const { List: list } = res;
          console.log(list.length, size, 'List.length');
          if (list.length < size) {
            this.hasMore = false;
          } else {
            this.updatePageIndex();
          }
        }
        this.dataLoading = false;
        return res;
      });
  }

  fixHeader() {
    const scrollTop = this.getScrollTop();

    animate(() => {
      this.needFixTableHeader(scrollTop);
    });
  }

  mounted() {
    // this.getPageData();
    this.getSepRankConfig({ index: 1 });
    this.getData();
    const loadThrottle = throttle(this.scrollCb, 200);
    const fixThrottle = throttle(this.fixHeader, 200);

    window.addEventListener('scroll', () => {
      fixThrottle();
      if (isEnterLoad || this.rankListLoading || !this.hasMore) return;
      isEnterLoad = true;
      loadThrottle();
    });
  }

  unmouted() {
    window.removeEventListener('scroll', () => {
      if (isEnterLoad || this.rankListLoading) return;
      isEnterLoad = true;
      throttle(this.scrollCb, 200)();
    });
  }


  scrollCb() {
    animate(() => {
      this.loadMore();
    });
  }

  throttleHeight = 50;

  getScrollTop() {
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      // eslint-disable-next-line
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      // eslint-disable-next-line
      scrollTop = document.body.scrollTop;
    }
    return scrollTop;
  }

  getWinHeight() {
    let windowHeight = document.body.clientHeight;
    if (document.documentElement && document.documentElement.clientHeight) {
      windowHeight = document.documentElement.clientHeight;
    }
    return windowHeight;
  }

  getDocHeight() {
    let docHeight = document.body.scrollHeight;
    if (document.documentElement && document.documentElement.scrollHeight) {
      docHeight = document.documentElement.scrollHeight;
    }
    return docHeight;
  }

  getTopNavHeight() {
    let height = 50;
    const nav = document.getElementById('fm-top-nav');
    if (nav) {
      height = nav.offsetHeight;
    }
    return height;
  }

  setStyleProp(el: any, val: any, prop: any) {
    if (el && el[prop] !== val) {
      el.style[prop] = val;
    }
  }

  needFixTableHeader(scrollTop: number) {
    const el = this.$el;
    if (el) {
      const rankTable = el.querySelector('.rank-table');
      if (rankTable) {
        const header: any = rankTable.querySelector('.el-table__header-wrapper');
        if (header) {
          const top = getElementTop(header);
          if (scrollTop > top) {
            const navHeight = this.getTopNavHeight();
            this.setStyleProp(header, 'fixed', 'position');
            this.setStyleProp(header, `${navHeight}px`, 'top');
            this.setStyleProp(header, 200, 'zIndex');
          } else {
            this.setStyleProp(header, 'unset', 'position');
          }
        }
      }
    }
  }

  computeNeedLoad() {
    const scrollTop = this.getScrollTop();
    const windowHeight = this.getWinHeight();
    const docHeight = this.getDocHeight();

    const allHeight = scrollTop + windowHeight + (this.throttleHeight || 10);
    if (allHeight > docHeight) {
      return true;
    }
    return false;
  }

  scrollTo(height: number) {
    if (window.scrollTo) {
      animate(() => {
        window.scrollTo(0, height);
      });
    }
  }

  tdHeight: number = 50;

  computeTrHeight(n?:number) {
    const tableBody = document.querySelector('.el-table__body');
    let height = 50;
    if (tableBody) {
      const tr = tableBody.querySelector('tr');
      if (tr) {
        height = tr.offsetHeight;
      }
    }
    return height * (n || 5);
  }

  loadMore() {
    const scrollTop = this.getScrollTop();
    const windowHeight = this.getWinHeight();
    const docHeight = this.getDocHeight();

    const needLoad = this.computeNeedLoad();

    const reScroll = scrollTop - this.computeTrHeight(5);

    if (needLoad) {
      this.scrollTo(reScroll);
      this.getData().then(() => {
        const reComputeNeedLoad = this.computeNeedLoad();
        if (reComputeNeedLoad) {
          this.scrollTo(reScroll);
        }
        isEnterLoad = false;
      });
    } else {
      isEnterLoad = false;
    }
  }

  private refactor(params: any = {}) {
    console.log(this.pageIndex, 'this.pageIndex');
    const obj: any = Object.assign({}, this.rankParams);
    let getParams = {
      index: this.index || 1,
      size: 20,
      // maxScore: obj.Score && obj.Score.split('-')[1],
      // minScore: obj.Score && obj.Score.split('-')[0],
      // minRoi: obj.Roi && obj.Roi.split('-')[0],
      // maxRoi: obj.Roi && obj.Roi.split('-')[1],
      // maxRetracement: obj.Retracement && obj.Retracement.split('-')[1],
      // minRetracement: obj.Retracement && obj.Retracement.split('-')[0],
      // maxWeeks: obj.Weeks && obj.Weeks.split('-')[1],
      // minWeeks: obj.Weeks && obj.Weeks.split('-')[0],
      // maxEquity: obj.Equity && obj.Equity.split('-')[1],
      // minEquity: obj.Equity && obj.Equity.split('-')[0],
      ...this.params,
      ...params,
    };

    const brokerList = this.checkedBrokers.length ? { brokerId: this.checkedBrokers } : {};
    const processParam = this.preProcessParams(obj);
    getParams = { ...processParam, ...getParams, ...brokerList };
    // console.log()
    if (!isequal(this.allParams, getParams)) {
      this.allParams = getParams;
    }
    console.log(getParams, 'getParams');
    return getParams;
  }

  allParams: any = {};

  @Watch('allParams')
  allParamsChanged(v:any) {
    console.log('allParams has changed', performance.now(), v);
  }

  preProcessParams(obj: any) {
    const params: any = {};
    if (obj) {
      Object.keys(obj).forEach((i: any) => {
        const val: any = obj[i];
        if (val) {
          if (val && typeof val === 'string') {
            if (val.includes('-')) {
              const split = val.split('-');
              if (split && split.length) {
                // eslint-disable-next-line
                params[`min${i}`] = split[0];
                // eslint-disable-next-line
                params[`max${i}`] = split[1];
              }
            } else {
              params[i] = val;
            }
          } else if (typeof val === 'number' || typeof val === 'boolean') {
            params[i] = val;
          }
        } else if (typeof val === 'number' || typeof val === 'boolean') {
          params[i] = val;
        }
      });
    }
    return params;
  }
}
</script>
<style lang="less" scoped>
.rank-container {
  padding-top: 20px;
}
</style>
