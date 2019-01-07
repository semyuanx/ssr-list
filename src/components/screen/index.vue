<template>
    <div class="sub-nav-choose">
        <template v-if="type!='follower'">
            <div class="time-filter">
                <span :class="{'active':time==7}" @click="selectTime(7)">{{$t("message.lwTrade")}}</span>
                <span :class="{'active':time==14}" @click="selectTime(14)">{{$t("message.lswTrade")}}</span>
                <span :class="{'active':time==30}" @click="selectTime(30)">{{$t("message.lmTrade")}}</span>
            </div>
            <dl>
                <dt style="margin-left:8px;">{{$t("message.TCircle")}}</dt>
                <select class="select_style" v-model="week">
                    <option value="5">{{$t("message.upFour")}}</option>
                    <option value="1-4">{{$t("message.oneAndFour")}}</option>
                </select>
            </dl>
           <!--  <dl v-if="type=='ace'">
                <dt>{{$t("message.Broker")}}</dt>
                <select v-model="bid">
                    <option value="">全部</option>
                    <option value="kvb">KVB昆仑国际</option>
                    <option value="fxcm">FXCM福汇</option>
                    <option value="fxrhs">晋峰环球国际</option>
                </select>
            </dl> -->
            <dl>
                <dt>{{$t("message.Broker")}}</dt>
                <select v-model="bid">
                    <option value="">{{$t("message.all")}}</option>
                    <option :value="item.BrokerId" v-for="item in brokerList" :key="item">{{ item.BrokerName }}</option>
                </select>
            </dl>
        </template>
        <template v-else>
            <dl>
                <dt style="margin-left:8px;">{{$t("message.TTime")}}</dt>
                <select class="select_style" v-model="time">
                    <option v-for="t in times" :value="t.value" :key="t">{{$t("message." + t.text)}}</option>
                </select>
            </dl>
        </template>
        <!-- <dl>
            <dt>{{$t("message.NickName")}}</dt>
            <dd class="input-box">
                <input type="text" :placeholder="placeholder" @keyup.enter="search" v-model="keyword" maxlength="16">
                <a href="javascript:;" title="搜索" @click="search"><i class="icon traders-i-view"></i></a>
            </dd>
        </dl> -->
    </div>
</template>
<script>
// import api from '../../api';
export default {
  data() {
    return {
      times: null,
      broker: null,
      placeholder: '',
      time: 1,
      week: 5,
      bid: '',
      keyword: '',
      brokerList: [],

    };
  },
  props: ['type'],
  methods: {
    getBrokerList() {
      const _this = this;
      const url = '/trade/brokers';
      let param;
      if (_this.type === 'ordinary') {
        param = {
          category: 'sam',
        };
      }
      // api.getV2(url, param).then(res => {
      //     if (res.code === 'SUCCESS' || res.code == 0) {
      //         _this.brokerList = res.data.brokers;
      //     }
      // }).catch(err => {
      //     console.log(err, '获取经纪商列表失败');
      // });
    },
    init() {
      if (this.type === 'follower') {
        this.times = [
          { text: 'all', value: 0 },
          { text: 'ldhstrade', value: 1 },
          { text: 'lwTrade', value: 7 },
          { text: 'lmTrade', value: 30 },
        ];
        this.placeholder = '请输入跟随者昵称';
      } else if (this.type === 'ace') {
        this.times = [
          { text: 'all', value: 0 },
          { text: 'lwTrade', value: 7 },
          { text: 'lswTrade', value: 14 },
          { text: 'lmTrade', value: 30 },
        ];
        this.placeholder = '请输入交易员昵称';
        this.time = 7;
      } else if (this.type === 'ordinary') {
        this.times = [
          { text: 'all', value: 0 },
          { text: 'ldhstrade', value: 1 },
          { text: 'lwTrade', value: 7 },
          { text: 'lmTrade', value: 30 },
        ];
        this.time = 7;
        this.placeholder = '请输入交易员昵称';
      }
    },
    search() {
      // 跟随大师昵称搜索，直接把时间变成全部
      if (this.type === 'follower' && this.keyword) {
        this.time = 0;
      }
      this.$emit('screenChange', { keyword: this.keyword });
    },
    selectTime(n) {
      this.time = n;
    },
  },
  updated() {
    // this.init();
  },
  created() {
    this.init();
  },
  mounted() {
    this.getBrokerList();
  },
  watch: {
    week(a, b) {
      this.$emit('screenChange', { week: a });
    },
    time(a, b) {
      this.$emit('screenChange', { time: a });
    },
    bid(a, b) {
      this.$emit('screenChange', { bid: a });
    },
  },
};
</script>
<style lang="less">
@import "./index";
</style>
