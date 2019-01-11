<template>
  <div class="header">
    <div class="fm-show-pc">
      <CommonItem @toPersonal="toPersonalPc" :subscribe="subscribe" v-if="configData" :data="configData" :description="description" />
    </div>
    <div class="fm-show-mobile">
      <InvestManagerMobile @toPersonal="toPersonal" :data="data"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CommonItem from '@/views/home/pc/CommonItem.vue';
import InvestManagerMobile from '@/views/home/mobile/InvestManagerMobile.vue';
import mapKey from '@/constant/propMap';
import { propFormat } from '@/utils/format';
import { toLoginPage, toSubscribePage, toPersonalPage } from '@/utils/native';

@Component({
  components: {
    CommonItem,
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

  toPersonalPc(item: any) {
    const { UserID, AccountIndex } = item.item;
    this.redirectTo('personalPage', { userId: UserID, index: AccountIndex }, true);
  }

  toPersonal(item: any) {
    const { UserID: userId, AccountIndex: accountIndex } = item;
    // console.log(item, 'item');
    toPersonalPage({
      userId,
      accountIndex,
    });
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

    if (config.listData && Array.isArray(config.listData.List) && config.listData.List.length > 1) {
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
    console.log(this.data, 'description');
    const filters = config && config.CondCfg && config.CondCfg.CondConfig;
    const info: any = [];
    if (filters) {
      Object.keys(filters).filter((i: any) => i !== 'BrokerID').forEach((i: any) => {
        const filter = filters[i];
        const prop = `${(mapKey as any)[i]}`;
        if (filter) {
          if (Object.prototype.toString.call(filter) === '[object Object]') {
            if (filter.Min && filter.Max) {
              info.push(`${this.formatVal(filter.Min, i)} <${prop}< ${this.formatVal(filter.Max, i)}`);
            } else if (filter.Min) {
              info.push(`${prop}> ${this.formatVal(filter.Min, i)}`);
            } else if (filter.Max) {
              info.push(`${prop}< ${this.formatVal(filter.Max, i)}`);
            }
          } else {
            info.push(`${prop}: ${filter}`);
          }
        }
      });
    }

    return {
      source: config,
      background: config.ChartID,
      title: config.RankName,
      subTitle: config.ViceTitle,
      textTitle: config.RankText,
      filterText: info.length ? `上榜条件:${info.join(',')}` : '',
    };
  }
}
</script>
<style lang="less" scoped>


</style>
