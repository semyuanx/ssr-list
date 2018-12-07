<template>
  <div class="panel-container" :style="{width:width}">
    <section class="panel-header">
      <h2 class="panel-title">{{panelData.Name}}</h2>
      <div class="panel-desc">
        <div class="avatar-circle">博海</div>
        <div class="desc-info">
          <p class="info-main">博海飞舟 KVBmini-#6</p>
          <p class="info-sub"><span>历史发起0</span> <span>平均收益率0%</span></p>
        </div>
      </div>
    </section>
    <section class="panel-body">
      <ul class="income">
        <li>
          <span class="income-value">$630.38</span>
          <span class="income-label">当前产品收益</span>
        </li>
        <li>
          <span class="income-value">3.08%</span>
          <span class="income-label">当前收益率</span>
        </li>
      </ul>
      <ul class="sub-info">
        <li>
          <span class="sub-info-label">产品资金</span>
          <span class="sub-info-value">$20438.75</span>
        </li>
        <li>
          <span class="sub-info-label">剩余时间</span>
          <span class="sub-info-value">63天</span>
        </li>
        <li>
          <span class="sub-info-label">参与人数</span>
          <span class="sub-info-value">4人</span>
        </li>
        <li>
          <span class="sub-info-label">收益分配</span>
          <span class="sub-info-value">2:8</span>
        </li>
      </ul>
      <button class="submit-button" @click="handleCommit">立即参与</button>
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
    Name: string;
}

@Component
export default class Panel extends Vue {
  @Prop() private width!: string;

  @Prop({ default: () => {} }) private panelData!: Context;

  handleCommit() {

  }
}
</script>
<style lang="less" scoped>
@theme-color: #ff6200;
@border-color: #f4f4f5;
@base-font: 24;
.width(@value) { width:unit(@value / @base-font,rem)}
.height(@value) { height:unit(@value / @base-font,rem)}
.panel-container {
  font-size: 12rem/@base-font;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  .width(380);
  .height(460);
  .panel-header {
    border-bottom: 1PX solid @border-color;
    padding: 15rem/@base-font  35rem/@base-font;
    .panel-title {
      font-size: 18rem/@base-font;
      font-weight: bold;
    }

    .panel-desc {
      display: flex;
      align-items: center;
    }

    .avatar-circle {
      @size: 36rem/@base-font;
      width: @size;
      height: @size;
      line-height: @size;
      text-align: center;
      color: #fff;
      border-radius: 50%;
      background-color: @theme-color;
      font-size: 14rem/@base-font;
      margin-right: 10rem/@base-font;
    }

    .desc-info {
      p {
        margin: 5rem/@base-font 0;
      }
    }
    .info-main {
      font-size: 14rem/@base-font;
      color: #6d6d6d;
    }
    .info-sub {
      font-size: 12rem/@base-font;
      color: #aaaaaa;
      span {
        margin-right: 10rem/@base-font;
      }
    }
  }
  .panel-body {
    padding: 0 35rem/@base-font;
    .income {
      border-bottom: 1px solid @border-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 150rem/@base-font;
      @value-color: #01aa6d;
      .income-value {
        color: @value-color;
        font-size: 30rem/@base-font;
        font-weight: bold;
        display: block;
      }
      .income-label {
        font-size: 14rem/@base-font;
        line-height: 1.8;
        color: #aaaaaa;
      }
    }
    .sub-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin: 35rem/@base-font 0;
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
    font-size: 14rem/@base-font;
    height: 36rem/@base-font;
    border-radius: 36rem/@base-font;
    border: 2px solid @theme-color;
    color: @theme-color;
  }
  .safe-img {
    position: absolute;
    right: 30rem/@base-font;
    top: 0;
  }
}
</style>
