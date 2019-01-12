<template>
  <div class="trader-master">
    <div class="fm-show-pc">
      <InvestManager @toPersonal="toPersonalPc" @toJoinMore="toJoinMore" @toMore="toMore" :subscribe="subscribe" v-if="configData.data.length > 1" :data="configData" :description="description" />
    </div>
    <div class="fm-show-mobile">
      <CommonMobile @toPersonal="toPersonal" @toMore="toMoreMobile" v-if="mobileConfigData.length" :data="mobileConfigData" :description="description" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import InvestManager from '@/views/home/pc/InvestManager.vue';
// import TradeMasterMobile from '@/views/home/mobile/TradeMaster.vue';
import CommonMobile from '@/views/home/mobile/CommonMobile.vue';
import { moneyFormat, percentFormat } from '@/utils/format';
import { toLoginPage, toSubscribePage, toPersonalPage } from '@/utils/native';

const followerMaster = require('@/assets/followerMaster.png');

@Component({
  components: {
    InvestManager, CommonMobile,
  },
})
export default class Index extends Vue {
  @Prop()
  data:any;

  @Prop()
  subscribe: any;

  header: any = [
    {
      label: '跟随者',
      prop: 'Name',
      align: 'left',
    },
    {
      label: ' 跟随获利',
      prop: 'FollowMoney',
      align: 'right',
    },
    {
      label: '收益率',
      prop: 'Roi',
      align: 'right',
    },
  ];

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

  toMore() {
    this.redirectTo('tradeMaster');
  }

  toMoreMobile() {
    this.$router.push({ name: 'follower' });
  }

  toJoinMore() {
    this.$router.push({ name: 'follower' });
  }

  get mobileConfigData() {
    const config:any = this.data;
    let data = [];
    if (Array.isArray(config.data)) {
      data = config.data.map((i: any) => {
        let brokerName = '';
        if (Array.isArray(i.AccountList) && i.AccountList.length) {
          const accountInfo = i.AccountList.find((j: any) => j && j.AccountIndex === i.AccountIndex);
          if (accountInfo && accountInfo.BrokerName) {
            brokerName = accountInfo.BrokerName;
          }
        }
        return {
          item: i,
          brokerName,
          Name: i.NickName,
          UserID: i.UserID,
          AccountIndex: i.AccountIndex,
          FollowMoney: moneyFormat(i.FollowMoney),
          Roi: percentFormat(i.Roi),
        };
      });
    }
    return data;
  }

  get configData() {
    const config:any = this.data;
    let data = [];
    if (Array.isArray(config.data)) {
      data = config.data.map((i: any) => {
        let brokerName = '';
        if (Array.isArray(i.AccountList) && i.AccountList.length) {
          const accountInfo = i.AccountList.find((j: any) => j && j.AccountIndex === i.AccountIndex);
          if (accountInfo && accountInfo.BrokerName) {
            brokerName = accountInfo.BrokerName;
          }
        }
        return {
          item: i,
          avatar: `${this.base}/Avata/${i.UserID}`,
          name: i.NickName,
          index: i.AccountIndex,
          brokerName,
          rightBtnText: '立即查看',
          data: [
            { prop: '跟随获利', val: moneyFormat(i.FollowMoney) },
            { prop: '收益率', val: percentFormat(i.Roi) },
          ],
        };
      });
    }
    return { data, needSlot: false };
  }

  get description() {
    const config:any = this.data;

    return {
      linkUrl: '',
      source: config,
      background: followerMaster,
      title: '跟随大师',
      subTitle: 'ssss',
      textTitle: '获利最多跟随者',
      filterText: '',
      textBtn: '立即查看',
      avatar: true,
      header: this.header,
    };
  }
}
</script>
<style lang="less" scoped>
.trader-master {
  .fm-show-pc {
    margin-top: 30px;
  }
}

</style>
