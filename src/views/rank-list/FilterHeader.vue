<template>
  <div>
    <div class="filter-header fm-show-pc">
      <div class="header-content">
        <div class="header-fitler-title"><span v-if="filterTag.length">{{$t('filterCondition')}}</span></div>
        <div class="header-tag-lists">
          <div
            :key="index"
            v-for="(params,index) in filterTag"
            class="header-tag-item"
          >
            <FmTag
              :msg="params.label"
              :desc="params.val"
            />
          </div>
          <!-- <div class="header-tag-item">
            <FmTag
              type="2"
              msg="PTA"
              desc="会员"
            />
          </div> -->
        </div>
        <div class="header-filter">
          <div
            @click="emitFilter"
            class="filter-content"
          >
            <i class="icon-filtrate_24px"></i><span>{{$t('filter')}}</span>
          </div>
          <div class="filter-pop-container">
          <div
            class="filter-pop"
            v-clickoutside="handleOutsideClick">
            <transition name="filter-fade">
              <filter-popover
                ref="filterPopover"
                @close="closeFilter"
                :show="isShow"
                @filter="handleFilter"
                @reset="handleReset"
                :checked="checked"
                @resetChecked="resetChecked"
              >

                <template slot="brokerId">
                  <filter-tag
                    :border="true"
                    :closed="true"
                    v-for="item in checkedBrokersAll"
                    class="has-close-tag"
                    @close="handleCloseTag(item)"
                    :key="item"
                  >{{brokersList.find(v=>v.BrokerId === item) && brokersList.find(v=>v.BrokerId === item).BrokerName}}</filter-tag>
                  <button
                    class="add-button"
                    @click="addBorker=!addBorker"
                  ><i class="fm-fonticon icon-plus_24px"></i>{{$t('add')}}</button>
                  <check-box-group
                    v-model="checked"
                    v-clickoutside="handleBrokerOutsideClick"
                    class="borkersDialog"
                    v-show="addBorker && isShow"
                  >
                    <ul>
                      <li
                        v-for="(item,index) in brokersList"
                        :key="index"
                      >
                        <check-box :val="item.BrokerId">{{item.BrokerName}}</check-box>
                      </li>
                    </ul>
                  </check-box-group>
                </template>
              </filter-popover>
            </transition>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fm-show-mobile">
      <mobile-filter-header />
    </div>

  </div>
</template>
<script lang="ts">
import {
  Component, Vue, Watch, Emit,
} from 'vue-property-decorator';

import zhCN from '@/i18n/zh-CN/views/rank-list/FilterHeader';
import zhTW from '@/i18n/zh-TW/views/rank-list/FilterHeader';
import enUS from '@/i18n/en-US/views/rank-list/FilterHeader';
import zhHK from '@/i18n/zh-HK/views/rank-list/FilterHeader';

import { namespace } from 'vuex-class';
import FmTag from '@/components/tag/tag.vue'; // @ is an alias to /src
import FilterPopover from '@/components/filter-popover/FilterPopover.vue';
import FilterTag from '@/components/filter-popover/FilterTag.vue';
import CheckBoxGroup from '@/components/check-box/CheckBoxGroup.vue';
import CheckBox from '@/components/check-box/CheckBox.vue';
import MobileFilterHeader from '@/components/mobile-filter/FilterHeader.vue';
import propMaps from '@/constant/propMap';
import { gradeFormat, percentFormat } from '@/utils/format';
import Clickoutside from 'element-ui/src/utils/clickoutside';

const RankStore = namespace('RankStore');

// const HomeStore = namespace('HomeStore');

