<template>
  <div class="main-list-container">
    <div class="fm-show-pc">
      <FmList
        v-if="tableShowType==='list'"
        :showProps="showProps"
        :data="data"
        :getData="getData"
        :followList="followList"
        :attentionList="attentionList"
        :sortTitleData="sortTitleData"
        :tableShowType="tableShowType"
        @sortChange="sortChange"
        @showCard="showCard"
        @hideCard="hideCard"
        @handleSub="handleSub"
        @toUserPage="toUserPage"
        @changeTableType="changeTableType"
      />
      <CardTable
        v-if="tableShowType==='card'"
        :sortTitleData="sortTitleData"
        :showPropsList="showProps"
        :data="cardData"
        :getData="getData"
        :attentionList="attentionList"
        :followList="followList"
        :tableShowType="tableShowType"
        @sortChange="sortChange"
        @handleSub="handleSub"
        @showCard="showCard"
        @hideCard="hideCard"
        @toUserPage="toUserPage"
        @changeTableType="changeTableType"
      ></CardTable>
    </div>
    <!-- <div class="fm-show-mobile" v-if="!isShowPc">
    <MobileList :data="data" @sortChange="sortChange"/>
  </div> -->
  </div>
</template>
<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { getLoginStatus } from 'fmcomponents';
import { loadAuth } from 'fmcomponents/src/utils';
import personCard from 'fmcomponents/src/components/personcard';
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

import zhCN from '@/i18n/zh-CN/views/follower-list/list/List';
import zhTW from '@/i18n/zh-TW/views/follower-list/list/List';
import enUS from '@/i18n/en-US/views/follower-list/list/List';
import zhHK from '@/i18n/zh-HK/views/follower-list/list/List';

// import FmList from './list/List.vue';
// import MobileList from './list/ListMobile.vue';
// import eventBus from '@/utils/event';

const RankStore = namespace('RankStore');

