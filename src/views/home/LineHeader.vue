<template>
  <div class="header">
    <div class="fm-show-pc">
      <FmLineHeader />
    </div>
    <div class="fm-show-mobile">
      <FmLineHeader />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FmLineHeader from '@/views/home/pc/LineHeader.vue'; // @ is an alias to /src

@Component({
  components: {
    FmLineHeader,
  },
})
export default class Index extends Vue {

}
</script>
<style lang="less" scoped>


</style>
