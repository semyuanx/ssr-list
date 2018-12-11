<template>
  <div class="line-card-content">
    <div class="line-content left-line">
      <div><span>量化交易5号</span></div>
      <div class="danger-rate"><span>风险<1%</span></div>
    </div>
    <div class="line-content right-line">
      <div class="right-line-container line-rate">
        <div><span class="rate-val">89.78%</span></div>
        <div><span class="common-font">预期收益率</span></div>
      </div>
      <div class="right-line-container line-leave">
        <div><span class="leave-val">1</span></div>
        <div><span class="common-font">剩余名额</span></div>
      </div>
      <div class="right-line-container line-join">
        <span>立即参与</span>
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
@success-color: #1FBB95;
  .line-card-content {
    flex: 1;
    font-size: 16px;
    height:120px;
    // max-width:441px;
    background:#ffffff;
    padding: 30px;
    .flex-row();
    .line-content {
      display: flex;
    }
    .left-line {
      flex: 4;
      .flex-column();
      font-size:20px;
      font-family:MicrosoftYaHei;
      color:rgba(51,51,51,1);
      line-height:26px;
      .danger-rate {
        >span {
          padding: 0 10px;
          font-size:12px;
          font-family:MicrosoftYaHei;
          color:rgba(31,187,149,1);
          line-height:16px;
          background-color:rgba(31, 187, 149, 0.1);
          border-radius:2px;
        }
      }
    }
    .right-line {
      flex: 5;
      .flex-row();
      .right-line-container {
        .flex-column();
        justify-content: center;
      }
      .line-rate {
        flex: 2;
        .rate-val {
          font-size:20px;
          font-family:DINOT-Bold;
          font-weight:bold;
          color:rgba(31,187,149,1);
          line-height:26px;
        }
      }
      .line-leave {
        flex: 2;
        .leave-val {
          font-size:20px;
          font-family:DINOT-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
          line-height:26px;
        }
      }
      .line-join {
        flex: 1;
        cursor: pointer;
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(255,98,0,1);
        line-height:19px;
      }
    }
    .common-font {
      font-size:12px;
      font-family:MicrosoftYaHei;
      color:rgba(153,153,153,1);
    }
  }
</style>
