<template>
  <div class="header">
    <div class="fm-show-pc">
      <InvestManager :subscribe="subscribe" v-if="configData" :data="configData" :description="description" />
    </div>
    <div class="fm-show-mobile">
      <InvestManagerMobile :data="data"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import InvestManager from '@/views/home/pc/InvestManager.vue';
import InvestManagerMobile from '@/views/home/mobile/InvestManagerMobile.vue';
import mapKey from '@/constant/propMap';
import { propFormat } from '@/utils/format';

@Component({
  components: {
    InvestManager,
    InvestManagerMobile,
  },
})
export default class Index extends Vue {
  @Prop()
  data:any;

  @Prop()
  subscribe: any;

  formatVal(val: string|number, type: string): string | number {
    return propFormat(val, type);
  }

  get configData() {
    const config:any = this.data;
    if (!config) {
      return null;
    }
    let showData: any = [];
    if (config && config.HideConfig) {
      Object.keys(config.HideConfig).forEach((i: any) => {
        if (!config.HideConfig[i]) {
          showData.push(i);
        }
      });
    }

    if (Array.isArray(config.listData.List) && config.listData.List.length > 1) {
      if (config.listData.List.length > 3) {
        showData = showData.slice(0, 2);
      } else {
        showData = showData.slice(0, 3);
      }
      const newConfig = config.listData.List.map((item: any) => ({
        avatar: `${this.base}/Avata/${item.UserID}`,
        name: item.NickName,
        index: item.AccountIndex,
        brokerName: item.BrokerName,
        price: item.Price,
        item,
        data: showData.map((it: any) => ({ prop: (mapKey as any)[it], val: this.formatVal(item[it], it) })),
      }));
      return newConfig.slice(0, 4);
    }
    return null;
  }

  get description() {
    const config:any = this.data;
    return {
      background: config.ChartID,
      title: config.RankName,
      subTitle: config.ViceTitle,
      textTitle: config.RankText,
    };
  }
}
</script>
<style lang="less" scoped>


</style>
