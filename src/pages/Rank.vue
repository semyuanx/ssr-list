<template>
  <div class="rank-container">
    <div>
      <FilterHeader @filter="handleFilter" />
    </div>
    <div>
      <List />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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

  handleFilter() {
    this.getRankList(this.refactor());
  }

  mounted() {
    this.getRankList(this.refactor());
  }

  private refactor() {
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
    };
  }
}
</script>
<style lang="less" scoped>
.rank-container {
}
</style>
