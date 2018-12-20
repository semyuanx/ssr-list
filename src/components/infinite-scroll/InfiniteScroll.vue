<template>
  <div class="infinite-scroll-container">
    <slot></slot>

    <div
      ref="tag"
      style="height: 0;"
    ></div>

    <div
      class="fm-list-loading"
      v-if="!isDone"
    >
      <div v-show="isLoading">
        <slot name="loadingTip">
          <loading></loading>
        </slot>
      </div>
    </div>

    <div
      class="fm-list-donetip"
      v-show="!isLoading && isDone"
    >
      <slot name="doneTip">没有更多数据了</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Loading from './Loading.vue';
import { getScrollview } from '@/utils/util';

@Component({
  name: 'fm-infinitescroll',
  components: {
    Loading,
  },
})
export default class InfiniteScroll extends Vue {
  private isLoading: boolean = false;

  private isDone: boolean = false;

  private num: number = 1;

  private scrollview: any;

  @Prop({
    type: Function,
  })
  callback: any;

  @Prop({
    default: 0,
    validator(val) {
      return /^\d*$/.test(val);
    },
  })
  distance!: number;

  @Prop({
    type: Boolean,
    default: true,
  })
  scrollTop!: boolean;

  public init() {
    this.scrollview = getScrollview(this.$el);
    if (this.scrollTop) {
      if (this.scrollview === window) {
        window.scrollTo(0, 0);
      } else {
        this.scrollview.scrollTop = 0;
      }
    }
    this.scrollview.addEventListener('scroll', this.throttledCheck, false);
    console.log('init');

    // 所有数据加载完毕
    this.$on('loadedDone', () => {
      this.isLoading = false;
      this.isDone = true;
    });

    // 单次请求数据完毕
    this.$on('finishLoad', () => {
      this.isLoading = false;
    });

    // 重新初始化
    this.$on('reInit', () => {
      this.isLoading = false;
      this.isDone = false;
    });
  }

  public scrollHandler() {
    if (this.isLoading || this.isDone) return;

    const { scrollview } = this;
    const contentHeight: number = document.body.offsetHeight;
    const isWindow: boolean = scrollview === window;
    const offsetTop: number = isWindow
      ? 0
      : scrollview.getBoundingClientRect().top;
    const scrollviewHeight: number = isWindow
      ? contentHeight
      : scrollview.offsetHeight;

    if (!scrollview) {
      console.warn('scrollview获取失败');
      return;
    }

    if (!this.$refs.tag) {
      console.warn('丢失tag标签');
      return;
    }

    const tagOffsetTop: number = Math.floor((this.$refs.tag as any).getBoundingClientRect().top) - 1;

    const distance: number = !!this.distance && this.distance > 0
      ? this.distance
      : Math.floor(contentHeight / 10);

    if (
      tagOffsetTop > offsetTop
      && tagOffsetTop - (distance + offsetTop) * this.num <= contentHeight
      && this.$el.offsetHeight > scrollviewHeight
    ) {
      this.isLoading = true;
      if (typeof this.callback === 'function') this.callback();
      this.num += 1;
    }
  }

  public throttle(method: any, context?: any) {
    clearTimeout(method.tId);
    method.tId = setTimeout(() => {
      method.call(context);
    }, 30);
  }

  public throttledCheck() {
    this.throttle(this.scrollHandler);
  }

  mounted() {
    this.$nextTick(this.init);
  }

  beforeDestroy() {
    this.scrollview.removeEventListener('scroll', this.throttledCheck);
  }
}
</script>

<style scoped lang="less">
@css-prefix: fm;
@height: 32px;
.@{css-prefix} {
  &-list-loading {
    padding: 5px 0;
    text-align: center;
    font-size: 14px;
    color: #999;
    height: @height;
    box-sizing: content-box;
    &-box {
      height: @height;
      overflow: hidden;
      line-height: @height;
    }
    img {
      height: @height;
      display: inline-block;
    }
    svg {
      width: @height;
      height: @height;
    }
  }

  &-list-donetip {
    font-size: 12px;
    text-align: center;
    padding: 12px 0;
    color: #777;
  }
}
</style>
