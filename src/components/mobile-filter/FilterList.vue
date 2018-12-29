<template>
  <div class="filter-list-container">
    <section class="filter-result-container">

      <SimpleTable :header="header" :data="data">

      </SimpleTable>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { percentFormat } from '@/utils/format';
import FilterButton from './FilterButton.vue';
import SimpleTable from '@/components/simple-table/index.vue';

@Component({
  filters: {
    percentFormat: (val: number) => percentFormat(val),
  },
  components: {
    FilterButton,
    SimpleTable,
  },
})
export default class FilterList extends Vue {
  rateColor: string = '#F09D58';

  header: Array<any> = [
    { label: '基本信息', prop: 'a', align: '' },
    { label: '收益率', prop: 'b', align: 'right' },
    { label: '订阅人数', prop: 'c', align: 'right' },
    { label: '', prop: 'd', align: 'right' },
  ];


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
