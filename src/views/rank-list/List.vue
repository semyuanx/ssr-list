<template>
<div class="list-container">
  <div class="list-table">
    <v2-table class="rank-table"
      :data="lists"
      :row-class-name="getRowClassName"
      @sort-change="handleSortChange">
      <v2-table-column label="交易员" prop="name"></v2-table-column>
      <v2-table-column label="交易能力值" prop="date" sortable></v2-table-column>
      <v2-table-column label="收益率" prop="address" width="150" sortable></v2-table-column>
      <v2-table-column label="最大回撤" prop="birthDay" sortable></v2-table-column>
      <v2-table-column label="交易周期" prop="songs" sortable></v2-table-column>
      <v2-table-column label="擅长品种" prop="province" sortable></v2-table-column>
      <v2-table-column label="订阅人数" prop="city" sortable></v2-table-column>
      <v2-table-column label="走势图" prop="country"></v2-table-column>
      <v2-table-column label="订阅" prop="age"></v2-table-column>
      <template slot="empty">
        <div class="empty-table">
          <div class="empty-image"><SvgIcon width="218" height="218" name="no-data" /></div>
          <div class="empty-text"><span>没有找到相关内容，请您换个条件试试吧~</span></div>
        </div>
      </template>
    </v2-table>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import SvgIcon from '@/components/svg/index.ts';

@Component({
  components: {
    SvgIcon,
  },
})
export default class List extends Vue {
  getRowClassName({ row, rowIndex }: any) {
    if (rowIndex % 2 === 0) {
      return 'default-row odd-row';
    }
    return 'default-row even-row';
  }

  lists: Array<any> =[] || [
    {
      name: 'hellokitty1',
      date: 'date',
      address: 'date',
      birthDay: 'date',
      songs: 'date',
      province: 'hellokitty1',
      city: 'hellokitty1',
      country: 'hellokitty1',
      age: 'hellokitty1',
    },
    {
      name: 'hellokitty12',
      date: 'date',
      address: 'date',
      birthDay: 'date',
      songs: 'date',
      province: 'hellokitty1',
      city: 'hellokitty1',
      country: 'hellokitty1',
      age: 'hellokitty1',
    },
    {
      name: 'hellokitty13',
      date: 'date',
      address: 'date',
      birthDay: 'date',
      songs: 'date',
      province: 'hellokitty1',
      city: 'hellokitty1',
      country: 'hellokitty1',
      age: 'hellokitty1',
    },
    {
      name: 'hellokitty14',
      date: 'date',
      address: 'date',
      birthDay: 'date',
      songs: 'date',
      province: 'hellokitty1',
      city: 'hellokitty1',
      country: 'hellokitty1',
      age: 'hellokitty1',
    },
  ];

  handleSortChange(e:any) {
    console.log(e);
  }

  mounted() {

  }
}
</script>
<style lang="less" scoped>
.list-container {
  .list-table {
    .rank-table {
      :global(.odd-row) {
        background:rgba(249,249,249,1);
      }
      .even-row {
        background:rgba(255,255,255,1);
      }
      :global(.default-row) {
        height: 80px;
        &:hover {
          background:rgba(255,255,255,1);
          box-shadow:0px 0px 30px 0px rgba(0,0,0,0.1);
        }
      }
      :global(.v2-table__empty-data) {
        height: auto;
      }

      .empty-table {
        display: flex;
        padding: 100px 0;
        flex-direction: column;
        justify-content: center;
        .empty-image {

        }
        .empty-text {
          font-size:18px;
          font-family:MicrosoftYaHei;
          color:rgba(51,51,51,1);
          line-height:24px;
        }
      }
    }
  }
}
</style>
