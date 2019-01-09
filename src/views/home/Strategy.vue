<template>
  <div class="header">
    <div class="fm-show-pc">
      <Strategy @toPersonal="toPersonalPc" :subscribe="subscribe" :data="data" :header="header" />
    </div>
    <div class="fm-show-mobile">
      <Strategy @toPersonal="toPersonal" :subscribe="mobileSubscribe" :data="data" :header="header" />
    </div>
  </div>
</template>
<script lang="ts">
import { namespace } from 'vuex-class';
import { Component, Vue, Prop } from 'vue-property-decorator';
import Strategy from '@/views/home/pc/Strategy.vue';
// import StrategyMobile from '@/views/home/mobile/Strategy.vue';
import { toLoginPage, toSubscribePage, toPersonalPage } from '@/utils/native';

const RankStore = namespace('RankStore');

@Component({
  components: {
    Strategy,
    // StrategyMobile,
  },
})
export default class Index extends Vue {
  @RankStore.Action
  getLoginStatus: any;

  @Prop()
  data: any;

  @Prop()
  header: any;

  @Prop()
  subscribe: any;

  toPersonalPc(item: any) {
    const { UserID, AccountIndex } = item.item;
    console.log(item, 'item');
    this.redirectTo('personalPage', { userId: UserID, index: AccountIndex });
  }

  toPersonal(item: any) {
    const { UserID, AccountIndex } = item.item;
    console.log(item, 'item');
    // toPersonalPage()
  }

  async mobileSubscribe(data: any) {
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
}
</script>
<style lang="less" scoped>


</style>
