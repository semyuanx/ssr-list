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
              :followList="followList"
              :subscribe="handleSub" :data="item" />
        </div>
        <div class="invest">
            <TradeMaster
              @hideCard="hideCard"
              @showCard="showCard"
              :followList="followList"
              :attentionList="attentionList"
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
// import FollowBox from 'fmcomponents/src/components/follow';
import personCard from 'fmcomponents/src/components/personcard';
import zhCN from '@/i18n/zh-CN/views/home/mainView';
import zhTW from '@/i18n/zh-TW/views/home/mainView';
import enUS from '@/i18n/en-US/views/home/mainView';
import zhHK from '@/i18n/zh-HK/views/home/mainView';

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
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
      'zh-HK': zhHK,
    },
  },
})
export default class mainView extends Vue {
  @HomeStore.State
  configs: any;

  @HomeStore.State
  configsFollower: any;

  @HomeStore.State
  configsInvest: any;

  @HomeStore.State
  progressProducts: any;

  @HomeStore.State
  masterFollower: any;

  @RankStore.Action
  getRelations: any;

  loginInfo: any = {};

  get products() {
    const data = this.progressProducts.map((i: any) => i);
    return {
      data,
      config: this.configsInvest,
    };
  }

  get masterFollowerData() {
    const data = this.masterFollower.map((i: any) => i);
    return {
      data,
      config: this.configsFollower,
    };
  }

