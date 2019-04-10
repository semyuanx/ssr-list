<template>
  <div class="list-container">
    <div class="list-table">

      <el-table
        ref="rankTable"
        class="rank-table"
        :data="dataList"
        :row-class-name="getRowClassName"
        :header-cell-class-name="getHeaderCellClassName"
        @sort-change="handleSortChange"
        current-row-key="UserID"
        :default-sort="sortTitleData"
      >
        <el-table-column
          :label="$t('trader')"
          prop="UserID"
          min-width="210px"
        >
          <template slot-scope="scope">
            <div
              v-if="dateIsLoading && !scope.row.UserID"
              class="custom-display-row-loading-1"
            >
              <div class="trader-container-row">
                <div class="loading-first loading-avatar">
                  <!-- <img :src="base+'/Avata/'+scope.row.UserID" /> -->
                </div>
                <div class="loading-first loading-info">
                  <div class="info-1"></div>
                  <div class="info-2"></div>
                </div>
              </div>
            </div>

            <div
              v-else
              class="custom-display-row-line"
            >
              <div class="trader-container-row">
                <div class="loading-first avatar">
                  <img
                    @click="toUserPage(scope.row)"
                    @mouseenter.self="showCard($event, scope.row)"
                    @mouseleave="hideCard"
                    onerror="this.src='//cdn.followme.com/images/default_avata.png'"
                    :src="base+'/Avata/'+scope.row.UserID + '?x-oss-process=image/resize,m_fill,h_50,w_50'"
                  />
                </div>
                <div class="loading-first trader-info">
                  <div
                    @click="toUserPage(scope.row)"
                    class="info-1"
                  >
                    <span
                      class="nick-name"
                      @mouseenter.self="showCard($event, scope.row)"
                      @mouseleave="hideCard"
                    >{{scope.row.NickName}}</span> #{{scope.row.AccountIndex}}
                  </div>
                  <div class="info-2">
                    <span
                      v-if="showOthers.includes('GradeScore')"
                      :class="'grade-score-icon ' + mapGradeClass(scope.row.GradeScore)"
                    >
                      {{scope.row.GradeScore | propFormat('GradeScore', null, $i18n)}}
                    </span>
                    <span
                      v-if="showOthers.includes('IsPTA') && scope.row.IsPTA"
                      class="pta-icon"
                    >
                      <PtaLogo />
                    </span>
                    <span
                      :title="scope.row.BrokerName"
                      class="broker-name"
                    >{{scope.row.BrokerName || ''}}</span>
                  </div>
                </div>
              </div>
            </div>

          </template>
        </el-table-column>

        <el-table-column
          :show-overflow-tooltip="true"
          :label="i.label"
          :prop="i.prop"
          sortable="custom"
          :min-width="i.label.length > 4 ? '100px':'100px'"
          :key="i.prop"
          :width="i.prop === 'MaxRetracement' || i.prop === 'DealAmount' ? '150px' : ''"
          v-for="i in showPropsList"
        >
          <template slot-scope="scope">
            <div
              v-if="dateIsLoading && !scope.row.UserID"
              class="custom-display-row-loading"
            ></div>
            <div
              v-else
              class="custom-display-row-line"
            ><span :class="{green: i.highlight && scope.row[i.prop] > 0}">{{scope.row[i.prop] | propFormat(i.prop, null, $i18n)}} {{i.suffix}}</span>
            </div>

          </template>
        </el-table-column>

        <el-table-column
          :label="$t('trend')"
          prop="TrendChart"
          key="TrendChart"
          align="center"
        >
          <template slot-scope="scope">
            <div
              v-if="dateIsLoading && !scope.row.UserID"
              class="custom-display-row-loading"
            ></div>
            <div
              v-else
              class="custom-display-row-line"
            >

              <div class="chartbox fm-show-pc">
                <Chart
                  v-if="scope.row.TrendChart && scope.row.TrendChart.length>0 "
                  :chart-data="scope.row.TrendChart"
                ></Chart>
                <img
                  v-else
                  :src="cdn + '/images/NoData-Report.jpg'"
                  style="display:block;width:100%;"
                  :alt="$t('noData')"
                >
              </div>

            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="SubPrice"
          key="SubPrice12"
          align="center"
          min-width="120px"
          v-if="showOthers.includes('SubPrice')"
        >
          <template
            slot="header"
          >
            <div class="custom-sort-icon">
              <span
                :class="{'on':tableShowType==='list'}"
                @click="setTableShowType('list')"
              ><SvgIcon
                width="18"
                height="16"
                name="table-btn"
              /></span>
              <span
                :class="{'on':tableShowType==='card'}"
                @click="setTableShowType('card')"
              ><SvgIcon
                width="18"
                height="16"
                name="list-btn"
              />
              </span>
            </div>
          </template>
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <div
              v-if="dateIsLoading && !scope.row.UserID"
              class="custom-display-row-loading"
            ></div>
            <div
              @click="handleSub(scope.row)"
              v-else
              class="custom-display-row-sub"
            >
              <span class="sub-row-btn">
                {{isSubed(scope.row) ? `${$t('editSubscribe')}` : scope.row.SubPrice ? `$${scope.row.SubPrice}/${$t('month')}` : `${$t('freeSubscribe')}` }}
              </span>
            </div>
          </template>
        </el-table-column>
        <template slot="empty">
          <div class="empty-table">
            <div class="empty-image">
              <SvgIcon
                width="218"
                height="218"
                name="no-data"
              />
            </div>
            <div class="empty-text"><span>{{$t('noData2')}}</span></div>
          </div>
        </template>
        <template slot="append">
          <!-- <div class="loading-container"> -->
          <div
            v-if="dateIsLoading && this.data && this.data.length"
            class="loading-container"
          >
            <div class="loading-lists">
              <div class="custom-display-row-loading-1">
                <div class="trader-container-row">
                  <div class="loading-first loading-avatar">
                  </div>
                  <div class="loading-first loading-info">
                    <div class="info-1"></div>
                    <div class="info-2"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="custom-display-row-loading"></div>
          </div>
        </template>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';

