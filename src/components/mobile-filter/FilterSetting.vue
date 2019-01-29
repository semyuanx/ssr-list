<template>
  <div class="filter-setting-wrap">

    <div class="filter-normal-item">
      <filter-button>{{$t('pta')}}</filter-button>
      <filter-button>{{$t('freeSub')}}</filter-button>
    </div>

    <Accordion accordion>
      <AccordionItem
        open
        :title="item.label"
        v-for="(item,index) in labelObj"
        :key="index"
      >
        <section class="filter-item-section">
          <div
            v-for="(citem,idx) in item.filter"
            :key="idx"
          >
            <filter-button
              v-if="!citem.type"
              :active="(rankParams[item.value]|| '') == citem.value"
              @touch="touchHandler(item,citem)"
            >{{citem.name}}
            </filter-button>

            <div
              class="interval-container"
              v-if="citem.type === 'interval'"
            >
              <input
                :placeholder="$t('min')"
                type="number"
                class="interval-input start-input"
                :class="{'active-input': citem.start}"
                v-model.lazy.number.trim="citem.start"
                @blur="inputHandler(item.value,citem.start,citem.end)"
              >
              <span class="interval-span">-</span>
              <input
                :placeholder="$t('max')"
                type="number"
                class="interval-input end-input"
                :class="{'active-input': citem.end}"
                v-model.lazy.number.trim="citem.end"
                @blur="inputHandler(item.value,citem.start,citem.end)"
              >
            </div>
            <template v-if="item.hasAdd">
              <filter-button
                :closed="true"
                v-for="broker in checkedBrokers"
                :key='broker'
                @close="handleDel(broker)"
              >{{brokersList && brokersList.find(v=>v.BrokerId == broker).Broker}}
              </filter-button>
            </template>
            <filter-plus
              v-if="item.hasAdd"
              @add="handleAdd"
            />
          </div>
        </section>
      </AccordionItem>
    </Accordion>
    <filter-submit
      @reset="handleSeset"
      @submit="handleSubmit"
    />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import FilterButton from './FilterButton.vue';
import FilterSubmit from './FilterSubmit.vue';
import Accordion from '@/components/accordion/accordion.vue';
import AccordionItem from '@/components/accordion/accordion-item.vue';
import FilterPlus from './FilterPlus.vue';
import zhCN from '@/i18n/zh-CN/components/mobile-filter/FilterSetting';
import zhTW from '@/i18n/zh-TW/components/mobile-filter/FilterSetting';
import enUS from '@/i18n/en-US/components/mobile-filter/FilterSetting';
import zhHK from '@/i18n/zh-HK/components/mobile-filter/FilterSetting';

