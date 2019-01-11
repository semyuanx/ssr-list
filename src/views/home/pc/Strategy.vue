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

      <!-- <div class="scroll-btn-container fm-show-pc">
          <div @click="scrollLeft" class="scroll-btn scroll-left" :style="`left: ${0 - left}px;`">
            <i class="icon-left_24px" />
          </div>
          <div @click="scrollLeft" class="scroll-btn scroll-right" :style="`right: ${0 - left}px;`">
            <i class="icon-right_24px" />
          </div>
      </div> -->
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

  scrollLeft() {
    const el = this.$el;
    if (el) {
      const lists: any = el.querySelector('.lists');
      const width = lists.offsetWidth;
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
