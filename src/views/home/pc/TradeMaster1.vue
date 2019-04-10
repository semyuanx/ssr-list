<template>
  <div class="invest-container">
    <div class="header">
      <CommonLineHeader
        ubIcon="flag_24px"
        rightIcon="right_24px"
        :rightTitle="$t('message.more')"
        :subTitle="description.filterText"
        :title="description.title"
      ></CommonLineHeader>
    </div>
    <div class="invest-list">
      <div class="list-item" v-for="item in data.data" :key="item.avatar + item.index">
        <ChartCard
          @showCard="showCard($event, item)"
          @hideCard="hideCard"
          @toPersonal="toPersonal(item)"
          @subscribe="subscribe(item)" :item="item"
        >
          <div class="invest-bottom" slot="bottom">
            <span @click="sub(item)" class="subscribe-btn"><i class="icon-plus_24px"></i>{{item.confirmBtn}}</span>
          </div>
        </ChartCard>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CommonLineHeader from './CommonLineHeader.vue'; // @ is an alias to /src
import ChartCard from '@/components/chart-card/card.vue';

import zhCN from '@/i18n/zh-CN/views/home/pc/TradeMaster';
import zhTW from '@/i18n/zh-TW/views/home/pc/TradeMaster';
import enUS from '@/i18n/en-US/views/home/pc/TradeMaster';
import zhHK from '@/i18n/zh-HK/views/home/pc/TradeMaster';


@Component({
  components: {
    CommonLineHeader,
    ChartCard,
  },
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
      'zh-HK': zhHK,
    },
  },
})
export default class Index extends Vue {
  public name: string = 'fm-invest-master';

  rightTitle: string = '';


  @Prop()
  subscribe: any;

  @Prop({ default: () => {} })
  data: any;

  @Prop({ default: () => {} })
  description: any;


  toPersonal(data: any) {
    this.$emit('toPersonal', data);
  }

  toJoinMore(data:any) {
    this.$emit('toJoinMore', data);
  }

  sub(data:any) {
    this.$emit('subscribe', data);
  }

  showCard($event: any, item: any) {
    this.$emit('showCard', $event, item);
  }

  hideCard($event: any) {
    this.$emit('hideCard', $event);
  }
}
</script>
<style lang="less" scoped>
.invest-container {
  .invest-list{
    display: flex;
    justify-content: space-between;
    .list-item{
      padding-right: 12px;
    }
  }
  .invest-bottom{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 54px;
    border-top: 1px solid #f0f0f0;
    color: @default-color;
    font-size: 14px;
    span{
      display: flex;
      align-items: center;
      font-family: 'PingFangSC-Regular';
      padding: 4px 12px;
      border: 1px solid @default-color;
      border-radius: 30px;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      i{
        font-style: normal;
        font-size: 16px;
      }
      &:hover{
        background-color: @default-color;
        color: #ffffff;
      }
    }
  }
}
</style>
