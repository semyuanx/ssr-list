<template>

  <div
    class="panel-container"
    :style="{width:width}"
  >
    <section class="panel-header" @click="toPersonalPage">
      <h2 class="panel-title">{{panelData.Name}}</h2>
      <div class="panel-desc">
        <div class="avatar-circle">
          <!-- {{avatarSrc}} -->
          <img
            :onerror="errorUrl"
            :src="avatarSrc"
            alt=""
          >
        </div>
        <div class="desc-info">
          <p class="info-main">{{panelData.Nickname}}</p>
          <p class="info-sub">
            <span>{{$t('history')}} {{panelData.ProductCount}}</span>
            <span>{{$t('AverageROI')}} {{panelData.AverageROI}}</span>
          </p>
        </div>
      </div>
    </section>
    <section class="panel-body">
      <ul class="income">
        <li :title="$t('expectProfitTitle')">
          <span class="income-value deficit">
            <span>{{expectProfit}}</span>
            <!-- <span>.</span> -->
            <!-- <span class="income-value-float">{{ProfitArr[1]}}</span> -->
          </span>
          <span class="income-label">{{$t('incomeLabel')}}</span>
        </li>
        <li>
          <span class="income-value deficit">
            <span>{{expectRoi}}</span>
            <!-- <span class="income-value-percent">%</span> -->
          </span>
          <span class="income-label">{{$t('incomeRateLabel')}}</span>
        </li>
      </ul>
      <div class="progress-box">
          <div class="progress-info">
              {{$t('shengyu')}} <span style="color:#5aabe3;">{{this.panelData.ExpectFollowerCount - this.panelData.FollowerCount}}</span>
               {{$t('personPercent')}} <span>{{this.panelData.ExpectFollowerCount}}</span> {{$t('person')}}
          </div>
          <div class="progress-out">
              <div class="progress-in" :style="{width: progressWidth}"></div>
          </div>
      </div>
      <ul class="sub-info">
        <li>
          <span class="sub-info-label">{{$t('minFollowBalanceLabel')}}</span>
          <span class="sub-info-value">{{minFollowBalance}}</span>
        </li>
        <li>
          <span class="sub-info-label">{{$t('followerMaxRiskLabel')}}</span>
          <span class="sub-info-value" style="color: #ff6200;">{{followerMaxRisk}}</span>
        </li>
        <li>
          <span class="sub-info-label">{{$t('daysLeftLabel')}}</span>
          <span class="sub-info-value">{{daysLeft}}</span>
        </li>
        <li>
          <span class="sub-info-label">{{$t('incomeDistributionLabel')}}</span>
          <span class="sub-info-value">{{incomeDistribution}}</span>
        </li>
      </ul>
      <a
        :class="panelData.Status === 'Pending' ? 'submit-button allways-color' : 'submit-button'"
        href="javascript:void(0);"
        @click="join"
        target="_blank"
      >{{
        $t('panelStatus')[panelData.Status]
      }}</a>
      <div class="inter-time">
        <span :title="$t('timeCountTitle')">{{timeCount}}</span>
      </div>
    </section>
    <el-tooltip class="item" effect="dark" :content="maxRisk" placement="top">
      <img
        src="./safe.png"
        class="safe-img"
      />
    </el-tooltip>
  </div>
</template>
<script lang="ts">
import {
  Vue, Watch, Prop, Component,
} from 'vue-property-decorator';
import zhCN from '@/i18n/zh-CN/views/InvestManager/PanelPending';
import zhTW from '@/i18n/zh-TW/views/InvestManager/PanelPending';
import enUS from '@/i18n/en-US/views/InvestManager/PanelPending';
import zhHK from '@/i18n/zh-HK/views/InvestManager/PanelPending';

import {
  percentFormat, numberFormat, timeFormat, moneyFormat,
} from '@/utils/format';
import { Tooltip } from 'element-ui';

import { getLoginStatus } from 'fmcomponents';
import { loadAuth } from 'fmcomponents/src/utils';
import { openJoinDialog } from 'fmcomponents/src/components/mam';