// import FollowBox from 'fmcomponents/src/components/follow';
import Chart from '@/components/chart/index.vue';

import SvgIcon from '@/components/svg/index.ts';
import {
  numberFormat,
  percentFormat,
  propFormat,
  gradeFormat,
  moneyFormat,
} from '@/utils/format';
import { getElementTop, getElementLeft } from '@/utils/util';
import { Table, TableColumn } from 'element-ui';
import throttle from 'lodash.throttle';
import PtaLogo from '@/components/ptaLogo/index.vue';

import zhCN from '@/i18n/zh-CN/views/rank-list/list/List';
import zhTW from '@/i18n/zh-TW/views/rank-list/list/List';
import enUS from '@/i18n/en-US/views/rank-list/list/List';
import zhHK from '@/i18n/zh-HK/views/rank-list/list/List';

const RankStore = namespace('RankStore');

const isEnterLoad = false;
@Component({
  components: {
    SvgIcon,
    PtaLogo,
    Chart, // () => import('@/components/chart/index.vue'),
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  filters: {
    numberFormatOneParams: (val: number) => numberFormat(val, 1),
    percentFormat: (val: number) => percentFormat(val),
    propFormat: (val: number, prop: string, _i18n: any) => {
      if (prop === 'GradeScore') {
        return gradeFormat(val);
      }
      if (prop === 'IsPTA') {
        return val ? `${_i18n.t('yes')}` : `${_i18n.t('no')}`;
      }
      if (prop === 'Equity') {
        return moneyFormat(val);
      }
      return propFormat(val, prop);
    },
  },
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
      'zh-HK': zhHK,
    },
  },
} as any)
export default class List extends Vue {
  isLoading: boolean = false;

  @RankStore.State
  rankListLoading: any;

  @Prop({
    type: Array,
    default: () => [],
  })
  data: any;

  @Prop({
    type: Array,
    default: () => [],
  })
  showProps: any;

  @Prop()
  sortTitleData:any;

  @RankStore.State
  tableShowType: any;

  @RankStore.Mutation
  setTableShowType: any;

  @Prop()
  showPropsList:any;
  // get showPropsList() {
  //   const noList = ["IsPTA", "GradeScore", "TrendLine", "SubPrice"];
  //   const showProps = this.showProps.filter(
  //     (i: any) => !noList.includes(i.prop)
  //   );
  //   return showProps;
  // }

  isSubed(info: any) {
    return this.followList.includes(`${info.UserID}_${info.AccountIndex}`);
  }

  mapGradeClass(val: any) {
    const grade = gradeFormat(val);
    const gradeMap: any = {
      S: 1,
      'A+': 2,
      A: 3,
      'A-': 4,
      B: 5,
      C: 6,
      D: 7,
    };
    return `grade-score-${gradeMap[grade]}`;
  }

  @Prop()
  getData: any;

