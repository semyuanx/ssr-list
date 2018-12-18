<template>
  <div class="filter-list-item-container">

  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class FilterListItem extends Vue {
  @Emit()
  handleAdd() {}
}
</script>

<style lang="less" scoped>
</style>