@Component({
  name: 'fm-filter-header',
  components: {
    FmTag,
    FilterPopover,
    FilterTag,
    CheckBoxGroup,
    CheckBox,
    MobileFilterHeader,
  },
  directives: {
    Clickoutside,
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
export default class FilterHeader extends Vue {
  private params: object = {};

  isShow: boolean = false;

  addBorker: boolean = false;

  private checked: any = [];

  @RankStore.State
  brokersList: any;

  @RankStore.Action
  getBrokersList: any;

  @RankStore.State
  rankParams: any;

  @RankStore.Mutation
  setRankParams: any;

  @RankStore.State
  checkedBrokers: any;

  @RankStore.Mutation
  setCheckedBrokers: any;

  @RankStore.State
  filterRes: any;

  get checkedBrokersAll() {
    const brokers: any = [];
    this.checked.forEach((i: any) => {
      if (!brokers.includes(i)) {
        brokers.push(i);
      }
    });
    return brokers;
  }

  handleOutsideClick(e: any) {
    const { isShow } = this;
    if (isShow) {
      this.isShow = false;
    }
  }

  handleBrokerOutsideClick(e: any) {
    const { addBorker } = this;
    if (addBorker) {
      this.addBorker = false;
    }
  }

  textMaps: any = {
    Score: this.lang('score'),
    Equity: this.lang('equity'),
    Weeks: this.lang('weeks'),
    Retracement: this.lang('retracement'),
    MaxRetracement: this.lang('maxRetracement'),
    Roi: this.lang('roi'),
    isDESC: this.lang('isDESC'),
    orderby: this.lang('orderby'),
    isPTA: this.lang('isPTA'),
    freeSubPrice: this.lang('freeSubPrice'),
    GradeScore: this.lang('gradeScore'),
    Subscribers: this.lang('subscribers'),
  };

  public lang(path: string) {
    return this.$i18n.t(path) as string;
  }

  get filterTag() {
    const { rankParams: rankAlias } = this;
    const rankParams = { ...rankAlias };
    const tags: any = [];
    // this.log(rankParams, 'innerParams')
    const needProcess = ['Subscribers', 'Equity', 'Weeks', 'Retracement', 'MaxRetracement', 'Roi'];
    if (rankParams.SubCount) {
      rankParams.Subscribers = rankParams.SubCount;
      rankParams.SubCount = '';
    }
    const needProcessMap: any = {
      Subscribers:
      {
        suffix: this.$i18n.t('people') as string,
      },
      Equity: {
        suffix: '',
      },
      Weeks: {
        suffix: this.$i18n.t('week') as string,
      },
      Retracement: {
        suffix: '',
        percent: true,
      },
      MaxRetracement: {
        suffix: '',
        percent: true,
      },
      Roi: {
        suffix: '',
        percent: true,
      },
      Score: {
        suffix: '',
        percent: false,
      },
    };

    if (rankParams) {
      Object.keys(rankParams).forEach((i: any) => {
        const val: any = rankParams[i];
        if (typeof val !== 'undefined' && val !== null) {
          // eslint-disable-next-line
          let finalVal = i === 'isDESC' ? val === 1 ? `${this.$i18n.t('orderbyDesc')}` : `${this.$i18n.t('orderbyAsc')}` : val;
          let currentProp = this.textMaps[i];
          if (i === 'isPTA') {
            finalVal = val === 1 ? currentProp : '';
            currentProp = '';
          }
          if (i === 'freeSubPrice') {
            finalVal = val === 1 ? currentProp : '';
            currentProp = '';
          }
          if (i === 'GradeScore') {
            // const gradeMaps = val.split('-');
            const gradeMap: any = {
              '9-0': 'S',
              '8-9': 'A+',
              '7-8': 'A',
              '6-7': 'A-',
              '5-6': 'B',
              '4-5': 'C',
              '0-4': 'D',
              '0-0': '≥D',
              '4-0': '≥C',
              '5-0': '≥B',
              '6-0': '≥A-',
              '7-0': '≥A',
              '8-0': '≥A+',
            };
            finalVal = gradeMap[val] || '';
          }
          const needIgnore = ['orderby', 'isDESC', 'brokerId', 'ExpSymbol', 'BrokerID', 'Score'];

          this.log(needProcess.includes(i), finalVal, 'kkkkkkkkkkkkkkk');
          if (needProcess.includes(i) && finalVal) {
            const valArr = finalVal.split('-');
            if (valArr && valArr.length && needProcessMap[i]) {
              // this.log(i, valArr[0], valArr[1], 'jjjjjjjjjjjj', needProcessMap[i].percent)
              this.log(valArr[0] && ![0, '0'].includes(valArr[0]), [0, '0'].includes(valArr[1]), i, '************');
              if (needProcessMap[i].percent) {
                if (valArr[0] && ![0, '0'].includes(valArr[0])) {
                  valArr[0] = percentFormat(valArr[0] / 100);
                  this.log(valArr[0]);
                }
                if (valArr[1] && ![0, '0'].includes(valArr[1])) {
                  valArr[1] = percentFormat(valArr[1] / 100);
                }
              }
              if (!valArr[0] || [0, '0'].includes(valArr[0])) {
                finalVal = `<${valArr[1]}${needProcessMap[i].suffix}`;
              } else
              if (!valArr[1] || [0, '0'].includes(valArr[1])) {
                finalVal = `>${valArr[0]}${needProcessMap[i].suffix}`;
              } else if (needProcessMap[i].percent) {
                finalVal = `${valArr[0]}-${valArr[1]}${needProcessMap[i].suffix}`;
              } else {
                finalVal += needProcessMap[i].suffix;
              }
            }
          }

          if (finalVal && !needIgnore.includes(i)) {
            tags.push({
              label: currentProp,
              val: finalVal,
            });
          }
        }
      });
    }

    const brokerNames: any = [];
    this.brokersList.forEach((item: any) => {
      if (this.checkedBrokers.includes(item.BrokerId) || this.checkedBrokers.includes(+item.BrokerId)) {
        brokerNames.push(item.BrokerName);
      }
    });
    if (brokerNames.length) {
      tags.push({
        label: `${this.$i18n.t('broker')}`,
        val: brokerNames.join('/'),
      });
    }
    return tags;
  }

  showFilter() {
    if (!this.isShow) {
      this.isShow = true;
    }
  }

  closeFilter() {
    this.isShow = false;
  }

  emitFilter() {
    this.isShow = !this.isShow;
    this.addBorker = false;
    this.$emit('filter-click');
  }

  @Emit('filter')
  handleFilter(value: object) {
    this.isShow = false;
    const { checked } = this;
    this.setCheckedBrokers(checked);
  }

  resetChecked() {
    this.checked = [];
  }

  handleReset(value: object) {
    this.setCheckedBrokers([]);
    this.checked = [];
  }

  handleCloseTag(item: string) {
    const checked = this.checkedBrokers.filter((v: any) => v !== item);
    const thisChecked = this.checked.filter((v: any) => v !== item);
    this.checked = thisChecked;
  }

  setChecked(brokerLists: any) {
    this.checked = brokerLists;
  }

  // @Watch('checked', { deep: true })
  // sync(val: any) {
  //   this.setCheckedBrokers(val);
  // }

  mounted() {
    // this.checked = this.checkedBrokers;
    setTimeout(() => {
      this.getBrokersList({});
    }, 1000);
    // this.initParams();
  }

  initParams() {
    const { rankParams } = this;
    // this.log('rankParams', rankParams, this.checkedBrokers,'***************************')
    let brokerId: any = [];
    if (rankParams && Array.isArray(rankParams.brokerId) && rankParams.brokerId.length) {
      brokerId = rankParams.brokerId;
    }
    if (this.checkedBrokers && Array.isArray(this.checkedBrokers) && this.checkedBrokers.length) {
      this.checkedBrokers.forEach((i: any) => {
        if (!brokerId.includes(i)) {
          brokerId.push(i);
        }
      });
    }
    this.setChecked(brokerId);
  }

  @Watch('isShow')
  changedShow(v: any) {
    if (v) {
      this.initParams();
    }
  }
}
</script>
<style lang="less" scoped>
.add-button {
  outline: none;
  border: none;
  background-color: transparent;
  height: 24px;
  line-height: 24px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
}
.filter-header {
  padding: 20px 0;

  .header-content {
    display: flex;
    flex-direction: row;
    // align-items: center;
    // flex-wrap: wrap;
    .header-fitler-title {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
      line-height: 19px;
      min-width: 76px;
    }
    .header-tag-lists {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      flex: 1;
      .header-tag-item {
        margin-right: 10px;
        margin-bottom: 10px;
        display: flex;
      }
    }
    .header-filter {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
      line-height: 19px;
      cursor: pointer;
      position: relative;
      flex-direction: column;
      justify-content: center;

      .filter-content {
        position: relative;
        &:hover {
          color: @default-color;
        }
        > i {
          vertical-align: middle;
        }
      }
      .filter-pop-container {
        position: absolute;
        width: 100%;
        height: 1px;
        // background: red;
        bottom: 0;
        .filter-pop {
          position: absolute;
          top: 8px;
          right: 0;
          z-index: 10;
        }
      }
    }
  }
}
</style>


<style lang="less" scoped>
.borkersDialog {
  position: absolute;
  max-width: 640px;
  max-height: 130px;
  overflow: auto;
  left: 0;
  bottom: 100%;
  z-index: 1000;
  padding: 20px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  border: 1px solid rgba(230, 230, 230, 1);
  overflow-x: hidden;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      overflow: hidden;
      width: 25%;
      margin-right: 20px;
    }
  }
}
.has-close-tag {
  margin-right: 10px;
}
.tag-container:first-child + .has-close-tag {
  margin-left: 10px;
}

.filter-fade-enter-active, .filter-fade-leave-active {
  transition: opacity .5s;
}
.filter-fade-enter, .filter-fade-leave-to {
  opacity: 0;
}
</style>
