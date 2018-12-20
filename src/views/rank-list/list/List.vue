<template>
<div class="list-container">
  <div class="list-table">
    <v2-table class="rank-table"
      :data="lists"
      :row-class-name="getRowClassName"
      @sort-change="handleSortChange">
      <v2-table-column label="交易员" prop="name" width="236px">
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" class="custom-display-row-line">{{scope.row.name}}</div>
          <div v-if="dateIsLoading" class="custom-display-row-loading-1">
            <div class="trader-container-row">
              <div class="loading-first loading-avatar"></div>
              <div class="loading-first loading-info">
                <div class="info-1"></div>
                <div class="info-2"></div>
              </div>
            </div>
          </div>
        </template>
      </v2-table-column>
      <v2-table-column label="交易能力值" prop="date" sortable>
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" class="custom-display-row-line">{{scope.row.date}}</div>
          <div v-if="dateIsLoading" class="custom-display-row-loading"></div>
        </template>
      </v2-table-column>
      <v2-table-column label="收益率" prop="address" width="150" sortable>
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" class="custom-display-row-line special-rate">
            {{scope.row.name}}
          </div>
          <div v-if="dateIsLoading" class="custom-display-row-loading"></div>
        </template>
      </v2-table-column>
      <v2-table-column label="最大回撤" prop="birthDay" sortable>
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" class="custom-display-row-line">{{scope.row.name}}</div>
          <div v-if="dateIsLoading" class="custom-display-row-loading"></div>
        </template>
      </v2-table-column>
      <v2-table-column label="交易周期" prop="songs" sortable>
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" class="custom-display-row-line">{{scope.row.name}}</div>
          <div v-if="dateIsLoading" class="custom-display-row-loading"></div>
        </template>
      </v2-table-column>
      <v2-table-column label="擅长品种" prop="province" sortable>
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" class="custom-display-row-line">{{scope.row.name}}</div>
          <div v-if="dateIsLoading" class="custom-display-row-loading"></div>
        </template>
      </v2-table-column>
      <v2-table-column label="订阅人数" prop="city" sortable>
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" class="custom-display-row-line">{{scope.row.name}}</div>
          <div v-if="dateIsLoading" class="custom-display-row-loading"></div>
        </template>
      </v2-table-column>
      <v2-table-column label="走势图" prop="country">
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" class="custom-display-row-line">{{scope.row.name}}</div>
          <div v-if="dateIsLoading" class="custom-display-row-loading"></div>
        </template>
      </v2-table-column>
      <v2-table-column label="订阅" prop="age">
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" class="custom-display-row-sub">
            <span class="sub-row-btn">{{scope.row.age}}</span>
          </div>
          <div v-if="dateIsLoading" class="custom-display-row-loading"></div>
        </template>
      </v2-table-column>
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
  isLoading: boolean = true;

  getRowClassName({ row, rowIndex }: any) {
    if (rowIndex % 2 === 0) {
      return 'default-row odd-row';
    }
    return 'default-row even-row';
  }

  public get dateIsLoading() {
    return this.isLoading;
  }


  mounted() {
    // setTimeout(() => this.isLoading = false, 5000);
  }

  lists: Array<any> = [] || [
    {},
    {},
    {},
    {},
    {},
    {},
  ] || [
    {
      name: 'hellokitty1',
      date: 'date',
      address: 'date',
      birthDay: 'date',
      songs: 'date',
      province: 'hellokitty1',
      city: 'hellokitty1',
      country: 'hellokitty1',
      age: '$0.99/月',
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
      age: '$0.99/月',
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
      age: '$0.99/月',
    },
  ];

  handleSortChange(e:any) {
    console.log(e);
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
          .custom-display-row-sub {
            .sub-row-btn {
              display: inline-block;
              cursor: pointer;
              width:100px;
              height:30px;
              background:rgba(255,98,0,1);
              border-radius:20px;
              // border:2px solid rgba(255,98,0,1);
              font-size:14px;
              font-family:MicrosoftYaHei;
              color:rgba(255,255,255,1);
              line-height:30px;
            }
          }
        }
      }
      :global(.v2-table__empty-data) {
        height: auto;
      }

      .custom-display-row-line {
        // border: 1px solid red;
        font-size:16px;
        font-family:DINOT-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:21px;
      }
      .custom-display-row-sub {
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(255,98,0,1);
      }
      .custom-display-row-loading {
        height:14px;
        background:rgba(230,230,230,1);
        animation: animations-loading 2s ease-in-out 0.1s infinite forwards;
      }
      .custom-display-row-loading-1 {
        animation: animations-loading 2s ease-in-out 0.1s infinite forwards;
        display: flex;
        flex-direction: row;
        .trader-container-row {
          display: flex;
          flex-direction: row;
          margin-left: 20px;
          .loading-avatar {
            width:40px;
            height:40px;
            background:rgba(230,230,230,1);
            border-radius: 20px;
          }
          .loading-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 4px;
            .info-1 {
              width:70px;
              height:10px;
              background:rgba(230,230,230,1);
            }
            .info-2 {
              width:70px;
              height:6px;
              background:rgba(230,230,230,1);
            }
          }
        }
      }
      .special-rate {
        color:rgba(31,187,149,1);
      }
      .empty-table {
        display: flex;
        padding: 100px 0;
        flex-direction: column;
        justify-content: center;

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

@keyframes animations-loading{
    0%{opacity:0.1;}
    10%{opacity:.2;}
    20%{opacity:.4;}
    30%{opacity:.6;}
    40%{opacity:.8;}
    50%{opacity:1;}
    60%{opacity:.8;}
    70%{opacity:.6;}
    80%{opacity:.4;}
    90%{opacity:.2;}
    100%{opacity:0.1;}
}
</style>
