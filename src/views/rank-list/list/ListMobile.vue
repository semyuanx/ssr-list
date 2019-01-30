<template>
<div class="list-container">
  <div class="list-body">
    <MobileFilterList :showProps="showProps" :loading="dateIsLoading" @subscribe="subscribe" :data="data" @sortChange="sortChange"/>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import SvgIcon from '@/components/svg/index.ts';
import MobileFilterList from '@/components/mobile-filter/FilterList.vue';
import { toLoginPage, toSubscribePage } from '@/utils/native';

import zhCN from '@/i18n/zh-CN/views/rank-list/list/ListMobile';
import zhTW from '@/i18n/zh-TW/views/rank-list/list/ListMobile';
import enUS from '@/i18n/en-US/views/rank-list/list/ListMobile';
import zhHK from '@/i18n/zh-HK/views/rank-list/list/ListMobile';

const RankStore = namespace('RankStore');

@Component({
  components: {
    SvgIcon,
    MobileFilterList,
  },
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
      'zh-HK': zhHK,
    },
  },
})
export default class List extends Vue {
  @RankStore.State
  rankListLoading: any;

  @RankStore.Action
  getLoginStatus: any;

  @Prop({
    type: Array,
    default: () => [],
  })
  data: any;

  showProps: any = [
    {
      label: `${this.$i18n.t('profitRate')}`,
      prop: 'ROI',
      highlight: true,
    },
    {
      label: `${this.$i18n.t('subscribeCount')}`,
      prop: 'Subscribers',
    },
  ];

  public get dateIsLoading() {
    return this.rankListLoading;
  }

  async subscribe(data: any) {
    const res: any = await this.getLoginStatus();
    if (res.isLogin) {
      toSubscribePage({
        userId: data.item.UserID,
        accountIndex: data.item.AccountIndex,
        nickName: data.item.NickName,
      });
    } else {
      toLoginPage();
    }
  }

  mounted() {
    // setTimeout(() => this.isLoading = false, 5000);
  }

  sortChange({ prop, order }:any) {
    this.$emit('sortChange', { prop, order });
  }
}
</script>
<style lang="less" scoped>
.list-container {

}

</style>
