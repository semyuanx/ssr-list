<template>
  <div class="append-loading">
    <div class="append-header">
      <div class="header-left">
        <span class="col-1"></span>
        <span class="col-2"></span>
      </div>
      <div class="header-right"></div>
    </div>
    <div class="append-img"></div>
    <div class="append-list">
      <div class="append-item"></div>
      <div class="append-item"></div>
      <div class="append-item"></div>
      <div class="append-item"></div>
    </div>
    <div class="append-bto">
      <div class="append-bto-left"></div>
      <div class="append-bto-right"></div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class CardTableLoading extends Vue {}
</script>
<style lang="less" scoped>
.append-loading {
  animation: animations-loading 2s ease-in-out 0.1s infinite forwards;
  padding: 20px 15px;
  width: 286px;
  height: 388px;
  background-color: #fff;
  .append-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left {
      span {
        display: block;
        background-color: #ebebeb;
        border-radius: 3px;
        margin-bottom: 10px;
        &.col-1 {
          height: 16px;
          width: 132px;
        }
        &.col-2 {
          width: 70px;
          height: 12px;
        }
      }
    }
    .header-right {
      width: 70px;
      height: 70px;
      border-radius: 100%;
      background-color: #ebebeb;
    }
  }
  .append-img {
    height: 80px;
    margin-top: 10px;
  }
  .append-list {
    .append-item {
      height: 12px;
      background-color: #ebebeb;
      border-radius: 3px;
      margin-top: 20px;
    }
  }
  .append-bto {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .append-bto-left {
      width: 60px;
      height: 12px;
      background-color: #ebebeb;
    }
    .append-bto-right {
      height: 30px;
      width: 60px;
      background-color: #ebebeb;
      border-radius: 30px;
    }
  }
}
@keyframes animations-loading {
  0% {
    opacity: 0.1;
  }
  10% {
    opacity: 0.2;
  }
  20% {
    opacity: 0.4;
  }
  30% {
    opacity: 0.6;
  }
  40% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  60% {
    opacity: 0.8;
  }
  70% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.4;
  }
  90% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.1;
  }
}
</style>
