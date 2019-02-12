<template>
  <div class="rank-container">
    <div>
      <FilterHeader @filter="handleFilter" />
    </div>
    <div style="padding-bottom:40px;">
      <List :showProps="showProps" :getData="getData" @sortChange="sortChange" />
      <div class="listNone" v-if="!hasMore">{{ $t('noData') }}</div>
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
import zhCN from '@/i18n/zh-CN/pages/Rank';
import zhTW from '@/i18n/zh-TW/pages/Rank';
import zhHK from '@/i18n/zh-HK/pages/Rank';
import enUS from '@/i18n/en-US/pages/Rank';

const RankStore = namespace('RankStore');

let isEnterLoad: boolean = false;

@Component({
  components: {
    FilterHeader,
    List,
  },
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
      'zh-HK': zhHK,
    },
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
        label: this.$i18n.t('jynlz'),
        val: this.refactorWord('', this.rankParams.Score),
      },
      {
        label: this.$i18n.t('zhjz'),
        val: this.refactorWord('$', this.rankParams.Equity),
      },
      {
        label: this.$i18n.t('weeks'),
        val: this.refactorWord('周', this.rankParams.Weeks),
      },
      {
        label: this.$i18n.t('maxBackRate'),
        val: this.refactorWord('%', this.rankParams.Retracement),
      },
      { label: this.$i18n.t('syl'), val: this.refactorWord('%', this.rankParams.Roi) },
      { label: this.$i18n.t('jjs'), val: this.rankParams.brokerId },
    ]);
  }

  private refactorWord(unit: string, val: any) {
    if (!val) {
      return this.$i18n.t('unlimited');
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
    this.getSepRankConfig({ index: 1 }).then(() => {
      this.getData();
    });

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
    const footerEl = document.getElementsByClassName('page-footer')[0];
    const allHeight = scrollTop + windowHeight + (this.throttleHeight || 10) + footerEl.clientHeight || 0;
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
    const needLoad = this.computeNeedLoad();
    if (needLoad) {
      this.getData().then(() => {
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
      ...this.params,
      ...params,
    };

    const brokerList = this.checkedBrokers.length ? { brokerId: this.checkedBrokers.join(';') } : {};
    const processParam = this.preProcessParams(obj);
    getParams = { ...processParam, ...getParams, ...brokerList };
    if ('minSubscribers' in getParams) {
      getParams.minSubCount = getParams.minSubscribers;
    }
    if ('maxSubscribers' in getParams) {
      getParams.maxSubCount = getParams.maxSubscribers;
    }
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
    const needPercent = ['Retracement', 'Roi'];

    if (obj) {
      Object.keys(obj).forEach((i: any) => {
        const val: any = obj[i];
        if (val) {
          if (val && typeof val === 'string') {
            if (val.includes('-')) {
              const split: any = val.split('-');
              if (split && split.length) {
                // eslint-disable-next-line
                params[`min${i}`] = needPercent.includes(i) ? (split[0] / 100): split[0];
                // eslint-disable-next-line
                params[`max${i}`] = needPercent.includes(i) ? (split[1] / 100): split[1];
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
  // padding-top: 20px;
}
.listNone{
  text-align: center;
  font-size: 14px;
  padding-top: 20px;
  color: #666;
}
</style>
