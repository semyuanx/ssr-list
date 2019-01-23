<template>
  <div class="fm-show-pc mobile-filter-wrap">
    <FilterSetting />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FilterSetting from '@/components/mobile-filter/FilterSetting.vue';
import { namespace } from 'vuex-class';

const RankStore = namespace('RankStore');

@Component({
  components: {
    FilterSetting,
  },
})
export default class MobileFilter extends Vue {
  @RankStore.Action
  getBrokersList: any;

  mounted() {
    this.getBrokersList({
      commonlyused: 1,
    });
  }
}
</script>

<style scoped lang="less">
</style>
