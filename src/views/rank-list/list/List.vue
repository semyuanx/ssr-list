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
      >
        <el-table-column
          label="交易员"
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
                  @mouseenter.self="showCard($event, scope.row.UserID)"
                  @mouseleave="personCard.hide()"
                  :src="base+'/Avata/'+scope.row.UserID" />
                </div>
                <div class="loading-first trader-info">
                  <div
                  @click="toUserPage(scope.row)"
                  class="info-1">
                  <span
                    class="nick-name"
                    @mouseenter.self="showCard($event, scope.row.UserID)"
                    @mouseleave="personCard.hide()">{{scope.row.NickName}}</span> #{{scope.row.AccountIndex}}</div>
                  <div class="info-2">
                    <span>{{scope.row.BrokerName || ''}}</span>
                  </div>
                </div>
              </div>
            </div>

          </template>
        </el-table-column>

        <el-table-column
          show-overflow-tooltip="true"
          :label="i.label"
          :prop="i.prop"
          sortable="custom"
          :min-width="i.label.length > 4 ? '120px':'100px'"
          :key="i.prop"
          v-for="i in showProps"
        >
          <template slot-scope="scope">
            <div
              v-if="dateIsLoading && !scope.row.UserID"
              class="custom-display-row-loading"
            ></div>
            <div
              v-else
              class="custom-display-row-line"
            ><span :class="{green: i.highlight && scope.row[i.prop] > 0}">{{scope.row[i.prop] | propFormat(i.prop)}} {{i.suffix}}</span></div>

          </template>
        </el-table-column>

        <el-table-column
          label="走势图"
          prop="TrendChart"
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

              <div class="chartbox">
                <Chart
                  v-if="scope.row.TrendChart && scope.row.TrendChart.length>0 "
                  :chart-data="scope.row.TrendChart"
                ></Chart>
                <img
                  v-else
                  :src="cdn + '/images/NoData-Report.jpg'"
                  style="display:block;width:100%;"
                  :alt="'暂无数据'"
                >
              </div>

            </div>

          </template>
        </el-table-column>
        <el-table-column
          label="订阅"
          prop="SubPrice"
          align="center"
        >
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
              <span class="sub-row-btn">{{scope.row.SubPrice ? `$${scope.row.SubPrice}/月` : '免费订阅' }}</span>
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
            <div class="empty-text"><span>没有找到相关内容，请您换个条件试试吧~</span></div>
          </div>
        </template>
        <template slot="append">
          <!-- <div class="loading-container"> -->
          <div v-if="dateIsLoading && this.data && this.data.length" class="loading-container">
            <div class="loading-lists">
              <div
                class="custom-display-row-loading-1"
              >
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
             <div
              class="custom-display-row-loading"
            ></div>
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

import { loadAuth } from 'fmcomponents/src/utils';
import { getLoginStatus } from 'fmcomponents';
import FollowBox from 'fmcomponents/src/components/follow';
import personCard from 'fmcomponents/src/components/personcard';
import Chart from '@/components/chart/index.vue';

import SvgIcon from '@/components/svg/index.ts';
import {
  numberFormat, percentFormat, propFormat, gradeFormat,
} from '@/utils/format';
import { getElementTop, getElementLeft } from '@/utils/util';
import { Table, TableColumn } from 'element-ui';
import throttle from 'lodash.throttle';

const RankStore = namespace('RankStore');

const isEnterLoad = false;

