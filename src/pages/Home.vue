<template>
  <div class="home">
    <div>
      <MainView />
    </div>
    <router-link
      class="super-filter-button fm-show-mobile"
      :to="{name:'rankList'}"
      :event="[]"
      @click.prevent.stop.native="openWebView({name:'rankList'})"
    ><i class="icon-filtrate_24px"></i> 高级筛选</router-link>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace, Action } from 'vuex-class';

import { openWebView } from '@/utils/native';
import MainView from '@/views/home/mainView.vue';

const HomeStore = namespace('HomeStore');

@Component({
  components: {
    MainView,
  },
})
export default class Home extends Vue {
  @HomeStore.Action
  getCustomConfig: any;

  @HomeStore.Action
  getProductsAsync: any;

  @HomeStore.Action
  getMasterFollower: any;

  openWebView:any = openWebView;

  public params: any = {
    status: 'InProcess',
    pageSize: 5,
    pageIndex: 1,
  };

  mounted() {
    this.getCustomConfig();
    this.getProductsAsync(this.params);
    this.getMasterFollower({
      pageSize: 4,
      pageIndex: 1,
      time: 1,
      pageField: 'FollowMoney',
      pageSort: 'desc',
    });
  }
}
</script>
<style lang="less" scoped>
.home {
  padding-top: 20px;
  min-width: 320px;
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
