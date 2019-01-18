<template>
  <div class="card-content">
    <div class="card-header">
      <slot name="header">
        <div class="card-header-left">
          <div class="card-avatar">
            <img
              @mouseenter.self="mouseenter($event)"
              @mouseleave="mouseleave($event)"
              @click="toPersonal" alt="头像" :src="data.avatar" />
          </div>
        </div>
        <div class="card-header-right">
          <div class="name">
            <span
            @mouseenter.self="mouseenter($event)"
            @mouseleave="mouseleave($event)"
            @click="toPersonal">{{data.name}} #{{data.index}}</span>
          </div>
          <div class="broker">
            <span>{{data.brokerName}}</span>
          </div>
        </div>
      </slot>
    </div>
    <div class="card-body">
      <div class="num-container">
        <div class="num-same num">
          <div :key="i.val" v-for="i in data.data" class="num-left" :title="i.val">
            <span :class="{'green': i.highlight}">{{i && i.val }}</span>
          </div>
          <!-- <div class="num-left"><span>89.78%</span></div> -->
          <!-- <div class="num-right"><span>458</span></div> -->
        </div>
        <div class="num-same desc">
          <div :key="i.prop" v-for="i in data.data"><span>{{i && i.prop || ''}}</span></div>
          <!-- <div><span>收益率</span></div>
          <div><span>订阅人数</span></div> -->
        </div>
      </div>
      <div class="sub-btn">
        <span @click="sub" class="subscribe-btn">{{data.price ? `$${data.price}/月` : data.rightBtnText ? data.rightBtnText : '免费订阅'}}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from '@/utils/util';

@Component
export default class FmLittleCard extends Vue {
  public name: string = 'fm-little-card';

  @Prop({
    default: () => {},
  })
  data: any;

  isNumber(str: any) {
    return isNumber(str);
  }

  mouseenter($event: any) {
    this.$emit('showCard', $event);
  }

  mouseleave($event: any) {
    this.$emit('hideCard', $event);
  }

  sub() {
    this.$emit('subscribe', this.data);
  }

  toPersonal() {
    this.$emit('toPersonal', this.data);
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
          // border: 1px solid pink;
          overflow: hidden;
          >img {
            cursor: pointer;
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
          cursor: pointer;
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
          margin-bottom: 4px;
          >div {
            flex: 1;
            overflow: hidden;
          }
          .num-left {
            margin-right: 4px;
          }
          .num-right {
            color: #333333;

          }
        }
        .desc {
          margin-top: 4px;
          >div {
            flex: 1;
            font-size:12px;
            color: #999999;
          }
        }
      }
      .sub-btn {
        // flex: 1;
        .flex-row();
        justify-content: flex-end;
        align-items: center;
        .subscribe-btn {
          cursor: pointer;
          line-height:19px;
          padding: 6px 14px;
          border-radius:20px;
          font-size:14px;
          font-family:MicrosoftYaHei;
          color:rgba(255,98,0,1);
          transition: all .3s ease-in-out;
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
              background:rgba(255,98,0,1);
              color:rgba(255,255,255,1);
            }
        }
      }
    }
    .green {
      color: #1FBB95;
    }

  }
</style>