const RankStore = namespace('RankStore');

  @Component({
    components: {
      FilterButton,
      FilterSubmit,
      FilterPlus,
      Accordion,
      AccordionItem,
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
export default class FilterSetting extends Vue {
    // 过滤条件的字段格式
    // @Prop({
    //   default: () => [
    //     {
    //       label: this.lang('labels[0].label'),
    //       desc: this.lang('labels[0].desc'),
    //       value: 'Score',
    //       filter: [
    //         { name: this.lang('labels[0].filters[0]'), value: '' },
    //         { name: '60-70', value: '60-70' },
    //         { name: '71-80', value: '71-80' },
    //         { name: '81-90', value: '81-90' },
    //         { name: '>90', value: '90-0' },
    //         {
    //           mode: 'input',
    //           start: '',
    //           end: '',
    //           type: 'interval',
    //         },
    //       ],
    //     },
    //     {
    //       label: this.lang('labels[1].label'),
    //       desc: this.lang('labels[1].desc'),
    //       value: 'Equity',
    //       filter: [
    //         { name: this.lang('labels[1].filters[0]'), value: '' },
    //         { name: `${this.lang('labels[0].filters[1]')} $5000`, value: '0-5000' },
    //         { name: '$5000 - $20000', value: '5000-20000' },
    //         { name: '$20000 - $50000', value: '20000-50000' },
    //         {
    //           mode: 'input',
    //           start: '',
    //           end: '',
    //           type: 'interval',
    //         },
    //       ],
    //     },
    //     {
    //       label: this.lang('labels[2].label'),
    //       desc: this.lang('labels[2].desc'),
    //       value: 'Weeks',
    //       filter: [
    //         { name: this.lang('labels[2].filters[0]'), value: '' },
    //         { name: `${this.lang('labels[2].filters[1]')}13${this.lang('labels[2].filters[2]')}`, value: '0-13' },
    //         { name: `13-26${this.lang('labels[2].filters[2]')}`, value: '13-26' },
    //         { name: `26-52${this.lang('labels[2].filters[2]')}`, value: '26-52' },
    //         { name: `52${this.lang('labels[2].filters[3]')}`, value: '52-0' },
    //         {
    //           mode: 'input',
    //           start: '',
    //           end: '',
    //           type: 'interval',
    //         },
    //       ],
    //     },
    //     {
    //       label: this.lang('labels[3].label'),
    //       desc: this.lang('labels[3].desc'),
    //       value: 'Retracement',
    //       filter: [
    //         { name: this.lang('labels[3].filters[0]'), value: '' },
    //         { name: `${this.lang('labels[3].filters[1]')}10%`, value: '0-13' },
    //         { name: '10%-20%', value: '10-20' },
    //         { name: '20%-30%', value: '20-30' },
    //         { name: `30%${this.lang('labels[3].filters[2]')}`, value: '30-0' },
    //         {
    //           mode: 'input',
    //           start: '',
    //           end: '',
    //           type: 'interval',
    //         },
    //       ],
    //     },
    //     {
    //       label: this.lang('labels[4].label'),
    //       desc: this.lang('labels[4].desc'),
    //       value: 'Roi',
    //       filter: [
    //         { name: this.lang('labels[4].filters[0]'), value: '' },
    //         { name: `${this.lang('labels[4].filters[1]')}10%`, value: '0-13' },
    //         { name: '10%-20%', value: '10-20' },
    //         { name: '20%-30%', value: '20-30' },
    //         { name: `30%${this.lang('labels[4].filters[2]')}`, value: '30-0' },
    //         {
    //           mode: 'input',
    //           start: '',
    //           end: '',
    //           type: 'interval',
    //         },
    //       ],
    //     },
    //     {
    //       label: this.lang('labels[5].label'),
    //       desc: this.lang('labels[5].desc'),
    //       value: 'brokerId',
    //       hasAdd: true,
    //       filter: [{ name: this.lang('labels[5].filters[0]'), value: '' }],
    //     },
    //   ] as any,
    // })
    // labelObj!: any[];
    public labelObj: any[] = [
      {
        label: this.lang('labels[0].label'),
        desc: this.lang('labels[0].desc'),
        value: 'Score',
        filter: [
          { name: this.lang('labels[0].filters[0]'), value: '' },
          { name: '60-70', value: '60-70' },
          { name: '71-80', value: '71-80' },
          { name: '81-90', value: '81-90' },
          { name: '>90', value: '90-0' },
          {
            mode: 'input',
            start: '',
            end: '',
            type: 'interval',
          },
        ],
      },
      {
        label: this.lang('labels[1].label'),
        desc: this.lang('labels[1].desc'),
        value: 'Equity',
        filter: [
          { name: this.lang('labels[1].filters[0]'), value: '' },
          { name: `${this.lang('labels[0].filters[1]')} $5000`, value: '0-5000' },
          { name: '$5000 - $20000', value: '5000-20000' },
          { name: '$20000 - $50000', value: '20000-50000' },
          {
            mode: 'input',
            start: '',
            end: '',
            type: 'interval',
          },
        ],
      },
      {
        label: this.lang('labels[2].label'),
        desc: this.lang('labels[2].desc'),
        value: 'Weeks',
        filter: [
          { name: this.lang('labels[2].filters[0]'), value: '' },
          { name: `${this.lang('labels[2].filters[1]')}13${this.lang('labels[2].filters[2]')}`, value: '0-13' },
          { name: `13-26${this.lang('labels[2].filters[2]')}`, value: '13-26' },
          { name: `26-52${this.lang('labels[2].filters[2]')}`, value: '26-52' },
          { name: `52${this.lang('labels[2].filters[3]')}`, value: '52-0' },
          {
            mode: 'input',
            start: '',
            end: '',
            type: 'interval',
          },
        ],
      },
      {
        label: this.lang('labels[3].label'),
        desc: this.lang('labels[3].desc'),
        value: 'Retracement',
        filter: [
          { name: this.lang('labels[3].filters[0]'), value: '' },
          { name: `${this.lang('labels[3].filters[1]')}10%`, value: '0-13' },
          { name: '10%-20%', value: '10-20' },
          { name: '20%-30%', value: '20-30' },
          { name: `30%${this.lang('labels[3].filters[2]')}`, value: '30-0' },
          {
            mode: 'input',
            start: '',
            end: '',
            type: 'interval',
          },
        ],
      },
      {
        label: this.lang('labels[4].label'),
        desc: this.lang('labels[4].desc'),
        value: 'Roi',
        filter: [
          { name: this.lang('labels[4].filters[0]'), value: '' },
          { name: `${this.lang('labels[4].filters[1]')}10%`, value: '0-13' },
          { name: '10%-20%', value: '10-20' },
          { name: '20%-30%', value: '20-30' },
          { name: `30%${this.lang('labels[4].filters[2]')}`, value: '30-0' },
          {
            mode: 'input',
            start: '',
            end: '',
            type: 'interval',
          },
        ],
      },
      {
        label: this.lang('labels[5].label'),
        desc: this.lang('labels[5].desc'),
        value: 'brokerId',
        hasAdd: true,
        filter: [{ name: this.lang('labels[5].filters[0]'), value: '' }],
      },
    ] as any;

    @RankStore.State
    rankParams: any;

    @RankStore.Mutation
    setRankParams: any;

    @RankStore.State
    checkedBrokers: any;

    @RankStore.Mutation
    setCheckedBrokers: any;

    @RankStore.Mutation
    setFilterRes: any;

    @RankStore.State
    brokersList: any;

    @Emit('filter')
    handleSubmit() {
      this.filterResult();
      this.$router.go(-1);
    }

    lang(path: string) {
      return this.$i18n.t(path) as string;
    }

    @Emit('reset')
    handleSeset() {
      this.setRankParams({
        Score: '',
        Roi: '',
        Retracement: '',
        Weeks: '',
        Equity: '',
        expSymbol: '',
        brokerId: '',
      });
      this.labelObj.forEach(
        (v): void => {
          v.filter.forEach(
            (val: any): void => {
              if (val.start) {
                val.start = '';
              }
              if (val.end) {
                val.end = '';
              }
            },
          );
        },
      );
      this.setCheckedBrokers([]);
    }

    private touchHandler(item: any, citem: any) {
      const key: string = item.value;
      if (item.filter) {
        const len: number = item.filter.length;
        item.filter[len - 1].start = '';
        item.filter[len - 1].end = '';
      }
      const params = Object.assign({}, this.rankParams);
      params[key] = citem.value;
      this.setRankParams(params);
    }

    private inputHandler(key: string, start: number, end: number) {
      const params = Object.assign({}, this.rankParams);
      if (!start && !end) {
        params[key] = '';
      } else {
        const value = `${start || 0}-${end || 0}`;
        params[key] = value;
      }
      this.setRankParams(params);
    }

    handleAdd() {
      this.$router.push({ name: 'book' });
    }

    handleDel(item: string) {
      const checked = this.checkedBrokers.filter((v: string) => v !== item);
      this.setCheckedBrokers(checked);
    }

    public filterResult() {
      this.setFilterRes([
        {
          label: '交易能力值',
          val: this.refactorWord('', this.rankParams.Score),
        },
        {
          label: '账户净值',
          val: this.refactorWord('$', this.rankParams.Equity),
        },
        {
          label: '交易周期',
          val: this.refactorWord('周', this.rankParams.Weeks),
        },
        {
          label: '最大回撤比例',
          val: this.refactorWord('%', this.rankParams.Retracement),
        },
        { label: '收益率', val: this.refactorWord('%', this.rankParams.Roi) },
        { label: '经纪商', val: this.rankParams.brokerId },
      ]);
    }

    private refactorWord(unit: string, val: any): string {
      if (!val) {
        return '不限';
      }
      const arr: string[] = val.split('-');
      if (arr[0] === '0') {
        return `< ${this.unitLocation(unit, arr[1])}`;
      }
      if (arr[1] === '0') {
        return `> ${this.unitLocation(unit, arr[0])}`;
      }
      return `${this.unitLocation(unit, arr[0])}-${this.unitLocation(
        unit,
        arr[1],
      )}`;
    }

    private unitLocation(unit: string, val: string) {
      return unit === '$' ? unit + val : val + unit;
    }
}
</script>

<style lang="less" scoped>
  .filter-setting-wrap {
    background-color: #fff;
    padding: 0 16px;
    padding-bottom: 100px;

    .filter-button-container {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }

  .filter-normal-item {
    padding: 20px 0 10px;
    border-bottom: 1px solid #edeff4;
  }

  .interval-container {
    margin-bottom: 10px;
  }

  .interval-input {
    outline: none;
    border: none;
    width: 80px;
    height: 26px;
    border-radius: 2px;
    background-color: #f6f6f6;
    text-align: center;
    padding: 0 10px;

    &.active-input {
      background-color: #fff7f2;
      border: 1px solid #fff7f2;
      color: #ff6200;
    }
  }

  .interval-span {
    color: #b5b5b5;
    height: 26px;
    line-height: 26px;
    width: 20px;
    display: inline-block;
    text-align: center;
    margin: 0 6px;
  }
</style>

<style lang="less">
  .filter-setting-wrap {
    font-family: PingFang-SC-Medium;
    // .fm-collapse-item {
    //   border: none;
    //   border-bottom: 1px solid #edeff4;
    //   border-radius: 0;
    // }
    // .fm-collapse-item-header {
    //   border: none;
    //   background-color: #fff;
    //   height: 60px;
    //   display: flex;
    //   align-items: center;
    //   font-size: 14px;
    //   font-weight: 500;
    //   padding-left: 0;
    //   padding-right: 0;
    //   span.fm-collapse-item-act {
    //     right: 0;
    //   }
    //   .fm-collapse-item-title {
    //     font-size: 14px;
    //     color: #333;
    //   }
    // }
    .fm-accordion-title {
      border: none;
      background-color: #fff;
      height: 60px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      padding-left: 0;
      padding-right: 0;
      color: #333;
    }

    .filter-item-section {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding-top: 5px;
      padding-bottom: 10px;
    }
  }
</style>
