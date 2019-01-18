<template>
  <div class="manager-container">
    <infinite-scroll
      :callback="handleList"
      ref="infinitescroll"
    >
    <Navbar
      @change="handleChange"
      @startMam="startMam"
      @startProduct="startProduct"
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
          <PanelPending
            v-if="item.Status === 'Pending'"
            :accounts="mamAccounts"
            width="100%"
            :panelData="item"
            @fetch-data="fetchData"
          ></PanelPending>
          <Panel
            v-else
            :accounts="mamAccounts"
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
import { Navbar, Panel, PanelPending } from '@/views/InvestManager';
import FmCol from '@/components/grid/Col.vue';
import FmRow from '@/components/grid/Row.vue';
import { namespace } from 'vuex-class';
import InfiniteScroll from '@/components/infinite-scroll/InfiniteScroll.vue';
import { getLoginStatus } from 'fmcomponents';
import { loadAuth } from 'fmcomponents/src/utils';
import { openCreateDialog } from 'fmcomponents/src/components/mam';

const ManagerStore = namespace('ManagerStore');
export interface Params {
  status:string;
  pageSize: number;
  pageIndex: number;
}

@Component({
  components: {
    Navbar,
    Panel,
    PanelPending,
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
  public mamAccounts: any;

  @ManagerStore.State
  public userInfo: any;

  @ManagerStore.State
  public total:any;

  @ManagerStore.Action
  getProductsAsync: any;

  @ManagerStore.Action
  getAllAccounts: any;

  @ManagerStore.Action
  getCardInfoAction: any;


  public params: Params = {
    status: 'InProcess',
    pageSize: 10,
    pageIndex: 1,
  };

  get allProducts() {
    return this.params.status === 'Settled' ? this.settledProducts : this.inProcessProducts;
  }

  mounted() {
    this.getProductsAsync(this.params);
    getLoginStatus().then((res: any) => {
      if (res.isLogin) {
        this.getAllAccounts({ checkMAM: true });
        this.getCardInfoAction();
      }
    });
  }

  startProductSatuation(account: any) {
    const _this = this;
    if (account.length <= 0) {
      this.$fmdialog({
        message: '您没有可用的MAM交易员账户,请开户后重试',
        type: 'confirm',
        onConfirm: (flag: any) => {
          window.open(`${_this.base}/portalindex/upgrade/index?type=4`);
        },
      });
    } else {
      // eslint-disable-next-line
      const freeAccounts = account.filter((account: any) => account.IsMAMFree === true) || [];
      if (freeAccounts.length <= 0) {
        this.$fmdialog({
          message: '您没有可用的MAM交易员账户,请开户后重试',
          type: 'confirm',
          onConfirm: (flag: any) => {
            window.open(`${_this.base}/portalindex/upgrade/index?type=4`);
          },
        });
      } else {
        openCreateDialog();
      }
    }
  }

  startProduct() {
    getLoginStatus().then((user: any) => {
      if (user.islogin) {
        if (this.userInfo && this.userInfo.RealName && this.userInfo.AccountEmail && this.userInfo.AccountMobile && this.userInfo.IDNO) {
          this.startProductSatuation(this.mamAccounts);
        } else {
          window.location.href = `${this.base}/open/upgrade/newindex?type=4`;
        }
      } else {
        loadAuth();
      }
    });
  }

  startMam() {
    getLoginStatus().then((user: any) => {
      if (user.islogin) {
        window.location.href = `${this.base}/portalindex/upgrade/mam`;
      } else {
        loadAuth();
      }
    });
  }

  fetchData() {
    this.$nextTick(() => {
      this.getProductsAsync(this.params);
    });
  }

  handleChange(index: string) {
    this.params.pageIndex = 1;
    this.params.status = index;
    (this.$refs.infinitescroll as any).$emit('reInit');
    this.$nextTick(() => {
      this.getProductsAsync(this.params);
    });
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
