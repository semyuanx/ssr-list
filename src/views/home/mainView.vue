<template>
    <div class="main-view-container">
        <div v-if="strategytData" class="strategy">
            <FmStrategy :subscribe="handleSub" :data="strategytData" :header="strategytDataHeader" />
        </div>
        <div class="list-item" v-for="(item,index) in investData" :key="index">
            <CommonListItem :subscribe="handleSub" :data="item"/>
        </div>
        <!-- <div class="invest">
            <InvestProfessor />
        </div>
        <div class="invest">
            <DangerKeep />
        </div>
        <div class="invest">
            <TradeMaster />
        </div> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import FmStrategy from '@/views/home/Strategy.vue'; // @ is an alias to /src
import CommonListItem from '@/views/home/CommonListItem.vue'; // @ is an alias to /src
// import InvestProfessor from '@/views/home/InvestProfessor.vue'; // @ is an alias to /src
// import DangerKeep from '@/views/home/DangerKeep.vue'; // @ is an alias to /src
// import TradeMaster from '@/views/home/TradeMaster.vue'; // @ is an alias to /src
import { namespace, Action } from 'vuex-class';

import mapKey from '@/constant/propMap';

import { loadAuth } from 'fmcomponents/src/utils';
import { getLoginStatus } from 'fmcomponents';
import FollowBox from 'fmcomponents/src/components/follow';


const HomeStore = namespace('HomeStore');

const RankStore = namespace('RankStore');

@Component({
  components: {
    FmStrategy,
    CommonListItem,
  },
})
export default class mainView extends Vue {
    @HomeStore.State
    configs: any;

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
        showData = showData.slice(0, 2);
        if (Array.isArray(config.listData.List) && config.listData.List.length > 1) {
          const newConfig = config.listData.List.map((item: any) => ({
            avatar: `${this.base}/Avata/${item.UserID}`,
            name: item.NickName,
            price: item.Price,
            index: item.AccountIndex,
            brokerName: item.BrokerName,
            item,
            data: showData.map((it: any) => ({ prop: (mapKey as any)[it], val: item[it] })),
          }));
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
      return this.configs.slice(1)
        .filter((i: any) => i && !filters.includes(i.RankIndex));
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

  handleSub(item: any) {
    console.log('to subsribe', item);
    const list: any = item.item;
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
        margin-top: 42px;
    }
}
</style>
