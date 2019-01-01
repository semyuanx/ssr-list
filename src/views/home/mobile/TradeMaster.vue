<template>
  <div class="invest-container">
    <div class="header">
      <LineHead title="跟随大师" subTitle="交易周期>12周、最大回撤<30%" />
    </div>
    <div class="content">
      <SimpleTable :header="header" :data="data" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LineHead from '@/components/line-head/index.vue'; // @ is an alias to /src
import SimpleTable from '@/components/simple-table/index.vue'; // @ is an alias to /src

@Component({
  components: {
    LineHead, SimpleTable,
  },
})
export default class Index extends Vue {
  public name: string = 'fm-invest-manager-mobile';

  header: Array<any> = [
    { label: '产品名称', prop: 'a', align: '' },
    { label: '预期收益率', prop: 'b', align: 'right' },
    { label: '剩余名额', prop: 'c', align: 'right' },
  ];

  data: any = [
    { a: '量化交易5号', b: '98.20', c: '2名' },
    { a: '量化交易5号', b: '98.20', c: '2名' },
    { a: '量化交易5号', b: '98.20', c: '2名' },
    { a: '量化交易5号', b: '98.20', c: '2名' },
  ];
}
</script>
<style lang="less" scoped>
.invest-container {

}
</style>
