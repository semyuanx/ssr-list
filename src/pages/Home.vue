<template>
  <div class="home">
    <div class="strategy">
      <FmStrategy />
    </div>
    <div class="invest">
      <FmInvestManager />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FmStrategy from '@/views/home/Strategy.vue'; // @ is an alias to /src
import FmInvestManager from '@/views/home/InvestManager.vue'; // @ is an alias to /src
import { namespace } from 'vuex-class';

const HomeStore = namespace('HomeStore');


@Component({
  components: {
    FmStrategy,
    FmInvestManager,
  },
})
export default class Home extends Vue {
  @HomeStore.State
  public isLogin: any;

  mounted() {
    console.log(this.isLogin);
  }
}
</script>
<style lang="less" scoped>
  .home {
    padding-top: 40px;
    .invest {
      margin-top: 40px;
    }
  }
</style>
