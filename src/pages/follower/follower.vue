<template>
  <div class="rank-container">
    <div>
      <FilterHeader :selected="selected" @filter-changed="filterChanged" />
    </div>
    <div>
      <List :data="dataList" :showProps="showProps" :getData="getData" @sortChange="sortChange" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import throttle from 'lodash.throttle';

import FilterHeader from '@/views/follower-list/FilterHeader.vue';
import List from '@/views/follower-list/List.vue';
import { getElementTop, animate } from '@/utils/util';

const FollowerStore = namespace('FollowerStore');

let isEnterLoad: boolean = false;

@Component({
  components: {
    FilterHeader,
    List,
  },
})
export default class RankList extends Vue {
  selected: any = {
    label: '',
    val: 30,
    selected: false,
  };

  @FollowerStore.Action
  getRankFollowers: any;

  @FollowerStore.State
  followers: any;

  @FollowerStore.State
  showProps: any;

  paramsData:any = {
    pageSize: 20,
    pageIndex: 1,
    time: 30,
    pageField: 'FollowMoney',
    pageSort: 'desc',
  };

  dataLoading: boolean = false;

  get pageSize() {
    return this.paramsData.pageSize;
  }

  updatePageIndex() {
    this.paramsData.pageIndex += 1;
  }

  updateTime(time: number) {
    this.paramsData.time += time;
  }

  get dataList() {
    return this.followers;
  }

  setParams(params: any) {
    this.paramsData = { ...this.paramsData, ...params };
  }

  handleFilter() {
    this.resetIndex();
    this.$nextTick(() => {
      this.getData();
    });
  }

  filterChanged(item: any) {
    const { val: time } = item;
    const params = { time };
    this.selected = item;
    this.getDataAccourdingParam(params);
  }

  sortArr: any = [];

  startQueue: any = false;

  sortChange({ prop, order: ord }: any) {
    const order = ord === 'ascending' ? 'asc' : 'desc';
    const params = {
      pageField: prop,
      pageSort: order,
    };

    this.getDataAccourdingParam(params);
  }

  getDataAccourdingParam(params: any) {
    this.sortArr.push(params);
    if (!this.startQueue) {
      this.startQueue = true;
      this.$nextTick(() => {
        this.getSortData();
      });
    }
  }

  getSortData(param?: any) {
    let params = param;
    const len = this.sortArr.length;
    if (!params) {
      if (len > 1) {
        params = this.sortArr[len - 1];
        this.sortArr = [];
      } else {
        params = this.sortArr.shift();
      }
    }
    if (!params) {
      this.startQueue = false;
      return;
    }
    this.resetIndex();
    this.setParams(params);

    this.$nextTick(() => {
      this.getData().then(() => {
        this.getSortData();
      });
    });

    // this.getRankFollowers(
    //   this.refactor(params),
    // ).then(() => {
    //   this.getSortData();
    // });
  }

  resetIndex() {
    this.paramsData.pageIndex = 1;
    this.hasMore = true;
  }

  getPageData(page: number = 1) {
    const params: any = this.refactor({ pageIndex: page });
    this.getRankFollowers(params);
  }

  hasMore: boolean = true;

  getData() {
    const params: any = this.refactor();
    console.log(params, 'pppppp');
    if (!this.hasMore) {
      return new Promise(() => ({}));
    }
    this.dataLoading = true;
    return this.getRankFollowers(params)
      .then((res: any) => {
        if (res && !res.error) {
          const { items } = res;
          if (items.length < this.pageSize) {
            this.hasMore = false;
          } else {
            this.updatePageIndex();
          }
        }
        this.dataLoading = false;
        return res;
      });
  }

  fixHeader() {
    const scrollTop = this.getScrollTop();

    animate(() => {
      this.needFixTableHeader(scrollTop);
    });
  }

