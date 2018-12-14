<template>
  <div>
    <filter-popover ref="popover">

      <template slot="broker">
        <filter-tag :border="true" :closed="true">产出</filter-tag>
        <span><i class="fm-fonticon icon-plus_24px"></i>添加</span>
      </template>
    </filter-popover>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FilterPopover from '@/components/filter-popover/FilterPopover.vue';
import FilterTag from '@/components/filter-popover/FilterTag.vue';
@Component({
  components: {
    FilterPopover,
    FilterTag,
  },
})
export default class Test extends Vue {
  mounted() {
    this.$refs.popover.show = true;
  }
}
</script>
