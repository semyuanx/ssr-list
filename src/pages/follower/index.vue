<template>
    <div class="content">
        <Screen class="strategy-header" :type="type" v-on:screenChange="screenChange"></Screen>
        <SortHead style="padding-top: 0;" :head-data="headData" :default-order="defaultPageOrder" v-on:sortHeadChange="sortHeadChange"></SortHead>
        <Loadding :loading="loadding" :nodata="nodata"></Loadding>
        <List :list-data="listData" v-if="listData" v-on:page-show="pageShow"></List>
        <Pagination class="my-pagination mb20" :currentPage="pager.pageIndex" :pageSize="pager.pageSize" :total="pager.pageCount" @change="goPage" v-if="showPager"></Pagination>
    </div>
</template>
<script lang="js">
import { mapActions } from 'vuex';
import Loadding from '../../components/loadding/index.vue';
import Screen from '../../components/screen/index.vue';
import SortHead from '../../components/sortHead/index.vue';
import List from '../../components/list/index.vue';
import Pagination from '../../components/pagination/index.vue';
// import api from '../../api/api.js';
export default {
  components: {
    SortHead,
    List,
    Screen,
    Pagination,
    Loadding,
  },
  data() {
    return {
      type: 'follower',
      headData: [
        {
          text: 'base',
          style: {
            width: '120px',
            textAlign: 'left',
          },
          hasSort: 'false',
          title: 'base',
          value: '',
        }, {
          text: 'gssy',
          style: {
            width: '180px',
          },
          title: 'gssytips',
          value: 'FollowMoney',
        }, {
          text: 'gsds',
          style: {
            width: '145px',
          },
          title: 'gsdstips',
          value: 'Pips',
        }, {
          text: 'gssyl',
          style: {
            width: '115px',
          },
          title: 'gssyltips',
          value: 'Roi',
        }, {
          text: 'avggsds',
          style: {
            width: '120px',
          },
          title: 'avggsdstips',
          value: 'AveragePips',
        }, {
          text: 'gsbs',
          style: {
            width: '95px',
          },
          title: 'gsbstips',
          value: 'Orders',
        }, {
          text: 'TCircle',
          style: {
            width: '105px',
          },
          title: 'TCircletips',
          value: 'Weeks',
        }, {
          text: 'map',
          style: {
            width: '100px',
            marginLeft: '10px',
          },
          hasSort: 'false',
          title: 'ltdMap',
          value: '',
        },
      ],
      defaultPageOrder: 'FollowMoney',
      dataObj: {
        pageSize: 45,
        pageIndex: 1,
        time: 1,
        pageField: 'FollowMoney',
        pageSort: 'desc',
      },
      pager: {
        pageCount: 0,
        pageIndex: 1,
        pageSize: 45,
      },
      listData: [],
      loadding: true,
      nodata: false,
      showPager: false,
    };
  },
  mounted() {
    // console.log(this.getRankFollowers);
  },
  methods: {
    ...mapActions({ getRankFollowers: 'HomeStore/getRankFollowers' }),
    screenChange(o) {
      this.buildDate(o);
      this.dataObj.pageIndex = 1;
    },
    sortHeadChange(o) {
      this.buildDate(o);
    },
    buildDate(o) {
      const _this = this;
      Object.keys(o).forEach((trait) => {
        // eslint-disable-next-line
        if (_this.dataObj.hasOwnProperty(trait)) {
          _this.dataObj[trait] = o[trait];
        } else {
          _this.$set(_this.dataObj, trait, o[trait]);
        }
      });
    },
    fetchDate() {
      const _this = this;
      this.getRankFollowers(this.dataObj).then((res) => {
        _this.listData = res.items;
        _this.initPager(res);
        _this.loadding = false;
        if (_this.listData.length == 0) {
          _this.nodata = true;
        } else {
          _this.nodata = false;
        }
      }).catch((err) => {
        console.log('获取跟随者列表失败', err);
      });
    },
    goPage(pIndex) {
      this.dataObj.pageIndex = pIndex;
      this.pager.pageIndex = pIndex;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    pageShow(o) {
      this.showPager = o;
    },
    initPager(arr) {
      this.pager.pageCount = arr.total;
      this.pager.pageIndex = +arr.pageIndex;
      this.pager.pageSize = +arr.pageSize;
    },
  },
  watch: {
    dataObj: {
      handler(a, b) {
        this.fetchDate();
      },
      deep: true,
    },
  },
  created() {
    this.fetchDate();
  },
//   beforeRouteEnter(to, from, next) {
//     next((vm) => {
//       document.title = vm.$t('message.followtitle');
//       const metas = document.getElementsByTagName('meta');
//       metas[5].content = vm.$t('message.followkey');
//       metas[6].content = vm.$t('message.followdescript');
//     });
//   },
};
</script>
<style lang="less" scoped>
    @import "./index";
</style>
