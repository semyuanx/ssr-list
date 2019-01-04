<template>
  <div class="line-card-content">
    <div class="card-header">
      <slot name="left">
        <div class="card-header-left">
          <div class="card-avatar">
            <img :alt="data.name || '头像'" :src="data.avatar" />
          </div>
        </div>
        <div class="card-header-right">
          <div class="name">
            <span>{{data.name}} #{{data.index}}</span>
          </div>
          <div class="broker">
            <span>{{data.brokerName}}</span>
          </div>
        </div>
      </slot>
    </div>

    <!-- <div class="line-content left-line">
      <div><span>量化交易5号</span></div>
      <div class="danger-rate"><span>风险<1%</span></div>
    </div> -->
    <div class="line-content right-line">
      <div
        :key="i.val" v-for="i in data.data"
        class="right-line-container line-rate"
      >
        <div><span class="rate-val">{{i && i.val || ''}}</span></div>
        <div><span class="common-font">{{i && i.prop || ''}}</span></div>
      </div>
      <slot name="right">
        <div class="right-line-container line-join">
          <span @click="sub" class="subscribe-btn">{{data.price ? `$${data.price}/月` : data.rightBtnText ? data.rightBtnText : '免费订阅'}}</span>
        </div>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FmLittleCard extends Vue {
  public name: string = 'fm-little-card';

  @Prop({
    default: () => {},
  })
  data: any;

  sub() {
    console.log('sub');
    this.$emit('subscribe', this.data);
  }
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

    .card-header {
      .flex-row();
      flex: 2;
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
          overflow: hidden;
          >img {
            max-width: 100%;
            max-width: 100%;
            border-radius: 50%;
          }
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

    .left-line {
      flex: 2;
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
        .subscribe-btn {
          line-height:19px;
          text-align: center;
          padding: 6px 8px;
          border-radius: 20px;
          cursor: pointer;
          font-size:14px;
          font-family:MicrosoftYaHei;
          color:rgba(255,98,0,1);
          transition: all .3s ease-in-out;
        }
      }
    }
    .common-font {
      font-size:12px;
      font-family:MicrosoftYaHei;
      color:rgba(153,153,153,1);
    }

    &:hover {
      box-shadow:0px 0px 30px 0px rgba(0,0,0,0.1);
      background:rgba(255,255,255,1);
      z-index: 10;
      .right-line {
        .line-join {
          .subscribe-btn {
              background-color:rgba(255,98,0,1);
              color:rgba(255,255,255,1);
            }
        }
      }
    }
  }
</style>