  @Prop()
  showOthers:any;
  // get showOthers() {
  //   const noList = ["IsPTA", "GradeScore", "SubPrice"];
  //   const showProps = this.showProps
  //     .filter((i: any) => noList.includes(i.prop))
  //     .map((i: any) => i.prop);
  //   // console.log(showProps, 'ssss')
  //   return showProps;
  // }

  get dataList() {
    if (this.rankListLoading) {
      const data = this.data && this.data.length ? this.data : Array(10).fill({});
      return data;
    }
    return this.data;
  }

  // @Watch("showProps")
  // showPropsChanged() {
  //   this.$nextTick(() => {
  //     const { rankTable }: any = this.$refs;
  //     if (rankTable && rankTable.doLayout) {
  //       rankTable.doLayout();
  //     }
  //   });
  // }

  mounted() {
  }

  toUserPage(data: any) {
    // const { UserID, AccountIndex } = data;
    // this.redirectTo(
    //   "personalPage",
    //   { userId: UserID, index: AccountIndex },
    //   true
    // );
    this.$emit('toUserPage', data);
  }

  showCard(e: any, item: any) {
    this.$emit('showCard', e, item);
  }

  hideCard() {
    this.$emit('hideCard');
  }

  getRowClassName({ row, rowIndex }: any) {
    if (rowIndex % 2 === 0) {
      return 'default-row odd-row';
    }
    return 'default-row even-row';
  }

  getHeaderCellClassName({
    row, column, rowIndex, columnIndex,
  }: any) {
    if (columnIndex === 0) {
      return 'header-column';
    }
    return 'header-column-default';
  }

  public get dateIsLoading() {
    return this.rankListLoading;
  }

  winHeight: any = 800;

  @Prop({
    default: () => [],
  })
  followList: any;

  selfPwdChanged: any = [];

  handleSub(list1: any) {
    this.$emit('handleSub', list1);
  }

  handleSortChange({ prop, order }: any) {
    if (prop === this.sortTitleData.prop && order === this.sortTitleData.order) return;
    this.$emit('sortChange', { prop, order });
  }
}
</script>
<style lang="less" scoped>
.green {
  color: #1fbb95;
}

