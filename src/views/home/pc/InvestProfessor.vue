<template>
  <div class="invest-container">
    <div class="header">
      <LineHeader
        subIcon="flag"
        rightIcon="right_24px"
        :rightTitle="$t('more')"
        :subTitle="$t('sbtj')"
        :title="$t('jyzj')">

        <!-- <template slot="right">
          <span>{{ rightTitle || '' }}</span>
          <i :class="`icon-right_24px`"></i>
        </template> -->
      </LineHeader>
    </div>
    <div class="invest-content">
      <div class="left">
        <div><span>{{$t(jydn)}}</span></div>
        <div>
          <button class="sub-btn">{{$t(ljdy)}}</button>
        </div>
      </div>
      <div class="right">
        <div class="right-lists">
          <div class="list-item">
            <LittleCard />
          </div>
          <div class="list-item">
            <LittleCard />
          </div>
          <div class="list-item">
            <LittleCard />
          </div>
          <div class="list-item">
            <LittleCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LineHeader from './LineHeader.vue'; // @ is an alias to /src
import LittleCard from '@/components/little-card/card.vue'; // @ is an alias to /src
import zhCN from '@/i18n/zh-CN/views/home/pc/InvestProfessor';
import zhTW from '@/i18n/zh-TW/views/home/pc/InvestProfessor';
import enUS from '@/i18n/en-US/views/home/pc/InvestProfessor';
import zhHK from '@/i18n/zh-HK/views/home/pc/InvestProfessor';

@Component({
  components: {
    LineHeader,
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
  public name: string = 'fm-invest-professor';
}
</script>
<style lang="less" scoped>
.invest-container {
  .invest-content {
    display: flex;
    flex-direction: row;
    .left {
      width:280px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: #ffffff;
      .sub-btn {
        cursor: pointer;
        width:100px;
        height:30px;
        border-radius:18px;
        border:1px solid rgba(255, 255, 255, 0.23);
        background-color: rgba(0, 0, 0, 0.23);
        font-family:MicrosoftYaHei;
        color:rgba(255,255,255,1);
        line-height:19px;
      }
    }
    .right {
      width: 95%;
      margin-left: 2%;
      .right-lists {
        display: flex;
        flex-wrap: wrap;
        .list-item {
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
  .invest-container {

  }

}
</style>
