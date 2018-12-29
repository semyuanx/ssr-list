<template>
  <div class="header">
    <div class="fm-show-pc">
      <Strategy />
    </div>
    <div class="fm-show-mobile">
      <Strategy />
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

}
</script>
<style lang="less" scoped>


</style>
