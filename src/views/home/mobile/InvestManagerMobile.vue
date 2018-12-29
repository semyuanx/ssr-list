<template>
  <div class="invest-container">
    <div class="header">
      <LineHead :title="data.RankName" :subTitle="data.RankText"/>
    </div>
    <div class="content">
      <SimpleTable
        :header="initHeader"
        :data="data.listData.List"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import LineHead from '@/components/line-head/index.vue'; // @ is an alias to /src
import SimpleTable from '@/components/simple-table/index.vue'; // @ is an alias to /src
import propMaps from '@/constant/propMap';

@Component({
  components: {
    LineHead,
    SimpleTable,
  },
})
export default class Index extends Vue {
  public name: string = 'fm-invest-manager-mobile';

  propMaps: any = propMaps;

  @Prop()
  data: any;

  get initHeader() {
    const keys = Object.keys(this.data.HideConfig)
      .filter(v => this.data.HideConfig[v])
      .slice(0, 3);
    console.log(keys, '-------', this.data);
    const res = keys.map(v => ({ label: this.propMaps[v], prop: v, align: 'right' }));
    return [...res];
  }
}
</script>
<style lang="less" scoped>
.invest-container {
}
</style>
