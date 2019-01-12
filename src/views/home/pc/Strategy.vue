<template>
  <div class="strategy-container">
    <div class="header" v-if="header">
      <LineHeader @leftClick="leftClick" @rightClick="toRankList" rightIconDirection='left' rightTitle="筛选器" subTitle="成为交易员" :title="header.title || ''" />
    </div>
    <div class="lists-outer">
      <div class="lists-container">
        <div class="lists">
          <div :key="item.index + item.brokerName" v-for="item in data" class="list-item">
            <FmCard @toPersonal="toPersonal" @subscribe="handleSub" :data="item" />
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

@Component({
  components: {
    LineHeader,
    FmCard,
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

  scrollCompute(direction: any = 1) { // 1是left scroll; 0: right scroll
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
            scrolled += singleWidth;
          } else {
            scrolled -= singleWidth;
          }
          const listsWidthPx = this.data.length * (singleWidth + 20);
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
            if (this.scrolled === 5) {
              return;
            }
          }
          if (scrolled > 30) {
            scrolled = 5;
          }

          shouldScroll = `${scrolled}px`;

          lists.style = `transform:translateX(${shouldScroll}); width: ${listsWidth}`;
          this.scrolled = scrolled;
        }
      }
    }
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
    .lists {
      display: flex;
      flex-direction: row;
      width: 100%;
      overflow: hidden;
      -webkit-overflow-scrolling:touch;
      transition: all .2s ease-in-out;
      .list-item {
        margin-right: 20px;
      }
      &::-webkit-scrollbar {
        height: 8px;
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
