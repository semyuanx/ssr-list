<template>
  <article class="navbar">
    <!-- <ul class="navbar-item navbar-left">
      <li
        class="navbar-left-item"
        :class="{active:currentTag=== item.value}"
        v-for="(item,index) in tags"
        :key="index"
        @click="handleClick(item.value)"
      >
        <a href="javascript:;">{{item.name}}</a>
      </li>
    </ul> -->
    <ul class="navbar-item navbar-left">
      <li
        class="navbar-right-item"
        @click="startMam"
      >
        <a href="javascript:;">
          <i class="fm-fonticon icon-plus_24px"></i>
          <span>{{$t('createAccount')}}</span>
        </a>
      </li>
      <li
        class="navbar-right-item"
        @click="startProduct"
      >
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
import zhHK from '@/i18n/zh-HK/views/InvestManager/Navbar';

@Component({
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
      'zh-HK': zhHK,
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
    { name: this.lang('jinxingzhong'), value: 'InProcess' },
    { name: this.lang('yijieshu'), value: 'Settled' },
  ];

  public lang(path: string) {
    return this.$i18n.t(path);
  }

  @Emit('change')
  handleClick(index: string) {
    // console.log(index);
  }

  @Emit('startMam')
  startMam() {}

  @Emit('startProduct')
  startProduct() {}
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
  .height(90);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14rem / @base-font;
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
          background: rgb(138, 118, 105);
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
      border: 1px solid #cccccc;
      padding: 5rem / @base-font 10rem / @base-font;
      border-radius: 30rem / @base-font;
      i {
        color: @default-color;
        margin-right: 4rem / @base-font;
      }
      &:hover {
        border-color: @default-color;
        span {
          color: @default-color;
        }
      }
    }
  }
}
</style>
