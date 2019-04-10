<template>
  <div class="strategy-container">
    <div
      class="header"
      v-if="header"
    >
      <!-- <SbHeader @rightClick="traderRegister"></SbHeader>
      <RankFilter></RankFilter> -->
    </div>
    <div class="lists-outer">
      <div class="lists-container">
        <div class="lists">
          <div
            :key="item.index + item.brokerName"
            v-for="item in data"
            class="list-item"
          >
            <!-- <FmCard
              @hideCard="hideCard"
              @showCard="showCard($event, item)"
              @toPersonal="toPersonal"
              @subscribe="handleSub"
              :data="item"
            >
              <template
                v-if="item.mam"
                slot="header"
              >
                <div class="fm-show-pc card-header">
                  <div class="mam-tag">
                    <span class="mam-type">{{item.type}}</span>
                  </div>
                  <div
                    class="mam-name"
                    @click="toMamPersonal(item)"
                  >{{item.name}}</div>
                  <div class="mam-danger">{{item.danger}}</div>
                </div>

                <div class="fm-show-mobile">
                  <div class="mobile-card-header">
                    <div class="mam-tag">
                      <span class="mam-type">{{item.type}}</span>
                    </div>
                    <div
                      class="mam-name"
                      @click="toMamPersonal(item)"
                    >{{item.name}}</div>
                    <div class="mam-danger">{{item.danger}}</div>
                  </div>
                </div>
              </template>
            </FmCard> -->

            <CharCard
              :item="item"
              @toPersonal="toPersonal"
              @subscribe="handleSub"
            >
              <template slot="header">
                <div class="fmcard-head">
                  <div class="fmcard-info">
                    <div
                      class="fmcard-name"
                      @click="toPersonal(item)"
                    >{{item.name}}&nbsp;#{{item.index}}</div>
                    <!-- <div class="fmcard-danger">{{item.danger}}</div> -->
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
                      </span></div>
                  </div>
                </div>
              </template>
            </CharCard>

          </div>
        </div>
      </div>

      <div
        v-if="data.length > 4"
        class="scroll-btn-container fm-show-pc"
      >
      <!-- :style="`left: ${0 - left}px;`" -->
        <div
          @click="scrollLeft"
          class="scroll-btn "
          :class="{'scroll-left': !scrollLeftBtn, grayed: scrollLeftBtn}"
          :style="`left: ${0}px;`"
        >
          <i class="icon-left_24px" />
        </div>
        <div
          @click="scrollRight"
          class="scroll-btn "
          :class="{'scroll-right': !scrollRightBtn, grayed: scrollRightBtn}"
          :style="`right: ${0}px;`"
        >
          <i class="icon-right_24px" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import SbHeader from '@/components/header/SbHeader.vue';
import FmCard from '@/components/card/Card.vue'; // @ is an alias to /src
import CharCard from '@/components/chart-card/card.vue';
import { getElementTop, getElementLeft } from '@/utils/util';
import eventBus from '@/utils/event';
import PtaLogo from '@/components/ptaLogo/index.vue';
import FilterBtn from '@/views/home/FilterHeader.vue';
import zhCN from '@/i18n/zh-CN/views/home/pc/Strategy';
import zhTW from '@/i18n/zh-TW/views/home/pc/Strategy';
import enUS from '@/i18n/en-US/views/home/pc/Strategy';
import zhHK from '@/i18n/zh-HK/views/home/pc/Strategy';
import { namespace } from 'vuex-class';
@Component({
  components: {
    SbHeader,
    FmCard,
    FilterBtn,
    RankFilter: () => import('@/views/rank-filter/rankFilter.vue'),
    CharCard,
    PtaLogo,
  },
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
      'zh-HK': zhHK,
    },
  },
})
export default class Home extends Vue {
  public name: string = 'fm-strategy';

  @Prop()
  subscribe: any;

  @Prop()
  data: any;

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

  public get data1() {
    return this.dataArr;
  }

  showCard($event: any, item: any) {
    // console.log(item, '*****');
    // return;
    this.$emit('showCard', $event, item);
  }

  hideCard($event: any) {
    this.$emit('hideCard', $event);
  }

