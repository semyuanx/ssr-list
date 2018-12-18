<template>
  <div class="filter-popover-container" v-if="show">
    <section class="filter-header">
      <span class="filter-title">{{title}}</span>
      <i class="fm-fonticon icon-close_24px filter-close" @click="handleColse"></i>
    </section>
    <article class="filter-popover-body">
      <section class="filter-section">
        <filter-tag
          :border="true"
          :active="true"
        >{{$t('PTA')}}</filter-tag>
        <filter-tag :border="true">{{$t('freeSubscription')}}</filter-tag>
      </section>
      <div class="divide-line"></div>
      <section
        class="filter-section"
        v-for="(item,index) in labelObj"
        :key="index"
      >
        <div
          class="filter-label"
          :style="{width:labelWidth,minWidth:labelWidth}"
        >
          <span class="label-name">{{item.label}}</span>
          <i class="fm-fonticon icon-info_circle_24px"></i>
        </div>
        <ul class="filter-content">
          <li
            class="filter-content-item"
            v-for="(citem,inx) in item.filter"
            :key="inx"
          >
            <filter-tag
              :active="params[item.value] === citem.value"
              v-if="!citem.type"
            >{{citem.name}}</filter-tag>
            <div
              class="interval-container"
              v-if="citem.type === 'interval'"
            >
              <input
                :placeholder="$t('placeholder')"
                type="text"
                class="interval-input start-input"
              >
              <span class="interval-span">-</span>
              <input
                :placeholder="$t('placeholder')"
                type="text"
                class="interval-input end-input"
              >
            </div>
            <slot :name="item.value"></slot>
          </li>

        </ul>
        <div
          class="divide-line"
          v-if="divided.indexOf(index) !== -1"
        ></div>
      </section>
    </article>
    <section class="button-groups">
      <button class="button button-text">{{$t('reset')}}</button>
      <button class="button button-primary">{{$t('filter')}}</button>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FilterTag from './FilterTag.vue';
import zhCN from '@/i18n/zh-CN/components/filter-popover/FilterPopover';
import zhTW from '@/i18n/zh-TW/components/filter-popover/FilterPopover';
import enUS from '@/i18n/en-US/components/filter-popover/FilterPopover';

export interface FilterType {
  name: string;
  value: string | number;
}
export interface FilterMode {
  mode?: string;
  start?: string | number;
  end?: string | number;
  type: string;
}

export interface LabelObj {
  label: string;
  value: string;
  desc: string;
  filter: [FilterType[] | FilterMode[]];
}

const defaultParams = {
  accountRate: '',
  tradeAbility: '',
  subscribeCount: '',
  accountEquity: '',
  tradeCycle: '',
  retraceRatio: '',
  returnRate: '',
  tradeVariety: '',
  broker: '',
};

const defaultData: LabelObj[] = [
  {
    label: '账户评级',
    value: 'accountRate',
    desc: '备注介绍',
    filter: [
      { name: '不限', value: '' },
      { name: 'S', value: 'S' },
      { name: 'A+', value: 'A+' },
      { name: 'A', value: 'A' },
      { name: 'A-', value: 'A-' },
      { name: 'B', value: 'B' },
      { name: 'C', value: 'C' },
    ],
  },
  {
    label: '交易能力值',
    value: 'tradeAbility',
    desc: '备注介绍',
    filter: [
      { name: '不限', value: '' },
      { name: '60-70', value: '1' },
      { name: '71-80', value: '1' },
      { name: '81-90', value: '1' },
      { name: '>90', value: '1' },
      {
        mode: 'input',
        start: '',
        end: '',
        type: 'interval',
      },
    ],
  },
  {
    label: '订阅人数',
    value: 'subscribeCount',
    desc: '备注介绍',
    filter: [
      { name: '不限', value: '' },
      { name: '小于50人', value: '1' },
      { name: '50-100人', value: '2' },
      { name: '100-300人', value: '3' },
      { name: '300人以上', value: '4' },
      { name: '300人以上', value: '5' },
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
    value: 'accountEquity',
    desc: '备注介绍',
    filter: [{ name: '不限', value: '' }],
  },
  {
    label: '交易周期',
    value: 'tradeCycle',
    desc: '备注介绍',
    filter: [{ name: '不限', value: '' }],
  },
  {
    label: '最大回撤比例',
    value: 'retraceRatio',
    desc: '备注介绍',
    filter: [{ name: '不限', value: '' }],
  },
  {
    label: '收益率',
    value: 'returnRate',
    desc: '备注介绍',
    filter: [{ name: '不限', value: '' }],
  },
  {
    label: '交易品种',
    value: 'tradeVariety',
    desc: '备注介绍',
    filter: [{ name: '全部', value: '' }],
  },
  {
    label: '经纪商',
    value: 'broker',
    desc: '备注介绍',
    filter: [
      { name: '全部', value: '' },
    ],
  },
];

@Component({
  components: {
    FilterTag,
  },
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
    },
  },
})
export default class FilterPopover extends Vue {
  // label的宽度
  @Prop({ default: '' }) labelWidth!: string;

  // 弹出框页面的标题
  @Prop({ default: '高级筛选' }) title!: string;

  // 要插入分割线的索引位置，从0开始
  @Prop({ default: () => [1, 4, 6] }) divided!: number[];

  // 过滤条件的当前过滤字段
  @Prop({ default: () => defaultParams }) params!: object;

  // 过滤条件的字段格式
  @Prop({ default: () => defaultData }) labelObj!: LabelObj[];

  public show:boolean = false;

  handleColse() {
    this.show = false;
  }
}
</script>


<style lang="less" scoped>
@import "./filterPopover.less";
</style>
