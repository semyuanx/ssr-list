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

const RankStore = namespace('RankStore');

@Component({
  components: {
    SvgIcon,
    MobileFilterList,
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
      label: '跟随收益',
      prop: 'FollowMoney',
    },
    {
      label: '跟随收益率',
      prop: 'Roi',
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