interface Context {
  Name?: string;
  FollowerCount: number;
  StopLossRatio: number;
  TakeProfitRatio: number;
  UserID: number;
  Profit:string;
  BrokerID:number;
  AccountIndex:number;
  Status:string;
}
@Component({
  components: {
    [Tooltip.name]: Tooltip,
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
export default class Panel extends Vue {
  private errorUrl: string = 'this.src=\'//cdn.followme.com/images/default_avata.png\';';

  @Prop() private width!: string;

  @Prop({ default: () => {} }) private panelData!: any;

  @Prop({ default: () => [] }) private accounts!: any;

  get maxRisk() {
    let risk = this.panelData.FollowerMaxRisk || 0;
    risk = percentFormat(risk);
    return `${this.$i18n.t('productionRiskTitle')}<${risk}`;
  }

  timeCount: string = '--:--:--';

  toPersonalPage() {
    const userId = this.panelData.UserID;
    const index = this.panelData.AccountIndex;
    const url = `${this.base}/user/${userId}/trade-account/exhibition?index=${index}`;
    window.open(url, '_blank');
  }

  timeInter = 0;

  setTimeInterval() {
    if (this.panelData.ExpectFollowerCount - this.panelData.FollowerCount === 0) {
      this.timeCount = '';
      return;
    }
    if (this.timeInter) window.clearInterval(this.timeInter);
    if (typeof window !== 'undefined') {
      this.timeInter = window.setInterval(() => {
        this.calculateTime();
      }, 1000);
    }
  }

  calculateTime() {
    const now = Date.now() / 1000;
    const endDate = this.panelData.ExpectStartTime;
    const leftTime = endDate - now;
    if (!endDate || !leftTime || leftTime < 0) {
      this.timeCount = '';
      window.clearInterval(this.timeInter);
      return;
    }
    this.log(leftTime, 'leftTime');
    const leftsecond = leftTime;
    this.timeCount = timeFormat(leftsecond);
  }

  mounted() {
    this.setTimeInterval();
  }

  @Watch('panelData')
  panelDataChanged() {
    this.setTimeInterval();
  }

  get progressWidth() {
    return `${(this.panelData.FollowerCount / this.panelData.ExpectFollowerCount) * 100}%`;
  }

  get minFollowBalance() {
    return moneyFormat(this.panelData.MinFollowBalance);
  }

  get followerMaxRisk() {
    return percentFormat(this.panelData.FollowerMaxRisk, 2, true);
  }

  get daysLeft() {
    return `${this.panelData.DaysLeft}${this.$i18n.t('day')}`;
  }

  get joinCount():number {
    return this.panelData.FollowerCount + 1;
  }

  get expectProfit() {
    const value = this.panelData.ExpectTraderProfit + this.panelData.ExpectFollowerProfit * this.panelData.ExpectFollowerCount;
    return (value);
    // return calcFixed.calc(value);
  }

  get expectRoi() {
    const value = this.panelData.ExpectROI;
    return percentFormat(value, 2, true);
  }

  get submitUrl():string {
    // if (this.panelData.Status !== 'Trading') return "javascript:void(0);";
    return `${this.base}/user/${this.panelData.UserID}/trade-account/exhibition?index=${this.panelData.AccountIndex}`;
  }

  get incomeDistribution():string {
    return this.panelData.TakeProfitRatio === 0.8 ? '2:8' : '5:5';
  }

  get avatarSrc():string {
    return `${this.base}/avata/${this.panelData.UserID}`;
  }

  get ProfitArr():string[] {
    return this.panelData.Profit.split('.');
  }

  $getLogStatus: any = getLoginStatus;

  join() {
    // 满标直接返回
    if (this.panelData.ExpectFollowerCount == this.panelData.FollowerCount) {
      this.$fmdialog({
        message: `${this.$i18n.t('noChance')}`,
        type: 'error',
        duration: 2000,
      });
      return;
    }
    this.$getLogStatus().then((user: any) => {
      if (user.islogin) {
        this.joinSasution(this.accounts, user);
      } else {
        loadAuth();
      }
    });
  }

  joinSasution(accounts: any, user: any) {
    const _this = this;
    // 判断该产品是不是当前用户自己发起的
    if (user.id == this.panelData.Trader.UserID) {
      this.$fmdialog({
        message: `${this.$i18n.t('youOwner')}`,
        type: 'error',
        duration: 2000,
      });
      return;
    }

    // 判断是否有相同经纪商的账户，并且是空闲的，否则去开户
    const sameBrokerAccounts = accounts.filter((account: any) => account.BrokerId === this.panelData.Trader.BrokerID) || [];
    if (sameBrokerAccounts.length == 0) {
      this.$fmdialog({
        message: `${this.$i18n.t('noMamFollower')} (${this.panelData.Trader.BrokerName}),${this.$i18n.t('tryAgain')}`,
        type: 'confirm',
        onConfirm: (flag: any) => {
          window.open(`${_this.kaiHu}/portalindex/upgrade/mam`);
        },
      });
      return;
    }
    const freeSameBrokerAccounts = sameBrokerAccounts.filter((account: any) => account.IsMAMFree === true) || [];
    if (freeSameBrokerAccounts.length == 0) {
      this.$fmdialog({
        message: `${this.$i18n.t('noMamUse')} (${this.panelData.Trader.BrokerName}),${this.$i18n.t('tryAgain')}`,
        type: 'confirm',
        onConfirm: (flag: any) => {
          window.open(`${_this.kaiHu}/portalindex/upgrade/mam`);
        },
      });
      return;
    }


    // 判断是否有MAM跟随者账户
    const mamFollowerAccounts = accounts.filter((account: any) => account.UserType === 2 && account.AccountType === 3) || [];
    if (mamFollowerAccounts.length == 0) {
      this.$fmdialog({
        message: `${this.$i18n.t('noMamFolloerAccount')}`,
        type: 'confirm',
        onConfirm: (flag: any) => {
          window.open(`${_this.kaiHu}/portalindex/upgrade/mam`);
        },
      });
      return;
    }
    // 判断是否有空闲的MAM跟随者账户
    const mamFreeFollowerAccounts = mamFollowerAccounts.filter((account: any) => account.IsMAMFree === true) || [];
    if (mamFreeFollowerAccounts.length == 0) {
      this.$fmdialog({
        message: `${this.$i18n.t('noMoreAccount')}`,
        type: 'error',
        duration: 2000,
      });
      return;
    }
    // 通过了直接可以参与了
    openJoinDialog({
      productId: _this.panelData.ID,
      onSuccess: () => {
        _this.$emit('fetch-data');
      },
    });
  }
}
</script>
<style lang="less" scoped>
@theme-color: #ff6200;
@border-color: #f4f4f5;
@base-font: 24;
.width(@value) {
  width: unit(@value / @base-font, rem);
}
.height(@value) {
  height: unit(@value / @base-font, rem);
}
.panel-container {
  font-size: 12rem / @base-font;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  .width(380);
  .height(480);
  .panel-header {
    border-bottom: 1px solid @border-color;
    padding: 15rem / @base-font 35rem / @base-font;
    cursor: pointer;
    .panel-title {
      font-size: 18rem / @base-font;
      font-weight: bold;
    }

    .panel-desc {
      display: flex;
      align-items: center;
    }

    .avatar-circle {
      @size: 36rem / @base-font;
      width: @size;
      height: @size;
      line-height: @size;
      text-align: center;
      color: #fff;
      border-radius: 50%;
      overflow: hidden;
      // background-color: @theme-color;
      font-size: 14rem / @base-font;
      margin-right: 10rem / @base-font;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .desc-info {
      p {
        margin: 5rem / @base-font 0;
      }
    }
    .info-main {
      font-size: 14rem / @base-font;
      color: #6d6d6d;
    }
    .info-sub {
      font-size: 12rem / @base-font;
      color: #aaaaaa;
      span {
        margin-right: 10rem / @base-font;
      }
    }
  }
  .panel-body {
    padding: 0 35rem / @base-font;
    .income {
      // border-bottom: 1px solid @border-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 150rem / @base-font;
      @value-color: #01aa6d;
      .income-value {
        color: @value-color;
        font-size: 34rem / @base-font;
        font-weight: bold;
        display: block;
        &.deficit{
          color: @theme-color;
        }
        .income-value-float,.income-value-percent{
          font-size: 20rem/@base-font;
        }
      }
      .income-label {
        font-size: 14rem / @base-font;
        line-height: 1.8;
        color: #aaaaaa;
      }
    }
    .sub-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin: 35rem / @base-font 0;
      li {
        min-width: 50%;
        line-height: 1.8;
        .sub-info-label {
          color: #aaa;
          margin-right: 3px;
        }
        .sub-info-value {
          color: #6d6d6d;
        }
      }
    }
  }
  .progress-box{
      .progress-info{
          color: #999999;
          font-size: 12px;
          margin-bottom: 5px;
      }
      .progress-out{
          position: relative;
          height: 10px;
          border-radius: 10px;
          background: #eeeeee;
          .progress-in{
              position: absolute;
              height: 10px;
              border-radius: 10px;
              background: #5aabe3;
          }
      }
  }
  .allways-color {
    background-color: #ff6200 !important;
    color: #ffffff !important;
    &:hover {
      background-color: #ff7e00 !important;
    }
  }
  .submit-button {
    width: 100%;
    display: inline-flex;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    font-size: 14rem / @base-font;
    height: 36rem / @base-font;
    border-radius: 36rem / @base-font;
    border: 2px solid @theme-color;
    color: @theme-color;
    background-color: #fff;
    margin-bottom: 8rem / @base-font;
    &:hover{
      color:#fff;
      background-color: #FF7100;
    }
  }
  .inter-time {
    text-align: center;
  }
  .safe-img {
    position: absolute;
    right: 30rem / @base-font;
    top: 0;
  }
}

@media screen and (max-width: 880px) {
  @base-font: 20;
}
</style>
