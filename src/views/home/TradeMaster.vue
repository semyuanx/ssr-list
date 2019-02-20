<template>
  <div class="trader-master">
    <div class="fm-show-pc">
      <InvestManager
        @hideCard="hideCard"
        @showCard="showCard"
        @toPersonal="toPersonalPc"
        @toJoinMore="toJoinMore"
        @toMore="toMore"
        :subscribe="subscribe"
        v-if="configData.data.length > 1"
        :data="configData" :description="description" />
    </div>
    <!-- <div class="fm-show-mobile">
      <CommonMobile @toPersonal="toPersonal" @toMore="toMoreMobile" v-if="mobileConfigData.length" :data="mobileConfigData" :description="description" />
    </div> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import InvestManager from '@/views/home/pc/InvestManager.vue';
// import TradeMasterMobile from '@/views/home/mobile/TradeMaster.vue';
// import CommonMobile from '@/views/home/mobile/CommonMobile.vue';
import { moneyFormat, percentFormat, propFormat } from '@/utils/format';
import { toPersonalPage } from '@/utils/native';
import mapKey from '@/constant/propMap';
import { needHighlight } from '@/constant/propFormat';

import zhCN from '@/i18n/zh-CN/views/home/TradeMaster';
import zhTW from '@/i18n/zh-TW/views/home/TradeMaster';
import enUS from '@/i18n/en-US/views/home/TradeMaster';
import zhHK from '@/i18n/zh-HK/views/home/TradeMaster';

// const followerMaster = require('@/assets/followerMaster.png');

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

  @Prop({
    default: () => [],
  })
  followList:any;

  @Prop({
    default: () => [],
  })
  attentionList:any;

  @Prop()
  subscribe: any;

  header: any = [
    {
      label: this.lang('follower'),
      prop: 'Name',
      align: 'left',
    },
    {
      label: this.lang('gshl'),
      prop: 'FollowMoney',
      align: 'right',
    },
    {
      label: this.lang('syl'),
      prop: 'Roi',
      align: 'right',
    },
  ];

  showCard($event: any, item: any) {
    const itemList = item.item;
    this.$emit('showCard', $event, itemList && itemList.UserID);
  }

  hideCard($event: any) {
    this.$emit('hideCard');
  }

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
    // this.redirectTo('tradeMaster');
    this.$router.push({ name: 'follower' });
  }

  lang(val: any) {
    return this.$i18n.t(val);
  }

  toMoreMobile() {
    this.$router.push({ name: 'follower' });
  }

  toJoinMore() {
    this.$router.push({ name: 'follower' });
  }

  formatVal(val: string|number, type: string): string | number {
    return propFormat(val, type);
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
    const { config, data: dataSource }:any = this.data;
    let data: any = [];
    if (Array.isArray(dataSource)) {
      data = dataSource.slice(0, 4);
      data = data.map((i: any) => {
        let brokerName = '';
        if (Array.isArray(i.AccountList) && i.AccountList.length) {
          const accountInfo = i.AccountList.find((j: any) => j && j.AccountIndex === i.AccountIndex);
          if (accountInfo && accountInfo.BrokerName) {
            brokerName = accountInfo.BrokerName;
          }
        }
        const isAttentionList = this.attentionList.includes(i.UserID) || this.attentionList.includes(`${i.UserID}`);
        // const isFollowed = this.followList.includes(i.UserID + '_' + i.AccountIndex);
        // this.log(isFollowed, i, this.followList, this.attentionList, 'ttttttt')
        return {
          item: i,
          avatar: `${this.base}/Avata/${i.UserID}`,
          name: i.NickName,
          index: i.AccountIndex,
          brokerName,
          confirmBtn: isAttentionList ? this.$i18n.t('followed') : this.$i18n.t('follow'),
          data:
          [
            { prop: this.$i18n.t('gshl'), val: moneyFormat(i.FollowMoney) },
            {
              prop: this.$i18n.t('syl'),
              val: percentFormat(i.Roi),
              highlight: i.Roi > 0,
            },
          ],

        };
      });
    }
    return { data, needSlot: false };
  }

  get description() {
    const { config }:any = this.data;
    return {
      subTitle: config.ViceTitle,
      btnText: config.ChartText,
      linkUrl: config.ChartID,
      source: config,
      background: config.ChartID,
      title: config.RankName || this.$i18n.t('gsds'),
      textTitle: config.ViceTitle,
      filterText: config.RankText,
      textBtn: config.ChartText || this.$i18n.t('more'),
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
