<template>
  <div class="filter-title">
    <ul
      slot="left"
      class="filter-title-left"
    >
      <li
        :class="{'select':rankDomShow && $route.path==='/'}"
        @click="tabLeftLink"
      >优质上榜</li>
      <li
        @click="tabRightLink"
        :class="{'select': $route.path==='/invest'}"
      >MAM策略<i v-if="navTip"></i></li>
    </ul>
    <div
      slot="right"
      class="filter-title-right"
      @click="rightClick"
    >
      <span>{{ $t('cwjyy') || '' }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import zhCN from '@/i18n/zh-CN/views/home/pc/Strategy';
import zhTW from '@/i18n/zh-TW/views/home/pc/Strategy';
import enUS from '@/i18n/en-US/views/home/pc/Strategy';
import zhHK from '@/i18n/zh-HK/views/home/pc/Strategy';
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import eventBus from '@/utils/event';

const RankStore = namespace('RankStore');
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
export default class SbHeader extends Vue {
  @RankStore.State
  rankDomShow: any;

  @RankStore.Mutation
  setRankParams: any;

  @RankStore.State
  navTip: any;

  @RankStore.Mutation
  setNavTip: any;

  rightClick() {
    this.redirectTo('traderRegister');
    // this.$emit("rightClick");
  }

  tabRightLink() {
    this.setNavTip(false);
    this.$router.push({ name: 'investManager' });
  }

  tabLeftLink() {
    this.$nextTick(() => {
      // this.setRankParams({});
      eventBus.$emit('changeRankParams', 'clearFilterParams');
      this.$router.push({ path: '/' });
    });
  }
}
</script>

<style lang="less" scoped>
.filter-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  background-color: #ffffff;
  line-height: 1;
  padding-top: 13px;
  &-left {
    display: flex;
    color: #333;
    > li {
      cursor: pointer;
      float: left;
      padding: 5px 0;
      font-size: 16px;
      margin: 0 20px;
      padding-bottom: 13px;
      border-bottom: transparent 2px solid;
      position: relative;
      i {
        width: 8px;
        height: 8px;
        background: @default-color;
        border-radius: 8px;
        position: absolute;
        right: -10px;
        top: 0;
      }
    }
    > li.select {
      border-bottom-color: @default-color;
      color: @default-color;
    }
  }
  &-right {
    padding: 5px 10px;
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    color: @default-color;
    border-radius: 30px;
    cursor: pointer;
  }
}
</style>
