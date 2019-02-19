<template>
  <div class="header">
    <div class="fm-show-pc">
      <CommonItem
        @hideCard="hideCard"
        @showCard="showCard"
        @toMore="toMore"
        @toPersonal="toPersonalPc"
        :subscribe="subscribe"
        v-if="configData"
        :data="configData"
        :description="description" />
    </div>
    <!-- <div class="fm-show-mobile">
      <InvestManagerMobile @toPersonal="toPersonal" :data="data"/>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CommonItem from '@/views/home/pc/CommonItem.vue';
// import InvestManagerMobile from '@/views/home/mobile/InvestManagerMobile.vue';
import mapKey from '@/constant/propMap';
import { propFormat, processConfig, gradeFormat } from '@/utils/format';
import { toLoginPage, toSubscribePage, toPersonalPage } from '@/utils/native';
import { namespace } from 'vuex-class';
import { needHighlight } from '@/constant/propFormat';
import zhCN from '@/i18n/zh-CN/views/home/CommonListItem';
import zhTW from '@/i18n/zh-TW/views/home/CommonListItem';
import enUS from '@/i18n/en-US/views/home/CommonListItem';
import zhHK from '@/i18n/zh-HK/views/home/CommonListItem';

const RankStore = namespace('RankStore');

@Component({
  components: {
    CommonItem,
    // InvestManagerMobile,
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
  @Prop()
  data:any;

  @Prop({
    default: () => [],
  })
  followList: any;

  @RankStore.Mutation
  setRankParams: any;

  @RankStore.Mutation
  setUseDefaultParams: any;

  @Prop()
  subscribe: any;

  formatVal(val: string|number, type: string): string | number {
    if (Array.isArray(val)) {
      return val.join('/');
    }
    return propFormat(val, type);
  }

  toPersonalPc(item: any) {
    const { UserID, AccountIndex } = item.item;
    this.redirectTo('personalPage', { userId: UserID, index: AccountIndex }, true);
  }

  toPersonal(item: any) {
    const { UserID: userId, AccountIndex: accountIndex } = item;
    // console.log(item, 'item');
    toPersonalPage({
      userId,
      accountIndex,
    });
  }

  showCard($event: any, item: any) {
    const itemList = item.item;
    this.$emit('showCard', $event, itemList && itemList.UserID);
  }

  hideCard($event: any) {
    this.$emit('hideCard');
  }

  toMore(data1: any) {
    // console.log(this.data, 'dddddd');
    const { data } = this;
    // const params: any = {};
    const CondCfg: any = data.CondCfg || {};

    const params = processConfig(CondCfg);

    this.setUseDefaultParams(false);
    this.setRankParams(params);
    this.$nextTick(() => {
      this.$router.push({ name: 'rankList' });
    });
  }

  get configData() {
    const config:any = this.data;
    console.log(config);
    if (!config) {
      return null;
    }
    let showData: any = [];
    if (config && config.HideConfig) {
      Object.keys(config.HideConfig).forEach((i: any) => {
        if (!config.HideConfig[i]) {
          showData.push(i);
        }
      });
    }

    const showGrade = showData.includes('GradeScore');
    const showPta = showData.includes('IsPTA');
    const isShowSubBtn = showData.includes('SubPrice');
    const needIgnore = ['IsPTA', 'GradeScore', 'SubPrice'];
    // const show2Data = showData.filter((ik: any) => !needIgnore.includes(ik)).slice(0, 2);

    if (config.listData && Array.isArray(config.listData.List) && config.listData.List.length > 1) {
      if (config.listData.List.length > 3) {
        showData = showData.filter((ik: any) => !needIgnore.includes(ik)).slice(0, 2);
      } else {
        showData = showData.filter((ik: any) => !needIgnore.includes(ik)).slice(0, 3);
      }
      const newConfig = config.listData.List.map((item: any) => {
        const isEdit = this.followList.includes(`${item.UserID}_${item.AccountIndex}`);
        return {
          avatar: `${this.base}/Avata/${item.UserID}`,
          name: item.NickName,
          index: item.AccountIndex,
          brokerName: item.BrokerName,
          price: item.SubPrice,
          confirmBtn: !isShowSubBtn ? false : isEdit ? this.$i18n.t('bjdy') : item.SubPrice ? `${item.SubPrice}/${this.$i18n.t('month')}` : this.$i18n.t('mfdy'),
          isShowGrade: showGrade,
          grade: gradeFormat(item.GradeScore),
          isShowPta: showPta && item.IsPTA,
          item,
          data: showData.map((it: any) => {
            const ival: any = item[it];
            return {
              prop: mapKey[it],
              val: this.formatVal(ival, it),
              highlight: needHighlight.includes(it) && ival > 0,
            };
          }),
        };
      });
      return newConfig.slice(0, 4);
    }
    return null;
  }

  get description() {
    const config:any = this.data;
    // console.log(this.data, 'description');
    const filters = config && config.CondCfg && config.CondCfg.CondConfig;
    const info: any = [];
    if (filters) {
      Object.keys(filters).filter((i: any) => i !== 'BrokerID').forEach((i: any) => {
        const filter = filters[i];
        const prop = `${(mapKey as any)[i]}`;
        if (filter) {
          if (Object.prototype.toString.call(filter) === '[object Object]') {
            if (filter.Min && filter.Max) {
              info.push(`${this.formatVal(filter.Min, i)} <${prop}< ${this.formatVal(filter.Max, i)}`);
            } else if (filter.Min) {
              info.push(`${prop}> ${this.formatVal(filter.Min, i)}`);
            } else if (filter.Max) {
              info.push(`${prop}< ${this.formatVal(filter.Max, i)}`);
            }
          } else {
            info.push(`${prop}: ${filter}`);
          }
        }
      });
    }

    return {
      btnText: config.ChartText,
      source: config,
      background: config.ChartID,
      title: config.RankName,
      subTitle: config.ViceTitle,
      textTitle: config.ViceTitle,
      filterText: config.RankText,
    };
  }
}
</script>
<style lang="less" scoped>


</style>
