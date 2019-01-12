<template>
  <div class="header">
    <div class="fm-show-pc">
      <InvestManager @toLeftMore="publishProduct" @toJoinMore="toJoinMore" @toMore="toMore" :subscribe="subscribe" v-if="configData.data.length > 1" :data="configData" :description="description" />
    </div>
    <div class="fm-show-mobile">
      <CommonMobile @toMore="toMore" v-if="mobileConfigData.length"  :data="mobileConfigData" :description="description" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import InvestManager from '@/views/home/pc/InvestManager.vue';
import CommonMobile from '@/views/home/mobile/CommonMobile.vue';
import mapKey from '@/constant/propMap';
import { moneyFormat, percentFormat } from '@/utils/format';

import { getLoginStatus } from 'fmcomponents';
import { loadAuth } from 'fmcomponents/src/utils';
import { openJoinDialog, openCreateDialog } from 'fmcomponents/src/components/mam';
import { namespace, Action } from 'vuex-class';

const ManagerStore = namespace('ManagerStore');

const invest = require('@/assets/invest.png');
@Component({
  components: {
    InvestManager,
    CommonMobile,
  },
})
export default class Index extends Vue {
  @Prop()
  data:any;

  @ManagerStore.Action
  getAllAccounts: any;

  @ManagerStore.State
  public mamAccounts: any;

  @ManagerStore.Action
  getCardInfoAction: any;

  mounted() {
    getLoginStatus().then((res: any) => {
      if (res.isLogin) {
        this.getAllAccounts({ checkMAM: true });
      }
    });
  }

  // @Prop()
  // subscribe: any;
  subscribe(item: any) {
    this.join(item);
  }

  toMore(item: any) {
    this.$router.push({ name: 'investManager' });
  }

  toJoinMore() {
    this.$router.push({ name: 'investManager' });
  }

  get accounts() {
    return this.mamAccounts;
  }

  get mobileConfigData() {
    const config:any = this.data;
    let data = [];
    if (Array.isArray(config.data)) {
      data = config.data.map((i: any) => ({
        item: i,
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
        item: i,
        name: i.Name,
        danger: `风险<${percentFormat(i.FollowerMaxRisk)}`,
        rightBtnText: i.Status === 'Pending' ? '立即参与' : '参看详情',
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
      linkUrl: '',
      source: config,
      background: invest,
      title: '投资管家',
      subTitle: '发起产品',
      textTitle: '零风险跟随',
      filterText: '发起产品',
      needLeftSlot: true,
    };
  }

  publishProduct() {
    this.startProduct();
  }

  startProduct() {
    getLoginStatus().then((user: any) => {
      if (user.islogin) {
        this.getAllAccounts({ checkMAM: true }).then(() => {
          this.startProductSatuation(this.mamAccounts);
        });
      } else {
        loadAuth();
      }
    });
  }

  startProductSatuation(account: any) {
    const _this = this;
    if (account.length <= 0) {
      this.$fmdialog({
        message: '您没有可用的MAM交易员账户,请开户后重试',
        type: 'confirm',
        onConfirm: () => {
          // if (flag) window.open(`${_this.base}/portalindex/upgrade/index?type=4`);
          this.redirectTo('traderRegister');
        },
      });
    } else {
      // eslint-disable-next-line
      const freeAccounts = account.filter((account: any) => account.IsMAMFree === true) || [];
      if (freeAccounts.length <= 0) {
        this.$fmdialog({
          message: '您没有可用的MAM交易员账户,请开户后重试',
          type: 'confirm',
          onConfirm: () => {
            // if (flag) window.open(`${_this.base}/portalindex/upgrade/index?type=4`);
            this.redirectTo('traderRegister');
          },
        });
      } else {
        openCreateDialog();
      }
    }
  }

  join(mamData: any) {
    const { item } = mamData;
    const mamInfo = item || {};

    if (mamInfo.Status !== 'Pending') {
      const { Trader } = mamInfo;
      if (!Trader || (this.isObject(Trader) && !Trader.UserID)) {
        return this.$fmdialog({
          message: '抱歉~当前产品信息有误，请联系后台服务人员！',
          type: 'error',
          duration: 2000,
          isSingle: true,
          onConfirm: () => {},
        });
      }
      return this.redirectTo('personalPage', {
        userId: Trader.UserID,
        index: Trader.AccountIndex,
      }, true);
    }

    // 满标直接返回
    if (mamInfo.ExpectFollowerCount == mamInfo.FollowerCount) {
      return this.$fmdialog({
        message: '抱歉~当前产品跟随名额已满',
        type: 'error',
        duration: 2000,
        isSingle: true,
        onConfirm: () => {},
      });
    }
    return getLoginStatus().then((user: any) => {
      if (user.islogin) {
        this.getAllAccounts({ checkMAM: true }).then(() => {
          this.joinSasution(this.accounts, user, mamInfo);
        });
      } else {
        loadAuth();
      }
    });
  }

  joinSasution(accounts: any, user: any, mamInfo: any) {
    const _this = this;
    // 判断该产品是不是当前用户自己发起的
    if (user.id == mamInfo.Trader.UserID) {
      this.$fmdialog({
        message: '您是发起人，无法参与',
        type: 'error',
        duration: 2000,
        isSingle: true,
        onConfirm: () => {},
      });
      return;
    }

    // 判断是否有相同经纪商的账户，并且是空闲的，否则去开户
    const sameBrokerAccounts = accounts.filter((account: any) => account.BrokerId === mamInfo.Trader.BrokerID) || [];
    if (sameBrokerAccounts.length == 0) {
      this.$fmdialog({
        message: `您没有可用的MAM跟随者账户(${mamInfo.Trader.BrokerName}),请开户后重试`,
        type: 'confirm',
        onConfirm: (flag: any) => {
          this.redirectTo('mamCreate', '', true);
        },
        onCancel: () => {
          console.log('oncacel');
        },
      });
      return;
    }
    const freeSameBrokerAccounts = sameBrokerAccounts.filter((account: any) => account.IsMAMFree === true) || [];
    if (freeSameBrokerAccounts.length == 0) {
      this.$fmdialog({
        message: `您没有可用的MAM跟随者账户(${mamInfo.Trader.BrokerName}),请开户后重试`,
        type: 'confirm',
        onConfirm: (flag: any) => {
          this.redirectTo('mamCreate', '', true);
        },
      });
      return;
    }


    // 判断是否有MAM跟随者账户
    const mamFollowerAccounts = accounts.filter((account: any) => account.UserType === 2 && account.AccountType === 3) || [];
    if (mamFollowerAccounts.length == 0) {
      this.$fmdialog({
        message: '无MAM跟随者账户，去开户参与',
        type: 'confirm',
        onConfirm(flag: any) {
          this.redirectTo('mamCreate', '', true);
        },
      });
      return;
    }
    // 判断是否有空闲的MAM跟随者账户
    const mamFreeFollowerAccounts = mamFollowerAccounts.filter((account: any) => account.IsMAMFree === true) || [];
    if (mamFreeFollowerAccounts.length == 0) {
      this.$fmdialog({
        message: '无更多账户可参与产品，请新开账户',
        type: 'error',
        duration: 2000,
        isSingle: true,
        onConfirm: () => {},
      });
      return;
    }
    // 通过了直接可以参与了
    openJoinDialog({
      productId: mamInfo.ID,
      onSuccess: () => {
        // _this.$emit('fetch-data');
      },
    });
  }
}
</script>
<style lang="less" scoped>


</style>
