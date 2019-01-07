<template>
    <div class="list-box"
         v-scroll="loadMore">
        <ul class="clearfix"
            v-for="list in datas" :key="list">
            <li class="clearfix">
                <div class="left-imgbox">
                    <a target="_blank"
                       :href="base+'/user/'+list.UserID+'/trade-account/exhibition?index='+list.AccountIndex">
                        <img onerror="this.src='//cdn.followme.com/images/default_avata.png';"
                             :src="base+'/Avata/'+list.UserID"
                             class="imgShadow person"
                             data-id="87217_2"
                             :alt="list.NickName"
                             @mouseenter.self="showCard($event,list.UserID+'_'+list.AccountIndex)"
                             @mouseleave="personCard.hide()">
                    </a>
                </div>
                <div class="center-databox">
                    <div class="clearfix">
                        <div class="user-msg-box">
                            <div class="person"><a target="_blank"
                                   :href="base+'/user/'+list.UserID+'/trade-account/exhibition?index='+list.AccountIndex"
                                   class="nickname"
                                   title=""
                                   @mouseenter.self="showCard($event,list.UserID+'_'+list.AccountIndex)"
                                   @mouseleave="personCard.hide()">{{list.NickName}}</a></div>
                            <div style="margin-top:5px;">
                                <div class="account_pull_box"
                                     @mouseenter.self="showAccount($event,list.AccountList,list.UserID)"
                                     @mouseleave="accountList.hide()">
                                    <span :class="'account_num_bg_box account_num_bg_box0'+list.AccountIndex"></span>
                                </div>
                                <span class="mark_icon"><img :src="cdn+'/images/broker/web/'+list.BrokerID+'/'+list.BrokerID+'_15_15.png'" :alt="list.BrokerID"></span>
                            </div>
                        </div>
                        <div class="user-data-box"
                             style="width:180px;">
                            <span :class="{c00aa6d:list.FollowMoney>0}">${{list.FollowMoney.toFixed(2)}}</span>
                        </div>
                        <div class="user-data-box"
                             style="width:145px;">
                            <span :class="{c00aa6d:list.Pips>0}">{{list.Pips.toFixed(2)}}<i style="font-style: normal;font-size: 14px;">{{$t("message.spot")}}</i></span>
                        </div>
                        <div class="user-data-box"
                             style="width:115px;">
                            <span :class="{c00aa6d:list.Roi>0}">{{(list.Roi*100).toFixed(2)}}<i style="font-style: normal; font-size: 14px;">%</i></span>
                        </div>
                        <div class="user-data-box"
                             style="width:120px;">
                            <span :class="{c00aa6d:list.AveragePips>0}">{{list.AveragePips.toFixed(2)}}<i style="font-style: normal; font-size: 14px;">{{$t("message.spot")}}</i></span>
                        </div>
                        <div class="user-data-box"
                             style="width:95px;">
                            <span >{{list.Orders}}<i style="font-style: normal; font-size: 14px;color: #777;">{{$t("message.bi")}}</i></span>
                        </div>
                        <div class="user-data-box"
                             style="width:105px;">
                            <span>{{list.Weeks}}<i style="font-style: normal; font-size: 14px;color: #777;">{{$t("message.week")}}</i></span>
                        </div>
                    </div>
                </div>
                <div class="right-chartbox">
                    <div class="chartbox">
                        <Chart v-if="list.List.length>0"
                                :chartData="list.List"
                               ></Chart>
                        <img v-else
                             :src="cdn+'/images/NoData-Report.jpg'"
                             style="display:block;width:100%;" :alt="$t('message.noData')">
                    </div>
                    <div class="btn-box"
                         :class="{'only-follow':type == 'follower'}">
                        <a href="javascript:;"
                           onclick=""
                           class="follow"
                           :class="{'follow-active':changeFollowClass(list.UserID+'_'+list.AccountIndex)}"
                           v-if="type != 'follower'"
                           @click="followSet(list)">{{list.UserID+'_'+list.AccountIndex | follow-filter(followList) }}</a>
                        <a href="javascript:;"
                           :class="{'attation':type != 'follower','follow':type == 'follower','attation-active':list.Attention}"
                           @click="attention(list, $event)">{{ list.Attention | attention-filter(attentionList) }}</a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
/* eslint-disable */
import { mapActions } from 'vuex';
import FollowBox from 'fmcomponents/src/components/follow';
import Chart from '../chart';
// import apis from '../../api/api.js';
import { getChartData } from './util';
import { loadAuth } from 'fmcomponents/src/utils';
import personCard from 'fmcomponents/src/components/personcard';
import accountList from 'fmcomponents/src/components/accountlist';
import { getLoginStatus } from 'fmcomponents';

import { i18n } from '@/i18n';

