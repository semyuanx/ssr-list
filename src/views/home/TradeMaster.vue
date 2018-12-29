<template>
  <div class="header">
    <div class="fm-show-pc">
      <TradeMaster />
    </div>
    <div class="fm-show-mobile">
      <TradeMasterMobile />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import TradeMaster from '@/views/home/pc/TradeMaster.vue';
import TradeMasterMobile from '@/views/home/mobile/TradeMaster.vue';

@Component({
  components: {
    TradeMaster, TradeMasterMobile,
  },
})
export default class Index extends Vue {

}
</script>
<style lang="less" scoped>


</style>
