<template>
  <div class="strategy-container">
    <div class="header" v-if="header">
      <LineHeader @leftClick="leftClick" @rightClick="toRankList" rightIconDirection='left' rightTitle="筛选器" subTitle="成为交易员" :title="header.title || ''" />
    </div>
    <div class="lists-container">
      <div class="lists">
        <div :key="item.index + item.brokerName" v-for="item in data" class="list-item">
          <FmCard @toPersonal="toPersonal" @subscribe="handleSub" :data="item" />
        </div>
      </div>
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
  subscribe: any;

  @Prop()
  data: any

  @Prop({ default: () => {} })
  header: any;

  handleSub(item: any) {
    if (this.subscribe) {
      this.subscribe(item);
    } else {
      console.log('mobile');
    }
  }

  toPersonal(item: any) {
    this.$emit('toPersonal', item);
  }

  toRankList() {
    this.$router.push({ name: 'rankList' });
  }

  leftClick() {
    this.redirectTo('traderRegister');
  }
}
</script>
<style lang="less" scoped>
.strategy-container {
  .lists-container {
    width: 100%;
    overflow: hidden;
    .lists {
      display: flex;
      flex-direction: row;
      width: 100%;
      overflow: auto;
      -webkit-overflow-scrolling:touch;
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
