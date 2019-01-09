<template>
<div class="main-list-container">
  <div class="fm-show-pc">
    <FmList :data="rankList" :getData="getData" @sortChange="sortChange" />
  </div>
  <div class="fm-show-mobile">
    <MobileList :data="rankList" @sortChange="sortChange"/>
  </div>
</div>
</template>
<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import FmList from './list/List.vue';
import MobileList from './list/ListMobile.vue';

const RankStore = namespace('RankStore');

@Component({
  components: {
    FmList: () => import('./list/List.vue'),
    MobileList,
  },
})
export default class List extends Vue {
  name: string = 'response-list';

  @RankStore.State
  rankList: any;

  @RankStore.State
  rankTotal: any;

  @Prop()
  getData: any;

  // @Watch('rankList')
  // public rankListChange() {
  //   console.log('rank changed', this.rankTotal, this.rankList);
  // }

  sortChange({ prop, order }:any) {
    this.$emit('sortChange', { prop, order });
  }
}
</script>
<style lang="less" scoped>
.main-list-container {

}

</style>
