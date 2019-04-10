<template>
  <div class="main-list-container">
    <div class="fm-show-pc">
      <CardList
        v-show="tableShowType === 'card'"
        :sortTitleData="sortTitleData"
        :showPropsList="showPropsList"
        :showProps="showProps"
        :data="cardData"
        @sortChange="sortChange"
        @showCard="showCard"
        @hideCard="hideCard"
        @toUserPage="toUserPage"
        @handleSub="handleSub"
      ></CardList>
      <FmList
        v-if="tableShowType === 'list'"
        :showPropsList="showPropsList"
        :showOthers="showOthers"
        :showProps="showProps"
        :sortTitleData="sortTitleData"
        :data="rankList"
        :getData="getData"
        :followList="followList"
        @sortChange="sortChange"
        @showCard="showCard"
        @hideCard="hideCard"
        @handleSub="handleSub"
        @toUserPage="toUserPage"
      />
      <RecommendList
        v-if="rankList.length<1"
        @showCard="showCard"
        @hideCard="hideCard"
        :followList="followList"
        @handleSub="handleSub"
        @toUserPage="toUserPage"
         />
    </div>
    <!-- <div class="fm-show-mobile" v-if="!isShowPc">
    <MobileList :data="rankList" @sortChange="sortChange"/>
  </div> -->
  </div>
</template>
<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { getElementTop, getElementLeft } from '@/utils/util';
import {
  numberFormat,
  percentFormat,
  propFormat,
  gradeFormat,
  moneyFormat,
  weekFormat,
} from '@/utils/format';
import mapKey from '@/constant/propMap';
import { loadAuth } from 'fmcomponents/src/utils';
import { getLoginStatus } from 'fmcomponents';
import personCard from 'fmcomponents/src/components/personcard';
// import FmList from './list/List.vue';
// import MobileList from './list/ListMobile.vue';
// import eventBus from '@/utils/event';

import zhCN from '@/i18n/zh-CN/views/rank-list/list/List';
import zhTW from '@/i18n/zh-TW/views/rank-list/list/List';
import enUS from '@/i18n/en-US/views/rank-list/list/List';
import zhHK from '@/i18n/zh-HK/views/rank-list/list/List';

const RankStore = namespace('RankStore');

