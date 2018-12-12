<template>
  <div class="filter-popover-container">
    <section class="filter-section">
      <filter-tag
        :border="true"
        :active="true"
      >PTA会员</filter-tag>
      <filter-tag :border="true">免费订阅</filter-tag>
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
              placeholder="请输入"
              type="text"
              class="interval-input start-input"
            >
            <span class="interval-span">-</span>
            <input
              placeholder="请输入"
              type="text"
              class="interval-input end-input"
            >
          </div>
        </li>
      </ul>

    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FilterTag from './FilterTag.vue';
@Component({
  components: {
    FilterTag,
  },
})
export default class FilterPopover extends Vue {
  labelWidth: string;

  params: object = {
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

  labelObj: Array<any> = [
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
          mode: 'input', start: '', end: '', type: 'interval',
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
          mode: 'input', start: '', end: '', type: 'interval',
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
      filter: [{ name: '全部', value: '' }],
    },
  ];
}
</script>


<style lang="less" scoped>
@theme-color:#FF6200;
.divide-line{
  width: 100%;
  height: 1px;
  background-color: #F0F0F0;
  margin: 10px 0;
}

.filter-popover-container {
  position: fixed;
  z-index: 1000;
  width: 780px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}

.filter-section {
  display: flex;
  font-size: 12px;
  .filter-label {
    width: 100px;
    min-width: 100px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    .label-name {
      color: #999;
      line-height: 16px;
      box-sizing: border-box;
    }
    .fm-fonticon {
      line-height: 16px;
      font-size: 16px;
      color: #767676;
    }
  }
  .filter-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .filter-content-item {
      .interval-container{
        margin-bottom: 10px;
      }
      .interval-input {
        border-radius: 13px;
        width: 80px;
        height: 26px;
        outline: none;
        border:1px solid #E6E6E6;
        padding:0 15px;
        text-align: center;
        &:focus {
          border-color:@theme-color;
          color:@theme-color;
        }
      }
      .interval-span{
        margin: 0 2px;
      }
    }
  }
}
</style>
