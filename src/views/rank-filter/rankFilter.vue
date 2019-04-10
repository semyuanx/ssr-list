<template>
  <div class="filter-container">
    <div class="filter-main">
      <el-form ref="form">
        <section
          class="filter-section"
          :key="k"
          v-for="(item,k) in topLevelData"
        >
          <div class="filter-section-label"> {{item.label}}:</div>
          <rank-checkbox
            :item="item"
            v-if="item.type==='checkbox'"
          >
          </rank-checkbox>
          <rankRadio
            :item="item"
            v-if="item.type === 'radio'"
            @sylSub="sylSub"
            @changeItem="changeItem"
          >
          </rankRadio>
        </section>
        <rankPopover
          @sylSub="sylSub"
          :data="morethanData"
          @changeItem="changeItem"
          @clearItem="clearItem"
        />
      </el-form>
    </div>
    <div
      class="filter-bottom"
      v-if="btoList.length>0"
    >
      <ul>
        <template v-for="item in btoList">
          <li
            v-for="(o,i) in item.item"
            @click="delBtoItem(item,o)"
            :key="i"
          >
            {{item.label?item.label+":&nbsp;&nbsp;":''}}{{o.BrokerName || o.name}}
            <span class="icon-close_24px"></span>
          </li>
        </template>
        <li
          v-show="btoList.length>0"
          @click="clearForm"
          class="clear-btolist"
        >
          <i class="icon-delete_24px"></i>清空
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch, Emit,
} from 'vue-property-decorator';
import { Form } from 'element-ui';
import { namespace } from 'vuex-class';
import zhCN from '@/i18n/zh-CN/components/filter-popover/FilterPopover';
import zhTW from '@/i18n/zh-TW/components/filter-popover/FilterPopover';
import enUS from '@/i18n/en-US/components/filter-popover/FilterPopover';
import zhHK from '@/i18n/zh-HK/components/filter-popover/FilterPopover';
import { getBrokersList } from '@/service/home';
// import { config } from "@vue/test-utils";
import rankCheckbox from './rankCheckbox.vue';
import rankRadio from './rankRadio.vue';
import rankPopover from './rankPopover.vue';
import eventBus from '@/utils/event';

import isequal from 'lodash.isequal';
import { t } from '@/utils/device';

