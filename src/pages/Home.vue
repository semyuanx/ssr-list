<template>
  <div class="home">
    <div class="strategy">
      <FmStrategy />
    </div>
    <div class="invest">
      <FmInvestManager />
    </div>
    <div class="invest">
      <InvestProfessor />
    </div>
    <div class="invest">
      <DangerKeep />
    </div>
    <div class="invest">
      <TradeMaster />
    </div>
    <router-link
      class="super-filter-button"
      :to="{name:'rankList',query:$route.query}"
      @click.stop.prevent="openWebView({name:'rankList',query:$route.query})"
    ><i class="icon-filtrate_24px"></i> 高级筛选</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FmStrategy from '@/views/home/Strategy.vue'; // @ is an alias to /src
import FmInvestManager from '@/views/home/InvestManager.vue'; // @ is an alias to /src
import InvestProfessor from '@/views/home/InvestProfessor.vue'; // @ is an alias to /src
import DangerKeep from '@/views/home/DangerKeep.vue'; // @ is an alias to /src
import TradeMaster from '@/views/home/TradeMaster.vue'; // @ is an alias to /src
import { namespace, Action } from 'vuex-class';
import { openWebView } from '@/utils/native';

const HomeStore = namespace('HomeStore');

@Component({
  components: {
    FmStrategy,
    FmInvestManager,
    InvestProfessor,
    DangerKeep,
    TradeMaster,
  },
})
export default class Home extends Vue {
  @HomeStore.Action
  getCustomConfig: any;

  mounted() {
    this.getCustomConfig();
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

.super-filter-button {
  outline: none;
  text-decoration: none;
  display: inline-block;
  width: 110px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  border-radius: 18px;
  background-color: #474856;
  font-size: 14px;
  color: #fff;
  position: fixed;
  z-index: 100;
  bottom: 40px;
  left: 50%;
  margin-left: -55px;
}
</style>
