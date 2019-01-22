<template>
  <div class="line-card-content">
    <div class="card-header">
      <slot name="left">
        <div class="card-header-left">
          <div class="card-avatar">
            <img
              @mouseenter.self="mouseenter($event)"
              @mouseleave="mouseleave($event)"
              @click="toPersonal" :alt="data.name || '头像'" :src="data.avatar" />
          </div>
        </div>
        <div class="card-header-right">
          <div class="name">
            <span
              class="name-info-container"
            >
                <span
                  @mouseenter.self="mouseenter($event)"
                  @mouseleave="mouseleave($event)"
                  @click="toPersonal"
                  class="name-hover">{{data.name}}</span>
                <span>&nbsp;#{{data.index}}</span>
                <span
                  v-if="data.isShowGrade"
                  :class="'grade-score-icon ' + mapGradeClass(data.grade)"
                >{{data.grade}}</span>
                <span
                  v-if="data.isShowPta"
                  :class="'grade-score-icon '"
                >
                  <img style="width: 14px; height: 14px;" src="~@/assets/pta.png" />
                </span>
              </span>
          </div>
          <div class="broker">
            <span>{{data.brokerName}}</span>
          </div>
        </div>
      </slot>
    </div>
    <div class="line-content right-line">
      <div
        :key="i.val" v-for="i in data.data"
        class="right-line-container line-rate"
      >
        <div class=""><span :class="{'rate-val': true, green: i.highlight}">{{i && i.val}}&nbsp;</span></div>
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

  mouseenter($event: any) {
    this.$emit('showCard', $event);
  }

  mouseleave($event: any) {
    this.$emit('hideCard', $event);
  }

  sub() {
    console.log('sub');
    this.$emit('subscribe', this.data);
  }

  toPersonal() {
    this.$emit('toPersonal', this.data);
  }

  mapGradeClass(val: any) {
    const grade = val;
    const gradeMap: any = {
      S: 1,
      'A+': 2,
      A: 3,
      'A-': 4,
      B: 5,
      C: 6,
      D: 7,
    };
    return `grade-score-${gradeMap[grade]}`;
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
.green {
  color: @success-color;
}
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
      align-items: center;
      .card-header-left {
        // width:50px;
        // height:50px;
        // display: flex;
        // align-items: center;
        // justify-content: flex-start;
        .card-avatar {
          width:40px;
          height:40px;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
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
        padding-left: 4px;
        >div {
          flex: 1;
        }
        .name {
          cursor: pointer;
          font-size:16px;
          color:rgba(51,51,51,1);
          .name-hover {
            &:hover {
              color: @default-color;
              cursor: pointer;
            }
          }
          .name-info-container {
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
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
          line-height:26px;
          font-weight: 600;
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
        align-items: flex-end;
        .subscribe-btn {
          max-width: 100px;
          line-height:19px;
          text-align: center;
          padding: 6px 16px;
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
      margin-top: 7px;
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

    .green {
      color:rgba(31,187,149,1);
    }
  }


.grade-score-icon {
  display: inline-block;
  width:20px;
  height:14px;
  font-size:12px;
  font-family:DINOT-Bold;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:14px;
  border-radius: 6px  2px  6px  2px;
  text-align: center;
  margin-left: 4px;
}
.grade-score-1 {
  color: #FFDEA1;
  background: linear-gradient(to bottom, #8A8D91, #272829);
}
.grade-score-2 {
  background: linear-gradient(to bottom, #F2D6A2, #BFA36F);
}
.grade-score-3 {
  background: linear-gradient(to bottom, #F2D6A2, #BFA36F);
}
.grade-score-4 {
  background: linear-gradient(to bottom, #F2D6A2, #BFA36F);
}
.grade-score-5 {
  background: linear-gradient(to bottom, #DADCE0, #A3A5A8);
}
// c
.grade-score-6 {
  background: linear-gradient(to bottom, #E2E2E2, #C5C7CA);
}
.grade-score-7 {
  background: linear-gradient(to bottom, #E2E2E2, #C5C7CA);
}
</style>
