<template>
  <div class="filter-submit-container">
    <button
      class="btn reset-btn"
      @click.stop.prevent="reset"
    >重置</button>
    <button
      class="btn confirm-btn"
      @click.stop.prevent="submit"
      @keyup.enter.stop.prevent="submit"
    >确定</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class FilterSubmit extends Vue {
  @Emit()
  submit() {}

  @Emit()
  reset() {}
}
</script>


<style lang="less" scoped>
.filter-submit-container {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 1;
  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #f1f2f4;
  background-color: #fff;
  padding: 0 10px;
  .btn {
    outline: none;
    height: 40px;
    box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    font-weight: 500;
    font-size: 16px;
    font-family: PingFang-SC-Medium;
    margin-left: 5px;
    margin-right: 5px;
    &.reset-btn {
      color: #666;
      background-color: #fff;
      border: 1px solid #666;
      flex:1;
    }
    &.confirm-btn {
      color: #fff;
      background-color: #ff6200;
      border: 1px solid #ff6200;
      flex:2;
    }
  }
}
</style>
