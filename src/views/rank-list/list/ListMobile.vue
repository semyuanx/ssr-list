<template>
<div class="list-container">
  <div class="list-body">
    <MobileFilterList :data="data" />
  </div>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import SvgIcon from '@/components/svg/index.ts';
import MobileFilterList from '@/components/mobile-filter/FilterList.vue';

@Component({
  components: {
    SvgIcon,
    MobileFilterList,
  },
})
export default class List extends Vue {
  isLoading: boolean = true;


  @Prop({
    type: Array,
    default: () => [],
  })
  data: any;

  public get dateIsLoading() {
    return this.isLoading;
  }


  mounted() {
    // setTimeout(() => this.isLoading = false, 5000);
  }

  handleSortChange(e:any) {
    console.log(e);
  }
}
</script>
<style lang="less" scoped>
.list-container {

}

</style>
