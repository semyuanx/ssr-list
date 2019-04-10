<template>
  <div class="chart-card-content">
    <slot name="header">
      <div class="card-header">
        <div class="card-title">
          <div class="info">

            <h3
              @mouseenter.self="mouseenter($event,item)"
              @mouseleave="mouseleave($event)"
              @click="toPersonal"
              class="name-hover"
            >{{item.name || item.NickName}}&nbsp;#{{item.index||item.AccountIndex}}</h3>
            <div class="name-info-container">
              <span
                v-if="item.isShowGrade"
                :class="'grade-score-icon ' + mapGradeClass(item.grade)"
              >{{item.grade}}</span>
              <span
                v-if="item.isShowPta"
                :class="'grade-score-icon '"
              >
                <PtaLogo />
              </span>
            </div>
            <div class="broker">
              <span>{{item.brokerName}}</span>
            </div>
          </div>
          <slot name="avatar">
          <div class="avatar">
            <img
              src="//cdn.followme.com/images/default_avata.png"
              v-lazyLoad="item.avatar + '?x-oss-process=image/resize,m_fill,h_50,w_50'"
              :src1="item.avatar + '?x-oss-process=image/resize,m_fill,h_70,w_70'"
              :alt="item.name || '头像'"
            />
          </div>
          </slot>
        </div>
        <div class="card-chart">
          <Chart
            v-if="item.trendChart"
            :chart-data="item.trendChart"
          ></Chart>
          <!-- <img
            v-else
            :src="cdn + '/images/NoData-Report.jpg'"
            style="display:block;width:100%;"
            :alt="$t('noData')"
          /> -->
        </div>
      </div>
    </slot>
    <ul class="card-list">
      <li
        v-for="(d,key) in item.data"
        :key="d"
      >
        <span>{{d && d.prop || ''}}</span>
        <span :class="{'rate-val': true, green: key === 0}">{{d && d.val}}</span>
      </li>
    </ul>
    <slot name="bottom">
      <div class="card-bto">
        <div class="left">累计订阅&nbsp;<span>{{item.subscribers}}</span></div>
        <div
          class="right"
          v-if="item.confirmBtn"
        >
          <span
            @click="sub"
            class="subscribe-btn"
          >{{item.confirmBtn}}</span>
        </div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { loadAsyncImage } from '@/utils/util';
import PtaLogo from '@/components/ptaLogo/index.vue';
import Chart from '@/components/chart/index.vue';
@Component({
  components: {
    PtaLogo,
    Chart,
  },
  directives: {
    lazyLoad: {
      bind: (el: any, binding: any) => {
        const src = binding.value;
        loadAsyncImage(src, 0)
          .then((res: any) => {
            el.src = src;
          })
          .catch(() => {
            el.src = src;
          });
      },
    },
  },
})
export default class ChartCard extends Vue {
  @Prop({
    default: () => ({
      name: '',
      index: '',
      isShowGrade: false,
      isShowPta: false,
      grade: '',
      brokerName: '',
      avatar: '',
      trendChart: '',
      data: [],
      confirmBtn: '',
    }),
  })
  item: any;

  trendChard:any=[{ Time: '1528646400', Value: 93667.89000000001 }, { Time: '1528732800', Value: 93524.89000000001 }, { Time: '1532016000', Value: 90346.57 }];

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

  mouseenter($event: any) {
    this.$emit('showCard', $event, this.item);
  }

  mouseleave($event: any) {
    this.$emit('hideCard', $event);
  }

  toPersonal() {
    this.$emit('toPersonal', this.item);
  }

  sub() {
    this.$emit('subscribe', this.item);
  }
}
</script>

<style lang="less" scoped>
.chart-card-content {
  background-color: #fff;
  width: 286px;
  .card-header {
    padding: 20px 20px 0 20px;
    .card-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      .info {
        h3 {
          font-size: 16px;
          color: #333;
          font-weight: 600;
          cursor: pointer;
          &:hover {
            color: @default-color;
          }
        }
        .name-info-container {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 5px 0;
          .grade-score-icon:first-child {
            margin-left: 0;
          }
        }
        .broker {
          color: #999999;
          font-size: 12px;
        }
      }
      .avatar {
        width: 50px;
        height: 50px;
        img {
          border-radius: 50px;
        }
      }
    }
    .card-chart {
      height: 75px;
      // overflow: hidden;
    }
  }
  .card-list {
    padding: 15px 20px;
    margin-bottom: -10px;
    li {
      display: flex;
      justify-content: space-between;
      color: #999999;
      font-size: 12px;
      line-height: 1.5;
      margin-bottom: 10px;
      .rate-val {
        font-size: 14px;
        &.green {
          color: #1fbb95;
          font-size: 16px;
        }
      }
    }
  }
  .card-bto {
    height: 50px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .left {
      color: #999;
      font-size: 12px;
    }
    .right {
      font-family: PingFangSC-Regular;
      color: @default-color;
      cursor: pointer;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(255, 98, 0, 1);
      transition: all 0.3s ease-in-out;
      text-align: center;
      padding: 5px 12px;
      border-radius: 20px;
      border: 1px solid @default-color;
      &:hover{
        background-color: @default-color;
        color: #ffffff;
      }
    }

  }
  &:hover {
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 1);
  }
}
.grade-score-icon {
  display: inline-block;
  width: 20px;
  height: 14px;
  font-size: 12px;
  font-family: DINOT-Bold;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 14px;
  border-radius: 6px 2px 6px 2px;
  text-align: center;
  margin-left: 4px;
}
.grade-score-1 {
  color: #ffdea1;
  background: linear-gradient(to bottom, #8a8d91, #272829);
}
.grade-score-2 {
  background: linear-gradient(to bottom, #f2d6a2, #bfa36f);
}
.grade-score-3 {
  background: linear-gradient(to bottom, #f2d6a2, #bfa36f);
}
.grade-score-4 {
  background: linear-gradient(to bottom, #f2d6a2, #bfa36f);
}
.grade-score-5 {
  background: linear-gradient(to bottom, #dadce0, #a3a5a8);
}
// c
.grade-score-6 {
  background: linear-gradient(to bottom, #e2e2e2, #c5c7ca);
}
.grade-score-7 {
  background: linear-gradient(to bottom, #e2e2e2, #c5c7ca);
}
</style>
