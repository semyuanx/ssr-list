<template>
  <div class="home">
    <FmHeader>
      <template slot="left">
        <div class="content-header">
          <h2 class="h2-titile">精选策略</h2>
          <div class="flex-center sub-title">
            <i class="icon-plus_24px"></i>
            <span>成为交易员</span>
          </div>
        </div>
      </template>
      <template slot="right">
        <div class="content-header">
          <div class="flex-center right-filter">
            <i class="icon-filtrate_24px"></i>
            <span>筛选器</span>
          </div>
        </div>
      </template>
    </FmHeader>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FmHeader from '@/components/FmHeader.vue'; // @ is an alias to /src

@Component({
  components: {
    FmHeader,
  },
})
export default class Home extends Vue {}
</script>
<style lang="less" scoped>
  .home {
    padding-top: 40px;
    .flex-center {
        display: flex;
        align-items: center;
        flex-direction: row;
    }
    .content-header {
      display: flex;
      align-items: center;
      padding: 5px 0;
      width: 100%;
      color: #333333;
      .h2-titile {
        font-size:24px;
      }
      .sub-title {
        background-color: #fff;
        border-radius: 13px;
        height: 26px;
        padding: 0 15px;
        margin-left: 10px;
        font-size: 12px;
      }
      .right-filter {
        justify-content: flex-end;
        width: 100%;
      }
    }
  }
</style>
