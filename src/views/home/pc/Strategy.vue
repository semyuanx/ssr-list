<template>
  <div class="strategy-container">
    <div class="header">
      <LineHeader @rightClick="toRankList" rightIconDirection='left' rightTitle="筛选器" subTitle="成为交易员" :title="data.RankName || ''" />
    </div>
    <div class="lists">
      <div :key="item.AccountIndex + item.BrokerName" v-for="item in data.listData.List" class="list-item">
        <FmCard :data="item" />
      </div>

      <!-- <div class="list-item">
        <FmCard />
      </div>
      <div class="list-item">
        <FmCard />
      </div>
      <div class="list-item">
        <FmCard />
      </div> -->
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
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

  @Prop()
  data: any

  cardData: any = {};

  @Watch('data')
  dataChange(newData: any) {

  }

  toRankList() {
    this.$router.push({ name: 'rankList' });
  }
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
      height: 8px;
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
