<template>
  <div class="manager-container">
    <infinite-scroll
      :callback="handleList"
      ref="infinitescroll"
    >
    <Navbar
      @change="handleChange"
      :currentTag="params.status"
    ></Navbar>

      <div class="manager-list-container">
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
    </infinite-scroll>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Navbar, Panel } from '@/views/InvestManager';
import FmCol from '@/components/grid/Col.vue';
import FmRow from '@/components/grid/Row.vue';
import { namespace } from 'vuex-class';
import InfiniteScroll from '@/components/infinite-scroll/InfiniteScroll.vue';

const ManagerStore = namespace('ManagerStore');
export interface Params {
  status:string,
  profitRatio: string;
  followerMaxRisk: string;
  expectDays: string;
  minFollowBalance: string;
  roi: string;
  pageSize: number;
  pageIndex: number;
}

@Component({
  components: {
    Navbar,
    Panel,
    FmCol,
    FmRow,
    InfiniteScroll,
  },
})
export default class Manager extends Vue {
  @ManagerStore.State
  public inProcessProducts: any;

  @ManagerStore.State
  public settledProducts: any;

  @ManagerStore.State
  total:number;

  @ManagerStore.Action
  getProductsAsync: any;

  public params: Params = {
    status: 'InProcess',
    profitRatio: '',
    followerMaxRisk: '',
    expectDays: '',
    minFollowBalance: '',
    roi: '',
    pageSize: 10,
    pageIndex: 1,
  };

  get allProducts() {
    return this.params.status === 'Settled' ? this.settledProducts : this.inProcessProducts;
  }

  created() {
    this.getProductsAsync(this.params);
  }

  handleChange(index: string) {
    this.params.pageIndex = 1;
    this.params.status = index;
    (this.$refs.infinitescroll as any).$emit('reInit');
    this.getProductsAsync(this.params);
  }

  public async handleList() {
    this.params.pageIndex += 1;
    const data = await this.getProductsAsync(this.params);
    const { total } = data;
    console.log(total, this.allProducts.length);
    if (this.allProducts.length >= total) {
      /* 所有数据加载完毕 */
      (this.$refs.infinitescroll as any).$emit('loadedDone');
      return;
    }
    /* 单次请求数据完毕 */
    (this.$refs.infinitescroll as any).$emit('finishLoad');
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@base-font: 24;
.manager {
  &-container {
    // overflow-x: hidden;
    max-width: 1180rem / @base-font;
    margin: 0 auto;
    padding-top: 30rem / @base-font;
    .panel-wrapper {
      margin-top: 20rem / @base-font;
    }
  }
}
.manager-list-container{
overflow: hidden;
}
@media screen and (max-width: 880px) {
  .manager-list {
    padding-left: 15rem / @base-font;
    padding-right: 15rem / @base-font;
    box-sizing: border-box;
  }
}

</style>