  hideCard($event: any) {
    personCard.hide();
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

      const showData: any = [];
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
                  prop: this.$i18n.t('yqsy'),
                  val: moneyFormat(expectProfile), // propFormat(ival, it),
                },
                {
                  hightlight: expectRoi && expectRoi > 0,
                  prop: this.$i18n.t('yqsyl'),
                  val: percentFormat(expectRoi), // propFormat(ival, it),
                },
              ];
            } else {
              const currentProfit = item.Profit;
              const expectRoi = item.ROI;
              propData = [
                {
                // hightlight: needHightProp.includes(it) && ival > 0,
                  prop: this.$i18n.t('dqcpsy'),
                  val: moneyFormat(currentProfit), // propFormat(ival, it),
                },
                {
                  hightlight: item.ROI && item.ROI > 0,
                  prop: this.$i18n.t('dqsyl'),
                  val: propFormat(expectRoi, 'ROI'), // propFormat(ival, it),
                },
              ];
            }
            return {
              mam: true,
              name: item.Name,
              type: 'MAM',
              danger: `${this.$i18n.t('risk')}<${percentFormat(item.FollowerMaxRisk)}`,
              confirmBtn: item.Status === 'Pending' ? this.$i18n.t('ljcy') : this.$i18n.t('ckxq'),
              index: item.AccountIndex,
              brokerName: item.BrokerName,
              item,
              data: propData,
            };
          });
        }
      }
      // console.log(config, 'ccccc');
      const needIgnore = ['IsPTA', 'GradeScore', 'SubPrice'];
      const show2Data = showData.filter((ik: any) => !needIgnore.includes(ik)).slice(0, 2);

      const needHightProp = ['ROI'];
      const showGrade = showData.includes('GradeScore');
      const showPta = showData.includes('IsPTA');
      let newConfig = [];
      const isShowSubBtn = showData.includes('SubPrice');
      if (config.listData && Array.isArray(config.listData.List) && config.listData.List.length > 1) {
        newConfig = config.listData.List.map((item: any) => {
          this.log(item, this.followList, 'this.followList');
          const isEdit = this.followList.includes(`${item.UserID}_${item.AccountIndex}`);
          // eslint-disable-next-line
          const otherEditText = isEdit ? this.$i18n.t('bjdy') : item.SubPrice ? `${item.SubPrice}/${this.$i18n.t('month')}` : this.$i18n.t('mfdy');
          // this.log(!isShowSubBtn ? false : otherEditText, 'otherEditText')
          return {
            avatar: `${this.base}/Avata/${item.UserID}`,
            name: item.NickName,
            grade: gradeFormat(item.GradeScore),
            confirmBtn: !isShowSubBtn ? false : otherEditText,
            index: item.AccountIndex,
            showStrategy: true,
            isShowGrade: showGrade,
            isShowPta: showPta && item.IsPTA,
            strategyDesc: `${this.$i18n.t('jycl')}: ${item.StrategyDesc}`,
            brokerName: item.BrokerName,
            item,
            data: show2Data.map((it: any) => {
              const ival: any = item[it];
              return {
                hightlight: needHightProp.includes(it) && ival > 0,
                prop: (mapKey as any)[it],
                val: propFormat(ival, it),
              };
            }),
          };
        });
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
    const params = {
      toUserId: userId,
    };

    if (this.loginInfo.id) {
      const uid: any = this.loginInfo.id;
      const selfId = [uid, `${uid}`];
      const isSelfAttendion = selfId.includes(userId);
      if (isSelfAttendion) {
        return this.$fmdialog({
          message: this.$i18n.t('sorryzjbngzzj'),
          onConfirm: () => {
            // this.toNoticeOrUnNoticeOne(params);
          },
        });
      }
      return this.toAttentionOther(params, userId);
    }
    return getLoginStatus().then((user: any) => {
      if (user.isLogin) {
        const uid: any = user.id;
        const selfId = [uid, `${uid}`];
        const isSelfAttendion = selfId.includes(userId);
        if (isSelfAttendion) {
          return this.$fmdialog({
            message: this.$i18n.t('sorryzjbngzzj'),
            onConfirm: () => {
              // this.toNoticeOrUnNoticeOne(params);
            },
          });
        }
        return this.toAttentionOther(params, userId);
      }
      return loadAuth();
    });
  }

  toAttentionOther(params: any, userId: any) {
    const isAttendion = this.attentionList.find((i: any) => i === userId || i === (`${userId}`));
    if (!isAttendion) {
      this.toNoticeOrUnNoticeOne(params);
    } else {
      this.$fmdialog({
        message: this.$i18n.t('qdyqxgz'),
        onConfirm: () => {
          this.toNoticeOrUnNoticeOne(params);
        },
      });
    }
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

  mounted() {
    setTimeout(() => {
      this.getFollowAndAttention();
    }, 1000);
  }

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

  toNoticeOrUnNoticeOne(params: any) {
    this.addOrCancelAttention(params)
      .then((res: any) => {
        this.regetSub();
      })
      .catch((err: any) => {
        this.regetSub();
      });
  }

  checkIfNotice(list: any) {
    const params = {
      toUserId: list.UserID,
    };
    if (list && Array.isArray(this.attentionList)) {
      const isAttendion = this.attentionList.find(i => i === list.UserID);
      if (!isAttendion) {
        this.toNoticeOrUnNoticeOne(params);
      }
    }
  }

  showFollowCard(_this: any, list: any) {
    import('fmcomponents/src/components/follow').then((followModule: any) => {
      const followBox: any = followModule.default;
      this.showFollowCard1(followBox, list);
    });
  }

  showFollowCard1(FollowBox: any, list: any) {
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
          this.getFollowAndAttention();
        } else {
          //
        }
      },
    );
  }

  // 获取登录用户的跟随列表和关注列表
  getFollowAndAttention() {
    getLoginStatus().then((user: any) => {
      if (user.isLogin) {
        this.loginInfo = user;
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
          this.loginInfo = user;
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
                this.$i18n.t('xzgs'),
              duration: 3000,
              confirmBtnText: this.$i18n.t('confirm'),
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
          message: this.$i18n.t('wlqqsb'),
          duration: 4000,
          confirmBtnText: this.$i18n.t('confirm'),
        });
      });
  }
}
</script>
<style lang="less" scoped>
.main-view-container {
    .list-item {
        margin-bottom: 30px;
    }
}
</style>
