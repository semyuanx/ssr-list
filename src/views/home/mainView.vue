<template>
    <div>
        <div v-if="configs && configs.length" class="strategy">
            <FmStrategy :data="configs[0]" />
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
export default class mainView extends Vue {
    @HomeStore.State
    configs: any;
}
</script>
<style lang="less" scoped>

</style>
