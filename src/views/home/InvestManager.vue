<template>
  <div class="header">
    <div class="fm-show-pc">
      <InvestManager :data="data"/>
    </div>
    <div class="fm-show-mobile">
      <InvestManagerMobile :data="data"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import InvestManager from '@/views/home/pc/InvestManager.vue';
import InvestManagerMobile from '@/views/home/mobile/InvestManagerMobile.vue';

@Component({
  components: {
    InvestManager,
    InvestManagerMobile,
  },
})
export default class Index extends Vue {
@Prop()
data:any
}
</script>
<style lang="less" scoped>


</style>
