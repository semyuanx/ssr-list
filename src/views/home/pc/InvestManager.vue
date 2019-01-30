<template>
  <div class="invest-container">
    <div class="header">
      <CommonLineHeader
        @rightClick="toMore"
        subIcon="flag_24px"
        rightIcon="right_24px"
        :rightTitle="$t('More')"
        :subTitle="description.filterText"
        :title="description.title">
        <div @click="toLeftMore" class="contain-icon" v-if="description.needLeftSlot" slot="left">
          <i :class="`icon-flag_24px`"></i>
          <span>{{ description.subTitle || '' }}</span>
          <i :class="`icon-${subRespIcon}`"></i>
        </div>

        <!-- <template slot="right">
          <span>{{ rightTitle || '' }}</span>
          <i :class="`icon-right_24px`"></i>
        </template> -->
      </CommonLineHeader>
    </div>
    <div class="invest-content">
      <div class="left" :style="`background-image: url(${description.background})`">
        <div class="left-desc"><span class="desc-title">{{ description.textTitle }}</span></div>
        <div>
          <button @click="toRankList" class="sub-right-now">{{description.textBtn || $t('Ljcy')}}</button>
        </div>
      </div>
      <div class="right">
        <div :class="dataLength > 3 ? 'right-lists right-wrap' : 'right-lists'">
          <template v-if="dataLength > 3">
            <div :key="item.avatar + item.index" v-for="item in data.data" class="little-list-item">
                <LittleCard @showCard="showCard($event, item)" @hideCard="hideCard" @toPersonal="toPersonal"  @subscribe="handleSub" :data="item">
                  <div v-if="data.needSlot" class="prod-desc" slot="header">
                    <div @click="toPersonal(item)" class="prod-name">{{item.name || ''}}</div>
                    <div class="prod-danger">{{item.danger || ''}}</div>
                  </div>
                </LittleCard>
            </div>
          </template>
          <template v-else>
            <div :key="item.avatar + item.index" v-for="(item) in data.data" class="list-item">
              <LineCard @showCard="showCard($event, item)" @hideCard="hideCard" @toPersonal="toPersonal" @subscribe="handleSub" :data="item">
                <div v-if="data.needSlot" class="prod-desc" slot="left">
                  <div @click="toPersonal(item)" class="prod-name">{{item.name || ''}}</div>
                  <div class="prod-danger">{{item.danger || ''}}</div>
                </div>
              </LineCard>
            </div>
          </template>

          <!-- <div class="list-item">
            <LineCard />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
// import { namespace } from 'vuex-class';

import CommonLineHeader from './CommonLineHeader.vue'; // @ is an alias to /src
import LineCard from '@/components/line-card/card.vue'; // @ is an alias to /src
import LittleCard from '@/components/little-card/card.vue'; // @ is an alias to /src
import zhCN from '@/i18n/zh-CN/views/home/pc/InvestManager';
import zhTW from '@/i18n/zh-TW/views/home/pc/InvestManager';
import enUS from '@/i18n/en-US/views/home/pc/InvestManager';
import zhHK from '@/i18n/zh-HK/views/home/pc/InvestManager';

@Component({
  components: {
    CommonLineHeader,
    LineCard,
    LittleCard,
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
  public name: string = 'fm-invest-manager';

  @Prop()
  subscribe: any;

  @Prop({ default: () => {} })
  data: any;

  @Prop({ default: () => {} })
  description: any;

  get dataLength() {
    return this.data && Array.isArray(this.data.data) ? this.data.data.length : 0;
  }

  toRankList() {
    // this.$router.push({ name: 'rankList' });
    this.$emit('toJoinMore', this.data);
  }

  toPersonal(data: any) {
    this.$emit('toPersonal', data);
  }

  toMore() {
    // this.$router.push({ name: 'rankList' });
    if (this.description.needLeftSlot) {
      this.$emit('toRightMore');
    } else {
      this.$emit('toMore');
    }
  }

  showCard($event: any, item: any) {
    this.$emit('showCard', $event, item);
  }

  hideCard($event: any) {
    this.$emit('hideCard', $event);
  }

  toLeftMore() {
    this.$emit('toLeftMore');
  }

  handleSub(item: any) {
    this.subscribe(item);
  }
}
</script>
<style lang="less" scoped>
i[class^="icon-"] {
  font-size: 18px;
}
.invest-container {
  .contain-icon {
    cursor: pointer;
    background-color: #fff;
    border-radius: 13px;
    height: 26px;
    padding: 0 15px;
    margin-left: 10px;
    font-size: 12px;
    display: flex;
    align-items: center;
    flex-direction: row;
    &:hover {
      color: @default-color;
    }
  }
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
        .desc-title {
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
        .prod-desc {
          display: flex;
          // flex-direction: column;
          // justify-content: center;
          align-items: center;
          font-family:MicrosoftYaHei;
          .prod-name {
            margin-right: 8px;
            font-size:20px;
            color:rgba(51,51,51,1);
            line-height:26px;
            &:hover {
              color: @default-color;
              cursor: pointer;
            }
          }
          .prod-danger {
            font-size:12px;
            color:rgba(31,187,149,1);
            line-height:16px;
            background:rgba(31,187,149, 0.1);
            padding: 0 4px;
          }
        }
      }
      .right-wrap {
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
