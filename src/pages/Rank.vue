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

const RankStore = namespace('RankStore');

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

  handleFilter() {
    this.filterResult();
    this.getRankList(this.refactor());
  }

  sortChange({ prop, order }: any) {
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
    // this.getRankList(this.refactor());
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
    return this.getRankList(this.refactor());
  }


  mounted() {
    // this.getPageData();
    this.getData();
    // window.addEventListener('scroll', throttle(this.scrollCb, 200));
    // window.addEventListener('scroll', this.scrollCb)
  }

  unmouted() {
    window.removeEventListener('scroll', throttle(this.scrollCb, 200));
  }

  isProcess: boolean = false;

  scrollCb() {
    console.log('scroll');
    if (this.rankListLoading) {
      return;
    }
    // requestAnimationFrame(() => {
    this.isProcess = true;
    this.loadMore();
    // });
  }

  throttleHeight = 200;

  preHeight = 0;

  loadMore() {
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      // eslint-disable-next-line
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      // eslint-disable-next-line
      scrollTop = document.body.scrollTop;
    }
    let docHeight = document.body.scrollHeight;
    if (document.documentElement && document.documentElement.scrollHeight) {
      docHeight = document.documentElement.scrollHeight;
    }
    let windowHeight = document.body.clientHeight;
    if (document.documentElement && document.documentElement.clientHeight) {
      windowHeight = document.documentElement.clientHeight;
    }
    if (document.documentElement && document.documentElement.scrollTop) {
      // eslint-disable-next-line
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      // eslint-disable-next-line
      scrollTop = document.body.scrollTop;
    }
    // console.log(`scrollTop: ${scrollTop} \r\n docHeight: ${docHeight} \r\n windowHeight: ${windowHeight}`)
    const allHeight = scrollTop + windowHeight + (this.throttleHeight || 10);
    if (allHeight > docHeight) {
      console.log(' can loading ');
      this.getData();
    } else {
      this.isProcess = false;
    }
    this.preHeight = allHeight;
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
      ...params,
    };
  }
}
</script>
<style lang="less" scoped>
.rank-container {
}
</style>
