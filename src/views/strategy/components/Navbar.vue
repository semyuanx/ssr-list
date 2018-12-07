<template>
  <article class="navbar">
    <ul class="navbar-item navbar-left">
      <li
        class="navbar-left-item"
        :class="{active:currentTag=== index}"
        v-for="(item,index) in tags"
        :key="index"
        @click="handleClick(index)"
      >
        <a href="javascript:;">{{item}}</a>
      </li>
    </ul>
    <ul class="navbar-item navbar-right">
      <li class="navbar-right-item">
        <a href="javascript:;">
          <i class="fm-fonticon icon-plus_24px"></i>
          <span>创建MAM账户</span>
        </a>
      </li>
      <li class="navbar-right-item">
        <a href="javascript:;">
          <i class="fm-fonticon  icon-flag_24px"></i>
          <span>自主发起产品</span>
        </a>
      </li>
    </ul>
  </article>
</template>
<script lang="ts">
import {
  Vue, Prop, Component, Emit,
} from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {
  currentTag: number = 0;

  tags: Array<string> = ['进行中', '已结束'];

  @Emit('change')
  handleClick(index: number) {
    console.log(index);
    this.currentTag = index;
  }
}
</script>
<style lang="less" scoped>
.navbar {
  background-color: #fff;
  height: 60px;
  width: 1180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(51, 51, 51, 1);
  padding: 0 26px;
  &-item {
    display: inline-flex;
    align-items: center;
    li {
      a {
        display: inline-flex;
        align-items: center;
        color: rgba(51, 51, 51, 1);
      }
      & + li {
        margin-left: 20px;
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
      padding: 0 5px;
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
