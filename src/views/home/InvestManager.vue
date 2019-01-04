<template>
  <div class="header">
    <div class="fm-show-pc">
      <InvestManager :subscribe="subscribe" v-if="configData.data.length > 1" :data="configData" :description="description" />
    </div>
    <div class="fm-show-mobile">
      <CommonMobile :data="mobileConfigData" :description="description" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import InvestManager from '@/views/home/pc/InvestManager.vue';
import CommonMobile from '@/views/home/mobile/CommonMobile.vue';
import mapKey from '@/constant/propMap';
import { moneyFormat, percentFormat } from '@/utils/format';

@Component({
  components: {
    InvestManager,
    CommonMobile,
  },
})
export default class Index extends Vue {
  @Prop()
  data:any;

  @Prop()
  subscribe: any;

  get mobileConfigData() {
    const config:any = this.data;
    let data = [];
    if (Array.isArray(config.data)) {
      data = config.data.map((i: any) => ({
        Name: i.Name,
        danger: `风险<${percentFormat(i.FollowerMaxRisk)}`,
        Balance: moneyFormat(i.Balance),
        FollowerCount: i.FollowerCount,
      }));
    }
    return data;
  }

  get configData() {
    const config:any = this.data;
    let data = [];
    if (Array.isArray(config.data)) {
      data = config.data.map((i: any) => ({
        name: i.Name,
        danger: `风险<${percentFormat(i.FollowerMaxRisk)}`,
        rightBtnText: '立即参与',
        data: [
          { prop: '产品资金', val: moneyFormat(i.Balance) },
          { prop: '参与人数', val: i.FollowerCount },
        ],
      }));
    }
    return { data, needSlot: true };
  }

  get description() {
    const config:any = this.data;

    return {
      source: config,
      background: config.ChartID,
      title: '投资管家',
      subTitle: 'ssss',
      textTitle: '零风险跟随',
      filterText: '发起产品',
    };
  }
}
</script>
<style lang="less" scoped>


</style>