  mounted() {
    // this.getPageData();
    this.getData();

    const loadThrottle = throttle(this.scrollCb, 200);
    const fixThrottle = throttle(this.fixHeader, 200);

    window.addEventListener('scroll', () => {
      fixThrottle();
      if (isEnterLoad || this.dataLoading || !this.hasMore) return;
      isEnterLoad = true;
      loadThrottle();
    });
  }

  unmouted() {
    window.removeEventListener('scroll', () => {
      if (isEnterLoad || this.dataLoading) return;
      isEnterLoad = true;
      throttle(this.scrollCb, 200)();
    });
  }

  scrollCb() {
    this.$nextTick(() => {
      this.loadMore();
    });
  }

  throttleHeight = 50;

  getScrollTop() {
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      // eslint-disable-next-line
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      // eslint-disable-next-line
      scrollTop = document.body.scrollTop;
    }
    return scrollTop;
  }

  getWinHeight() {
    let windowHeight = document.body.clientHeight;
    if (document.documentElement && document.documentElement.clientHeight) {
      windowHeight = document.documentElement.clientHeight;
    }
    return windowHeight;
  }

  getDocHeight() {
    let docHeight = document.body.scrollHeight;
    if (document.documentElement && document.documentElement.scrollHeight) {
      docHeight = document.documentElement.scrollHeight;
    }
    return docHeight;
  }

  getTopNavHeight() {
    let height = 50;
    const nav = document.getElementById('fm-top-nav');
    if (nav) {
      height = nav.offsetHeight;
    }
    return height;
  }

  setStyleProp(el: any, val: any, prop: any) {
    if (el && el[prop] !== val) {
      el.style[prop] = val;
    }
  }

  needFixTableHeader(scrollTop: number) {
    const el = this.$el;
    if (el) {
      const rankTable = el.querySelector('.follower-rank-table');
      if (rankTable) {
        const header: any = rankTable.querySelector('.el-table__header-wrapper');
        if (header) {
          const top = getElementTop(header);
          if (scrollTop > top) {
            const navHeight = this.getTopNavHeight();
            this.setStyleProp(header, 'fixed', 'position');
            this.setStyleProp(header, `${navHeight}px`, 'top');
            this.setStyleProp(header, 200, 'zIndex');
          } else {
            this.setStyleProp(header, 'unset', 'position');
          }
        }
      }
    }
  }

  computeNeedLoad() {
    const scrollTop = this.getScrollTop();
    const windowHeight = this.getWinHeight();
    const docHeight = this.getDocHeight();

    const allHeight = scrollTop + windowHeight + (this.throttleHeight || 10);
    if (allHeight > docHeight) {
      return true;
    }
    return false;
  }

  scrollTo(height: number) {
    if (window.scrollTo) {
      animate(() => {
        window.scrollTo(0, height);
      });
    }
  }

  tdHeight: number = 50;

  computeTrHeight(n?:number) {
    const tableBody = document.querySelector('.el-table__body');
    let height = 50;
    if (tableBody) {
      const tr = tableBody.querySelector('tr');
      if (tr) {
        height = tr.offsetHeight;
      }
    }
    return height * (n || 5);
  }

  loadMore() {
    const scrollTop = this.getScrollTop();
    const windowHeight = this.getWinHeight();
    const docHeight = this.getDocHeight();

    const needLoad = this.computeNeedLoad();

    const reScroll = scrollTop - this.computeTrHeight(5);

    if (needLoad) {
      // this.scrollTo(reScroll);
      this.getData().then(() => {
        // const reComputeNeedLoad = this.computeNeedLoad();
        // if (reComputeNeedLoad) {
        // this.scrollTo(reScroll);
        // }
        isEnterLoad = false;
      });
    } else {
      isEnterLoad = false;
    }
  }

  private refactor(params: any = {}) {
    const initialParams: any = Object.assign({}, this.paramsData, params);
    const paramsData = { ...initialParams };
    return paramsData;
  }
}
</script>
<style lang="less" scoped>
.rank-container {
  padding-top: 20px;
}
</style>
