<template>
    <div>
        <div v-if="strategytData" class="strategy">
            <FmStrategy :data="strategytData" :header="strategytDataHeader" />
        </div>
        <div class="invest" v-for="(item,index) in investData" :key="index">
            <InvestPanel :data="item"/>
        </div>
        <!-- <div class="invest">
            <InvestProfessor />
        </div>
        <div class="invest">
            <DangerKeep />
        </div>
        <div class="invest">
            <TradeMaster />
        </div> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import FmStrategy from '@/views/home/Strategy.vue'; // @ is an alias to /src
import InvestPanel from '@/views/home/InvestManager.vue'; // @ is an alias to /src
// import InvestProfessor from '@/views/home/InvestProfessor.vue'; // @ is an alias to /src
// import DangerKeep from '@/views/home/DangerKeep.vue'; // @ is an alias to /src
// import TradeMaster from '@/views/home/TradeMaster.vue'; // @ is an alias to /src
import { namespace, Action } from 'vuex-class';

import mapKey from '@/constant/propMap';

const HomeStore = namespace('HomeStore');

@Component({
  components: {
    FmStrategy,
    InvestPanel,
  },
})
export default class mainView extends Vue {
    @HomeStore.State
    configs: any;

    /**
     * {
     *  avatar: url,
     *  name: string,
     *  index: accountIndex,
     *  brokername: string,
     *  list: [
     *      {
     *          prop: '收益率',
     *          val: 34.99%
     *      }
     *  ]
     * }
     */
    public get strategytData() {
      if (this.configs && this.configs.length) {
        const config:any = this.configs[0];

        let showData: any = [];
        if (config && config.HideConfig) {
          Object.keys(config.HideConfig).forEach((i: any) => {
            if (!config.HideConfig[i]) {
              showData.push(i);
            }
          });
        }
        showData = showData.slice(0, 2);
        if (Array.isArray(config.listData.List) && config.listData.List.length > 1) {
          const newConfig = config.listData.List.map((item: any) => ({
            avatar: `${this.base}/Avata/${item.UserID}`,
            name: item.NickName,
            index: item.AccountIndex,
            brokerName: item.BrokerName,
            data: showData.map((it: any) => ({ prop: (mapKey as any)[it], val: item[it] })),
          }));
          return newConfig;
        }
        return null;
      }
      return null;
    }

    public get strategytDataHeader() {
      if (this.configs && this.configs.length) {
        const config:any = this.configs[0];
        console.log(config, 'config');

        return {
          title: config.RankName,
          subTitle: config.ViceTitle,
        };
      }
      return null;
    }
}
</script>
<style lang="less" scoped>

</style>
