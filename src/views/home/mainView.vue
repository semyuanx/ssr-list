<template>
    <div class="main-view-container">
        <div v-if="strategytData" class="strategy">
            <FmStrategy
              :subscribe="handleSub" :data="strategytData" :header="strategytDataHeader" />
        </div>
        <div class="list-invest">
            <InvestManager ref="investManager" :subscribe="toInvest" :data="products" />
        </div>
        <div class="list-item" v-for="(item,index) in investData" :key="index">
            <CommonListItem
              @hideCard="hideCard"
              @showCard="showCard"
              :subscribe="handleSub" :data="item" />
        </div>
        <div class="invest">
            <TradeMaster
              @hideCard="hideCard"
              @showCard="showCard"
              :subscribe="toPersonal"
              :data="masterFollowerData"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace, Action } from 'vuex-class';
import { getElementTop, getElementLeft } from '@/utils/util';

import mapKey from '@/constant/propMap';

import { loadAuth } from 'fmcomponents/src/utils';
import { getLoginStatus } from 'fmcomponents';
import FollowBox from 'fmcomponents/src/components/follow';
import personCard from 'fmcomponents/src/components/personcard';
import {
  percentFormat, propFormat, moneyFormat, gradeFormat,
} from '@/utils/format';

const HomeStore = namespace('HomeStore');

const RankStore = namespace('RankStore');

@Component({
  components: {
    FmStrategy: () => import('@/views/home/Strategy.vue'),
    CommonListItem: () => import('@/views/home/CommonListItem.vue'),
    InvestManager: () => import('@/views/home/InvestManager.vue'),
    TradeMaster: () => import('@/views/home/TradeMaster.vue'),
  },
})
export default class mainView extends Vue {
  @HomeStore.State
  configs: any;

  @HomeStore.State
  progressProducts: any;

  @HomeStore.State
  masterFollower: any;

  @RankStore.Action
  getRelations: any;


  get products() {
    const data = this.progressProducts.map((i: any) => i);
    return {
      data,
    };
  }

  get masterFollowerData() {
    const data = this.masterFollower.map((i: any) => i);
    return {
      data,
    };
  }

  hideCard($event: any) {
    personCard.hide();
  }

  showStrategyCard() {

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

  /**
   * {
   *  avatar: url,
   *  name: string,
   *  index: accountIndex,
   *  brokername: string,
   *  list: [
   *      {
   *          prop: '收益率',
   *          val: 34.99%
   *      }
   *  ]
   * }
   */
  public get strategytData() {
    if (this.configs && this.configs.length) {
      const config:any = this.configs[0];

      let showData: any = [];
      if (config && config.HideConfig) {
        Object.keys(config.HideConfig).forEach((i: any) => {
          if (!config.HideConfig[i]) {
            showData.push(i);
          }
        });
      }
      // mam显示
      let mamData: any = [];
      // if (config && config.ManualCfg && !config.ManualCfg.IsAddMAM) {
      if (config && config.ManualCfg && config.ManualCfg.IsAddMAM) {
        const { progressProducts } = this;
        if (progressProducts.length) {
          mamData = progressProducts.map((item: any) => {
            let propData = {};
            if (item.Status === 'Pending') {
              const expectProfile = item.ExpectTraderProfit + item.ExpectFollowerProfit * item.ExpectFollowerCount;
              const expectRoi = item.ExpectROI;
              propData = [
                {
                // hightlight: needHightProp.includes(it) && ival > 0,
                  prop: '预期收益',
                  val: moneyFormat(expectProfile), // propFormat(ival, it),
                },
                {
                  hightlight: expectRoi && expectRoi > 0,
                  prop: '预期收益率',
                  val: percentFormat(expectRoi), // propFormat(ival, it),
                },
              ];
            } else {
              const currentProfit = item.Profit;
              const expectRoi = item.ROI;
              propData = [
                {
                // hightlight: needHightProp.includes(it) && ival > 0,
                  prop: '当前产品收益',
                  val: moneyFormat(currentProfit), // propFormat(ival, it),
                },
                {
                  hightlight: item.ROI && item.ROI > 0,
                  prop: '当前收益率',
                  val: propFormat(expectRoi, 'ROI'), // propFormat(ival, it),
                },
              ];
            }
            return {
              mam: true,
              name: item.Name,
              danger: `风险<${percentFormat(item.FollowerMaxRisk)}`,
              confirmBtn: item.Status === 'Pending' ? '立即参与' : '查看详情',
              index: item.AccountIndex,
              brokerName: item.BrokerName,
              item,
              data: propData,
            };
          });
        }
      }
      // console.log(config, 'ccccc');

      const needHightProp = ['ROI'];
      showData = showData.slice(0, 2);
      let newConfig = [];
      if (config.listData && Array.isArray(config.listData.List) && config.listData.List.length > 1) {
        newConfig = config.listData.List.map((item: any) => ({
          avatar: `${this.base}/Avata/${item.UserID}`,
          name: item.NickName,
          grade: gradeFormat(item.GradeScore),
          confirmBtn: item.SubPrice ? `${item.SubPrice}/月` : '免费订阅',
          index: item.AccountIndex,
          showStrategy: true,
          strategyDesc: `交易策略: ${item.StrategyDesc}`,
          brokerName: item.BrokerName,
          item,
          data: showData.map((it: any) => {
            const ival: any = item[it];
            return {
              hightlight: needHightProp.includes(it) && ival > 0,
              prop: (mapKey as any)[it],
              val: propFormat(ival, it),
            };
          }),
        }));
      }
      newConfig = newConfig.concat(mamData);
      if (newConfig.length) {
        return newConfig;
      }
      return null;
    }
    return null;
  }

  public get strategytDataHeader() {
    if (this.configs && this.configs.length) {
      const config:any = this.configs[0];
      return {
        title: config.RankName,
        subTitle: config.ViceTitle,
      };
    }
    return null;
  }

  public get investData() {
    const filters = [2, 3, '2', '3'];
    const data = this.configs.slice(1)
      .filter((i: any) => i && !filters.includes(i.RankIndex));
    return data;
  }

  toPersonal(data:any) {
    const userId = data.item ? data.item.UserID : data.UserID;
    const index = data.item ? data.item.AccountIndex : data.index;
    this.redirectTo('personalPage', { userId, index }, true);
  }

  toInvest() {
    this.$router.push({ name: 'invest' });
  }

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
        traderaccount: list.Account,
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

  handleSub(item: any) {
    const list: any = item.item;
    if (item.mam) {
      if (this.$refs.investManager) {
        const { investManager } = this.$refs;
        (investManager as any).subscribe(item);
      }
      return;
    }

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
}
</script>
<style lang="less" scoped>
.main-view-container {
    .list-item {
        margin-top: 30px;
    }
}
</style>
