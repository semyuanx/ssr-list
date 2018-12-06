<template>
  <div class="strategy-container">
    <div class="header">
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
    <div class="lists">
      <div class="list-item">
        <FmCard />
      </div>
      <div class="list-item">
        <FmCard />
      </div>
      <div class="list-item">
        <FmCard />
      </div>
      <div class="list-item">
        <FmCard />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FmHeader from '@/components/FmHeader.vue'; // @ is an alias to /src
import FmCard from '@/components/Card.vue'; // @ is an alias to /src

@Component({
  components: {
    FmHeader,
    FmCard,
  },
})
export default class Home extends Vue {
  public name: string = 'fm-strategy';
}
</script>
<style lang="less" scoped>
.strategy-container {
  .header {
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
  .lists {
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow: auto;
    .list-item {
      margin-right: 20px;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    &::-webkit-scrollbar-track {
      width: 0;
    }
  }
}
@media screen and (max-width: 880px) {
  .lists {
    .list-item {
      margin-right: 15px;
    }
  }


}
</style>
