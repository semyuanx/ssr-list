<template>
  <div class="header">
    <div
      v-if="configData.data.length > 1"
      class="fm-show-pc"
      :class="{'invest-content': configData.data.length > 1}"
    >
      <InvestManager
        @toRightMore="toMore"
        @toPersonal="toPersonalPc"
        @toLeftMore="publishProduct"
        @toJoinMore="toJoinMore"
        @toMore="toMore" :subscribe="subscribe"
        :data="configData"
        :description="description" />
    </div>
    <!-- <div class="fm-show-mobile">
      <CommonMobile @toMore="toMore" v-if="mobileConfigData.length"  :data="mobileConfigData" :description="description" />
    </div> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import InvestManager from '@/views/home/pc/InvestManager.vue';
// import CommonMobile from '@/views/home/mobile/CommonMobile.vue';
import mapKey from '@/constant/propMap';
import { moneyFormat, percentFormat } from '@/utils/format';

import { getLoginStatus } from 'fmcomponents';
import { loadAuth } from 'fmcomponents/src/utils';
// import { openJoinDialog, openCreateDialog } from 'fmcomponents/src/components/mam';
import { namespace, Action } from 'vuex-class';
import zhCN from '@/i18n/zh-CN/views/home/InvestManager';
import zhTW from '@/i18n/zh-TW/views/home/InvestManager';
import enUS from '@/i18n/en-US/views/home/InvestManager';
import zhHK from '@/i18n/zh-HK/views/home/InvestManager';

const ManagerStore = namespace('ManagerStore');

// const invest = require('@/assets/invest.png');
@Component({
  components: {
    InvestManager,
    // CommonMobile,
  },
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
      'zh-HK': zhHK,
    },
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

  toPersonalPc(item: any) {
    const { Trader } = item.item;
    this.toPersonalPage(Trader);
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
        danger: `${this.$i18n.t('risk')}<${percentFormat(i.FollowerMaxRisk)}`,
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
      data = config.data.slice(0, 4);
      data = data.map((i: any) => ({
        item: i,
        name: i.Name,
        danger: `${this.$i18n.t('risk')}<${percentFormat(i.FollowerMaxRisk)}`,
        confirmBtn: i.Status === 'Pending' ? this.$i18n.t('ljcy') : this.$i18n.t('ckxq'),
        data: [
          { prop: this.$i18n.t('cpzj'), val: moneyFormat(i.Balance) },
          { prop: this.$i18n.t('cyrs'), val: i.FollowerCount },
        ],
      }));
    }
    return { data, needSlot: true };
  }

  get description() {
    const { config }:any = this.data;
    return {
      linkUrl: '',
      textBtn: config.ChartText,
      btnText: config.ChartText,
      source: config,
      background: config.ChartID,
      title: config.RankName || this.$i18n.t('tzgj'),
      subTitle: config.RankText || this.$i18n.t('fqcp'),
      textTitle: config.ViceTitle,
      filterText: config.RankText || this.$i18n.t('fqcp'),
      needLeftSlot: true,
    };
  }

  publishProduct() {
    this.startProduct();
  }

  startProduct() {
    getLoginStatus().then((user: any) => {
      if (user.isLogin) {
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
        message: this.$i18n.t('nmykydmamjyyzh'),
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
          message: this.$i18n.t('nmykydmamjyyzh'),
          type: 'confirm',
          onConfirm: () => {
            // if (flag) window.open(`${_this.base}/portalindex/upgrade/index?type=4`);
            this.redirectTo('traderRegister');
          },
        });
      } else {
        // openCreateDialog();
        this.openCreateDialog();
      }
    }
  }

  openCreateDialog() {
    import('fmcomponents/src/components/mam').then((Module: any) => {
      const { openCreateDialog }: any = Module;
      openCreateDialog();
    });
  }

  toPersonalPage(data: any) {
    if (!data || (this.isObject(data) && !data.UserID)) {
      return this.$fmdialog({
        message: this.$i18n.t('dqcpxxyw'),
        type: 'error',
        duration: 2000,
        isSingle: true,
        onConfirm: () => {},
      });
    }
    return this.redirectTo('personalPage', {
      userId: data.UserID,
      index: data.AccountIndex,
    }, true);
  }

  join(mamData: any) {
    const { item } = mamData;
    const mamInfo = item || {};

    if (mamInfo.Status !== 'Pending') {
      const { Trader } = mamInfo;

      return this.toPersonalPage(Trader);
    }

    // 满标直接返回
    if (mamInfo.ExpectFollowerCount == mamInfo.FollowerCount) {
      return this.$fmdialog({
        message: this.$i18n.t('dqcpgsmeym'),
        type: 'error',
        duration: 2000,
        isSingle: true,
        onConfirm: () => {},
      });
    }
    return getLoginStatus().then((user: any) => {
      if (user.isLogin) {
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
        message: this.$i18n.t('nsfqr'),
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
        message: this.$i18n.t('nmykydmamgszzh', { account: mamInfo.Trader.BrokerName }),
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
        message: this.$i18n.t('nmykydmamgszzh', { account: mamInfo.Trader.BrokerName }),
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
        message: this.$i18n.t('wmamgszzh'),
        type: 'confirm',
        onConfirm: (flag: any) => {
          this.redirectTo('mamCreate', '', true);
        },
      });
      return;
    }
    // 判断是否有空闲的MAM跟随者账户
    const mamFreeFollowerAccounts = mamFollowerAccounts.filter((account: any) => account.IsMAMFree === true) || [];
    if (mamFreeFollowerAccounts.length == 0) {
      this.$fmdialog({
        message: this.$i18n.t('wgdzhkcycp'),
        type: 'error',
        duration: 2000,
        isSingle: true,
        onConfirm: () => {},
      });
      return;
    }
    // 通过了直接可以参与了
    // openJoinDialog({
    //   productId: mamInfo.ID,
    //   onSuccess: () => {
    //     // _this.$emit('fetch-data');
    //   },
    // });
    this.openJoinDialog(mamInfo.ID);
  }

  openJoinDialog(id: any) {
    import('fmcomponents/src/components/mam').then((Module: any) => {
      const { openJoinDialog }: any = Module;
      // console.log(Module)
      openJoinDialog({
        productId: id,
        onSuccess: () => {
          // _this.$emit('fetch-data');
        },
      });
    });
  }
}
</script>
<style lang="less" scoped>
.invest-content {
  margin-bottom: 30px;
}
</style>
