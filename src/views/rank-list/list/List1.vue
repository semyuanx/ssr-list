<template>
  <div class="list-container">
    <div class="list-table">
      <div class="lists-container">
        <div class="lists-header">
          <ul class="header-lists">
            <li class="prop-item" :key="i.prop" v-for="i in props" :style="`text-align: ${i.align || 'left'}`">
              {{i.prop}}
            </li>
          </ul>
        </div>
        <ul class="lists-body">
          <li :key="i && i.UserID || index" v-for="(i, index) in dataList">
            hello
          </li>
        </ul>
      </div>
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

  @RankStore.State
  rankListLoading: any;

  @Prop({
    type: Array,
    default: () => [],
  })
  data: any;

  @Prop()
  getData: any;

  get props() {
    return [
      { prop: '交易员', align: 'left' },
      { prop: '交易能力值', align: 'left' },
      { prop: '收益率', align: 'left' },
      { prop: '最大回撤', align: 'center' },
      { prop: '交易周期', align: 'left' },
      { prop: '擅长品种', align: 'left' },
      { prop: '订阅人数', align: 'left' },
      { prop: '走势图', align: 'center' },
      { prop: '订阅', align: 'center' },
    ];
  }

  get dataList() {
    if (this.rankListLoading) {
      const data = this.data && this.data.length ? this.data.concat(Array(6).fill(6)) : Array(6).fill(6);
      return data;
    }

    return this.data;
  }

  // dataList: any = [];
  // @Watch('data')
  // dataChange() {
  //   this.dataList.push(...this.data)
  // }

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
    return this.rankListLoading;
  }

  winHeight: any = 800;

  mounted() {
    // setTimeout(() => this.isLoading = false, 5000);

    // this.winHeight = windowHeight;

    let windowHeight = document.body.clientHeight;
    if (document.documentElement && document.documentElement.clientHeight) {
      windowHeight = document.documentElement.clientHeight;
    }
    const offsetTop = this.$el.offsetTop + 50;
    console.log();
    this.winHeight = windowHeight - offsetTop - 300;

    console.log(this.$refs.rankTable);
    // requestAnimationFrame(() => {
    //   (this.$refs.rankTable as any).doLayout();
    // })
  }

  created() {
    if (typeof window !== 'undefined') {
      let windowHeight = document.body.clientHeight;
      if (document.documentElement && document.documentElement.clientHeight) {
        windowHeight = document.documentElement.clientHeight;
      }
      let footerHeight = 0;
      const footer = document.querySelector('.page-footer');
      if (footer) {
        footerHeight = (footer as any).offsetHeight;
      }
      this.winHeight = windowHeight - footerHeight;
    }
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
    .lists-container {
      background: #fff;
      .lists-header {
        .header-lists {
          display: flex;
          flex-direction: row;
          height:50px;
          .prop-item {
            flex: 1;
            font-size:12px;
            font-family:MicrosoftYaHei;
            color:rgba(102,102,102,1);
            line-height:16px;

            display: flex;
            align-items: center;
            border: 1px solid red;
          }
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
