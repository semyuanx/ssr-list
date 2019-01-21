<template>
  <div
    class="tag-container"
    :class="{active:active,border:border,closed:closed}"
    @click="handleClick"
  >
    <slot>{{$t('unlimited')}}</slot>
    <i
      class="fm-fonticon icon-close_24px"
      v-if="closed"
      @click.stop="handleClose"
    ></i>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';

import zhCN from '@/i18n/zh-CN/components/filter-popover/FilterTag';
import zhTW from '@/i18n/zh-TW/components/filter-popover/FilterTag';
import enUS from '@/i18n/en-US/components/filter-popover/FilterTag';

@Component({
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
    },
  },
})
export default class FilterTag extends Vue {
  @Prop({ default: false }) active!: boolean;

  @Prop({ default: false }) border!: boolean;

  @Prop({ default: false }) closed!: boolean;

  @Emit('close')
  public handleClose() {
  }

  @Emit('selected')
  public handleClick() {
  }
}
</script>

<style lang="less" scoped>
@theme-color: #ff6200;
.tag-container {
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  height: 24px;
  line-height: 24px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid transparent;
  // margin-right: 10px;
  margin-bottom: 10px;
  user-select: none;
  cursor: pointer;
  &:hover {
    color: @theme-color;
    // border: 1px solid @theme-color;
  }
  &.border {
    border-color: #e6e6e6;
  }
  &.active,
  &.closed {
    color: @theme-color;
    border-color: @theme-color;
  }
  &.closed {
    .fm-fonticon {
      width: 16px;
      height: 16px;
      font-size: 16px;
      line-height: 16px;
      color: #767676;
      margin-right: -8px;
    }
  }
}
</style>