  dataArr: any = [];

  @Watch('data')
  dataChanged() {
    this.dataArr = [...this.data];
  }

  @Prop({ default: () => {} })
  header: any;

  mounted() {
    this.computeContainer();
    eventBus.$on('window-resize', () => {
      this.computeContainer();
    });
  }

  public left: number = 0;

  computeContainer() {
    const el = this.$el;
    if (el) {
      const listContainer: any = el.querySelector('.lists-container');
      if (listContainer) {
        const left = getElementLeft(listContainer);
        this.$nextTick(() => {
          this.left = left;
        });
      }
    }
  }

  scrolled: number = 0;

  scrollLeft() {
    this.throttleScrollCompute();
  }

  scrollRight() {
    this.throttleScrollCompute(0);
  }

  throttleScrollCompute(direction: any = 1) {
    this.$nextTick(() => {
      this.scrollCompute(direction);
    });
  }

  scrollRightBtn: boolean = false;

  scrollLeftBtn: boolean = true;

  scrollCompute(direction: any = 1, scrollNum: number = 4) {
    // 1是left scroll; 0: right scroll
    const el = this.$el;
    const len = this.data.length;
    if (el && len > 4) {
      const listsContainer: any = el.querySelector('.lists-container');
      // const containerWidth = listsContainer.offsetWidth;
      const lists: any = el.querySelector('.lists');
      const width = lists.offsetWidth;
      if (lists) {
        const listItem = lists.querySelector('.list-item');
        if (listItem) {
          const singleWidth = listItem.offsetWidth;
          const containerWidth = singleWidth * len;

          let { scrolled } = this;
          let shouldScroll: string = '';

          const everyScrollWidth = singleWidth * scrollNum;

          if (direction === 1) {
            scrolled += everyScrollWidth;
          } else {
            scrolled -= everyScrollWidth;
          }
          const listsWidthPx = (len - 4) * singleWidth;
          const listsWidth = `${listsWidthPx}px`;

          // this.log(singleWidth, scrolled, len, this.scrollRightBtn, 'singleWidth')

          if (scrolled < 0) {
            const willScrolled = scrolled;
            // console.log(willScrolled, listsWidthPx);
            if (Math.abs(willScrolled) >= listsWidthPx) {
              const maxScroll = containerWidth - everyScrollWidth;
              scrolled = 0 - maxScroll;
              if (Math.abs(willScrolled) + 1 > maxScroll) {
                this.scrollRightBtn = true;
              } else {
                this.scrollRightBtn = false;
              }
            } else {
              this.scrollRightBtn = false;
            }
          } else {
            this.scrollRightBtn = false;
          }
          // if (scrolled)
          // this.log(direction, scrolled);
          if (direction === 1) {
            if (scrolled + 1 > 0) {
              this.scrollLeftBtn = true;
            } else {
              this.scrollLeftBtn = false;
            }
            if (this.scrolled > 0 || this.scrolled === 0) {
              return;
            }
          } else {
            this.scrollLeftBtn = false;
          }
          if (scrolled > 10 || Math.abs(scrolled) < singleWidth / 2) {
            scrolled = 0;
          }

          shouldScroll = `${scrolled}px`;

          lists.style = `transform:translateX(${shouldScroll}); width: ${listsWidth}`;
          this.scrolled = scrolled;
        }
      }
    }
  }

  transitionAnimate() {}

  handleSub(item: any) {
    if (this.subscribe) {
      this.subscribe(item);
    } else {
      this.log('mobile');
    }
  }

  toPersonal(item: any) {
    this.$emit('toPersonal', item);
  }

  toMamPersonal(item: any) {
    const mainItem = item.item;
    if (mainItem && mainItem.Trader) {
      const info = { item: mainItem.Trader };
      this.$emit('toPersonal', info);
    }
  }

  toRankList() {
    this.$router.push({ name: 'rankList' });
  }

