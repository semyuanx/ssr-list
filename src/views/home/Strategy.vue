<template>
  <div class="strategy-container">
    <div class="header">
      <LineHeader rightTitle="筛选器" subTitle="成为交易员" title="精选策略" />
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
import LineHeader from './LineHeader.vue'; // @ is an alias to /src
import FmCard from '@/components/card/Card.vue'; // @ is an alias to /src

@Component({
  components: {
    LineHeader,
    FmCard,
  },
})
export default class Home extends Vue {
  public name: string = 'fm-strategy';
}
</script>
<style lang="less" scoped>
.strategy-container {
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
  @base-font: 20;
  @page-padding: 15rem / @base-font;
  .generate-padding() {
    padding-right: @page-padding;
    padding-left: @page-padding;
  }
  .strategy-container {
    .lists {
      .generate-padding();
      .list-item {
        margin-right: 15px;
      }
    }
  }

}
</style>
