<template>
  <div class="filter-list-container">
    <section class="filter-selected-container">
      <div>
        <filter-button class="filter-button">收益率 >10%</filter-button>
        <filter-button class="filter-button">最大回测 >10%</filter-button>
      </div>
      <router-link
        to="/filter"
        class="filter-link"
      >
        <span>筛选</span>
      </router-link>
    </section>
    <section class="filter-result-container">
      <v2-table
        :data="list2"
        :loading="loading"
        :default-sort='{prop: "date", order: "descending"}'
        @sort-change="handleSortChange"
        :cell-height="55"
        :col-height="33"
      >
        <!-- <div slot="loading">custom loading component</div> -->
        <v2-table-column
          label="基本信息"
          align="left"
        >
          <template slot-scope="scope">
            <p class="main-paragraph">
              <span class="main-paragraph-name">{{scope.row.name}}</span>
              <span class="main-paragraph-order">#5</span>
            </p>
            <p class="sub-paragraph">
              <span
                class="rate-span"
                :style="{background:rateColor}"
              >A</span>
              <span>logo</span>
            </p>
          </template>
        </v2-table-column>
        <v2-table-column
          label="收益率"
          align="right"
          sortable
        >
          <template slot-scope="scope">
            <p class="rateOfReturn up">
              <span class="rateValue">{{scope.row.rate}}</span>
              <span class="ratePercent">%</span>
            </p>
          </template>
        </v2-table-column>
        <v2-table-column
          label="订阅人数"
          sortable
          :width="75"
          align="right"
        >
          <template slot-scope="scope">
            <p class="orderCount">{{scope.row.count}}</p>
          </template>
        </v2-table-column>
        <v2-table-column
          label=""
          align="right"
        >
          <template slot-scope="scope">
            <filter-button
              :border="true"
              class="filter-button"
            >{{scope.row.price}}</filter-button>
          </template>
        </v2-table-column>
      </v2-table>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FilterButton from './FilterButton.vue';

@Component({
  components: {
    FilterButton,
  },
})
export default class FilterList extends Vue {
  rateColor: string = '#F09D58';

  loading: boolean = false;

  list2: any = [
    {
      name: '来士大夫稍等',
      rate: '188.82',
      count: 2012,
      price: '$229.99',
    },
    {
      name: '是大法官',
      rate: '1884.82',
      count: 22,
      price: '$9.99',
    },
    {
      name: '搜索',
      rate: '188.82',
      count: 20312,
      price: '$99.99',
    },
  ];

  handleSortChange({ prop, order }: any) {
    // Customize your sorting method. Maybe it will get data from server.
    this.loading = true;
    const list = [].concat(this.list2);
    setTimeout(() => {
      this.loading = false;
      this.list2 = [].concat(list);
    }, 2000);
  }
}
</script>


<style lang="less" scoped>
@theme-color: #ff6200;
.filter-list-container {
  font-family: PingFang-SC-Medium;
  color: #333;
  font-weight: 500;
  background-color: #fff;
  .filter-link {
    text-decoration: none;
    color: @theme-color;
    font-size: 14px;
  }
}
.filter-result-container {
  padding: 0 15px;
  box-sizing: border-box;
  .v2-table {
    width: 100%;
  }
}
.filter-selected-container {
  border-bottom: 1px solid #ebeef5;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .filter-button {
    margin-right: 10px;
    margin-bottom: 6px;
    margin-top: 6px;
  }
}

.rate-span {
  width: 14px;
  height: 14px;
  border-radius: 2px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-right: 8px;
}

.sub-paragraph,
.main-paragraph {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.main-paragraph {
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
  .main-paragraph-order {
    color: #999;
    display: inline-block;
  }
  .main-paragraph-name {
    display: inline-block;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 80px;
  }
}

.rateOfReturn {
  font-size: 18px;
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  &.up {
    color: #00aa6d;
  }
  .ratePercent {
    font-size: 12px;
  }
}
.orderCount {
  font-size: 18px;
}
</style>
