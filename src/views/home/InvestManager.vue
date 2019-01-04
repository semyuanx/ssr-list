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
    return config;
  }

  get description() {
    const config:any = this.data;


    return {
      source: config,
      background: config.ChartID,
      title: '投资管家',
      subTitle: config.ViceTitle,
      textTitle: config.RankText,
      filterText: '',
    };
  }
}
</script>
<style lang="less" scoped>


</style>