export default {
  filters: {
    'attention-filter': val => (val ? i18n.t('message.attened') : i18n.t('message.atten')),
    'follow-filter': (val, list, isFree = false) => {
      if (list.length > 0) {
        let length = list.length;
        while (length--) {
          if (list[length] === val) {
            return i18n.t('message.editFollow');
          }
        }
      }
      return isFree ? i18n.t('message.follow_free') : i18n.t('message.follow');
    },
  },
  data() {
    return {
    //   cdn: this.cdn,
    //   base: this.base.replace('http:', ''),
      scrollLoad: false, // 是否可以下拉，false是可以下拉
      currentCount: 0, // 下拉次数记载
      datas: [], // 真实显示的数据，来源于接收过来的数据,
      followList: [],
      attentionList: [],
      isClose: false, // 是否关闭跟随
      getChartData,
      personCard,
      accountList,
    };
  },
  computed: {
    type() {
      return this.$route.name;
    },
    realData() {
      // 刚加载列表的时候 只显示15条，并且设置可以下拉，下拉次数初始化0
      this.scrollLoad = false;
      this.currentCount = 0;
      return this.listData.slice(0, 15);
    },
  },
  props: {
    listData: {
      type: Array,
    },
  },
  components: {
    Chart,
  },
  methods: {
    ...mapActions({
      addOrCancelAttention: 'RankStore/addOrCancelAttention',
      getRelations: 'RankStore/getRelations',
    }),
    $getLogStatus: getLoginStatus,
    // getFollowClose () {
    //     var _this = this;
    //     var url = `/trade/riskcontrol`;
    //     this.$LoginModal.getLoginPromise().then(user => {
    //         if (user.islogin) {
    //             api.getV2(url).then((res) => {
    //                 if (res.data && res.data.settings) {
    //                     _this.isClose = res.data.settings.SignalSwitch === 'Close';
    //                 }
    //             }).catch((err) => {
    //                 console.log('获取失败', err);
    //             });
    //         }
    //     });
    // },
    changeFollowClass(val) {
      if (this.followList.length > 0) {
        let length = this.followList.length;
        while (length--) {
          if (this.followList[length] === val) {
            return true;
          }
        }
      }
      return false;
    },
    changeAttenClass(val) {
      if (this.attentionList.length > 0) {
        let length = this.attentionList.length;
        while (length--) {
          if (this.attentionList[length] === val) {
            return true;
          }
        }
      }
      return false;
    },
    attention(user, e) {
      const _this = this;
      const params = {
        toUserId: user.UserID,
      };
      this.$getLogStatus().then((user) => {
        if (user.islogin) {
          e.target.className === 'follow' ? e.target.className = 'follow attation-active' : e.target.className = 'follow';
          e.target.innerHTML = e.target.innerHTML === this.$t('message.attened') ? this.$t('message.atten') : this.$t('message.attened');
          this.addOrCancelAttention(params).then((res) => {
          }).catch((err) => {
            console.log(err);
          });
        } else {
          loadAuth();
        }
      });
    },
    followSet(list) {
      // if (this.isClose) return;
      const _this = this;
      FollowBox.show({
        traderid: list.UserID,
        tradername: list.NickName,
        traderindex: list.AccountIndex,
      }, (result) => {
        if (result.code == 'SUCCESS' || result.code == 0) {
          _this.getFollowAndAttention();
        } else {
          //
        }
      });
    },
    showAccount(e, list, id) {
      if (list.length > 1) {
        accountList.show({
          list,
          id,
          position: {
            top: e.target.offsetTop,
            left: e.target.offsetLeft,
          },
        });
      }
    },
    // 显示个人展示卡
    showCard(e, ids) {
      const _this = this;
      personCard.show({
        id: ids,
        position: {
          top: e.target.offsetTop,
          left: e.target.offsetLeft,
          height: e.target.offsetHeight,
        },
        callback(val) {
          return new Promise((res) => {
            if (res) {
              console.log('res:', val);
              if (val.code == 'SUCCESS' || val.code == 0) {
                _this.getFollowAndAttention();
              } else {
                // 失败
              }
            }
          });
        },
      });
    },
    // 加载下拉数据
    loadMore() {
      // 计算总条数
      const arrayCount = this.listData.length;
      // 如果可以下拉
      if (!this.scrollLoad) {
        if (arrayCount <= 15) { // 如果小于15条，啥玩意不干，显示分页
          this.scrollLoad = true;
          this.$emit('page-show', true);
        } else if (arrayCount > 15 && arrayCount <= 30) { // 如果大于15条小于30条，下拉次数加加，设置不能再下拉，显示分页
          this.currentCount++;
          this.scrollLoad = true;
          this.$emit('page-show', true);
        } else { // 如果大于30条，下拉次数加加
          this.currentCount++;
        }
        if (this.currentCount == 1) { // 如果下拉一次，加载30条，可能小于30条
          this.datas = this.listData.slice(0, 30);
        } else if (this.currentCount == 2) { // 如果下拉了两次，加载45条，可能小于45条，然后设置不能再下拉，显示分页
          this.datas = this.listData.slice(0, 46);
          this.scrollLoad = true;
          this.$emit('page-show', true);
        }
      }
    },
    // 获取登录用户的跟随列表和关注列表
    getFollowAndAttention() {
      const _this = this;
      this.$getLogStatus().then((user) => {
        if (user.islogin) {
          this.getRelations().then((res) => {
            _this.followList = res.follows;
            _this.attentionList = res.attentions;
          }).catch((err) => {
            console.log('获取登录用户的跟随列表和关注列表失败', err);
          });
        }
      });
    },
  },
  created() {
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.getFollowAndAttention();
    //   // this.getFollowClose();
    // });
  },
  //  监听滚动事件，下拉加载，下拉两次加载分页
  directives: {
    scroll: {
      bind(el, bingding) {
        window.addEventListener('scroll', () => {
          const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          if (scrollTop + window.innerHeight >= el.clientHeight + 200) {
            bingding.value.call(this);
          }
        });
      },
    },
  },
  watch: {
    realData: {
      handler(a, b) {
        if (a.length < 15 && a.length != 0) {
          this.scrollLoad = true;
          this.$emit('page-show', true);
        }
        this.datas = a;
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index";
</style>