@Component({
  components: {
    FmList: () => import(/* webpackChunkName: "follow-list" */ './list/List.vue'),
    CardTable: () => import('./list/CardTable.vue'),
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

  @Prop()
  sortTitleData: any;

  @Prop()
  data: any;

  @Prop()
  getData: any;

  @Prop()
  showProps: any;

  @RankStore.Action
  addOrCancelAttention: any;

  @RankStore.Action
  getRelations: any;
  // get isShowPc() {
  //   return this.windowSize > 880;
  // }

  mounted() {
    // if (this.isBrowser()) {
    //   this.computeWindowSize();
    //   eventBus.$on('window-resize', () => {
    //     this.computeWindowSize();
    //   });
    // }
    console.log(this.data, 'yyyyuuu');
    this.getFollowAndAttention();
  }

  tableShowType:any='list';

  changeTableType(type:any) {
    this.tableShowType = type;
  }

  checkIfFollow(
    uid: string | number,
  ) {
    let inAttention = false;
    let inFollow = false;
    const status:any = this.$i18n.t('followStatus');
    if (
      Array.isArray(this.attentionList)
        && (this.attentionList.includes(uid) || this.attentionList.includes(`${uid}`))
    ) {
      inAttention = true;
    }
    if (
      Array.isArray(this.followList)
        && (this.followList.includes(uid) || this.followList.includes(`${uid}`))
    ) {
      inFollow = true;
    }
    // console.log(inFollow, inAttention, 'inAttention');
    let id = 0;
    if (inAttention) {
      id++;
      if (inFollow) id++;
    }

    return { label: status[id], state: id };
  }


  get cardData() {
    const newData = this.data.map((item: any) => {
      const confirm = this.followList.includes(
        `${item.UserID}_${item.AccountIndex}`,
      );
      return {
        avatar: `${this.base}/Avata/${item.UserID}`,
        name: item.NickName,
        UserID: item.UserID,
        index: item.AccountIndex,
        brokerName: Array.isArray(item.AccountList)
          ? (item.AccountList.find(
            (i: any) => i && i.AccountIndex === item.AccountIndex,
          ) || {}).BrokerName
          : '',
        subscribers: item.Subscribers,
        trendChart: item.List,
        grade: item.GradeScore,
        isShowPta: item.IsPTA,
        item,
        confirmBtn: this.checkIfFollow(item.UserID),
        data: this.showProps.map((it: any) => {
          const ival: any = item[it.prop];
          return {
            prop: it.label,
            val:
              this.formatVal(ival, it.prop)
              + (!['Weeks'].includes(it.prop) ? it.suffix : ''),
          };
        }),
      };
    });
    return newData;
  }

  // cardData: any[] = [];

  // @Watch("data")
  // watchRankList(val: any) {
  //   console.log(this.data,'1111223344')
  //   const newData = val.map((item: any) => {
  //     const confirm = this.followList.includes(
  //       `${item.UserID}_${item.AccountIndex}`
  //     );
  //     return {
  //       avatar: `${this.base}/Avata/${item.UserID}`,
  //       name: item.NickName,
  //       index: item.AccountIndex,
  //       brokerName: item.BrokerName,
  //       subscribers: item.Subscribers,
  //       trendChart: item.TrendChart,
  //       grade: item.GradeScore,
  //       isShowPta:  item.IsPTA,
  //       item,
  //       confirmBtn: confirm
  //         ? `${this.$t("editSubscribe")}`
  //         : item.SubPrice
  //         ? `$${item.SubPrice}/${this.$t("month")}`
  //         : `${this.$t("freeSubscribe")}`,
  //       data: this.showProps.map((it: any) => {
  //         let ival: any = item[it.prop];
  //         return {
  //           prop: mapKey[it.prop],
  //           val: this.formatVal(ival, it.prop)
  //         };
  //       })
  //     };
  //   });
  //   this.cardData = newData;
  // }

  formatVal(val: string | number, type: string): string | number {
    if (Array.isArray(val)) {
      return val.join('/');
    }
    if (type == 'Weeks') {
      return weekFormat(val);
    }
    if (type == 'FollowMoney') {
      return moneyFormat(val);
    }
    return propFormat(val, type);
  }

  windowSize: any = 0;

  computeWindowSize() {
    const winW = window.innerWidth;
    this.windowSize = winW;
  }

  sortChange({ prop, order }: any) {
    this.$emit('sortChange', { prop, order });
  }

  attentionList: any = [];

  followList: any = [];

  handleSub($event: any, item: any, type:any) {
    const { attentionList } = this;
    const { UserID: uid } = item;
    const _this = this;
    if (
      Array.isArray(attentionList)
      && (attentionList.includes(uid) || attentionList.includes(`${uid}`))
    ) {
      return this.$fmdialog({
        message: _this.$i18n.t('comintent') as string,
        onConfirm: () => {
          this.attention(item, $event, type);
        },
      });
    }
    return this.attention(item, $event, type);
  }

  attentionDom(e:any, type:any) {
    if (type === 'table') {
      e.target.innerHTML = e.target.innerHTML === this.$t('message.attened')
        ? this.$t('message.atten')
        : this.$t('message.attened');
    }
  }

  attention(user: any, e: any, type:any) {
    const _this = this;
    const userId = user.UserID;
    const params = {
      toUserId: userId,
    };
    const { attentionList } = this;

    getLoginStatus().then((user1: any) => {
      if (user1.isLogin) {
        const uid = user1.id;
        this.log(attentionList, uid, 'attentionList');
        const selfId = [uid, `${uid}`];
        if (selfId.includes(userId)) {
          return this.$fmdialog({
            message: _this.$i18n.t('sorryToMe') as string,
            onConfirm: () => {
              // this.toNoticeOrUnNoticeOne(params);
            },
          });
        }
        // e.target.className = e.target.className === 'follow' ? 'follow attation-active' : 'follow';
        this.attentionDom(e, type);
        // e.target.innerHTML =
        //   e.target.innerHTML === this.$t("message.attened")
        //     ? this.$t("message.atten")
        //     : this.$t("message.attened");
        return this.addOrCancelAttention(params)
          .then((res: any) => {
            this.getFollowAndAttention();
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
      return loadAuth();
    });
  }

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

  toUserPage(data: any) {
    const { UserID, AccountIndex } = data;
    this.redirectTo(
      'personalPage',
      { userId: UserID, index: AccountIndex },
      true,
    );
  }

  showCard(e: any, item: any) {
    // eslint-disable-next-line
    const _this = this;
    const top = getElementTop(e.target);
    const left = getElementLeft(e.target);
    let ids = item.UserID;
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

  hideCard() {
    personCard.hide();
  }
}
</script>