@Component(({
  components: {
    SvgIcon,
    Chart, // () => import('@/components/chart/index.vue'),
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  filters: {
    numberFormatOneParams: (val: number) => numberFormat(val, 1),
    percentFormat: (val: number) => percentFormat(val),
    propFormat: (val: number, prop: string) => {
      if (prop === 'GradeScore') {
        return gradeFormat(val);
      } if (prop === 'IsPTA') {
        return val ? '是' : '否';
      }
      return propFormat(val, prop);
    },
  },
} as any))
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

  data1: any = [];

  @Prop()
  getData: any;

  personCard: any = personCard;

  get dataList() {
    if (this.rankListLoading) {
      const data = this.data && this.data.length ? this.data : Array(10).fill({});
      return data;
    }
    return this.data;
  }

  @Watch('showProps')
  showPropsChanged() {
    this.$nextTick(() => {
      const { rankTable }: any = this.$refs;
      if (rankTable && rankTable.doLayout) {
        rankTable.doLayout();
      }
    });
  }

  mounted() {

  }

  toUserPage(data: any) {
    const { UserID, AccountIndex } = data;
    this.redirectTo('personalPage', { userId: UserID, index: AccountIndex }, true);
  }

  showCard(e: any, ids: any) {
    // eslint-disable-next-line
    const _this = this;
    const top = getElementTop(e.target);
    const left = getElementLeft(e.target);
    personCard.show({
      id: ids,
      position: {
        top: top || e.target.offsetTop,
        left: left || e.target.offsetLeft,
        height: e.target.offsetHeight,
      },
      callback(val: any) {
        return new Promise((res) => {
          if (res) {
            console.log('res:', val);
            if (val.code === 'SUCCESS' || val.code === 0) {
              _this.getFollowAndAttention();
            } else {
              // 失败
            }
          }
        });
      },
    });
  }

  log(msg: any) {
    console.log(msg);
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
    return '';
  }

  public get dateIsLoading() {
    return this.rankListLoading;
  }

  winHeight: any = 800;

  @RankStore.Action
  getRelations: any;

  @RankStore.Action
  addOrCancelAttention: any;

  @RankStore.Action
  checkCanFollow: any;

  attentionList: any = [];

  followList: any = [];

  selfPwdChanged: any = [];

  regetSub() {
    this.getRelations()
      .then((res: any) => {
        this.followList = res.follows;
        this.attentionList = res.attentions;
      })
      .catch((err: any) => {
        console.log('获取登录用户的跟随列表和关注列表失败', err);
      });
  }

  checkIfNotice(list: any) {
    const params = {
      toUserId: list.UserID,
    };
    if (list && Array.isArray(this.attentionList)) {
      const isAttendion = this.attentionList.find(i => i === list.UserID);
      if (!isAttendion) {
        this.addOrCancelAttention(params)
          .then((res: any) => {
            this.regetSub();
          })
          .catch((err: any) => {
            this.regetSub();
          });
      }
    }
  }

  showFollowCard(_this: any, list: any) {
    FollowBox.show(
      {
        traderid: list.UserID,
        tradername: list.NickName,
        traderindex: list.AccountIndex,
        brokerid: list.BrokerID,
      },
      (result: any) => {
        console.log(result);
        if (result.code === 'SUCCESS' || result.code === 0) {
          _this.getFollowAndAttention();
        } else {
          //
        }
      },
    );
  }

  // 获取登录用户的跟随列表和关注列表
  getFollowAndAttention() {
    getLoginStatus().then((user: any) => {
      if (user.islogin) {
        this.getRelations()
          .then((res: any) => {
            this.followList = res.follows;
            this.attentionList = res.attentions;
          })
          .catch((err: any) => {
            console.log('获取登录用户的跟随列表和关注列表失败', err);
          });
      }
    });
  }

  checkTraderCanFollow(trader: any) {
    return this.checkCanFollow({
      userId: trader.UserID,
      accountIndex: trader.AccountIndex,
    }).then((res: any) => res && res.isFollow);
  }

  handleSub(list1: any) {
    // console.log('to subsribe', list);
    const list: any = list1;
    if (!list.BrokerID) {
      list.BrokerID = list.MT4Account && list.MT4Account.BrokerID;
    }
    if (!list.Account) {
      list.Account = list.MT4Account && list.MT4Account.Account;
    }
    const uaindex = `${list.UserID}_${list.AccountIndex}`;
    if (this.selfPwdChanged.indexOf(uaindex) > -1) return;
    getLoginStatus()
      .then((user: any) => {
        if (user.islogin) {
          // follow
          this.checkIfNotice(list);
          return this.checkTraderCanFollow(list).then((tres: any) => {
            if (tres) {
              this.showFollowCard(this, list);
              return true;
            }
            if (this.selfPwdChanged.indexOf(uaindex) === -1) {
              this.selfPwdChanged.push(uaindex);
            }
            this.$fmdialog({
              type: 'failure',
              showClose: true,
              message:
                '当前交易员最近有修改密码行为导致交易信号中断，已经被限制跟随',
              duration: 3000,
              confirmBtnText: '确定',
              onConfirm: () => {},
            });
            return true;
          });
        }
        loadAuth();
        return true;
      })
      .catch((err: any) => {
        this.$fmdialog({
          type: 'failure',
          showClose: true,
          message: '网络请求失败， 请重试!',
          duration: 4000,
          confirmBtnText: '确定',
        });
      });
  }

  handleSortChange({ prop, order }: any) {
    console.log({ prop, order });
    // const order: any = {};
    this.$emit('sortChange', { prop, order });
  }
}
</script>
<style lang="less" scoped>

.green {
  color: #1FBB95;
}

.list-container {
  .list-table {
    .rank-table {
      :global(.odd-row) {
        background: rgba(249, 249, 249, 1);
      }
      :global(.header-column) {
        :global(.cell) {
          padding-left: 20px;
        }
      }
      .even-row {
        background: rgba(255, 255, 255, 1);
      }
      :global(.descending .sort-caret.descending) {
        border-top-color: #FF6200;
      }
      :global(.ascending .sort-caret.ascending) {
        border-bottom-color: #FF6200;
      }
      :global(.default-row) {
        height: 80px;
        :global(.cell) {
          padding-right: 0;
          padding-left: 0;
        }
        :global(td) {
          border: none;
        }

        &:hover {
          background: rgba(255, 255, 255, 1) !important;
          box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
          :global(td) {
            background-color: #ffffff !important;
          }
          .custom-display-row-sub {
            .sub-row-btn {
              background: rgba(255, 98, 0, 1);
              color: #ffffff;
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
            font-family:MicrosoftYaHei;
            .info-1 {
              cursor: pointer;
              font-size:14px;
              color:rgba(51,51,51,1);
              line-height:19px;
              &:hover {
                .nick-name {
                  color: @default-color;
                }
              }
            }
            .info-2 {
              font-size:12px;
              color:rgba(153,153,153,1);
              flex: 1;
              display: flex;
              align-items: flex-end;
              padding-bottom: 2px;
              >span {
                font-size:12px;
                color:rgba(153,153,153,1);
                line-height:16px;
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
          width: 80px;
          height: 30px;
          border-radius: 20px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 98, 0, 1);
          line-height: 30px;
          background: transparent;
          transition: all 0.3s ease-in;
          text-align: center;
          overflow: hidden;
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
        padding: 100px 0;
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
