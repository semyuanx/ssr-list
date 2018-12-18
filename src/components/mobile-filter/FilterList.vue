<template>
  <div class="filter-list-container">

  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class FilterList extends Vue {
  @Emit()
  handleAdd() {}
}
</script>

<style lang="less" scoped>
</style>
