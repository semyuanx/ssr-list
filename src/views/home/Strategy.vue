<template>
  <div class="header">
    <div class="fm-show-pc">
      <Strategy :data="data" />
    </div>
    <div class="fm-show-mobile">
      <Strategy :data="data" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Strategy from '@/views/home/pc/Strategy.vue';
import StrategyMobile from '@/views/home/mobile/Strategy.vue';

@Component({
  components: {
    Strategy, StrategyMobile,
  },
})
export default class Index extends Vue {
  @Prop()
  data: any;
}
</script>
<style lang="less" scoped>


</style>
