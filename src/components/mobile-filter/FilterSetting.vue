<template>
  <div class="filter-setting-wrap">
    <div class="filter-normal-item">
      <filter-button>PTA会员</filter-button>
      <filter-button>免费订阅</filter-button>
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
              :active="params[item.value] == citem.value"
              @touch="touchHandler(item.value,citem)"
            >{{citem.name}}</filter-button>

            <div
              class="interval-container"
              v-if="citem.type === 'interval'"
            >
              <input
                placeholder="最小值"
                type="text"
                class="interval-input start-input"
                :class="{'active-input': citem.start}"
                v-model.lazy.number.trim="citem.start"
                @blur="inputHandler(item.value,citem.start,citem.end)"
              >
              <span class="interval-span">-</span>
              <input
                placeholder="最大值"
                type="text"
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
              >{{brokersList.find(v=>v.BrokerId == broker).Broker}}</filter-button>
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
      @submit="handleSubmit(params)"
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
import { Accordion, AccordionItem } from '@/components/accordion';
import FilterPlus from './FilterPlus.vue';
import zhCN from '@/i18n/zh-CN/components/filter-popover/FilterPopover';
import zhTW from '@/i18n/zh-TW/components/filter-popover/FilterPopover';
import enUS from '@/i18n/en-US/components/filter-popover/FilterPopover';

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
    },
  },
})
export default class FilterSetting extends Vue {
  private iconClasses: string =
    'edit-icon edit-hover-icon edit-icon-active edit-hover-icon-active icon-up_24px';

  @RankStore.Mutation
  setRankParams: any;

  @RankStore.State
  checkedBrokers: any;

  @RankStore.Mutation
  setCheckedBrokers: any;

  @RankStore.State
  brokersList: any;

  @RankStore.Mutation
  setFilterRes: any;

  @Emit('filter')
  handleSubmit(value: object) {
    this.refactor(value);
    this.refactorRes(value);
    this.$router.replace({ name: 'rankList' });
  }

  refactorRes(res: any) {
    const result = this.labelObj.map((v) => {
      const r = v.filter.find((val: any) => val.value === res[v.value])
        && v.filter.find((val: any) => val.value === res[v.value]).name;
      return {
        label: v.label,
        val: r,
      };
    });

    this.setFilterRes(result);
  }

  // 过滤条件的字段格式
  @Prop({
    default: () => [
      {
        label: '交易能力值',
        desc: '备注介绍',
        value: 'Score',
        filter: [
          { name: '不限', value: '' },
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
        label: '账户净值',
        value: 'Equity',
        desc: '备注介绍',
        filter: [
          { name: '不限', value: '' },
          { name: '小于 $5000', value: '0-5000' },
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
        label: '交易周期',
        value: 'Weeks',
        desc: '备注介绍',
        filter: [
          { name: '不限', value: '' },
          { name: '小于13周', value: '0-13' },
          { name: '13-26周', value: '13-26' },
          { name: '26-52周', value: '26-52' },
          { name: '52周以上', value: '52-0' },
          {
            mode: 'input',
            start: '',
            end: '',
            type: 'interval',
          },
        ],
      },
      {
        label: '最大回撤比例',
        value: 'Retracement',
        desc: '备注介绍',
        filter: [
          { name: '不限', value: '' },
          { name: '小于10%', value: '0-13' },
          { name: '10%-20%', value: '10-20' },
          { name: '20%-30%', value: '20-30' },
          { name: '30%以上', value: '30-0' },
          {
            mode: 'input',
            start: '',
            end: '',
            type: 'interval',
          },
        ],
      },
      {
        label: '收益率',
        value: 'Roi',
        desc: '备注介绍',
        filter: [
          { name: '不限', value: '' },
          { name: '小于10%', value: '0-13' },
          { name: '10%-20%', value: '10-20' },
          { name: '20%-30%', value: '20-30' },
          { name: '30%以上', value: '30-0' },
          {
            mode: 'input',
            start: '',
            end: '',
            type: 'interval',
          },
        ],
      },
      {
        label: '经纪商',
        value: 'brokerId',
        desc: '备注介绍',
        hasAdd: true,
        filter: [{ name: '全部', value: '' }],
      },
    ],
  })
  labelObj!: any[];

  // 过滤条件的当前过滤字段
  @Prop({
    default: () => ({
      Score: '',
      Roi: '',
      Retracement: '',
      Weeks: '',
      Equity: '',
      expSymbol: '',
      brokerId: '',
    }),
  })
  params!: any;

  @Emit('reset')
  handleSeset() {
    this.params = {
      Score: '',
      Roi: '',
      Retracement: '',
      Weeks: '',
      Equity: '',
      expSymbol: '',
      brokerId: '',
    };
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
    this.checkedBrokers = [];
    return this.params;
  }

  touchHandler(key: string, citem: any) {
    this.$set(this.params, key, citem.value);
  }

  public inputHandler(key: string, start: number, end: number) {
    if (!start && !end) {
      this.$set(this.params, key, '');
      return;
    }
    const value = `${start || 0}-${end || 0}`;
    this.$set(this.params, key, value);
  }

  handleAdd() {
    this.$router.push({ name: 'addressBook' });
  }

  handleDel(item: string) {
    console.log('点到了', item);
    const checked = this.checkedBrokers.filter((v: string) => v !== item);
    console.log(checked);
    this.setCheckedBrokers(checked);
  }

  refactor(obj: any) {
    const tempObj = {
      maxScore: obj.Score.split('-')[1],
      minScore: obj.Score.split('-')[0],
      minRoi: obj.Roi.split('-')[0],
      maxRoi: obj.Roi.split('-')[1],
      maxRetracement: obj.Retracement.split('-')[1],
      minRetracement: obj.Retracement.split('-')[0],
      maxWeeks: obj.Weeks.split('-')[1],
      minWeeks: obj.Weeks.split('-')[0],
      maxEquity: obj.Equity.split('-')[1],
      minEquity: obj.Equity.split('-')[0],
      brokerId: this.checkedBrokers.join(','),
    };
    this.setRankParams(tempObj);
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
    padding-top:5px;
    padding-bottom: 10px;
  }
}
</style>
