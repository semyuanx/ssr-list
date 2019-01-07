<template>
    <div class="tradersDynamics_box">
        <div class="page-width">
            <div class="moveblock">
                <div class="normaltitle"
                     style=""><span>{{$t("message.dynamic")}}</span></div>
                <Loadding :loading="loadtop" :nodata="topnodata" v-if="loadtop" style="margin-top: 30px;"></Loadding>
                <div id="td_listbox">
                    <div class="td_listbox_wrap" :style="{'margin-bottom':loadtop?'0px':'15px'}">
                        <ul class="tradersDynamics_list Dynamicscroll">
                            <li v-for="item in dataTop" :key="item">
                                <div class="user_imgbox">
                                    <a target="_blank"
                                       :href="`${base}/user/${item.UserId}/trade-account/exhibition?index=${item.AccountCurrentIndex}`"
                                       class="person-card">
                                        <img onerror="this.src='//cdn.followme.com/images/default_avata.png';"
                                             :src="base+'/Avata/'+item.UserId"
                                             class="img_y imgShadow" :alt="item.NickName">
                                    </a>
                                    <i class="identity_icon"></i>
                                </div>
                                <div class="user_nicknamebox">
                                    <a :href="`${base}/user/${item.UserId}/trade-account/exhibition?index=${item.AccountCurrentIndex}`"
                                       target="_blank"
                                       title=""
                                       class="user_nickname person-card"
                                       accountindex="1">{{item.NickName}}</a>
                                </div>
                                <div class="link_sourcebox">
                                    <div v-if="item.BrokerId != 3">
                                        <span>{{$t("message.comefrom")}}</span>
                                        <img :src="cdn+'/images/broker/web/'+item.BrokerId+'/'+item.BrokerId+'_15_15.png'" :alt="item.BrokerId">
                                    </div>
                                </div>
                                <div class="buy_waybox">
                                    <div v-if="item.ShowText == '自主下单'">{{$t("message.mineOrder")}}</div>
                                    <div v-else>{{$t("message.follow")}}<a
                                        :href="`${base}/user/${item.TraderUserId}/trade-account/exhibition?index=${item.TraderAccountIndex}`"
                                           :title="item.ShowText"
                                           target="_blank">{{item.ShowText}}</a></div>
                                </div>
                                <div class="buy_stylebox">
                                    <span>{{item.CMD == 0 ? $t("message.buy"):$t("message.sell")}}</span><span>{{item.SYMBOL}}</span>
                                </div>
                                <div class="close_buyerbox">
                                    {{$t("message.downorder")}}<span>${{item.BizShowPRICE}}</span>
                                </div>
                                <div class="profitNlosebox">
                                    {{$t("message.dyyl")}}<span>${{item.BizProfit}}</span>
                                </div>
                                <div class="time_box">{{item.Time | time-filter}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="com_listbox_wrap">
                <Loadding :loading="loadall" :nodata="allnodata" v-if="loadall"></Loadding>
                <ul class="tradersDynamics_list"
                    id="divList"
                    v-scroll="loadMore">
                    <li :key="index" v-for="(item,index) in realDataList">
                        <div class="user_imgbox">
                            <a target="_blank"
                               :href="`${base}/user/${item.UserId}/trade-account/exhibition?index=${item.AccountCurrentIndex}`"
                               class="person-card">
                                <img onerror="this.src='//cdn.followme.com/images/default_avata.png';"
                                     :src="base+'/Avata/'+item.UserId"
                                     class="img_y imgShadow" :alt="item.NickName">
                            </a>
                        </div>
                        <div class="user_nicknamebox">
                            <a :title="item.NickName"
                               :href="`${base}/user/${item.UserId}/trade-account/exhibition?index=${item.AccountCurrentIndex}`"
                               class="user_nickname person-card">{{item.NickName}}</a>
                            <div class="account_pull_box"
                                 @mouseenter.self="showAccount($event,item.AccountList,item.UserId)"
                                 @mouseleave="accountList.hide()">
                                <span class="account_num_bg_box"
                                      :class="'account_num_bg_box'+item.AccountCurrentIndexPad"></span>
                            </div>
                        </div>
                        <div class="link_sourcebox">
                            <div v-if="item.BrokerId != 3">
                                <span>{{$t("message.comefrom")}}</span>
                                <img :src="cdn+'/images/broker/web/'+item.BrokerId+'/'+item.BrokerId+'_15_15.png'" :alt="item.BrokerId">
                            </div>
                        </div>
                        <div class="buy_waybox">
                            <div v-if="item.ShowText === '自主下单'">{{$t("message.mineOrder")}}</div>
                            <div v-else>{{$t("message.follow")}}<a
                                :href="`${base}/user/${item.TraderUserId}/trade-account/exhibition?index=${item.TraderAccountIndex}`"
                                :title="item.ShowText"
                                   target="_blank">{{item.ShowText}}</a></div>
                        </div>
                        <div class="buy_stylebox">
                            <span>{{item.CMD == 0 ? $t("message.buy"):$t("message.sell")}}</span><span>{{item.SYMBOL}}</span>
                        </div>
                        <div class="close_buyerbox">
                            {{$t("message.downorder")}}<span>${{item.BizShowPRICE}}</span>
                        </div>
                        <div class="profitNlosebox">
                            {{$t("message.dyyl")}}<span :class="{'yin':item.BizProfit>0}">${{item.BizProfit}}</span>
                        </div>
                        <div class="time_box">
                            <i class="icon"></i>{{item.Time | time-filter}}
                        </div>
                    </li>
                </ul>
            </div>
            <Pagination :pager="pager"
                        v-on:go-page="goPage"></Pagination>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import { mapActions } from 'vuex';
import Loadding from '@/components/loadding';
import Pagination from '@/components/pagination/index.vue';
// import api from '@src/api';
import accountList from 'fmcomponents/src/components/accountlist';

export default {
  data() {
    return {
      // cdn: CDN,
      // base: BASE.replace('http:', ''),
      show: false,
      position: {},
      dataTopObj: {
        category: 'top',
        pageSize: 15,
        pageIndex: 1,
      },
      dataListObj: {
        category: 'normal',
        pageSize: 45,
        pageIndex: 1,
      },
      pager: {
        pagecount: 0,
        pageindex: 1,
        pagesize: 45,
        isshow: false,
      },
      dataList: [],
      dataTop: [],
      realDataList: [],
      scrollLoad: false, // 是否可以下拉，false是可以下拉
      currentCount: 0, // 下拉次数记载
      accountData: {
        list: [],
        id: '',
      },
      loadtop: true,
      loadall: false,
      topnodata: false,
      allnodata: false,
    };
  },
  methods: {
    ...mapActions({ getRankDynamics: 'HomeStore/getRankDynamics' }),
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
    scrollInit() {
      this.$nextTick(() => {
        const lists = document.querySelector('.Dynamicscroll');
        const count = lists.children.length;
        if (count > 3) {
          setInterval(() => {
            const listAll = lists.children;
            const last = listAll[listAll.length - 1];
            const first = listAll[0];
            // first.slideDown('slow');
            setTimeout(() => {
              // last.remove();
              last.parentElement.removeChild(last);
              // last.css({ display: 'none' });
              last.style.display = 'none';
              // last.prependTo(lists);
              lists.prepend(last);
            }, 1000);
          }, 3000);
        }
      });
    },
    goPage(pIndex) {
      this.dataListObj.pageIndex = pIndex;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    fetchdataList() {
      const _this = this;
      const _url = '/trade/dynamics';
      this.getRankDynamics(this.dataListObj).then((res) => {
        _this.dataList = res.data.items;
        _this.initPager(res.data);
        _this.realDataList = _this.dataList.slice(0, 15);
        _this.scrollLoad = false;
        _this.currentCount = 0;
        _this.loadall = false;
        if (_this.dataList.length == 0) {
          _this.allnodata = true;
        } else {
          _this.allnodata = false;
        }
      }).catch((err) => {
        console.log('获取交易动态列表失败', err);
      });
    },
    fetchdataTop() {
      const _this = this;
      const _url = '/trade/dynamics';
      this.getRankDynamics(this.dataTopObj).then((res) => {
        _this.dataTop = res.data.items;
        _this.loadtop = false;
        if (_this.dataTop.length == 0) {
          _this.topnodata = true;
        } else {
          _this.topnodata = false;
        }
      }).then(() => {
        _this.scrollInit();
      }).catch((err) => {
        console.log('获取交易动态列表失败', err);
      });
    },
    initPager(arr) {
      let pCount = parseInt(arr.total / arr.pageSize);
      if (arr.total % arr.pageSize != 0) {
        pCount += 1;
      }
      this.pager.pagecount = pCount;
      this.pager.pageindex = arr.pageIndex;
      this.pager.pagesize = arr.pageSize;
      this.pager.isshow = false;
    },
    loadMore() {
      // 计算总条数
      const arrayCount = this.dataList.length;
      // 如果可以下拉
      if (!this.scrollLoad) {
        if (arrayCount <= 15) { // 如果小于15条，啥玩意不干，显示分页
          this.scrollLoad = true;
          this.pager.isshow = true;
        } else if (arrayCount > 15 && arrayCount <= 30) { // 如果大于15条小于30条，下拉次数加加，设置不能再下拉，显示分页
          this.currentCount++;
          this.scrollLoad = true;
          this.pager.isshow = true;
        } else { // 如果大于30条，下拉次数加加
          this.currentCount++;
        }
        if (this.currentCount == 1) { // 如果下拉一次，加载30条，可能小于30条
          this.realDataList = this.dataList.slice(0, 30);
        } else if (this.currentCount == 2) { // 如果下拉了两次，加载45条，可能小于45条，然后设置不能再下拉，显示分页
          this.realDataList = this.dataList.slice(0, 46);
          this.scrollLoad = true;
          this.pager.isshow = true;
        }
      }
    },
  },
  created() {
  },
  mounted() {
    this.fetchdataList();
    this.fetchdataTop();
  },
  components: {
    Pagination,
    Loadding,
  },
  watch: {
    dataListObj: {
      handler(a, b) {
        this.fetchdataList();
      },
      deep: true,
    },
  },
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
  // beforeRouteEnter (to, from, next) {
  //     next(vm => {
  //         document.title = vm.$t('message.dymatic');
  //         var metas = document.getElementsByTagName('meta');
  //         metas[5].content = vm.$t('message.dymatickey');
  //         metas[6].content = vm.$t('message.dymaticdescript');
  //     });
  // }
};
</script>
<style lang="less" scoped>
@import "./index";
</style>
