<template>
  <div class="rm-list">
    <h3>你可能对他们感兴趣</h3>
    <div class="list">
      <div
        class="list-item"
        v-for="(item,key) in listData"
        :key="key"
      >
        <ChartCard
          @showCard="showCard"
          @hideCard="hideCard"
          @subscribe="handleSub"
          @toPersonal="toUserPage"
          :item="item"
        ></ChartCard>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';
import ChartCard from '@/components/chart-card/card.vue';
import { namespace } from 'vuex-class';
import mapKey from '@/constant/propMap';

import zhCN from '@/i18n/zh-CN/views/home/mainView';
import zhTW from '@/i18n/zh-TW/views/home/mainView';
import enUS from '@/i18n/en-US/views/home/mainView';
import zhHK from '@/i18n/zh-HK/views/home/mainView';

import {
  numberFormat,
  percentFormat,
  propFormat,
  gradeFormat,
  moneyFormat,
  weekFormat,
} from '@/utils/format';

const HomeStore = namespace('HomeStore');
@Component({
  components: {
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
export default class RecommendList extends Vue {
  @HomeStore.State
  configs: any;

  @Prop()
  followList: any;

  mounted() {
    console.log(this.configs, 'tjbd');
  }

  showCard(e: any, obj: any) {
    //   alert(JSON.stringify(obj));
    this.$emit('showCard', e, obj.item);
  }

  hideCard() {
    this.$emit('hideCard');
  }

  handleSub(item: any) {
    this.$emit('handleSub', item.item);
  }

  toUserPage(item: any) {
    this.$emit('toUserPage', item.item);
  }

  // 数据源
  get listData() {
    if (!this.configs || !this.configs.length) return null;
    const code: any = 103; // 模拟id
    const config: any = this.configs[0];
    let newData: any = [];
    // 读取需要显示的列名
    const showData: any = [];
    if (config && config.HideConfig) {
      Object.keys(config.HideConfig).forEach((i: any) => {
        if (!config.HideConfig[i]) {
          showData.push(i);
        }
      });
    }

    if (this.configs && this.configs.length) {
      this.configs.map((val: any) => {
        if (
          val.listData
          && Array.isArray(val.listData.List)
          && val.listData.List.length
        ) {
          newData = val.listData.List.map((item: any) => {
            const isEdit = this.followList.includes(
              `${item.UserID}_${item.AccountIndex}`,
            );
            // eslint-disable-next-line
            const otherEditText = isEdit
              ? this.$i18n.t('bjdy')
              : item.SubPrice
                ? `${moneyFormat(item.SubPrice)}/${this.$i18n.t('month')}`
                : this.$i18n.t('mfdy');

            const needIgnore = ['IsPTA', 'GradeScore', 'SubPrice'];
            const show2Data = showData
              .filter((ik: any) => !needIgnore.includes(ik))
              .slice(0, 2);

            const isShowSubBtn = showData.includes('SubPrice');
            const showGrade = showData.includes('GradeScore');
            const showPta = showData.includes('IsPTA');
            const needHightProp = ['ROI'];

            return {
              avatar: `${this.base}/Avata/${item.UserID}`,
              name: item.NickName,
              grade: gradeFormat(item.GradeScore),
              confirmBtn: !isShowSubBtn ? false : otherEditText,
              index: item.AccountIndex,
              showStrategy: true,
              isShowGrade: showGrade,
              isShowPta: showPta && item.IsPTA,
              strategyDesc: `${this.$i18n.t('jycl')}: ${item.StrategyDesc}`,
              brokerName: item.BrokerName,
              subscribers: item.Subscribers,
              item,
              data: show2Data.map((it: any) => {
                const ival: any = item[it];
                return {
                  hightlight: needHightProp.includes(it) && ival > 0,
                  prop: (mapKey as any)[it],
                  val: propFormat(ival, it),
                };
              }),
            };
          });
        }
        return null;
      });

      newData = newData.concat(newData);
      if (newData.length) {
        return newData.splice(0, 4);
      }

      return null;
    }
    return null;
  }
}
</script>


<style lang="less" scoped>
.rm-list {
  h3 {
    font-size: 16px;
    color: #666666;
    margin: 10px 0;
  }
  .list {
    display: flex;
    justify-content: space-between;
    .list-item{

    }
  }
}
</style>
