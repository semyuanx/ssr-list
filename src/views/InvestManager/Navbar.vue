<template>
  <article class="navbar">
    <ul class="navbar-item navbar-left">
      <li
        class="navbar-left-item"
        :class="{active:currentTag=== item.value}"
        v-for="(item,index) in tags"
        :key="index"
        @click="handleClick(item.value)"
      >
        <a href="javascript:;">{{item.name}}</a>
      </li>
    </ul>
    <ul class="navbar-item navbar-right">
      <li class="navbar-right-item">
        <a href="javascript:;">
          <i class="fm-fonticon icon-plus_24px"></i>
          <span>{{$t('createAccount')}}</span>
        </a>
      </li>
      <li class="navbar-right-item">
        <a href="javascript:;">
          <i class="fm-fonticon  icon-flag_24px"></i>
          <span>{{$t('launchedProduct')}}</span>
        </a>
      </li>
    </ul>
  </article>
</template>
<script lang="ts">
import {
  Vue, Prop, Component, Emit,
} from 'vue-property-decorator';
import zhCN from '@/i18n/zh-CN/views/InvestManager/Navbar';
import zhTW from '@/i18n/zh-TW/views/InvestManager/Navbar';
import enUS from '@/i18n/en-US/views/InvestManager/Navbar';

@Component({
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
    },
  },
})
export default class Navbar extends Vue {
  @Prop({
    type: String,
    default: 'InProcess',
    validator: value => ['InProcess', 'Settled'].indexOf(value) !== -1,
  })
  public currentTag!: string;

  public tags: Array<any> = [
    { name: '进行中', value: 'InProcess' },
    { name: '已结束', value: 'Settled' },
  ];

  @Emit('change')
  handleClick(index: string) {
    console.log(index);
  }
}
</script>
<style lang="less" scoped>
@base-font: 24;
@media screen and (max-width: 880px) {
  @base-font: 20;
}
.height(@value) {
  height: unit(@value / @base-font, rem);
}
.navbar {
  background-color: #fff;
  .height(60);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16rem / @base-font;
  font-family: MicrosoftYaHei;
  color: rgba(51, 51, 51, 1);
  padding: 0 26rem / @base-font;
  white-space: nowrap;
  @media screen and (max-width: 880px) {
    padding: 0 10rem / @base-font;
    font-size: 12rem / @base-font;
  }
  &-item {
    display: inline-flex;
    align-items: center;
    li {
      a {
        display: inline-flex;
        align-items: center;
        color: rgba(51, 51, 51, 1);
        text-decoration: none;
      }
      & + li {
        margin-left: 20rem / @base-font;
      }
    }
  }
  &-left {
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    &-item {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      position: relative;
      padding: 0 5rem / @base-font;
      height: 100%;
      &.active {
        &:after {
          content: "";
          width: 100%;
          height: 2px;
          background: rgba(255, 98, 0, 1);
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
  &-right {
    justify-content: flex-end;
    &-item {
      align-items: center;
    }
  }
}
</style>
