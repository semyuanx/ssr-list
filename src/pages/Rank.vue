<template>
  <div class="rank-container">
    <div>
      <FilterHeader @filter="handleFilter" />
    </div>
    <div>
      <List @sortChange="sortChange" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

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
  @RankStore.Action
  getRankList: any;

  @RankStore.State
  rankParams: any;

  @RankStore.State
  checkedBrokers: any;

  @RankStore.Mutation
  setFilterRes: any;

  handleFilter() {
    this.filterResult();
    this.getRankList(this.refactor());
  }

  sortChange({ prop, order }: any) {
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
    this.getRankList(this.refactor());
  }

  mounted() {
    this.getRankList(this.refactor());
  }

  private refactor(params: any = {}) {
    const obj: any = Object.assign({}, this.rankParams);
    return {
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
