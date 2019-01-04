<template>
  <div class="header">
    <div class="fm-show-pc">
      <Strategy :subscribe="subscribe" :data="data" :header="header" />
    </div>
    <div class="fm-show-mobile">
      <Strategy :data="data" :header="header" />
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

  @Prop()
  header: any;

  @Prop()
  subscribe: any;
}
</script>
<style lang="less" scoped>


</style>
