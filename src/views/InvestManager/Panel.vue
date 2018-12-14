<template>

  <div
    class="panel-container"
    :style="{width:width}"
  >
    <section class="panel-header">
      <h2 class="panel-title">{{panelData.Name}}</h2>
      <div class="panel-desc">
        <div class="avatar-circle">
          <img
            :onerror="errorUrl"
            :src="avatarSrc"
            alt=""
          >
        </div>
        <div class="desc-info">
          <p class="info-main">{{panelData.Nickname}}</p>
          <p class="info-sub">
            <span>历史发起 {{panelData.ProductCount}}</span>
            <span>平均收益率 {{panelData.AverageROI}}</span>
          </p>
        </div>
      </div>
    </section>
    <section class="panel-body">
      <ul class="income">
        <li>
          <span class="income-value" :class="{deficit:panelData.Profit.slice(0,1) === '-'}">
            <span>{{ProfitArr[0]}}</span>
            <span>.</span>
            <span class="income-value-float">{{ProfitArr[1]}}</span>
          </span>
          <span class="income-label">当前产品收益</span>
        </li>
        <li>
          <span class="income-value" :class="{deficit:panelData.Profit.slice(0,1) === '-'}">
            <span>{{panelData.ROI.slice(0,-1)}}</span>
            <span class="income-value-percent">%</span>
          </span>
          <span class="income-label">当前收益率</span>
        </li>
      </ul>
      <ul class="sub-info">
        <li>
          <span class="sub-info-label">产品资金</span>
          <span class="sub-info-value">${{panelData.Balance}}</span>
        </li>
        <li>
          <span class="sub-info-label">剩余时间</span>
          <span class="sub-info-value">{{panelData.DaysLeft}}天</span>
        </li>
        <li>
          <span class="sub-info-label">参与人数</span>
          <span class="sub-info-value">{{joinCount}}人</span>
        </li>
        <li>
          <span class="sub-info-label">收益分配</span>
          <span class="sub-info-value">{{incomeDistribution}}</span>
        </li>
      </ul>
      <button
        class="submit-button"
        @click="handleCommit"
      >立即参与</button>
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

interface Context {
  Name?: string;
  FollowerCount: number;
  StopLossRatio: number;
  TakeProfitRatio: number;
  UserID: number;
  Profit:string;
}

@Component
export default class Panel extends Vue {
  private baseSrc: string = '//www.followme.com/Avata/';

  private errorUrl: string = 'this.src=\'//cdn.followme.com/images/default_avata.png\';';

  @Prop() private width!: string;

  @Prop({ default: () => {} }) private panelData!: Context;

  get joinCount() {
    return this.panelData.FollowerCount + 1;
  }

  get incomeDistribution() {
    return (
      `${(this.panelData.StopLossRatio * 10 - this.panelData.TakeProfitRatio * 10)} : ${this.panelData.TakeProfitRatio * 10}`
    );
  }

  get avatarSrc() {
    return `${this.baseSrc}${this.panelData.UserID}`;
  }

  get ProfitArr() {
    return this.panelData.Profit.split('.');
  }

  handleCommit() {}
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
  .height(440);
  .panel-header {
    border-bottom: 1px solid @border-color;
    padding: 15rem / @base-font 35rem / @base-font;
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
      border-bottom: 1px solid @border-color;
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
          color:#a6a6a6;
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
  .submit-button {
    width: 100%;
    font-size: 14rem / @base-font;
    height: 36rem / @base-font;
    border-radius: 36rem / @base-font;
    border: 2px solid @theme-color;
    color: @theme-color;
    background-color: #fff;
    margin-bottom: 40rem / @base-font;
    outline: none;
    &:hover{
      color:#fff;
      background-color: #FF7100;
    }
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
