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
        <li title="(发起人资金+最低参与资金*目标跟随人数）*预期收益率">
          <span class="income-value deficit">
            <span>{{expectProfit}}</span>
            <!-- <span>.</span> -->
            <!-- <span class="income-value-float">{{ProfitArr[1]}}</span> -->
          </span>
          <span class="income-label">预期收益</span>
        </li>
        <li>
          <span class="income-value deficit">
            <span>{{expectRoi}}</span>
            <!-- <span class="income-value-percent">%</span> -->
          </span>
          <span class="income-label">预期收益率</span>
        </li>
      </ul>
      <div class="progress-box">
          <div class="progress-info">
              剩余 <span style="color:#5aabe3;">{{this.panelData.ExpectFollowerCount - this.panelData.FollowerCount}}</span>
               人 / 共 <span>{{this.panelData.ExpectFollowerCount}}</span> 人
          </div>
          <div class="progress-out">
              <div class="progress-in" :style="{width: progressWidth}"></div>
          </div>
      </div>
      <ul class="sub-info">
        <li>
          <span class="sub-info-label">最低参与资金</span>
          <span class="sub-info-value">{{minFollowBalance}}</span>
        </li>
        <li>
          <span class="sub-info-label">最大风险</span>
          <span class="sub-info-value" style="color: #ff6200;">{{followerMaxRisk}}</span>
        </li>
        <li>
          <span class="sub-info-label">操作周期</span>
          <span class="sub-info-value">{{daysLeft}}</span>
        </li>
        <li>
          <span class="sub-info-label">收益分配</span>
          <span class="sub-info-value">{{incomeDistribution}}</span>
        </li>
      </ul>
      <a
        :class="panelData.Status === 'Pending' ? 'submit-button allways-color' : 'submit-button'"
        href="javascript:void(0);"
        @click="join"
        target="_blank"
      >{{
        {
          'Trading': '查看详情',
          'Settled': '查看详情',
          'Pending': '立即参与',
        }[panelData.Status]
      }}</a>
      <div class="inter-time">
        <span title="剩余参与时间">{{timeCount}}</span>
      </div>
    </section>
    <img
      src="./safe.png"
      class="safe-img"
    />
  </div>
</template>
<script lang="ts">
import {
  Vue, Watch, Prop, Component,
} from 'vue-property-decorator';
import zhCN from '@/i18n/zh-CN/views/InvestManager/Panel';
import zhTW from '@/i18n/zh-TW/views/InvestManager/Panel';
import enUS from '@/i18n/en-US/views/InvestManager/Panel';

import {
  percentFormat, numberFormat, timeFormat, moneyFormat,
} from '@/utils/format';

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
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
    },
  },
})
export default class Panel extends Vue {
  private errorUrl: string = 'this.src=\'//cdn.followme.com/images/default_avata.png\';';

  @Prop() private width!: string;

  @Prop({ default: () => {} }) private panelData!: any;

  @Prop({ default: () => [] }) private accounts!: any;

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
    const now = new Date();
    const endDate = new Date(this.panelData.ExpectStartTime * 1000);
    const leftTime = endDate.getTime() - now.getTime();
    // eslint-disable-next-line
    const leftsecond = parseInt(`${leftTime / 1000}`);
    this.timeCount = timeFormat(leftsecond);
    if (!leftTime) window.clearInterval(this.timeInter);
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
    return `${this.panelData.DaysLeft}天`;
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
        message: '抱歉~当前产品跟随名额已满',
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
        message: '您是发起人，无法参与',
        type: 'error',
        duration: 2000,
      });
      return;
    }

    // 判断是否有相同经纪商的账户，并且是空闲的，否则去开户
    const sameBrokerAccounts = accounts.filter((account: any) => account.BrokerId === this.panelData.Trader.BrokerID) || [];
    if (sameBrokerAccounts.length == 0) {
      this.$fmdialog({
        message: `您没有可用的MAM跟随者账户(${this.panelData.Trader.BrokerName}),请开户后重试`,
        type: 'confirm',
        onConfirm: (flag: any) => {
          window.open(`${_this.base}/portalindex/upgrade/index?type=5`);
        },
      });
      return;
    }
    const freeSameBrokerAccounts = sameBrokerAccounts.filter((account: any) => account.IsMAMFree === true) || [];
    if (freeSameBrokerAccounts.length == 0) {
      this.$fmdialog({
        message: `您没有可用的MAM跟随者账户(${this.panelData.Trader.BrokerName}),请开户后重试`,
        type: 'confirm',
        onConfirm: (flag: any) => {
          window.open(`${_this.base}/portalindex/upgrade/index?type=5`);
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
        onConfirm: (flag: any) => {
          window.open(`${_this.base}/portalindex/upgrade/index?type=5`);
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
