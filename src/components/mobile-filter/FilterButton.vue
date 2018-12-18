<template>
  <div class="filter-button-container">
    <button
      class="btn normal-btn"
      :class="{'border-btn':border,'active-btn':active,'closed-btn':closed}"
    >
      <slot>不限</slot>
      <i
        class="fm-fonticon icon-close_24px"
        v-if="closed"
        @click.stop="handleClose"
      ></i>
    </button>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';

@Component
export default class FilterButton extends Vue {
  @Prop({ default: false }) active!: boolean;

  @Prop({ default: false }) border!: boolean;

  @Prop({ default: false }) closed!: boolean;

  @Emit()
  handleClose() {}
}
</script>


<style lang="less" scoped>
.filter-button-container {
  display: inline-flex;
  .btn {
    outline: none;
    height: 26px;
    line-height: 26px;
    padding: 0 12px;
    font-size: 12px;
    font-weight: 500;
    font-family: PingFang-SC-Medium;
    border-radius: 2px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
  }
  .normal-btn {
    background-color: #f6f6f6;
    border: 1px solid #f6f6f6;
    color: #666666;
  }
  .active-btn,
  .closed-btn {
    background-color: #fff7f2;
    border: 1px solid #fff7f2;
    color: #ff6200;
  }
  .border-btn {
    background-color: #fff;
    border: 1px solid #ff6200;
    color: #ff6200;
  }
  .fm-fonticon {
    font-size: 16px;
    margin-left: 5px;
    margin-right: -5px;
  }
}
</style>
