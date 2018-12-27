<template>
  <section class="filter-selected-container">
    <div>
      <filter-button class="filter-button">收益率 >10%</filter-button>
      <filter-button class="filter-button">最大回测 >10%</filter-button>
    </div>
    <router-link
      to="/filter"
      class="filter-link"
    >
      <span>筛选</span>
    </router-link>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FilterButton from './FilterButton.vue';

@Component({
  components: {
    FilterButton,
  },
})
export default class FilterHeader extends Vue {}
</script>

<style lang="less" scoped>
@theme-color:#ff6200;
.filter-selected-container {
  border-bottom: 1px solid #ebeef5;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