  traderRegister() {
    this.redirectTo('traderRegister');
  }
}
</script>
<style lang="less" scoped>
i[class^="icon-"] {
  font-size: 18px;
}
.strategy-container {
  .header {
    .header-sub-title {
      padding: 5px 10px;
      display: inline-flex;
      align-items: center;
      background-color: #ff6200;
      font-size: 14px;
      color: #ffffff;
      border-radius: 30px;
    }
  }
  .lists-outer {
    position: relative;
    .scroll-btn-container {
      .scroll-btn {
        cursor: pointer;
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        background: rgba(0,0,0,.4);
        border-radius: 2px;
        height: 90px;
        width: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #767676;
        > i {
          font-size: 50px;
          color: #ffffff;
        }
      }
      .scroll-left {
        left: 20px;
        &:hover {
          i > {
            color: @default-color;
          }
        }
      }
      .scroll-right {
        right: 20px;
        &:hover {
          i > {
            color: @default-color;
          }
        }
      }
      .grayed {
        i {
          color: rgba(118, 118, 118, 0.3);
        }
      }
    }
  }
  .lists-container {
    width: 100%;
    overflow: hidden;
    padding: 0 0 20px 0;
    -webkit-overflow-scrolling: touch;
    .lists {
      display: flex;
      flex-direction: row;
      width: 100%;
      -webkit-overflow-scrolling: touch;
      transition: all 0.3s ease-in-out;
      .list-item {
        padding-right: 12px;
        padding-top: 15px;
        padding-bottom: 15px;
        .card-header {
          .mam-tag {
            text-align: center;
            margin-bottom: 14px;
            .mam-type {
              width: 60px;
              height: 20px;
              background: rgba(255, 98, 0, 1);
              border-radius: 14px;
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color: rgba(255, 255, 255, 1);
              line-height: 20px;
              display: inline-block;
            }
          }
          .mam-name {
            color: rgba(51, 51, 51, 1);
            line-height: 26px;
            font-size: 20px;
            margin-bottom: 10px;
            cursor: pointer;
            &:hover {
              color: @default-color;
            }
          }
          .mam-danger {
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: rgba(31, 187, 149, 1);
            line-height: 16px;
          }
        }

        .fmcard-head {
          height: 200px;
          // background-repeat: no-repeat;
          // background-size: 100% 200px;
          position: relative;
          background:linear-gradient(90deg,rgba(125,131,146,1) 0%,rgba(67,71,80,1) 100%);
          .fmcard-info {
            position: absolute;
            height: 45px;
            bottom: 15px;
            left: 20px;
            .fmcard-name {
              color: #fff;
              font-size: 18px;
              margin-bottom: 2px;
              cursor: pointer;
              &:hover {
                color: @default-color;
              }
            }
            .name-info-container {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              padding: 3px 0;
              .grade-score-icon:first-child {
                margin-left: 0;
              }
            }
          }
        }
      }
      &::-webkit-scrollbar {
        height: 4px;
      }
      &::-webkit-scrollbar-track {
        width: 0;
      }
    }
  }
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

// @media screen and (max-width: 880px) {
//   @base-font: 20;
//   @page-padding: 15rem / @base-font;
//   .generate-padding() {
//     padding-right: @page-padding;
//     padding-left: @page-padding;
//   }
//   .strategy-container {
//     .lists {
//       overflow: auto !important;
//       .generate-padding();
//       .list-item {
//         margin-right: 15px;
//       }
//     }
//   }

//   .fm-show-mobile {
//     .mobile-card-header {
//       display: flex;
//       align-items: center;
//       .mam-tag {
//         text-align: center;
//         margin-right: 10px;
//         display: flex;
//         align-items: center;
//         .mam-type {
//           width:60px;
//           height:20px;
//           background:rgba(255,98,0,1);
//           border-radius:14px;
//           font-size:12px;
//           font-family:MicrosoftYaHei;
//           color:rgba(255,255,255,1);
//           line-height:20px;
//           display: inline-block;
//         }
//       }
//       .mam-name {
//         color:rgba(51,51,51,1);
//         line-height:26px;
//         font-size:20px;
//         margin-right: 10px;
//         cursor: pointer;
//         &:hover {
//           color: @default-color;
//         }
//       }
//       .mam-danger {
//         font-size:12px;
//         font-family:MicrosoftYaHei;
//         color:rgba(31,187,149,1);
//         line-height:16px;
//       }
//     }
//   }

// }
</style>
