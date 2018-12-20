<template>
  <div>
    <!-- <filter-popover
      ref="popover"
      :show="false"
    >
      <template slot="broker">
        <filter-tag
          :border="true"
          :closed="true"
        >产出</filter-tag>
        <span><i class="fm-fonticon icon-plus_24px"></i>添加</span>
      </template>
    </filter-popover> -->
    <span>list:{{list}}</span>
    <infinite-scroll
      :callback="handleList"
      ref="infinitescrollDemo"
    >
      <ul>
        <li

          v-for="(item,index) in list"
          :key="index"
        >{{item}}</li>
      </ul>
    </infinite-scroll>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FilterPopover from '@/components/filter-popover/FilterPopover.vue';
import FilterTag from '@/components/filter-popover/FilterTag.vue';
import FilterButton from '@/components/mobile-filter/FilterButton.vue';
import InfiniteScroll from '@/components/infinite-scroll/InfiniteScroll.vue';

@Component({
  components: {
    FilterPopover,
    FilterTag,
    FilterButton,
    InfiniteScroll,
  },
})
export default class Test extends Vue {
  public list: number = 50;

  public handleList() {
    setTimeout(() => {
      this.list += 50;
      if (this.list >= 200) {
        /* 所有数据加载完毕 */
        (this.$refs.infinitescrollDemo as any).$emit('loadedDone');
        return;
      }
      console.log(this.list);
      /* 单次请求数据完毕 */
      (this.$refs.infinitescrollDemo as any).$emit('finishLoad');
    }, 3000);
  }
}
</script>
