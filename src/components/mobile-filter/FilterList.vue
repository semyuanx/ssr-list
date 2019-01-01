<template>
  <div class="filter-list-container">
    <section class="filter-result-container">

      <el-table
        class="mobile-rank-table"
        :data="data"
        :default-sort = "{prop: 'ROI', order: 'descending'}"
      >
        <el-table-column
          align="left"
          label="基本信息"
          prop="name"
        >
          <template slot-scope="scope">
            <p class="main-paragraph">
              <span class="main-paragraph-name">{{scope.row.name}}</span>
              <span class="main-paragraph-order">#5</span>
            </p>
            <p class="sub-paragraph">
              <span>logo</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          align="right"
          label="收益率"
          prop="ROI"
          sortable
        >
          <template slot-scope="scope">
            <p class="rateOfReturn">
              <span :class="scope.row.ROI >= 0 ? 'rateValue up' : 'rateValue'">{{scope.row.ROI | percentFormat}}</span>
              <!-- <span class="ratePercent">%</span> -->
            </p>
          </template>
        </el-table-column>
        <el-table-column
          align="right"
          label="订阅人数"
          prop="Subscribers"
          sortable
        >
          <template slot-scope="scope">
            <p class="orderCount">{{scope.row.Subscribers}}</p>
          </template>
        </el-table-column>
        <el-table-column
          align="right"
          label=""
        >
          <template slot-scope="scope">
            <filter-button
              :border="true"
              class="filter-button"
            >{{scope.row.price || '$9.99'}}</filter-button>
          </template>
        </el-table-column>

      </el-table>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { percentFormat } from '@/utils/format';
import FilterButton from './FilterButton.vue';
import { Table, TableColumn } from 'element-ui';

@Component({
  filters: {
    percentFormat: (val: number) => percentFormat(val),
  },
  components: {
    FilterButton,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
})
export default class FilterList extends Vue {
  rateColor: string = '#F09D58';

  @Prop({
    type: Array,
    default: () => [],
  })
  data: any;
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
.filter-button{
  margin:2px 0;
}
.filter-result-container {
  padding: 0 15px;
  box-sizing: border-box;
  .v2-table {
    width: 100%;
  }
  .mobile-rank-table {
    .rateOfReturn {
      font-size: 18px;
      display: flex;
      align-items: baseline;
      justify-content: flex-end;
      .up {
        color: #00aa6d;
      }
      .ratePercent {
        font-size: 12px;
      }
    }
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

.orderCount {
  font-size: 18px;
}
</style>
