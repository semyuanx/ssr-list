<template>
  <div class="header">
    <div class="fm-show-pc">
      <TradeMaster :subscribe="subscribe" v-if="configData.data.length > 1" :data="configData" :description="description" />
    </div>
    <div class="fm-show-mobile">
      <TradeMasterMobile />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import TradeMaster from '@/views/home/pc/InvestManager.vue';
import TradeMasterMobile from '@/views/home/mobile/TradeMaster.vue';
import { moneyFormat, percentFormat } from '@/utils/format';

@Component({
  components: {
    TradeMaster, TradeMasterMobile,
  },
})
export default class Index extends Vue {
  @Prop()
  data:any;

  @Prop()
  subscribe: any;

  get configData() {
    const config:any = this.data;
    let data = [];
    if (Array.isArray(config.data)) {
      data = config.data.map((i: any) => {
        let brokerName = '';
        if (Array.isArray(i.AccountList) && i.AccountList.length) {
          const accountInfo = i.AccountList.find((j: any) => j && j.AccountIndex === i.AccountIndex);
          if (accountInfo && accountInfo.BrokerName) {
            brokerName = accountInfo.BrokerName;
          }
        }
        return {
          avatar: `${this.base}/Avata/${i.UserID}`,
          name: i.NickName,
          index: i.AccountIndex,
          brokerName,
          rightBtnText: '立即查看',
          data: [
            { prop: '跟随获利', val: moneyFormat(i.FollowMoney) },
            { prop: '收益率', val: percentFormat(i.Roi) },
          ],
        };
      });
    }
    return { data, needSlot: false };
  }

  get description() {
    const config:any = this.data;

    return {
      source: config,
      background: config.ChartID,
      title: '跟随大师',
      subTitle: 'ssss',
      textTitle: '获利最多跟随者',
      filterText: '立即查看',
      textBtn: '立即查看',
    };
  }
}
</script>
<style lang="less" scoped>


</style>
