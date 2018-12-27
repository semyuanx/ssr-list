<template>
<div class="list-container">
  <div class="list-table">
    <v2-table class="rank-table"
      :data="data"
      :row-class-name="getRowClassName"
      @sort-change="handleSortChange">
      <v2-table-column label="交易员" prop="Account" width="236px">
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" class="custom-display-row-line">
            <div class="trader-container-row">
              <div class="loading-first avatar">
                <img :src="base+'/Avata/'+ (scope.row.Account && scope.row.Account.Account)" />
              </div>
              <div class="loading-first trader-info">
                <div class="info-1">用户名称 #{{scope.row.Account && scope.row.Account.BrokerID}}</div>
                <div class="info-2">
                  Fxpro
                </div>
              </div>
            </div>
          </div>
          <div v-if="dateIsLoading" class="custom-display-row-loading-1">
            <div class="trader-container-row">
              <div class="loading-first loading-avatar">
                <img :src="base+'/Avata/'+(scope.row.Account && scope.row.Account.Account)" />
              </div>
              <div class="loading-first loading-info">
                <div class="info-1"></div>
                <div class="info-2"></div>
              </div>
            </div>
          </div>
        </template>
      </v2-table-column>
      <v2-table-column label="交易能力值" prop="Score" sortable>
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" class="custom-display-row-line">{{scope.row.Score | numberFormatOneParams}}</div>
          <div v-if="dateIsLoading" class="custom-display-row-loading"></div>
        </template>
      </v2-table-column>
      <v2-table-column label="收益率" prop="ROI" width="150" sortable>
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" :class="`custom-display-row-line `">
            <span :class="scope.row.ROI >= 0 ? 'special-rate' : ''">{{scope.row.ROI | percentFormat}}</span>
          </div>
          <div v-if="dateIsLoading" class="custom-display-row-loading"></div>
        </template>
      </v2-table-column>
      <v2-table-column label="最大回撤" prop="MaxRetracement" sortable>
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" class="custom-display-row-line">{{scope.row.MaxRetracement | percentFormat}}</div>
          <div v-if="dateIsLoading" class="custom-display-row-loading"></div>
        </template>
      </v2-table-column>
      <v2-table-column label="交易周期" prop="Weeks" sortable>
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" class="custom-display-row-line">{{scope.row.Weeks || 0}}周</div>
          <div v-if="dateIsLoading" class="custom-display-row-loading"></div>
        </template>
      </v2-table-column>
      <v2-table-column label="擅长品种" prop="ExpSymbol" sortable>
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" class="custom-display-row-line">{{scope.row.ExpSymbol}}</div>
          <div v-if="dateIsLoading" class="custom-display-row-loading"></div>
        </template>
      </v2-table-column>
      <v2-table-column label="订阅人数" prop="Subscribers" sortable>
        <template slot-scope="scope">
          <div v-if="!dateIsLoading" class="custom-display-row-line">{{scope.row.Subscribers}}</div>
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
        <!-- eslint-disable-next-line -->
        <template slot-scope="scope">
          <div @click="handleSub" v-if="!dateIsLoading" class="custom-display-row-sub">
            <span class="sub-row-btn">订阅</span>
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
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import SvgIcon from '@/components/svg/index.ts';
import { numberFormat, percentFormat } from '@/utils/format';

@Component({
  components: {
    SvgIcon,
  },
  filters: {
    numberFormatOneParams: (val: number) => numberFormat(val, 1),
    percentFormat: (val: number) => percentFormat(val),
  },
})
export default class List extends Vue {
  isLoading: boolean = false;

  @Prop({
    type: Array,
    default: () => [],
  })
  data: any;

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

  handleSub() {
    console.log('to subsribe');
  }

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
        .trader-container-row {
          display: flex;
          flex-direction: row;
          .avatar {
            margin-left: 20px;
            width:40px;
            height:40px;
            border-radius: 20px;
            overflow: hidden;
          }
          .trader-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            text-align: left;
            padding-left: 4px;
          }
        }
      }
      .custom-display-row-sub {
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(255,98,0,1);
        .sub-row-btn {
          background: transparent;
          transition: background-color .5s ease-in,
                      color .5s ease-in;
        }
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
