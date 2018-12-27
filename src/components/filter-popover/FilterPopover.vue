<template>
  <div
    class="filter-popover-container"
    v-if="show"
  >
    <section class="filter-header">
      <span class="filter-title">{{title}}</span>
      <i
        class="fm-fonticon icon-close_24px filter-close"
        @click="handleColse"
      ></i>
    </section>
    <article class="filter-popover-body">
      <section class="filter-section">
        <filter-tag
          class="base-filters"
          :border="true"
          :active="true"
        >{{$t('PTA')}}</filter-tag>
        <filter-tag
          :border="true"
          class="base-filters"
        >{{$t('freeSubscription')}}</filter-tag>
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
              :active="params[item.value] == citem.value"
              v-if="!citem.type"
              @selected="rangeHandler(item.value,citem.value)"
            >{{citem.name}}</filter-tag>
            <div
              class="interval-container"
              v-if="citem.type === 'interval'"
            >
              <input
                :placeholder="$t('placeholder')"
                type="text"
                class="interval-input start-input"
                :class="{'active-input': citem.start}"
                v-model.lazy.number.trim="citem.start"
                @blur="inputHandler(item.value,citem.start,citem.end)"
              >
              <span class="interval-span">-</span>
              <input
                :placeholder="$t('placeholder')"
                type="text"
                class="interval-input end-input"
                :class="{'active-input': citem.end}"
                v-model.lazy.number.trim="citem.end"
                @blur="inputHandler(item.value,citem.start,citem.end)"
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
      <button
        class="button button-text"
        @click="reset"
      >{{$t('reset')}}</button>
      <button
        class="button button-primary"
        @click="handleFilter"
      >{{$t('filter')}}</button>
    </section>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';
import FilterTag from './FilterTag.vue';
import zhCN from '@/i18n/zh-CN/components/filter-popover/FilterPopover';
import zhTW from '@/i18n/zh-TW/components/filter-popover/FilterPopover';
import enUS from '@/i18n/en-US/components/filter-popover/FilterPopover';

const defaultParams = {
  Score: '',
  Roi: '',
  Retracement: '',
  Weeks: '',
  Equity: '',
  brokerId: '',
};

const defaultData: any[] = [
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
    ],
  },
  {
    label: '最大回撤比例',
    value: 'Retracement',
    desc: '备注介绍',
    filter: [{ name: '不限', value: '' }],
  },
  {
    label: '收益率',
    value: 'Roi',
    desc: '备注介绍',
    filter: [{ name: '不限', value: '' }],
  },
  {
    label: '经纪商',
    value: 'brokerId',
    desc: '备注介绍',
    hasAdd: true,
    filter: [{ name: '全部', value: '' }],
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
  }) params!: any;

  // 过滤条件的字段格式
  @Prop({ default: () => defaultData }) labelObj!: any[];

  @Prop({ default: false }) show!: boolean;

  @Emit('close')
  handleColse(e: MouseEvent) {}

  @Emit('filter')
  handleFilter() {
    return this.params;
  }

  public rangeHandler(key: string, value: string) {
    this.$set(this.params, key, value);
  }

  public inputHandler(key: string, start: number, end: number) {
    if (!start && !end) {
      this.$set(this.params, key, '');
      return;
    }
    const value = `${start || 0}-${end || 0}`;
    this.$set(this.params, key, value);
  }


  @Emit('reset')
  reset() {
    this.params = {
      Score: '',
      Roi: '',
      Retracement: '',
      Weeks: '',
      Equity: '',
      expSymbol: '',
      brokerId: '',
    };
    return this.params;
  }
}
</script>


<style lang="less" scoped>
@import "./filterPopover.less";
</style>
