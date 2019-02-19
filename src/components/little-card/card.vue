<template>
  <div class="card-content">
    <div class="card-header">
      <slot name="header">
        <div class="card-header-left">
          <div class="card-avatar">
            <img
              @mouseenter.self="mouseenter($event)"
              @mouseleave="mouseleave($event)"
              @click="toPersonal" alt="头像"
              v-lazyLoad="data.avatar + '?x-oss-process=image/resize,m_fill,h_50,w_50'"
              src="//cdn.followme.com/images/default_avata.png" :src1="data.avatar + '?x-oss-process=image/resize,m_fill,h_50,w_50'" />
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
                  <PtaLogo />
                </span>
            </span>
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
          <div :key="i.val" v-for="(i, index) in data.data" class="num-left" :title="i.val">
            <span :class="{'green': index === 0 }">{{i && i.val }}</span>
          </div>
        </div>
        <div class="num-same desc">
          <div :key="i.prop" v-for="i in data.data"><span>{{i && i.prop || ''}}</span></div>
        </div>
      </div>
      <div class="sub-btn">
        <span v-if="data.confirmBtn" @click="sub" class="subscribe-btn">{{data.confirmBtn}}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PtaLogo from '@/components/ptaLogo/index.vue';
import { loadAsyncImage } from '@/utils/util';

@Component({
  components: {
    PtaLogo,
  },
  directives: {
    lazyLoad: {
      bind: (el: any, binding: any) => {
        const src = binding.value;
        loadAsyncImage(src, 0)
          .then((res: any) => {
            el.src = src;
          }).catch(() => {
            el.src = src;
          });
      },
    },
  },
})
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
  .card-content {
    flex: 1;
    font-size: 16px;
    height:170px;
    // max-width:441px;
    background:#ffffff;
    padding: 30px;

    .card-header {
      .flex-row();
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
            max-width: 40px;
            border-radius: 50%;
          }
        }
      }
      .card-header-right {
        padding-left: 4px;
        flex: 1;
        font-size:12px;
        color:rgba(153,153,153,1);
        .flex-column();
        min-height: 40px;
        >div {
          flex: 1;
        }
        .name {
          cursor: pointer;
          font-size:16px;
          min-height:16px;
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
          min-height: 20px;
          >div {
            flex: 1;
            overflow: hidden;
          }
          .num-left {
            margin-right: 4px;
            span {
              font-weight: 600;
            }
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
              &:hover {
                background: @hover-default-color;
              }
            }
        }
      }
    }
    .green {
      color: #1FBB95;
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
