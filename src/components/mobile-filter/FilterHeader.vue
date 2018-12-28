<template>
  <section class="filter-selected-container">
    <div>
      <filter-button
        class="filter-button"
        v-for="(item,index) in result"
        :key="index"
      >
        <span>{{item.label}}</span>&nbsp;
        <span> {{item.val}}</span>
      </filter-button>
    </div>
    <router-link
      to="/filter"
      class="filter-link"
    >
      <i class="icon-filtrate_24px"></i> <span>筛选</span>
    </router-link>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FilterButton from './FilterButton.vue';
import { namespace } from 'vuex-class';

const RankStore = namespace('RankStore');

@Component({
  components: {
    FilterButton,
  },
})
export default class FilterHeader extends Vue {
  @RankStore.State
  filterRes: any;

  get result() {
    return this.filterRes.filter((v: any) => v.id).slice(0, 2);
  }
}
</script>

<style lang="less" scoped>
@theme-color: #ff6200;
.filter-selected-container {
  border-bottom: 1px solid #ebeef5;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 38px;

  font-family: PingFang-SC-Medium;
  color: #333;
  font-weight: 500;
  background-color: #fff;
  font-size: 14px;
  .filter-link {
    text-decoration: none;
    color: @theme-color;
    font-size: 14px;
  }
  .filter-button {
    margin-right: 10px;
    margin-bottom: 6px;
    margin-top: 6px;
  }
}
</style>
