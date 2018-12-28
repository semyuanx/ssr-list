<template>
  <div class="mobile-filter-wrap">
    <FilterSetting />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FilterSetting from '@/components/mobile-filter/FilterSetting.vue';
// import { namespace } from "vuex-class";

// const RankStore = namespace("RankStore");

@Component({
  components: {
    FilterSetting,
  },
})
export default class MobileFilter extends Vue {}
</script>

<style scoped lang="less">
</style>
