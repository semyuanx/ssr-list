<template>
  <div class="home">
    <div class="strategy">
      <FmStrategy />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FmStrategy from '@/views/home/Strategy.vue'; // @ is an alias to /src

@Component({
  components: {
    FmStrategy,
  },
})
export default class Home extends Vue {}
</script>
<style lang="less" scoped>
  .home {
    padding-top: 40px;

  }
</style>
