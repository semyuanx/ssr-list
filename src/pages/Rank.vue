<template>
  <div class="rank-container">
    <div>
      <FilterHeader @filter="handleFilter" />
    </div>
    <div>
      <List :getData="getData" @sortChange="sortChange" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import throttle from 'lodash.throttle';

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

  @RankStore.State
  rankParams: any;

  @RankStore.State
  pageIndex: any;

  @RankStore.Mutation
  setPageIndex: any;

  @RankStore.State
  checkedBrokers: any;

  @RankStore.Mutation
  setFilterRes: any;

  params: any = {};

  setParams(params: any) {
    this.params = { ...this.params, ...params };
  }

  handleFilter() {
    this.filterResult();
    this.getData();
  }

  sortChange({ prop, order }: any) {
    this.setParams({
      orderby: prop,
      order,
    });
    this.resetIndex();
    this.getRankList(
      this.refactor({
        orderby: prop,
        order,
      }),
    );
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
  }

  private get index() {
    return this.pageIndex || 1;
  }

  getPageData(page: number = 1) {
    this.getRankList(this.refactor({ index: page }));
  }

  getData() {
    const params: any = this.refactor();
    console.log(params, 'pppppp');
    return this.getRankList(params);
  }

  mounted() {
    // this.getPageData();
    this.getData();
    window.addEventListener('scroll', () => {
      if (isEnterLoad || this.rankListLoading) return;
      isEnterLoad = true;
      throttle(this.scrollCb, 200)();
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
    const nav = document.getElementById('#fm-top-nav');
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

    animate(() => {
      this.needFixTableHeader(scrollTop);
    });

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

  computeTrHeight() {
    const tableBody = document.querySelector('.el-table__body');
  }

  loadMore() {
    const scrollTop = this.getScrollTop();
    const windowHeight = this.getWinHeight();
    const docHeight = this.getDocHeight();

    const needLoad = this.computeNeedLoad();

    const reScroll = scrollTop - 300;

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
    return {
      index: this.index || 1,
      size: 20,
      maxScore: obj.Score && obj.Score.split('-')[1],
      minScore: obj.Score && obj.Score.split('-')[0],
      minRoi: obj.Roi && obj.Roi.split('-')[0],
      maxRoi: obj.Roi && obj.Roi.split('-')[1],
      maxRetracement: obj.Retracement && obj.Retracement.split('-')[1],
      minRetracement: obj.Retracement && obj.Retracement.split('-')[0],
      maxWeeks: obj.Weeks && obj.Weeks.split('-')[1],
      minWeeks: obj.Weeks && obj.Weeks.split('-')[0],
      maxEquity: obj.Equity && obj.Equity.split('-')[1],
      minEquity: obj.Equity && obj.Equity.split('-')[0],
      brokerId: this.checkedBrokers.join(','),
      ...this.params,
      ...params,
    };
  }
}
</script>
<style lang="less" scoped>
.rank-container {
}
</style>
