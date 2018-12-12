<template>
  <div>
    <filter-popover></filter-popover>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FilterPopover from '@/components/filter-popover/FilterPopover.vue';
@Component({
  components: {
    FilterPopover,
  },
})
export default class Test extends Vue {
  mounted() {

  }
}
</script>
