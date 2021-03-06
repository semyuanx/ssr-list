<template>
  <div
    class="filter-popover-container"
    v-if="show"
  >
    <section class="filter-header">
      <span class="filter-title">{{title || $t('gjsx')}}</span>
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
          :active="ptaSelected"
          @selected="handlePta"
        >{{$t('PTA')}}</filter-tag>
        <filter-tag
          :border="true"
          :active="freeSubSelected"
          @selected="handleFreeSub"
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
          v-if="index != 1"
        >
          <span class="label-name">{{item.label}}</span>
          <el-tooltip v-if="item.tips" class="item" effect="dark" :content="item.tips" placement="top">
            <i class="fm-fonticon icon-info_circle_24px"></i>
          </el-tooltip>
        </div>
        <ul class="filter-content" v-if="index != 1">
          <li
            class="filter-content-item"
            v-for="(citem,inx) in item.filter"
            :key="inx"
          >
            <filter-tag
              :active="(allParams[item.value] || '') == citem.value"
              v-if="!citem.type"
              @selected="rangeHandler(item,citem)"
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
                @change="inputChanged(item.value,citem, 'start')"
                @input="inputChanged(item.value,citem, 'end')"
                @blur="inputHandler(item.value,citem.start,citem.end)"
              >
              <span class="interval-span">-</span>
              <input
                :placeholder="$t('placeholder')"
                type="text"
                class="interval-input end-input"
                :class="{'active-input': citem.end}"
                v-model.lazy.number.trim="citem.end"
                @change="inputChanged(item.value,citem, 'end')"
                @input="inputChanged(item.value,citem, 'end')"
                @blur="inputHandler(item.value,citem.start,citem.end)"
              >
            </div>
            <slot :name="item.value"></slot>

          </li>

        </ul>
        <div
          class="divide-line"
          v-if="item.needLine"
        ></div>
        <!-- <div
          class="divide-line"
          v-if="divided.indexOf(index) !== -1"
        ></div> -->
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
  Component, Vue, Prop, Emit, Watch,
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import FilterTag from './FilterTag.vue';
import zhCN from '@/i18n/zh-CN/components/filter-popover/FilterPopover';
import zhTW from '@/i18n/zh-TW/components/filter-popover/FilterPopover';
import enUS from '@/i18n/en-US/components/filter-popover/FilterPopover';
import zhHK from '@/i18n/zh-HK/components/filter-popover/FilterPopover';

import { Tooltip } from 'element-ui';

import { isNumber } from '@/utils/util';

const RankStore = namespace('RankStore');