@Component({
  components: {
    FmList: () => import(/* webpackChunkName: "fm-list" */ './list/List.vue'),
    CardList: () => import('./list/CardTable.vue'),
    RecommendList: () => import('./list/RecommendList.vue'),
    // MobileList: () => import('./list/ListMobile.vue'),
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
export default class List extends Vue {
  name: string = 'response-list';

  @RankStore.State
  rankList: any;

  @RankStore.State
  rankTotal: any;

  @RankStore.State
  tableShowType: any;

  @RankStore.Action
  addOrCancelAttention: any;

  @RankStore.Action
  checkCanFollow: any;

  @Prop()
  getData: any;

  @Prop()
  showProps: any;

  @Prop()
  sortTitleData: any;

  @RankStore.Action
  getRelations: any;

  get showOthers() {
    const noList = ['IsPTA', 'GradeScore', 'SubPrice'];
    const showProps = this.showProps
      .filter((i: any) => noList.includes(i.prop))
      .map((i: any) => i.prop);
    // console.log(showProps, 'ssss')
    return showProps;
  }

  get showPropsList() {
    const noList = ['IsPTA', 'GradeScore', 'TrendLine', 'SubPrice'];
    const showProps = this.showProps.filter(
      (i: any) => !noList.includes(i.prop),
    );
    return showProps;
  }

  formatVal(val: string | number, type: string): string | number {
    if (Array.isArray(val)) {
      return val.join('/');
    }
    if (type == 'Weeks') {
      return weekFormat(val);
    }
    return propFormat(val, type);
  }

  toUserPage(data: any) {
    const { UserID, AccountIndex } = data;
    this.redirectTo(
      'personalPage',
      { userId: UserID, index: AccountIndex },
      true,
    );
  }

  cardData: any[] = [];

  @Watch('rankList')
  watchRankList(val: any) {
    const showGrade = this.showOthers.includes('GradeScore');
    const showPta = this.showOthers.includes('IsPTA');
    const newData = val.map((item: any) => {
      const confirm = this.followList.includes(
        `${item.UserID}_${item.AccountIndex}`,
      );
      return {
        avatar: `${this.base}/Avata/${item.UserID}`,
        name: item.NickName,
        index: item.AccountIndex,
        brokerName: item.BrokerName,
        subscribers: item.Subscribers,
        trendChart: item.TrendChart,
        grade: gradeFormat(item.GradeScore),
        isShowPta: showPta && item.IsPTA,
        isShowGrade: showGrade,
        item,
        confirmBtn: confirm
          ? `${this.$t('editSubscribe')}`
          : item.SubPrice
            ? `$${item.SubPrice}/${this.$t('month')}`
            : `${this.$t('freeSubscribe')}`,
        data: this.showPropsList.map((it: any) => {
          const ival: any = item[it.prop];
          return {
            prop: mapKey[it.prop],
            val: this.formatVal(ival, it.prop),
          };
        }),
      };
    });
    this.cardData = newData;
  }


  personCard: any = personCard;

  showCard(e: any, item: any) {
    // eslint-disable-next-line
    const _this = this;
    const top = getElementTop(e.target);
    const left = getElementLeft(e.target);
    let ids = item.UserID;
    if (!ids) return;
    if (item.AccountIndex) {
      ids += `_${item.AccountIndex}`;
    }
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
            // console.log('res:', val);
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

  hideCard() {
    personCard.hide();
  }

  followList: any = [];

  attentionList: any = [];

  selfPwdChanged: any = [];

  // 获取登录用户的跟随列表和关注列表
  getFollowAndAttention() {
    getLoginStatus().then((user: any) => {
      if (user.isLogin) {
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

  checkTraderCanFollow(trader: any) {
    return this.checkCanFollow({
      userId: trader.UserID,
      accountIndex: trader.AccountIndex,
    }).then((res: any) => res && res.isFollow);
  }

  showFollowCard(_this: any, list: any) {
    import(/* webpackChunkName: "followbox" */ 'fmcomponents/src/components/follow').then(
      (followModule: any) => {
        const followBox: any = followModule.default;
        this.showFollowCard1(followBox, list);
      },
    );
  }

  showFollowCard1(FollowBox: any, list: any) {
    FollowBox.show(
      {
        traderid: list.UserID,
        tradername: list.NickName,
        traderindex: list.AccountIndex,
        brokerid: list.BrokerID,
      },
      (result: any) => {
        // console.log(result);
        if (result.code === 'SUCCESS' || result.code === 0) {
          this.getFollowAndAttention();
        } else {
          //
        }
      },
    );
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
        if (user.isLogin) {
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
              message: `${this.$i18n.t('limitFollow')}`,
              duration: 3000,
              confirmBtnText: `${this.$i18n.t('done')}`,
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
          message: `${this.$i18n.t('netFail')}`,
          duration: 4000,
          confirmBtnText: `${this.$i18n.t('done')}`,
        });
      });
  }

  mounted() {
    getLoginStatus().then((rst: any) => {
      if (rst.isLogin) {
        this.regetSub();
      }
    });
    // this.computeWindowSize();
    // eventBus.$on('window-resize', () => {
    //   this.computeWindowSize();
    // });
  }

  windowSize: any = 0;

  computeWindowSize() {
    const winW = window.innerWidth;
    this.windowSize = winW;
  }

  sortChange({ prop, order }: any) {
    this.$emit('sortChange', { prop, order });
  }
}
</script>
<style lang="less" scoped>
.main-list-container {
}
</style>
