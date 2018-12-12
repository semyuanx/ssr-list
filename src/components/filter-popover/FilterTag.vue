<template>
  <div class="tag-container" :class="{active:active,border:border}">
    <slot>不限</slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class FilterTag extends Vue {
  @Prop({ default: false }) active!: boolean;

  @Prop({ default: false }) border!: boolean;
}
</script>

<style lang="less" scoped>
@theme-color: #ff6200;
.tag-container {
  font-size: 12px;
  display: inline-block;
  border-radius: 12px;
  height: 24px;
  line-height: 24px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  border:1px solid transparent;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &.border{
    border-color: #e6e6e6;
  }
  &.active {
    color: @theme-color;
    border-color: @theme-color;
  }
}
</style>