@Component({
  components: {
    FilterTag,
    [Tooltip.name]: Tooltip,
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
export default class FilterPopover extends Vue {
  // label的宽度
  @Prop({ default: '' }) labelWidth!: string;

  // 弹出框页面的标题
  @Prop({ default: '' }) title!: string;

  // 要插入分割线的索引位置，从0开始
  @Prop({ default: () => [1, 4, 6] }) divided!: number[];

  @Prop({ default: () => [] }) checked!: any[];

  @Prop({ default: false }) show!: boolean;

  labelObj: any[] = [
    {
      label: this.lang('labels[0].label'),
      desc: this.lang('labels[0].desc'),
      value: 'GradeScore',
      filter: [
        { name: this.lang('labels[0].filter[0]'), value: '' },
        { name: '≥S', value: '9-0' },
        { name: '≥A+', value: '8-0' },
        { name: '≥A', value: '7-0' },
        { name: '≥A-', value: '6-0' },
        { name: '≥B', value: '5-0' },
        { name: '≥C', value: '4-0' },
        { name: '≥D', value: '0-0' },
      ],
    },
    {
      label: this.lang('labels[1].label'),
      tips: this.lang('labels[1].tips'),
      desc: this.lang('labels[1].desc'),
      value: 'Score',
      filter: [
        { name: this.lang('labels[1].filter[0]'), value: '' },
        { name: '60-70', value: '60-70' },
        { name: '71-80', value: '71-80' },
        { name: '81-90', value: '81-90' },
        { name: '>90', value: '90-0' },
        // {
        //   mode: 'input',
        //   start: '',
        //   end: '',
        //   type: 'interval',
        // },
      ],
      needLine: true,
    },
    {
      label: this.lang('labels[2].label'),
      tips: this.lang('labels[2].tips'),
      value: 'Subscribers',
      desc: this.lang('labels[2].desc'),
      filter: [
        { name: this.lang('labels[2].filter[0]'), value: '' },
        { name: `${this.lang('labels[2].filter[1]')}50${this.lang('labels[2].filter[2]')}`, value: '0-50' },
        { name: `50-100${this.lang('labels[2].filter[2]')}`, value: '50-100' },
        { name: `100-300${this.lang('labels[2].filter[2]')}`, value: '100-300' },
        { name: `>300${this.lang('labels[2].filter[3]')}`, value: '300-0' },
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
      value: 'Equity',
      desc: this.lang('labels[3].desc'),
      filter: [
        { name: this.lang('labels[3].filter[0]'), value: '' },
        { name: `${this.lang('labels[3].filter[1]')} $5000`, value: '0-5000' },
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
      tips: this.lang('labels[4].tips'),
      label: this.lang('labels[4].label'),
      value: 'Weeks',
      desc: this.lang('labels[4].desc'),
      filter: [
        { name: this.lang('labels[4].filter[0]'), value: '' },
        { name: `${this.lang('labels[4].filter[1]')}13${this.lang('labels[4].filter[2]')}`, value: '0-13' },
        { name: `13-26${this.lang('labels[4].filter[2]')}`, value: '13-26' },
        { name: `26-52${this.lang('labels[4].filter[2]')}`, value: '26-52' },
        { name: `>52${this.lang('labels[4].filter[3]')}`, value: '52-0' },
        {
          mode: 'input',
          start: '',
          end: '',
          type: 'interval',
        },
      ],
      needLine: true,
    },
    {
      tips: this.lang('labels[5].tips'),
      label: this.lang('labels[5].label'),
      value: 'Retracement',
      desc: this.lang('labels[5].desc'),
      filter: [
        { name: this.lang('labels[5].filter[0]'), value: '' },
        { name: `${this.lang('labels[5].filter[1]')}10%`, value: '0-10' },
        { name: '10%-20%', value: '10-20' },
        { name: '20%-30%', value: '20-30' },
        { name: `>30%${this.lang('labels[5].filter[2]')}`, value: '30-0' },
        {
          mode: 'input',
          start: '',
          end: '',
          type: 'interval',
        },
      ],
    },
    {
      label: this.lang('labels[6].label'),
      value: 'Roi',
      desc: this.lang('labels[6].desc'),
      filter: [
        { name: this.lang('labels[6].filter[0]'), value: '' },
        { name: `${this.lang('labels[6].filter[1]')}10%`, value: '0-10' },
        { name: '10%-20%', value: '10-20' },
        { name: '20%-30%', value: '20-30' },
        { name: `>30%${this.lang('labels[6].filter[2]')}`, value: '30-0' },
        {
          mode: 'input',
          start: '',
          end: '',
          type: 'interval',
        },
      ],
      needLine: true,
    },
    {
      label: this.lang('labels[7].label'),
      value: 'brokerId',
      desc: this.lang('labels[7].desc'),
      hasAdd: true,
      filter: [{ name: this.lang('labels[7].filter[0]'), value: '' }],
    },
  ];

  lableMap: any = {
    GradeScore: 0,
    Score: 1,
    Subscribers: 2,
    Equity: 3,
    Weeks: 4,
    Retracement: 5,
    MaxRetracement: 5,
    Roi: 6,
  };

  innerParams: any = {};

  // @Watch('allParams')
  // allParamsChanged(v: any) {
  //   // console.log(v, 'vvvvvchanged');
  // }

  public get allParams() {
    const params = { ...this.rankParams, ...this.innerParams };
    return params;
  }

  @RankStore.State
  rankParams: any;

  @RankStore.Mutation
  setRankParams: any;

  @Emit('close')
  handleColse(e: MouseEvent) {}

  @Emit('filter')
  handleFilter() {
    const params = { ...this.rankParams, ...this.innerParams };

    this.setRankParams(params);
  }

  @Emit('reset')
  reset() {
    this.labelObj.forEach((v: any) => {
      v.filter.forEach((val: any) => {
        if (val.start) {
          val.start = '';
        }
        if (val.end) {
          val.end = '';
        }
      });
    });
    this.setRankParams({
      GradeScore: '',
      Score: '',
      Roi: '',
      Retracement: '',
      Subscribers: '',
      Weeks: '',
      Equity: '',
      expSymbol: '',
      brokerId: [],
    });
    this.innerParams = {};
    this.ptaSelected = false;
    this.freeSubSelected = false;
  }

  ptaSelected: boolean = false;

  freeSubSelected: boolean = false;

  private handleFreeSub() {
    const willValue = !this.freeSubSelected;
    const params = willValue ? { freeSubPrice: 1 } : { freeSubPrice: 0 };

    this.innerParams = { ...this.innerParams, ...params };

    this.freeSubSelected = willValue;
  }

  private handlePta() {
    const willValue = !this.ptaSelected;
    const params = willValue ? { isPTA: 1 } : { isPTA: 0 };
    this.innerParams = { ...this.innerParams, ...params };
    this.ptaSelected = willValue;
  }

  @Watch('checked')
  checkedChanged(v: any) {
    const { labelObj } = this;
    if (v && v.length) {
      labelObj[labelObj.length - 1].filter[0].value = 1;
    } else {
      labelObj[labelObj.length - 1].filter[0].value = '';
    }
  }

  public lang(path: string) {
    return this.$i18n.t(path) as string;
  }

  private rangeHandler(item: any, citem: any) {
    const key: string = item.value;
    if (key === 'brokerId') {
      // this.log(this.$parent);
      // this.log(this.checked, '*******')
      this.$emit('resetChecked');
      return;
    }

    if (item.filter) {
      const len: number = item.filter.length;
      item.filter[len - 1].start = '';
      item.filter[len - 1].end = '';
    }
    const params: any = {};
    params[key] = citem.value;
    this.innerParams = { ...this.innerParams, ...params };
  }

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.initParams();
      }, 1000);
    });
  }

  @Watch('show')
  showChanged(v: any) {
    if (v) {
      this.$nextTick(() => {
        this.initParams();
      });
    }
  }

  initParams() {
    const { lableMap, rankParams } = this;
    this.log('mounted init', this.rankParams);

    this.innerParams = { ...this.innerParams, ...rankParams };
    if (rankParams.isPTA && [1, '1'].includes(rankParams.isPTA)) {
      this.ptaSelected = true;
    }
    // console.log(this.innerParams, 'rankParams*****************');
    if (rankParams.freeSubPrice && [1, '1'].includes(rankParams.freeSubPrice)) {
      this.freeSubSelected = true;
    }

    Object.keys(rankParams).forEach((key: any) => {
      const val = rankParams[key];
      if (val) {
        this.processInitFill(key, val);
      }
    });
  }

  processInitFill(key: string, val: any) {
    const { lableMap, labelObj } = this;

    const needFilled = ['Subscribers', 'Equity', 'Weeks', 'Retracement', 'Roi', 'MaxRetracement'];
    const mapValue = lableMap[key];
    this.log(mapValue, 'mmmmmap', key);
    if (needFilled.includes(key) && (mapValue || mapValue === 0)) {
      const filter = labelObj[mapValue].filter;
      const lastFilterFilled = filter[filter.length - 1];
      this.log(lastFilterFilled, key, 'kkkk');
      if (!filter.find((i: any) => i && i.value === val)) {
        if (val.includes('-')) {
          const split = val.split('-');
          if (split[0] && ![0, '0'].includes(split[0])) {
            lastFilterFilled.start = split[0];
          }
          if (split[1] && ![0, '0'].includes(split[1])) {
            lastFilterFilled.end = split[1];
          }
        }
      }
    }
  }

  private inputChanged(key: string, start: any, type: string) {
    const modelVal = start[type];
    this.log(start, 'inputChanged');
    if (modelVal === '0' || modelVal === 0 || !isNumber(modelVal)) {
      start[type] = '';
    }
  }

  private inputHandler(key: string, start: number, end: number) {
    // console.log(key, start, end, 'end');

    const params: any = {};

    if (!['0', 0].includes(start) && !isNumber(start)) {
      params[key] = '';
    }
    if (!['0', 0].includes(end) && !isNumber(end)) {
      params[key] = '';
    }
    if (!start && !end) {
      params[key] = '';
    } else {
      const value = `${start || 0}-${end || 0}`;
      params[key] = value;
    }
    this.innerParams = { ...this.innerParams, ...params };
  }
}
</script>


<style lang="less" scoped>
@import "./filterPopover.less";
</style>
