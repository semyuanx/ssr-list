<template>
  <div class="rank-container">
    <div>
      <FilterHeader/>
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
  rankParams:any;

  mounted() {
    this.getRankList(this.rankParams);
  }
}
</script>
<style lang="less" scoped>
.rank-container {

}
</style>
