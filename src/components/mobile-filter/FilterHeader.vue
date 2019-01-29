<template>
  <section class="filter-selected-container">
    <div>
      <filter-button
        class="filter-button"
        v-for="(item,index) in result"
        :key="index"
      >
        <span>{{item.label}}</span>&nbsp;
        <span> {{item.val}}</span>
      </filter-button>
    </div>
    <router-link
      :to="{name:'filter'}"
      class="filter-link"
    >
      <i class="icon-filtrate_24px"></i> <span>{{$t('sx')}}</span>
    </router-link>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FilterButton from './FilterButton.vue';
import { namespace } from 'vuex-class';
import zhCN from '@/i18n/zh-CN/components/mobile-filter/FilterHeader';
import zhTW from '@/i18n/zh-TW/components/mobile-filter/FilterHeader';
import zhHK from '@/i18n/zh-HK/components/mobile-filter/FilterHeader';
import enUS from '@/i18n/en-US/components/mobile-filter/FilterHeader';

const RankStore = namespace('RankStore');

@Component({
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'zh-HK': zhHK,
      'en-US': enUS,
    },
  },
  components: {
    FilterButton,
  },
})
export default class FilterHeader extends Vue {
  @RankStore.State
  filterRes: any;

  get result() {
    console.log(this.filterRes);
    return this.filterRes.filter((v: any) => v.val !== this.$i18n.t('bx')).slice(0, 2);
  }
}
</script>

<style lang="less" scoped>
@theme-color: #ff6200;
.filter-selected-container {
  border-bottom: 1px solid #ebeef5;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 38px;

  font-family: PingFang-SC-Medium;
  color: #333;
  font-weight: 500;
  background-color: #fff;
  font-size: 14px;
  .filter-link {
    text-decoration: none;
    color: @theme-color;
    font-size: 14px;
  }
  .filter-button {
    margin-right: 10px;
    margin-bottom: 6px;
    margin-top: 6px;
  }
}
</style>
