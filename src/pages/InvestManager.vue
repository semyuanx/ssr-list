<template>
  <div class="manager-container">
    <Navbar
      @change="handleChange"
      :currentTag="params.status"
    ></Navbar>
    <fm-row
      class="manager-list"
      :gutter="20"
    >
      <fm-col></fm-col>
      <fm-col
        v-for="(item,index) in allProducts"
        class="panel-wrapper"
        :key="index"
        :xs="24"
        :sm="12"
        :lg="8"
      >
        <Panel
          width="100%"
          :panelData="item"
        ></Panel>
      </fm-col>
    </fm-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Navbar, Panel } from '@/views/InvestManager';
import FmCol from '@/components/grid/Col.vue';
import FmRow from '@/components/grid/Row.vue';
import { namespace } from 'vuex-class';

const ManagerStore = namespace('ManagerStore');
export interface Params {
    status: string,
    profitRatio: string,
    followerMaxRisk: string,
    expectDays: string,
    minFollowBalance: string,
    roi: string,
    pageSize: string | number,
    pageIndex: string | number,
}

@Component({
  components: {
    Navbar,
    Panel,
    FmCol,
    FmRow,
  },
})
export default class Manager extends Vue {
  @ManagerStore.State
  public allProducts: any;

  @ManagerStore.Action
  getAllProductsAsync: any;

  public params:Params = {
    status: 'InProcess',
    profitRatio: '',
    followerMaxRisk: '',
    expectDays: '',
    minFollowBalance: '',
    roi: '',
    pageSize: '',
    pageIndex: '1',
  };

  created() {
    this.getAllProductsAsync(this.params);
  }

  handleChange(index:string) {
    this.params.status = index;
    this.getAllProductsAsync(this.params);
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@base-font: 24;
.manager {
  &-container {
    overflow-x: hidden;
    max-width: 1180rem / @base-font;
    margin: 0 auto;
    padding-top: 30rem / @base-font;
    .panel-wrapper {
      margin-top: 20rem / @base-font;
    }
  }
}
@media screen and (max-width: 880px) {
  .manager-list {
    padding-left: 15rem / @base-font;
    padding-right: 15rem / @base-font;
    box-sizing: border-box;
  }
}
</style>