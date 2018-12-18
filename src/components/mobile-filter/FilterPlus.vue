<template>
  <button class="plus-btn" @click.stop.prevent="handleAdd">
    <i class="fm-fonticon icon-plus_24px"></i>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class FilterPlus extends Vue {
  @Emit()
  handleAdd() {}
}
</script>

<style lang="less" scoped>
.plus-btn {
  width: 21px;
  height: 21px;
  border: 1px solid #cecece;
  border-radius: 2px;
  background-color: #fff;
  outline: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  .fm-fonticon{
    font-size: 14px;
    color:#cecece;
  }
}
</style>