.list-container {
  .list-table {
    .rank-table {
      position: static;
      :global(.odd-row) {
        background: rgba(249, 249, 249, 1);
      }

      :global(.header-column) {
        :global(.cell) {
          padding-left: 20px;
          font-size: 12px;
          color: rgba(102, 102, 102, 1);
          font-weight: normal;
        }
      }

      :global(.header-column-default) {
        :global(.cell) {
          padding: 0;
          font-size: 12px;
          color: rgba(102, 102, 102, 1);
          font-weight: normal;
        }
      }

      .even-row {
        background: rgba(255, 255, 255, 1);
      }

      :global(.descending .sort-caret.descending) {
        border-top-color: #ff6200;
      }

      :global(.ascending .sort-caret.ascending) {
        border-bottom-color: #ff6200;
      }

      :global(.default-row) {
        height: 80px;

        :global(.cell) {
          padding-right: 0;
          padding-left: 0;
        }

        :global(td) {
          border: none;
          transition: none;
        }

        &:hover {
          background: rgba(255, 255, 255, 1) !important;
          // box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
          :global(td) {
            box-shadow: 20px 0px 24px 0 rgba(0, 0, 0, 0.05);
            background-color: #ffffff !important;
          }

          .custom-display-row-sub {
            .sub-row-btn {
              background: rgba(255, 98, 0, 1);
              color: #ffffff;

              &:hover {
                background-color: @hover-default-color;
              }
            }
          }
        }
      }

      :global(.el-table__empty-data) {
        height: auto;
      }

      .custom-display-row-line {
        // border: 1px solid red;
        font-size: 16px;
        font-family: DINOT-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;

        .trader-container-row {
          display: flex;
          flex-direction: row;

          .avatar {
            margin-left: 20px;
            width: 40px;
            height: 40px;
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;

            display: flex;
            align-items: center;
            justify-content: center;
          }

          .trader-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            text-align: left;
            padding-left: 10px;
            font-family: MicrosoftYaHei;

            .info-1 {
              cursor: pointer;
              font-size: 14px;
              color: rgba(51, 51, 51, 1);
              line-height: 19px;

              &:hover {
                .nick-name {
                  color: @default-color;
                }
              }
            }

            .info-2 {
              font-size: 12px;
              color: rgba(153, 153, 153, 1);
              flex: 1;
              display: flex;
              align-items: flex-end;
              padding-bottom: 2px;

              .broker-name {
                max-width: 116px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              > span {
                font-size: 12px;
                color: rgba(153, 153, 153, 1);
                line-height: 16px;
              }

              .pta-icon {
                img {
                  vertical-align: bottom;
                }

                margin-right: 5px;
              }

              .grade-score-icon {
                width: 20px;
                height: 14px;
                font-size: 12px;
                font-family: DINOT-Bold;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                line-height: 15px;
                border-radius: 6px 2px 6px 2px;
                text-align: center;
                margin-right: 5px;
              }

              .grade-score-1 {
                color: #ffdea1;
                background: linear-gradient(to bottom, #8a8d91, #272829);
              }

              .grade-score-2 {
                background: linear-gradient(to bottom, #f2d6a2, #bfa36f);
              }

              .grade-score-3 {
                background: linear-gradient(to bottom, #f2d6a2, #bfa36f);
              }

              .grade-score-4 {
                background: linear-gradient(to bottom, #f2d6a2, #bfa36f);
              }

              .grade-score-5 {
                background: linear-gradient(to bottom, #dadce0, #a3a5a8);
              }

              // c
              .grade-score-6 {
                background: linear-gradient(to bottom, #e2e2e2, #c5c7ca);
              }

              .grade-score-7 {
                background: linear-gradient(to bottom, #e2e2e2, #c5c7ca);
              }
            }
          }
        }
      }

      .custom-display-row-sub {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(255, 98, 0, 1);

        .sub-row-btn {
          display: inline-block;
          cursor: pointer;
          min-width: 80px;
          border-radius: 20px;
          font-size: 14px;
          font-family: "PingFangSC-Regular";
          color: @default-color;
          line-height: 30px;
          background: transparent;
          transition: all 0.3s ease-in;
          padding: 0 5px;
          text-align: center;
          overflow: hidden;
          z-index: 10;
          border: 1px solid @default-color;
          font-weight: normal;
        }
      }
      .custom-sort-icon {
        height: 25px;
        font-size: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          cursor: pointer;
          display: inline-block;
          width: 30px;
          &.on {
            color: @default-color;
          }

        }
      }

      .custom-display-row-loading {
        height: 14px;
        background: rgba(230, 230, 230, 1);
        animation: animations-loading 2s ease-in-out 0.1s infinite forwards;
      }

      .custom-display-row-loading-1 {
        animation: animations-loading 2s ease-in-out 0.1s infinite forwards;
        display: flex;
        flex-direction: row;

        .trader-container-row {
          display: flex;
          flex-direction: row;
          margin-left: 20px;

          .loading-avatar {
            width: 40px;
            height: 40px;
            background: rgba(230, 230, 230, 1);
            border-radius: 20px;
          }

          .loading-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 4px;

            .info-1 {
              width: 70px;
              height: 10px;
              background: rgba(230, 230, 230, 1);
            }

            .info-2 {
              width: 70px;
              height: 6px;
              background: rgba(230, 230, 230, 1);
            }
          }
        }
      }

      .special-rate {
        color: rgba(31, 187, 149, 1);
      }

      .empty-table {
        display: flex;
        padding: 40px 0;
        flex-direction: column;
        justify-content: center;

        .empty-text {
          font-size: 18px;
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
        }
      }
    }

    .loading-container {
      height: 80px;
      display: flex;
      flex-direction: row;
      align-items: center;

      .loading-lists {
        width: 210px;

        .custom-display-row-loading-1 {
          animation: animations-loading 2s ease-in-out 0.1s infinite forwards;
          display: flex;
          flex-direction: row;

          .trader-container-row {
            display: flex;
            flex-direction: row;
            margin-left: 20px;

            .loading-avatar {
              width: 40px;
              height: 40px;
              background: rgba(230, 230, 230, 1);
              border-radius: 20px;
            }

            .loading-info {
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-left: 4px;

              .info-1 {
                width: 70px;
                height: 6px;
                background: rgba(230, 230, 230, 1);
                margin-bottom: 2px;
              }

              .info-2 {
                width: 70px;
                height: 6px;
                margin-top: 2px;
                background: rgba(230, 230, 230, 1);
              }
            }
          }
        }
      }

      .custom-display-row-loading {
        flex: 1;
      }
    }
  }
}

@keyframes animations-loading {
  0% {
    opacity: 0.1;
  }
  10% {
    opacity: 0.2;
  }
  20% {
    opacity: 0.4;
  }
  30% {
    opacity: 0.6;
  }
  40% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  60% {
    opacity: 0.8;
  }
  70% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.4;
  }
  90% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.1;
  }
}
</style>

<style>
.rank-table.el-table th{
  padding: 8px 0 !important;
}
</style>