const RankStore = namespace('RankStore');
@Component({
  components: {
    [Form.name]: Form,
    rankCheckbox,
    rankRadio,
    rankPopover,
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
export default class RankFilter extends Vue {
  @RankStore.Mutation
  setRankParams: any;

  @RankStore.Mutation
  setCheckedBrokers: any;

  @RankStore.Mutation
  setRankList:any;

  @RankStore.Mutation
  setUseDefaultParams: any;

  @RankStore.State
  rankParams: any;

  @RankStore.State
  rankDomShow: any;

  @RankStore.Action
  getBrokersList: any;

  @RankStore.State
  brokersList: any;

  @RankStore.Mutation
  setRankDomShow: any;


  @RankStore.Mutation
  setPageIndex: any;

  @RankStore.Mutation
  setRankTotal: any;

  @RankStore.Mutation
  setRankLoading: any;

  // 填充经纪商列表
  @Watch('brokersList')
  fillLabelDate() {
    //  将经纪商列表数据填充到总数据中
    this.brokersList.forEach((val: any) => {
      // this.labelObj[0].filter.push(val);
      this.form[0].filter.push(val);
    });
  }

  // 参数处理
  get defParams() {
    let o: any = {};
    const str1: any = [];
    const neetObj: any[] = ['brokerId', 'GradeScore'];
    this.btoList.forEach((val: any, index: any) => {
      if (!val.item.length) return;
      if (neetObj.includes(val.value)) {
        const str: any = [];
        val.item.map((v: any) => {
          str.push(v.BrokerId || v.value);
          return null;
        });
        o = { ...o, [val.value]: str };
      } else {
        o = { ...o, [val.value]: val.item[0].value };
      }
    });
    return { ...o };
  }

  // 检测参数变化
  @Watch('defParams', { deep: true })
  watchDefParams(val: any, val1: any) {
    if (!isequal(val, val1)) {
      this.setRankParams(val);
      const pandun = JSON.stringify(val) === '{}';
      if (pandun) {
        this.setRankList({});
        // this.setRankLoading(false);
      }
      if (this.rankDomShow !== pandun) {
        this.setRankDomShow(pandun);
      }
    }
  }

  // form表单数据源
  form: any = [
    {
      label: '经纪商',
      value: 'brokerId',
      desc: this.lang('labels[7].desc'),
      item: [],
      filter: [],
      type: 'checkbox',
      moreBtn: 1,
    },
    {
      label: '账户评级',
      item: [],
      desc: this.lang('labels[0].desc'),
      value: 'GradeScore',
      filter: [
        { name: 'S', value: '9-0' },
        { name: 'A+', value: '8-0' },
        { name: 'A', value: '7-0' },
        { name: 'A-', value: '6-0' },
        { name: 'B', value: '5-0' },
        { name: 'C', value: '4-0' },
        { name: 'D', value: '0-0' },
      ],
      type: 'checkbox',
    },
    {
      label: '收益率',
      item: [],
      value: 'Roi',
      desc: this.lang('labels[6].desc'),
      input: ['', ''],
      filter: [
        { name: `${this.lang('labels[6].filter[1]')}10%`, value: '0-10' },
        { name: '10%-20%', value: '10-20' },
        { name: '20%-30%', value: '20-30' },
        { name: `30%${this.lang('labels[6].filter[2]')}`, value: '30-0' },
      ],
      tip: '%',
      type: 'radio',
    },
    {
      label: '最大回撤',
      item: [],
      input: ['', ''],
      value: 'Retracement',
      popState: false,
      desc: this.lang('labels[5].desc'),
      filter: [
        { name: `${this.lang('labels[5].filter[1]')}10%`, value: '0-10' },
        { name: '10%-20%', value: '10-20' },
        { name: '20%-30%', value: '20-30' },
        { name: `30%${this.lang('labels[5].filter[2]')}`, value: '30-0' },
      ],
      tip: '%',
      type: 'radio',
    },
    {
      label: '交易周期',
      item: [],
      input: ['', ''],
      value: 'Weeks',
      desc: this.lang('labels[4].desc'),
      popState: false,
      filter: [
        {
          name: `${this.lang('labels[4].filter[1]')}13${this.lang(
            'labels[4].filter[2]',
          )}`,
          value: '0-13',
        },
        {
          name: `13-26${this.lang('labels[4].filter[2]')}`,
          value: '13-26',
        },
        {
          name: `26-52${this.lang('labels[4].filter[2]')}`,
          value: '26-52',
        },
        { name: `52${this.lang('labels[4].filter[2]')}${this.lang('labels[5].filter[2]')}`, value: '52-0' },
      ],
      tip: '周',
      type: 'more-radio',
    },
    {
      label: '账户净值',
      item: [],
      input: ['', ''],
      value: 'Equity',
      desc: this.lang('labels[3].desc'),
      popState: false,
      filter: [
        {
          name: `${this.lang('labels[3].filter[1]')} $5000`,
          value: '0-5000',
        },
        { name: '$5000 - $20000', value: '5000-20000' },
        { name: '$20000 - $50000', value: '20000-50000' },
        {
          mode: 'input',
          start: '',
          end: '',
          type: 'interval',
        },
      ],
      tip: '$',
      type: 'more-radio',
    },

    {
      label: '',
      item: [],
      value: 'freeSubPrice',
      filter: [
        {
          name: '免费订阅',
          value: 1,
        },
      ],
      type: 'more-checkbox',
    },
    {
      label: '',
      item: [],
      value: 'isPTA',
      filter: [
        {
          name: 'PTA会员',
          value: 1,
        },
      ],
      type: 'more-checkbox',
    },
    {
      label: '',
      item: [],
      value: 'isPromise',
      filter: [
        {
          name: '交易承诺',
          value: 1,
        },
      ],
      type: 'more-checkbox',
    },
    {
      label: '',
      item: [],
      value: 'isTry',
      filter: [
        {
          name: '7天试用',
          value: 1,
        },
      ],
      type: 'more-checkbox',
    },
  ];

  // 展示底部显示列表
  get btoList() {
    const arr: any[] = [];
    this.form.map((val: any) => {
      if (val.item.length) {
        const obj: any = {};
        obj.label = val.label;
        obj.value = val.value;
        if (val.type === 'checkbox' || val.type === 'more-checkbox') {
          const arr1: any = [];
          val.item.map((o: any) => {
            for (let i = 0; i < val.filter.length; i++) {
              if (val.filter[i].value) {
                if (val.filter[i].value === o) {
                  arr1.push(val.filter[i]);
                }
              } else if (val.filter[i].BrokerId === o) {
                arr1.push(val.filter[i]);
              }
            }
            return null;
          });
          obj.item = arr1;
        } else {
          obj.item = val.item;
        }
        arr.push(obj);
      }
      return null;
    });
    return arr;
  }

  // 分解更多选项数据
  get morethanData() {
    const neetObj = ['more-radio', 'more-checkbox'];
    let arr = [];
    arr = this.form.filter((val: any) => neetObj.includes(val.type));
    return arr;
  }

  // 一级单选或多选
  get topLevelData() {
    const neetObj = ['checkbox', 'radio'];
    return this.form.filter((val: any) => neetObj.includes(val.type));
  }

  // 清除某一项
  clearItem(obj: any) {
    this.form.map((val: any) => {
      if (val.value === obj.value && val.item.length) {
        val.item = [];
      }
      return null;
    });
  }

  // 单选添加项
  changeItem(obj: any, item: any) {
    this.form.map((val: any) => {
      if (val.value === obj.value) val.item.splice(0, 1, item);
      return null;
    });
  }

  // input提交
  sylSub(obj: any, item: any) {
    const str1: any = obj.input[0] ? obj.input[0] : 0;
    const str2: any = obj.input[1] ? obj.input[1] : 0;
    let name = '';
    if (str1 === 0 && str2 !== 0) name = `<${str2}${obj.tip}`;
    if (str1 !== 0 && str2 === 0) name = `>${str1}${obj.tip}`;
    if (str1 !== 0 && str2 !== 0) name = `${str1 + obj.tip}-${str2}${obj.tip}`;

    this.form.map((val: any) => {
      if (val.value === obj.value) {
        val.item.splice(0, 1, { name, value: `${str1}-${str2}` });
        if (val.popState) {
          val.popState = false;
        }
      }
      return null;
    });
  }

  // 删除底部某个选项
  delBtoItem(obj: any, item: any) {
    this.form.map((val: any) => {
      if (obj.value === val.value) {
        val.item = val.item.filter((o: any) => {
          if (typeof o === 'string' || typeof o === 'number') {
            return item.BrokerId ? o !== item.BrokerId : o !== item.value;
          }
          return !isequal(o, item);
        });
      }
      return null;
    });
  }

  // 清空底部选项
  clearForm() {
    this.form.map((val: any) => {
      val.item = [];
      if (val.input) {
        val.input[0] = '';
        val.input[1] = '';
      }
      return null;
    });
  }

  mounted() {
    // 获取经济商列表
    setTimeout(() => {
      this.getBrokersList({});
    }, 1000);

    // 监听导航传参
    eventBus.$on('changeRankParams', (val: any) => {
      this.listenParams(val);
    });
  }

  // 监听导航传参
  listenParams(val: any) {
    if (val === 'clearFilterParams') {
      // 清楚全部参数
      this.setRankDomShow(true);
      this.form.map((v: any) => {
        v.item = [];
        return null;
      });
      return;
    }
    // alert(JSON.stringify(val))
    this.form.map((obj: any) => {
      Object.keys(val).forEach((v: any) => {
        if (v === obj.value && val[v]) {
          if (obj.type.indexOf('checkbox') > -1) {
            if (Array.isArray(val[v]) && val[v].length) {
              obj.item = val[v];
            }
            if (typeof val[v] === 'string' || typeof val[v] === 'number') {
              obj.item = [1];
            }
          }
          if (obj.type.indexOf('radio') > -1) {
            if (val[v]) {
              const item: any = {};
              let arr: any = [];
              arr = val[v].split('-');
              item.name = this.formartParams(val[v].split('-'), obj.tip);
              item.value = val[v];
              obj.item.splice(0, 1, item);
            }
          }
        }
      });
      return null;
    });
  }

  // 处理参数
  formartParams(arr: any, tip: any) {
    if (arr[0] == 0 && arr[1] != 0) return `小于${arr[1]}${tip}`;
    if (arr[0] != 0 && arr[1] == 0) return `大于${arr[0]}${tip}`;
    return `${arr[0]}-${arr[1]}${tip}`;
  }

  lang(path: string) {
    return this.$i18n.t(path) as string;
  }

  rightClick() {
    this.$emit('rightClick');
  }
}
</script>

<style lang="less">
@color: #ff6200;
.filter-container {
  width: 100%;
  background-color: #ffffff;
  padding: 10px 0;
  .filter-title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    .filter-title-left {
      display: flex;
      color: #333;
      > li {
        cursor: pointer;
        float: left;
        padding: 5px 0;
        font-size: 16px;
        margin: 0 20px;
        border-bottom: transparent 2px solid;
      }
      > li.select {
        border-bottom-color: @color;
      }
    }
    .filter-title-right {
      padding: 5px 10px;
      display: inline-flex;
      align-items: center;
      font-size: 14px;
      color: @color;
      border-radius: 30px;
      cursor: pointer;
    }
  }
  .filter-main {
    .filter-section {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      font-size: 14px;
      line-height: 24px;
      padding: 10px 20px;
      .filter-section-label {
        width: 90px;
        color: #999;
      }
      .filter-radio-item {
        display: flex;
        height: 24px;
        li {
          padding: 0 11px;
          position: relative;
          cursor: pointer;
          &:hover{
            color: @form-color;
          }
          &.sel {
            background-color: @form-color;
            color: #ffffff;
            border-radius: 30px;
          }
        }
      }
      .filter-section-item {
        flex: 1;
        position: relative;
        // display: flex;
        // align-items: flex-start;
        padding-right: 50px;
        padding-left: 80px;
        height: 24px;
        .filter-checkbox{
          margin-top: -10px;
          .el-checkbox{
            margin-top: 10px;
          }
        }

        &.more {
          overflow: hidden;
        }
        &.sel {
          height: auto;
          min-height: 25px;
        }
        .all-check {
          position: absolute;
          left: 0;
          width: 48px;
          color: #333;
          cursor: pointer;
          text-align: center;
          border-radius: 24px;
          &.sel {
            background-color: @form-color;
            color: #ffffff;
          }
        }
      }
      .filter-more-title {
        color: #333;
        padding-right: 15px;

        position: relative;
        cursor: pointer;
        &::after {
          content: "";
          position: absolute;
          top: 8px;
          right: 0;
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-top-color: #333;
        }
        &.sel {
          color: @form-color;

        }
      }
      .filter-section-more {
        width: 40px;
        position: absolute;
        right: 0;
        top: 0;
        // position: relative;
        cursor: pointer;
        &::after {
          content: "";
          position: absolute;
          width: 5px;
          height: 5px;
          right: 3px;
          top: 8px;
          border: 1px solid transparent;
          border-top-color: #999;
          border-right-color: #999;
          transform: rotate(135deg);
        }
        &.sel {
          color: @color;
        }
        &.sel::after {
          top: 10px;
          border-top-color: @color;
          border-right-color: @color;
          transform: rotate(-45deg);
        }
      }
    }
  }
}
.filter-more-item {
  display: flex;
  flex-wrap: wrap;
  width: 480px;
  li {
    margin-right: 10px;
    margin-bottom: 15px;
    line-height: 24px;
    padding: 0 10px;
    cursor: pointer;
    &:hover{
      color: @default-color;
    }
    &.sel {
      background-color: @default-color;
      color: #ffffff;
      border-radius: 20px;
    }
  }
}

.filter-radio-item-input {
  display: flex;
}
.filter-bottom {
  font-size: 14px;
  color: #333;
  padding: 0 20px 10px;
  display: flex;
  // flex-wrap: wrap;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      position: relative;
      padding: 4px 30px 4px 10px;
      border-radius: 4px;
      background-color: #f0f0f0;
      border: 1px solid transparent;
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      &:hover {
        border-color: @default-color;
        span {
          color: @default-color;
        }
      }
      span {
        position: absolute;
        font-size: 18px;
        width: 18px;
        height: 18px;
        line-height: 25px;
        right: 10px;
        top: 2px;
        text-align: center;
      }
      i {
        font-size: 20px;
        vertical-align: sub;
        color: @default-color;
      }
      &.clear-btolist {
        padding-right: 10px;
      }
    }
  }
}
</style>
<style>
.filter-container .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #606266 !important;
}
.filter-radio-item-input .el-input {
  width: 60px;
  height: 24px;
  position: relative;
  display: block;
}
.filter-radio-item-input .el-input__inner {
  position: absolute;
  top: 0;
  height: 24px;
  line-height: 24px;
  padding: 0 20px 0 5px;
  border-width: 1px;
  text-align: right;
}
.filter-radio-item-input .el-input__suffix {
}
.filter-radio-item-input .el-button {
  /* top: 2px; */
  margin: 0 0 0 10px;
  padding: 0 11px;
  height: 24px;
  background-color: #ff6200;
  border-color: #ff6200;
  color: #ffffff;
  font-size: 12px;
  font-weight: normal;
  border-radius: 20px;
}
.filter-radio-item-input .el-input__icon {
  line-height: 24px;
  font-style: normal;
}
/*
.el-input--mini .el-input__inner {
  position: absolute;
  top: 1px;
  height: 25px !important;
  line-height: 25px !important;
} */
</style>
