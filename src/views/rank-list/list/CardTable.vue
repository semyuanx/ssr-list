<template>
  <div class="card-table">
    <div class="header card-table-header">
      <h2>排序方式</h2>
      <ul class="header-list">
        <li
          v-for="(obj,key) in showPropsList"
          :key="key"
          @click="handleSortChange(obj)"
          :class="{'on':sortTitleData.prop === obj.prop}"
        >
          {{obj.label}}
          <i
            v-if="sortTitleData.prop === obj.prop && sortTitleData.order ==='descending'"
            class="icon-arrow_down_24px"
          ></i>
          <i
            v-if="sortTitleData.prop === obj.prop && sortTitleData.order ==='ascending'"
            class="icon-arrow_up_24px"
          ></i>
        </li>
      </ul>
      <div class="changeBtn">
        <span
          :class="{'on':tableShowType==='list'}"
          @click="setTableShowType('list')"
        >
        <SvgIcon width="18"  height="16"
                name="table-btn"/></span>
        <span
          :class="{'on':tableShowType==='card'}"
          @click="setTableShowType('card')"
        >
          <SvgIcon width="18" height="16" name="list-btn"/>
        </span>
      </div>
    </div>

    <!-- <CardTableLoading v-if="rankListLoading && !data.length" /> -->
    <div
      class="list"
      :class="{'nomore':data.length<1}"
    >
      <!-- v-if="rankListLoading && !data.length" -->

      <div
        class="list-item"
        v-for="(val,key) in dataList"
        :key="key"
      >
        <ChartCard
          :item="val"
          @showCard="showCard"
          @hideCard="hideCard"
          @toPersonal="toUserPage"
          @subscribe="handleSub"
        >
          <template slot="avatar">
            <div
              class="avatar"
              @mouseenter.self="showCard($event,val)"
              @mouseleave="hideCard"
              @click="toUserPage"
            >
              <img :src="val.avatar+ '?x-oss-process=image/resize,m_fill,h_70,w_70'" />
            </div>
          </template>
        </ChartCard>
      </div>
      <CardTableLoading v-if="dateIsLoading" />
      <div
        class="empty-table"
        v-if="data.length<1"
      >
        <div class="empty-image">
          <SvgIcon
            width="218"
            height="218"
            name="no-data"
          />
        </div>
        <div class="empty-text"><span>{{$t('noData2')}}</span></div>
      </div>
      <!-- v-if="dateIsLoading && this.data && this.data.length" -->
      <!-- <CardTableLoading v-if="dateIsLoading && this.data && this.data.length" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';
import SvgIcon from '@/components/svg/index.ts';
import { namespace } from 'vuex-class';

import CardTableLoading from '@/views/rank-list/list/CardTableLoading.vue';

import zhCN from '@/i18n/zh-CN/views/rank-list/list/List';
import zhTW from '@/i18n/zh-TW/views/rank-list/list/List';
import enUS from '@/i18n/en-US/views/rank-list/list/List';
import zhHK from '@/i18n/zh-HK/views/rank-list/list/List';

const RankStore = namespace('RankStore');
@Component({
  components: {
    ChartCard: () => import('@/components/chart-card/card.vue'),
    SvgIcon,
    CardTableLoading,
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
export default class CardList extends Vue {
  @Prop({
    type: Array,
    default: () => [],
  })
  data: any;

  @Prop({
    type: Array,
    default: () => [],
  })
  showProps: any;

  @RankStore.State
  tableShowType: any;

  @Prop()
  sortTitleData: any;

  @Prop()
  showPropsList: any;

  @RankStore.Mutation
  setTableShowType: any;

  @RankStore.State
  rankListLoading: any;

  get dataList() {
    if (this.rankListLoading) {
      const data = this.data && this.data.length ? this.data : [];
      return data;
    }
    return this.data;
  }

  showCard($event: any, item: any) {
    const itemList = item.item;
    this.$emit('showCard', $event, itemList);
  }

  hideCard($event: any) {
    this.$emit('hideCard');
  }

  toUserPage(item: any) {
    this.$emit('toUserPage', item.item);
  }

  handleSub(item: any) {
    this.$emit('handleSub', item.item);
  }

  public get dateIsLoading() {
    return this.rankListLoading;
  }

  mounted() {}

  handleSortChange(obj: any) {
    let o: any;
    if (this.sortTitleData.prop !== obj.prop) {
      o = { prop: obj.prop, order: 'ascending' };
    } else if (this.sortTitleData.order === 'ascending') {
      o = { prop: obj.prop, order: 'descending' };
    } else {
      o = { prop: null, order: null };
    }
    this.$emit('sortChange', o);
  }
}
</script>
<style lang="less" scope>
.card-table {
  min-width: 1180px;
  .header {
    height: 50px;
    background-color: #ffffff;
    margin-bottom: 12px;
    line-height: 30px;
    padding: 10px 0 10px 20px;
    position: relative;
    min-width: 1180px;
    // justify-content: space-between;
    h2 {
      font-size: 12px;
      color: #999;
      margin-right: 30px;
      float: left;
    }
    .header-list {
      display: flex;
      font-size: 12px;
      color: #333;
      float: left;
      li {
        padding-right: 40px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &.on {
          color: @default-color;
        }
      }
    }
    .changeBtn {
      float: right;
      width: 130px;
      text-align: center;
      top: 13px;
      span {
        display: inline-block;
        cursor: pointer;
        width: 30px;
        &.on {
          color: @default-color;
        }
      }
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-right: -12px;
    &.nomore {
      background-color: #ffffff;
      margin-right: 0;
    }
    .list-item {
      margin-right: 12px;
      margin-bottom: 12px;
      .avatar {
        width: 50px;
        height: 50px;
        img {
          border-radius: 50px;
        }
      }
    }
    .empty-table {
      width: 50%;
      text-align: center;
      display: flex;
      padding: 40px 0;
      margin: 0 auto;
      flex-direction: column;
      justify-content: center;

      .empty-text {
        font-size: 18px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
      }
    }
  }
}
</style>
