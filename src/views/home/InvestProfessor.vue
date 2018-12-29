<template>
  <div class="header">
    <div class="fm-show-pc">
      <InvestProfessor />
    </div>
    <div class="fm-show-mobile">
      <InvestProfessorMobile />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import InvestProfessor from '@/views/home/pc/InvestProfessor.vue';
import InvestProfessorMobile from '@/views/home/mobile/InvestProfessor.vue';

@Component({
  components: {
    InvestProfessor, InvestProfessorMobile,
  },
})
export default class Index extends Vue {

}
</script>
<style lang="less" scoped>

</style>
