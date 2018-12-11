<template>
  <div class="manager-container">
    <Navbar @change="handleChange"></Navbar>
    <fm-row
      class="manager-list"
      :gutter="20"
    >
      <fm-col></fm-col>
      <div></div>
      <fm-col
        v-for="(item,index) in 5"
        class="panel-wrapper"
        :key="index"
        :xs="24"
        :sm="12"
        :lg="8"
      >
        <Panel width="100%"></Panel>
      </fm-col>
    </fm-row>
    {{ntest}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Navbar, Panel } from './components';
import FmCol from '@/components/grid/Col.vue';
import FmRow from '@/components/grid/Row.vue';
import { namespace } from 'vuex-class';

const managerStore = namespace('managerStore');

@Component({
  components: {
    Navbar,
    Panel,
    FmCol,
    FmRow,
  },
})
export default class Manager extends Vue {
  @managerStore.State
  public allProducts:any;

   @managerStore.Action
        public getAccounts: Function;

   mounted() {
     console.log('====================================');
     console.log(this.allProducts);
     console.log('====================================');
   }

   handleChange() {
     console.log('切换成功了');
   }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@base-font: 24;
.manager {
  &-container {
    overflow-x: hidden;
    max-width: 1180rem / @base-font;
    margin: 0 auto;
    padding-top: 30rem / @base-font;
    .panel-wrapper {
      margin-top: 20rem / @base-font;
    }
  }
}
@media screen and (max-width: 880px) {
  .manager-list {
    padding-left: 15rem / @base-font;
    padding-right: 15rem / @base-font;
    box-sizing: border-box;
  }
}
</style>
