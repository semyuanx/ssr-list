<template>
  <div>
    <filter-popover ref="popover" :show="true">
      <template slot="broker">
        <filter-tag
          :border="true"
          :closed="true"
        >产出</filter-tag>
        <span><i class="fm-fonticon icon-plus_24px"></i>添加</span>
      </template>
    </filter-popover>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FilterPopover from '@/components/filter-popover/FilterPopover.vue';
import FilterTag from '@/components/filter-popover/FilterTag.vue';
import FilterButton from '@/components/mobile-filter/FilterButton.vue';
@Component({
  components: {
    FilterPopover,
    FilterTag,
    FilterButton,
  },
})
export default class Test extends Vue {

}
</script>

<style lang="less">
.mobile {
  width: 100%;
  z-index: 10000;
  position: relative;
  background-color: #fff;
  height: 1000px;
}
</style>
