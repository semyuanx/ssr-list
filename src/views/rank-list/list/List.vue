<template>
  <div class="list-container">
    <div class="list-table">
      <el-table
        class="rank-table"
        :data="data"
        :row-class-name="getRowClassName"
        @sort-change="handleSortChange"
      >
        <el-table-column
          label="交易员"
          prop="Account"
          min-width="210px"
        >
          <template slot-scope="scope">
            <div
              v-if="!dateIsLoading"
              class="custom-display-row-line"
            >
              <div class="trader-container-row">
                <div class="loading-first avatar">
                  <img :src="base+'/Avata/'+scope.row.MT4Account.Account" />
                </div>
                <div class="loading-first trader-info">
                  <div class="info-1">{{scope.row.NickName}} #{{scope.row.MT4Account.BrokerID}}</div>
                  <div class="info-2">
                    {{scope.row.BrokerName || ''}}
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="dateIsLoading"
              class="custom-display-row-loading-1"
            >
              <div class="trader-container-row">
                <div class="loading-first loading-avatar">
                  <img :src="base+'/Avata/'+scope.row.MT4Account.Account" />
                </div>
                <div class="loading-first loading-info">
                  <div class="info-1"></div>
                  <div class="info-2"></div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="交易能力值"
          prop="Score"
          sortable
          min-width="116px"
        >
          <template slot-scope="scope">
            <div
              v-if="!dateIsLoading"
              class="custom-display-row-line"
            >{{scope.row.Score | numberFormatOneParams}}</div>
            <div
              v-if="dateIsLoading"
              class="custom-display-row-loading"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          label="收益率"
          prop="ROI"
          min-width="100px"
          sortable
        >
          <template slot-scope="scope">
            <div
              v-if="!dateIsLoading"
              :class="`custom-display-row-line `"
            >
              <span :class="scope.row.ROI >= 0 ? 'special-rate' : ''">{{scope.row.ROI | percentFormat}}</span>
            </div>
            <div
              v-if="dateIsLoading"
              class="custom-display-row-loading"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          label="最大回撤"
          prop="MaxRetracement"
          sortable
          min-width="100px"
        >
          <template slot-scope="scope">
            <div
              v-if="!dateIsLoading"
              class="custom-display-row-line"
            >{{scope.row.MaxRetracement | percentFormat}}</div>
            <div
              v-if="dateIsLoading"
              class="custom-display-row-loading"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          label="交易周期"
          prop="Weeks"
          sortable
          min-width="100px"
        >
          <template slot-scope="scope">
            <div
              v-if="!dateIsLoading"
              class="custom-display-row-line"
            >{{scope.row.Weeks || 0}}周</div>
            <div
              v-if="dateIsLoading"
              class="custom-display-row-loading"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          label="擅长品种"
          prop="ExpSymbol"
          sortable
          min-width="100px"
        >
          <template slot-scope="scope">
            <div
              v-if="!dateIsLoading"
              class="custom-display-row-line"
            >{{scope.row.ExpSymbol}}</div>
            <div
              v-if="dateIsLoading"
              class="custom-display-row-loading"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          label="订阅人数"
          prop="Subscribers"
          sortable
          min-width="100px"
        >
          <template slot-scope="scope">
            <div
              v-if="!dateIsLoading"
              class="custom-display-row-line"
            >{{scope.row.Subscribers}}</div>
            <div
              v-if="dateIsLoading"
              class="custom-display-row-loading"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          label="走势图"
          prop="TrendChart"
          align="center"
        >
          <template slot-scope="scope">
            <div
              v-if="!dateIsLoading"
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
            <div
              v-if="dateIsLoading"
              class="custom-display-row-loading"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          label="订阅"
          prop="Price"
          align="center"
        >
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <div
              @click="handleSub(scope.row)"
              v-if="!dateIsLoading"
              class="custom-display-row-sub"
            >
              <span class="sub-row-btn">{{scope.row.Price ? `$${scope.row.Price}/月` : '免费订阅' }}</span>
            </div>
            <div
              v-if="dateIsLoading"
              class="custom-display-row-loading"
            ></div>
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
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { loadAuth } from 'fmcomponents/src/utils';
import { getLoginStatus } from 'fmcomponents';
import FollowBox from 'fmcomponents/src/components/follow';

import Chart from '@/components/chart/index.vue';

import SvgIcon from '@/components/svg/index.ts';
import { numberFormat, percentFormat } from '@/utils/format';
import { Table, TableColumn } from 'element-ui';

const RankStore = namespace('RankStore');

@Component(({
  components: {
    SvgIcon,
    Chart,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  filters: {
    numberFormatOneParams: (val: number) => numberFormat(val, 1),
    percentFormat: (val: number) => percentFormat(val),
  },
} as any))
export default class List extends Vue {
  isLoading: boolean = false;

  @Prop({
    type: Array,
    default: () => [],
  })
  data: any;

  log(msg: any) {
    console.log(msg);
  }

  getRowClassName({ row, rowIndex }: any) {
    if (rowIndex % 2 === 0) {
      return 'default-row odd-row';
    }
    return 'default-row even-row';
  }

  public get dateIsLoading() {
    return this.isLoading;
  }

  mounted() {
    // setTimeout(() => this.isLoading = false, 5000);
  }

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

  handleSub(list: any) {
    // console.log('to subsribe', list);

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

  handleSortChange(e: any) {
    console.log(e);
  }
}
</script>
<style lang="less" scoped>
.list-container {
  .list-table {
    .rank-table {
      :global(.odd-row) {
        background: rgba(249, 249, 249, 1);
      }
      .even-row {
        background: rgba(255, 255, 255, 1);
      }
      :global(.default-row) {
        height: 80px;
        &:hover {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
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
          }
          .trader-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            text-align: left;
            padding-left: 4px;
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
          width: 100px;
          height: 30px;
          border-radius: 20px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 98, 0, 1);
          line-height: 30px;
          background: transparent;
          transition: all 0.3s ease-in;
          text-align: center;
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
