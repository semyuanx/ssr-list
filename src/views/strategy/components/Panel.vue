<template>
  <div class="panel-container">
    <section class="panel-header">
      <h2 class="panel-title">博海飞舟 甲木1</h2>
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
          <span class="sub-info-value">2：8</span>
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

@Component
export default class Panel extends Vue {
  handleCommit() {

  }
}
</script>
<style lang="less" scoped>
@theme-color: #ff6200;
@border-color: #f4f4f5;
.panel-container {
  position: relative;
  background-color: #fff;
  overflow: hidden;
  width: 391px;
  height: 464px;
  .panel-header {
    border-bottom: 1px solid @border-color;
    padding: 15px 35px;
    .panel-title {
      font-size: 18px;
      font-weight: bold;
    }

    .panel-desc {
      display: flex;
      align-items: center;
    }

    .avatar-circle {
      @size: 36px;
      width: @size;
      height: @size;
      line-height: @size;
      text-align: center;
      color: #fff;
      border-radius: 50%;
      background-color: @theme-color;
      font-size: 14px;
      margin-right: 10px;
    }

    .desc-info {
      p {
        margin: 5px 0;
      }
    }
    .info-main {
      font-size: 14px;
      color: #6d6d6d;
    }
    .info-sub {
      font-size: 12px;
      color: #aaaaaa;
      span {
        margin-right: 10px;
      }
    }
  }
  .panel-body {
    padding: 0 35px;
    .income {
      border-bottom: 1px solid @border-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 150px;
      @value-color: #01aa6d;
      .income-value {
        color: @value-color;
        font-size: 30px;
        font-weight: bold;
        display: block;
      }
      .income-label {
        font-size: 14px;
        line-height: 1.8;
        color: #aaaaaa;
      }
    }
    .sub-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin: 35px 0;
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
    height: 36px;
    border-radius: 36px;
    border: 2px solid @theme-color;
    color: @theme-color;
  }
  .safe-img {
    position: absolute;
    right: 30px;
    top: 0;
  }
}
</style>
