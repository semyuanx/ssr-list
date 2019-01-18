<template>
<div class="main-list-container">
  <div class="fm-show-pc">
    <FmList :showProps="showProps" :data="data" :getData="getData" @sortChange="sortChange" />
  </div>
  <div class="fm-show-mobile">
    <MobileList :data="data" @sortChange="sortChange"/>
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
    MobileList: () => import('./list/ListMobile.vue'),
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

  mounted() {

  }

  sortChange({ prop, order }:any) {
    this.$emit('sortChange', { prop, order });
  }
}
</script>
