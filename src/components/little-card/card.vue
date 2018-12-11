<template>
  <div class="card-content">
    <div class="card-header">
      <div class="card-header-left">
        <div class="card-avatar">头像</div>
      </div>
      <div class="card-header-right">
        <div class="name">
          <span>黄晓伟黄晓伟黄晓 #6</span>
        </div>
        <div class="broker">
          <span>Fxpro</span>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="num-container">
        <div class="num-same num">
          <div class="num-left"><span>89.78%</span></div>
          <div class="num-right"><span>458</span></div>
        </div>
        <div class="num-same desc">
          <div><span>收益率</span></div>
          <div><span>订阅人数</span></div>
        </div>
      </div>
      <div class="sub-btn">
        <span class="subscribe-btn">$0.99/月</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FmLittleCard extends Vue {
  public name: string = 'fm-little-card';
}
</script>
<style lang="less" scoped>
.flex-row() {
  display: flex;
  flex-direction: row;
}
.flex-column() {
  display: flex;
  flex-direction: column;
}
  .card-content {
    flex: 1;
    font-size: 16px;
    height:170px;
    // max-width:441px;
    background:#ffffff;
    padding: 30px;

    .card-header {
      .flex-row();
      .card-header-left {
        width:50px;
        height:50px;
        display: flex;
        align-items: center;
        justify-content: center;
        .card-avatar {
          width:40px;
          height:40px;
          border-radius: 20px;
          border: 1px solid pink;
        }
      }
      .card-header-right {
        flex: 1;
        font-size:12px;
        color:rgba(153,153,153,1);
        .flex-column();
        >div {
          flex: 1;
        }
        .name {
          font-size:16px;
          color:rgba(51,51,51,1);
        }
      }
    }
    .card-body {
      margin-top: 24px;
      .flex-row();
      .num-container {
        flex: 3;
        .flex-column();
        justify-content: flex-start;
        .num-same {
          .flex-row();
          flex: 1;
        }
        .num {
          font-size:20px;
          color: #1FBB95;
          >div {
            flex: 1;
          }
          .num-left {

          }
          .num-right {
            color: #333333;

          }
        }
        .desc {
          >div {
            flex: 1;
            font-size:12px;
            color: #999999;
          }
        }
      }
      .sub-btn {
        flex: 1;
        .flex-row();
        justify-content: flex-end;
        align-items: center;
        .subscribe-btn {
          font-size:14px;
          font-family:MicrosoftYaHei;
          color:rgba(255,98,0,1);
        }
      }
    }

    &:hover {
      box-shadow:0px 0px 30px 0px rgba(0,0,0,0.1);
      background:rgba(255,255,255,1);
      z-index: 10;
      .card-body {
        .sub-btn {
          .subscribe-btn {
              cursor: pointer;
              background:rgba(255,98,0,1);
              border-radius:20px;
              font-size:14px;
              font-family:MicrosoftYaHei;
              color:rgba(255,255,255,1);
              line-height:19px;
              padding: 6px 14px;
            }
        }
      }
    }

  }
</style>
