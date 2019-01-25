<template>
<div class="main-list-container">
  <div class="fm-show-pc">
    <FmList :showProps="showProps" :data="data" :getData="getData" @sortChange="sortChange" />
  </div>
  <!-- <div class="fm-show-mobile" v-if="!isShowPc">
    <MobileList :data="data" @sortChange="sortChange"/>
  </div> -->
</div>
</template>
<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';
// import FmList from './list/List.vue';
// import MobileList from './list/ListMobile.vue';
// import eventBus from '@/utils/event';

const RankStore = namespace('RankStore');

@Component({
  components: {
    FmList: () => import('./list/List.vue'),
    // MobileList: () => import('./list/ListMobile.vue'),
  },
})
export default class List extends Vue {
  name: string = 'response-list';

  @Prop()
  data: any;

  @Prop()
  getData: any;

  @Prop()
  showProps: any;

  // get isShowPc() {
  //   return this.windowSize > 880;
  // }

  mounted() {
    // if (this.isBrowser()) {
    //   this.computeWindowSize();
    //   eventBus.$on('window-resize', () => {
    //     this.computeWindowSize();
    //   });
    // }
  }

  windowSize: any = 0;

  computeWindowSize() {
    const winW = window.innerWidth;
    this.windowSize = winW;
  }

  sortChange({ prop, order }:any) {
    this.$emit('sortChange', { prop, order });
  }
}
</script>
