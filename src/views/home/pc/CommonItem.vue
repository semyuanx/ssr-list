<template>
  <div class="invest-container">
    <div class="header">
      <CommonLineHeader
        @rightClick="toMore"
        subIcon="flag_24px"
        rightIcon="right_24px"
        :rightTitle="$t('message.more')"
        :subTitle="description.filterText"
        :title="description.title">

        <!-- <template slot="right">
          <span>{{ rightTitle || '' }}</span>
          <i :class="`icon-right_24px`"></i>
        </template> -->
      </CommonLineHeader>
    </div>
    <!-- <div class="invest-content">
      <div class="left" v-lazyLoad="description.background" :style1="`background-image: url(${description.background})`">
        <div class="left-desc"><span class="desc-title">{{ description.textTitle }}</span></div>
        <div>
          <button @click="toMore" class="sub-right-now">{{ description.btnText || '立即订阅'}}</button>
        </div>
      </div>
      <div class="right">
        <div :class="dataLength > 3 ? 'right-lists right-wrap' : 'right-lists'">
          <template v-if="dataLength > 3">
            <div :key="item.avatar + item.index" v-for="item in data" class="little-list-item">
                <LittleCard @showCard="showCard($event, item)" @hideCard="hideCard" @toPersonal="toPersonal" @subscribe="handleSub" :data="item" />
            </div>
          </template>
          <template v-else>
            <div :key="item.avatar + item.index" v-for="item in data" class="list-item">
              <LineCard @showCard="showCard($event, item)" @hideCard="hideCard" @toPersonal="toPersonal" @subscribe="handleSub" :data="item" />
            </div>
          </template>
        </div>
      </div>
    </div> -->
    <div class="invest-list">
      <div class="list-item" v-for="(item,key) in data" :key="key">
        <ChartCard @showCard="showCard($event, item)"  @hideCard="hideCard" @toPersonal="toPersonal" @subscribe="handleSub" :item="item" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import CommonLineHeader from './CommonLineHeader.vue'; // @ is an alias to /src
// import LineCard from '@/components/line-card/card.vue'; // @ is an alias to /src
// import LittleCard from '@/components/little-card/card.vue'; // @ is an alias to /src

import ChartCard from '@/components/chart-card/card.vue';

import zhCN from '@/i18n/zh-CN/message';
import zhTW from '@/i18n/zh-TW/message';
import enUS from '@/i18n/en-US/message';
import zhHK from '@/i18n/zh-HK/message';

import { loadAsyncImage } from '@/utils/util';

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
  directives: {
    lazyLoad: {
      bind: (el: any, binding: any) => {
        const src = binding.value;
        loadAsyncImage(src)
          .then((res: any) => {
            el.style.backgroundImage = `url(${src})`;
          }).catch(() => {
            el.style.backgroundImage = `url(${src})`;
          });
      },
    },
  },
})
export default class Index extends Vue {
  public name: string = 'fm-invest-manager';

  @Prop()
  subscribe: any;

  @Prop({ default: () => [] })
  data: any;

  @Prop({ default: () => {} })
  description: any;

  get dataLength() {
    return Array.isArray(this.data) ? this.data.length : 0;
  }

  toPersonal(data: any) {
    this.$emit('toPersonal', data);
  }

  toRankList() {
    this.$router.push({ name: 'rankList' });
  }

  showCard($event: any, item: any) {
    this.$emit('showCard', $event, item);
  }

  hideCard($event: any) {
    this.$emit('hideCard', $event);
  }

  toMore() {
    // console.log(this.data, this.description,'ddd')
    // const { source } = this.description;
    // if (source.CondCfg) {
    //   const condCfg = source.CondCfg;
    //   if (condCfg) {

    //   }
    // }
    // this.$router.push({ name: 'rankList' });
    this.$emit('toMore', this.description);
  }

  handleSub(item: any) {
    this.subscribe(item);
  }
}
</script>
<style lang="less" scoped>
.invest-container {
  .invest-content {
    display: flex;
    flex-direction: row;
    .left {
      width:280px;
      min-height:240px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: #ffffff;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      .left-desc {
        margin-bottom: 20px;
        width: 90%;
        overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
        text-align: center;
        .desc-title {
          display: inline-block;
          font-size:20px;
          font-family:MicrosoftYaHei;
          color:rgba(255,255,255,1);
        }
      }
      .sub-right-now {
        border-radius:18px;
        border:1px solid rgba(255,255,255,0.4);
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(255,255,255,1);
        background-color: transparent;
        padding: 6px 20px;
        transition: all .3s ease-in-out;
        cursor: pointer;
      }
      &:hover {
        .sub-right-now {
          background-color: @default-color;
          border:1px solid @default-color;
        }
      }
    }
    .right {
      width: 95%;
      margin-left: 2%;
      .right-lists {
        display: flex;
        flex-direction: column;
        .list-item {
          display: flex;
          flex-direction: row;
          margin-bottom: 1px;
        }
        .little-list-item {
          // flex: 1;
          width: 50%;
          display: flex;
          flex-direction: row;
          &:nth-child(2n+1) {
            border-right: 1px solid #f5f5f5;
          }
          &:first-child {
            border-bottom: 1px solid #f5f5f5;
          }
        }
      }
      .right-wrap {
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
  }
  .invest-list{
    display: flex;
    justify-content: space-between;
    .list-item{
      padding-right: 12px;
    }
  }
}
</style>
