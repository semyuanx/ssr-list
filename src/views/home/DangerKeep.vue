<template>
  <div class="header">
    <div class="fm-show-pc">
      <DangerKeep />
    </div>
    <div class="fm-show-mobile">
      <DangerKeepMobile />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import DangerKeep from '@/views/home/pc/DangerKeep.vue';
import DangerKeepMobile from '@/views/home/mobile/DangerKeep.vue';

@Component({
  components: {
    DangerKeep, DangerKeepMobile,
  },
})
export default class Index extends Vue {

}
</script>
<style lang="less" scoped>


</style>
