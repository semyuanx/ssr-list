<template>
  <div class="strategy-container">
    <div class="header" v-if="header">
      <LineHeader @leftClick="leftClick" @rightClick="toRankList" rightIconDirection='left' rightTitle="" subTitle="成为交易员" :title="header.title || ''" >
        <div slot="right">
          <FilterBtn />
        </div>
      </LineHeader>
    </div>
    <div class="lists-outer">
      <div class="lists-container">
        <div class="lists">
          <div :key="item.index + item.brokerName" v-for="item in data" class="list-item">
            <FmCard
              @hideCard="hideCard"
              @showCard="showCard($event, item)"
              @toPersonal="toPersonal"
              @subscribe="handleSub"
              :data="item">
                <template v-if="item.mam" slot="header">
                  <div class="card-header">
                    <div class="mam-tag">
                      <span class="mam-type">mam</span>
                    </div>
                    <div class="mam-name" @click="toMamPersonal(item)">{{item.name}}</div>
                    <div class="mam-danger">{{item.danger}}</div>
                  </div>
                </template>
            </FmCard>
          </div>
        </div>
      </div>

      <div class="scroll-btn-container fm-show-pc">
          <div @click="scrollLeft" class="scroll-btn scroll-left" :style="`left: ${0 - left}px;`">
            <i class="icon-left_24px" />
          </div>
          <div @click="scrollRight" class="scroll-btn scroll-right" :style="`right: ${0 - left}px;`">
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
import LineHeader from './LineHeader.vue'; // @ is an alias to /src
import FmCard from '@/components/card/Card.vue'; // @ is an alias to /src
import { getElementTop, getElementLeft } from '@/utils/util';
import eventBus from '@/utils/event';
import FilterBtn from '@/views/home/FilterHeader.vue';

@Component({
  components: {
    LineHeader,
    FmCard,
    FilterBtn,
  },
})
export default class Home extends Vue {
  public name: string = 'fm-strategy';

  @Prop()
  subscribe: any;

  @Prop()
  data: any

  public get data1() {
    return this.dataArr;
  }

  showCard($event: any, item: any) {
    console.log(item, '*****');
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

  scrollCompute(direction: any = 1, scrollNum: number = 4) { // 1是left scroll; 0: right scroll
    const el = this.$el;
    if (el) {
      const listsContainer: any = el.querySelector('.lists-container');
      const containerWidth = listsContainer.offsetWidth;
      const lists: any = el.querySelector('.lists');
      const width = lists.offsetWidth;
      if (lists) {
        const listItem = lists.querySelector('.list-item');
        if (listItem) {
          const singleWidth = listItem.offsetWidth;
          let { scrolled } = this;
          let shouldScroll: string = '';
          if (direction === 1) {
            scrolled += singleWidth * scrollNum;
          } else {
            scrolled -= singleWidth * scrollNum;
          }
          const listsWidthPx = this.data.length * (singleWidth);
          const listsWidth = `${listsWidthPx}px`;

          if (scrolled < 0) {
            const willScrolled = scrolled - containerWidth;
            if (Math.abs(willScrolled) > listsWidthPx) {
              scrolled = listsWidthPx - containerWidth;
              scrolled = 0 - scrolled;
            } else if (Math.abs(willScrolled) > listsWidthPx + singleWidth) {
              return;
            }
          }
          // if (scrolled)
          if (direction === 1) {
            if (this.scrolled === 2 || this.scrolled === 0) {
              return;
            }
          }
          if (scrolled > 10 || Math.abs(scrolled) < singleWidth / 2) {
            scrolled = 2;
          }

          shouldScroll = `${scrolled}px`;

          lists.style = `transform:translateX(${shouldScroll}); width: ${listsWidth}`;
          this.scrolled = scrolled;
        }
      }
    }
  }

  transitionAnimate() {

  }

  handleSub(item: any) {
    if (this.subscribe) {
      this.subscribe(item);
    } else {
      console.log('mobile');
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

  leftClick() {
    this.redirectTo('traderRegister');
  }
}
</script>
<style lang="less" scoped>
.strategy-container {
  .lists-outer {
    position: relative;
    .scroll-btn-container {
      .scroll-btn {
        cursor: pointer;
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        background:rgba(230,230,230,1);
        border-radius:2px;
        height: 90px;
        width: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        >i {
          font-size: 50px;
          color: #999999;
        }
        &:hover {
          i> {
            color: @default-color;
          }
        }
      }
      .scroll-left {
        left: 20px;
      }
      .scroll-right {
        right: 20px;
      }
    }
  }
  .lists-container {
    width: 100%;
    overflow: hidden;
    padding: 0 0 20px 0;
    -webkit-overflow-scrolling:touch;
    .lists {
      display: flex;
      flex-direction: row;
      width: 100%;
      -webkit-overflow-scrolling:touch;
      transition: all .3s ease-in-out;
      .list-item {
        padding-right: 20px;
        padding-top: 15px;
        padding-bottom: 15px;
        .card-header {
          .mam-tag {
            text-align: center;
            margin-bottom: 14px;
            .mam-type {
              width:60px;
              height:20px;
              background:rgba(255,98,0,1);
              border-radius:14px;
              font-size:12px;
              font-family:MicrosoftYaHei;
              color:rgba(255,255,255,1);
              line-height:16px;
              display: inline-block;
            }
          }
          .mam-name {
            color:rgba(51,51,51,1);
            line-height:26px;
            font-size:20px;
            margin-bottom: 10px;
            cursor: pointer;
            &:hover {
              color: @default-color;
            }
          }
          .mam-danger {
            font-size:12px;
            font-family:MicrosoftYaHei;
            color:rgba(31,187,149,1);
            line-height:16px;
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
@media screen and (max-width: 880px) {
  @base-font: 20;
  @page-padding: 15rem / @base-font;
  .generate-padding() {
    padding-right: @page-padding;
    padding-left: @page-padding;
  }
  .strategy-container {
    .lists {
      overflow: auto !important;
      .generate-padding();
      .list-item {
        margin-right: 15px;
      }
    }
  }

}
</style>
