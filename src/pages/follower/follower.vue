<template>
  <div class="rank-container">
    <!-- <div>
      <FilterHeader :selected="selected" @filter-changed="filterChanged" />
    </div> -->
    <div style="padding-bottom:40px;">
      <List
        :data="dataList"
        :showProps="showProps"
        :getData="getData"
        :sortTitleData="sortTitleData"
        @sortChange="sortChange"
      />
      <div
        class="listNone"
        v-if="!hasMore && TotalCount > 0"
      >{{ $t('noData') }}</div>
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

import zhCN from '@/i18n/zh-CN/pages/Rank';
import zhTW from '@/i18n/zh-TW/pages/Rank';
import zhHK from '@/i18n/zh-HK/pages/Rank';
import enUS from '@/i18n/en-US/pages/Rank';

const FollowerStore = namespace('FollowerStore');

let isEnterLoad: boolean = false;

@Component({
  components: {
    FilterHeader,
    List,
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
export default class RankList extends Vue {
  selected: any = {
    label: '',
    val: 30,
    selected: false,
  };

  showProps: any = [
    {
      label: this.lang('FollowMoney'),
      prop: 'FollowMoney',
      suffix: '',
    },
    {
      label: this.lang('Pips'),
      prop: 'Pips',
      suffix: this.lang('Pip'),
    },
    {
      label: this.lang('Roi'),
      prop: 'Roi',
      suffix: '',
    },
    {
      label: this.lang('AveragePips'),
      prop: 'AveragePips',
      suffix: this.lang('Pip'),
    },
    {
      label: this.lang('Orders'),
      prop: 'Orders',
      suffix: this.lang('Volumes'),
    },
    {
      label: this.lang('Weeks'),
      prop: 'Weeks',
      suffix: this.lang('Week'),
    },
  ];

  @FollowerStore.Action
  getRankFollowers: any;

  @FollowerStore.State
  followers: any;

  TotalCount: any;

  paramsData: any = {
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
    // return this.followers;
    return [
      {
        UserID: 183606,
        NickName: 'hovey2001',
        BrokerID: 7,
        AccountIndex: 3,
        AccountList: [
          {
            UserType: 0,
            AccountType: 0,
            AccountIndex: 1,
            Broker: 'Demo',
            BrokerId: 3,
            BrokerName: '模拟账户',
          },
          {
            UserType: 2,
            AccountType: 1,
            AccountIndex: 2,
            Broker: 'KVB Prime',
            BrokerId: 6,
            BrokerName: 'KVB昆仑国际',
          },
          {
            UserType: 2,
            AccountType: 1,
            AccountIndex: 3,
            Broker: 'FxPro',
            BrokerId: 7,
            BrokerName: 'FxPro浦汇',
          },
          {
            UserType: 2,
            AccountType: 2,
            AccountIndex: 4,
            Broker: 'FOREX-SAM',
            BrokerId: 107,
            BrokerName: 'FOREX.COM嘉盛',
          },
          {
            UserType: 2,
            AccountType: 2,
            AccountIndex: 5,
            Broker: 'ExnessCY-SAM',
            BrokerId: 114,
            BrokerName: 'Exness',
          },
        ],
        FollowMoney: 42698.69,
        Pips: 14658.299999999996,
        Roi: 0.9878316173738398,
        AveragePips: 25.398740554156173,
        Orders: 527,
        Weeks: 9,
        List: [
          {
            Date: '1548345600',
            Money: 16.900000000000002,
            TotalMoney: 16.900000000000002,
            TotalSelfMoney: -0.18,
            TotalFollowMoney: 17.080000000000002,
            TotalStandardlots: 0.5599999999999999,
            TotalSelfStandardlots: 0.01,
            TotalFollowStandardlots: 0.5499999999999999,
            TotalPips: 81.9,
            TotalSelfPips: -2,
            TotalFollowPips: 83.9,
            FollowMoney: 17.080000000000002,
            Standardlots: 0.5599999999999999,
            SelfMoney: -0.18,
            Time: '1548345600',
            Value: 16.900000000000002,
          },
          {
            Date: '1548432000',
            Money: 17.08,
            TotalMoney: 16.9,
            TotalSelfMoney: -0.18,
            TotalFollowMoney: 17.08,
            TotalStandardlots: 0.56,
            TotalSelfStandardlots: 0.01,
            TotalFollowStandardlots: 0.55,
            TotalPips: 81.9,
            TotalSelfPips: -2,
            TotalFollowPips: 83.9,
            FollowMoney: 17.08,
            Standardlots: 0.55,
            SelfMoney: 0,
            Time: '1548432000',
            Value: 16.9,
          },
          {
            Date: '1548518400',
            Money: 0,
            TotalMoney: 16.9,
            Time: '1548518400',
            Value: 16.9,
          },
          {
            Date: '1548604800',
            Money: 43.769999999999996,
            TotalMoney: 60.67,
            TotalSelfMoney: -0.18,
            TotalFollowMoney: 60.849999999999994,
            TotalStandardlots: 1.6099999999999999,
            TotalSelfStandardlots: 0.01,
            TotalFollowStandardlots: 1.6,
            TotalPips: 176,
            TotalSelfPips: -2,
            TotalFollowPips: 178,
            FollowMoney: 43.769999999999996,
            Standardlots: 1.05,
            SelfMoney: 0,
            Time: '1548604800',
            Value: 60.67,
          },
          {
            Date: '1548691200',
            Money: 41.839999999999996,
            TotalMoney: 102.50999999999999,
            TotalSelfMoney: -0.18,
            TotalFollowMoney: 102.69,
            TotalStandardlots: 2.91,
            TotalSelfStandardlots: 0.01,
            TotalFollowStandardlots: 2.9000000000000004,
            TotalPips: 191.6,
            TotalSelfPips: -2,
            TotalFollowPips: 193.6,
            FollowMoney: 41.839999999999996,
            Standardlots: 1.3,
            SelfMoney: 0,
            Time: '1548691200',
            Value: 102.50999999999999,
          },
          {
            Date: '1548777600',
            Money: 518.63,
            TotalMoney: 621.14,
            TotalSelfMoney: -0.18,
            TotalFollowMoney: 621.3199999999999,
            TotalStandardlots: 6.980000000000001,
            TotalSelfStandardlots: 0.01,
            TotalFollowStandardlots: 6.9700000000000015,
            TotalPips: 756.6,
            TotalSelfPips: -2,
            TotalFollowPips: 758.6,
            FollowMoney: 518.63,
            Standardlots: 4.070000000000001,
            SelfMoney: 0,
            Time: '1548777600',
            Value: 621.14,
          },
          {
            Date: '1548864000',
            Money: 485.58,
            TotalMoney: 1106.72,
            TotalSelfMoney: -0.18,
            TotalFollowMoney: 1106.8999999999999,
            TotalStandardlots: 10.260000000000002,
            TotalSelfStandardlots: 0.01,
            TotalFollowStandardlots: 10.250000000000004,
            TotalPips: 1315.8000000000002,
            TotalSelfPips: -2,
            TotalFollowPips: 1317.8000000000002,
            FollowMoney: 485.58,
            Standardlots: 3.280000000000001,
            SelfMoney: 0,
            Time: '1548864000',
            Value: 1106.72,
          },
          {
            Date: '1548950400',
            Money: 338.65999999999997,
            TotalMoney: 1445.38,
            TotalSelfMoney: -0.18,
            TotalFollowMoney: 1445.56,
            TotalStandardlots: 13.130000000000003,
            TotalSelfStandardlots: 0.01,
            TotalFollowStandardlots: 13.120000000000005,
            TotalPips: 1675.5,
            TotalSelfPips: -2,
            TotalFollowPips: 1677.5,
            FollowMoney: 338.65999999999997,
            Standardlots: 2.870000000000001,
            SelfMoney: 0,
            Time: '1548950400',
            Value: 1445.38,
          },
          {
            Date: '1549036800',
            Money: 75.44000000000003,
            TotalMoney: 1445.3799999999999,
            TotalSelfMoney: -0.18,
            TotalFollowMoney: 1445.56,
            TotalStandardlots: 13.130000000000003,
            TotalSelfStandardlots: 0.01,
            TotalFollowStandardlots: 13.120000000000003,
            TotalPips: 1675.5,
            TotalSelfPips: -2,
            TotalFollowPips: 1677.5,
            FollowMoney: 75.44000000000003,
            Standardlots: 1.3399999999999999,
            SelfMoney: 0,
            Time: '1549036800',
            Value: 1445.3799999999999,
          },
          {
            Date: '1549123200',
            Money: 0,
            TotalMoney: 1445.3799999999999,
            Time: '1549123200',
            Value: 1445.3799999999999,
          },
          {
            Date: '1549209600',
            Money: 144.03,
            TotalMoney: 1589.41,
            TotalSelfMoney: -0.18,
            TotalFollowMoney: 1589.59,
            TotalStandardlots: 14.730000000000002,
            TotalSelfStandardlots: 0.01,
            TotalFollowStandardlots: 14.720000000000004,
            TotalPips: 1804.4,
            TotalSelfPips: -2,
            TotalFollowPips: 1806.4,
            FollowMoney: 144.03,
            Standardlots: 1.6,
            SelfMoney: 0,
            Time: '1549209600',
            Value: 1589.41,
          },
          {
            Date: '1549296000',
            Money: 235.07999999999998,
            TotalMoney: 1824.49,
            TotalSelfMoney: -0.18,
            TotalFollowMoney: 1824.6699999999998,
            TotalStandardlots: 15.880000000000003,
            TotalSelfStandardlots: 0.01,
            TotalFollowStandardlots: 15.870000000000005,
            TotalPips: 2131.4,
            TotalSelfPips: -2,
            TotalFollowPips: 2133.4,
            FollowMoney: 235.07999999999998,
            Standardlots: 1.15,
            SelfMoney: 0,
            Time: '1549296000',
            Value: 1824.49,
          },
          {
            Date: '1549382400',
            Money: -50.24000000000004,
            TotalMoney: 1774.25,
            TotalSelfMoney: -0.18,
            TotalFollowMoney: 1774.4299999999998,
            TotalStandardlots: 18.390000000000004,
            TotalSelfStandardlots: 0.01,
            TotalFollowStandardlots: 18.380000000000006,
            TotalPips: 2435.5,
            TotalSelfPips: -2,
            TotalFollowPips: 2437.5,
            FollowMoney: -50.24000000000004,
            Standardlots: 2.5100000000000002,
            SelfMoney: 0,
            Time: '1549382400',
            Value: 1774.25,
          },
          {
            Date: '1549468800',
            Money: -5351.25,
            TotalMoney: -3577,
            TotalSelfMoney: -1419.27,
            TotalFollowMoney: -2157.73,
            TotalStandardlots: 31.820000000000007,
            TotalSelfStandardlots: 6.31,
            TotalFollowStandardlots: 25.510000000000005,
            TotalPips: 2203.8,
            TotalSelfPips: -71.60000000000001,
            TotalFollowPips: 2275.3999999999996,
            FollowMoney: -3932.16,
            Standardlots: 13.430000000000001,
            SelfMoney: -1419.09,
            Time: '1549468800',
            Value: -3577,
          },
          {
            Date: '1549555200',
            Money: -455.19,
            TotalMoney: -4032.19,
            TotalSelfMoney: -1419.27,
            TotalFollowMoney: -2612.92,
            TotalStandardlots: 32.28000000000001,
            TotalSelfStandardlots: 6.31,
            TotalFollowStandardlots: 25.970000000000006,
            TotalPips: 2167.4,
            TotalSelfPips: -71.60000000000001,
            TotalFollowPips: 2238.9999999999995,
            FollowMoney: -455.19,
            Standardlots: 0.45999999999999996,
            SelfMoney: 0,
            Time: '1549555200',
            Value: -4032.19,
          },
          {
            Date: '1549641600',
            Money: 0,
            TotalMoney: -4032.19,
            Time: '1549641600',
            Value: -4032.19,
          },
          {
            Date: '1549728000',
            Money: 0,
            TotalMoney: -4032.19,
            Time: '1549728000',
            Value: -4032.19,
          },
          {
            Date: '1549814400',
            Money: -6916.2,
            TotalMoney: -10948.39,
            TotalSelfMoney: -1216.45,
            TotalFollowMoney: -9731.939999999999,
            TotalStandardlots: 41.63000000000001,
            TotalSelfStandardlots: 7.81,
            TotalFollowStandardlots: 33.82000000000001,
            TotalPips: 1279.9,
            TotalSelfPips: -32.400000000000006,
            TotalFollowPips: 1312.2999999999995,
            FollowMoney: -7119.0199999999995,
            Standardlots: 9.350000000000001,
            SelfMoney: 202.82,
            Time: '1549814400',
            Value: -10948.39,
          },
          {
            Date: '1549900800',
            Money: 165.64999999999998,
            TotalMoney: -10782.74,
            TotalSelfMoney: -1111.26,
            TotalFollowMoney: -9671.48,
            TotalStandardlots: 42.28000000000001,
            TotalSelfStandardlots: 8.309999999999999,
            TotalFollowStandardlots: 33.970000000000006,
            TotalPips: 1482.3000000000002,
            TotalSelfPips: -9.600000000000005,
            TotalFollowPips: 1491.8999999999994,
            FollowMoney: 60.459999999999994,
            Standardlots: 0.65,
            SelfMoney: 105.19,
            Time: '1549900800',
            Value: -10782.74,
          },
          {
            Date: '1549987200',
            Money: 84.13999999999997,
            TotalMoney: -10698.6,
            TotalSelfMoney: -1111.26,
            TotalFollowMoney: -9587.34,
            TotalStandardlots: 46.68000000000001,
            TotalSelfStandardlots: 8.309999999999999,
            TotalFollowStandardlots: 38.370000000000005,
            TotalPips: 2158.5,
            TotalSelfPips: -9.600000000000005,
            TotalFollowPips: 2168.0999999999995,
            FollowMoney: 84.13999999999997,
            Standardlots: 4.4,
            SelfMoney: 0,
            Time: '1549987200',
            Value: -10698.6,
          },
          {
            Date: '1550073600',
            Money: 60.31,
            TotalMoney: -10638.29,
            TotalSelfMoney: -1144.26,
            TotalFollowMoney: -9494.03,
            TotalStandardlots: 47.78000000000001,
            TotalSelfStandardlots: 8.809999999999999,
            TotalFollowStandardlots: 38.970000000000006,
            TotalPips: 2423.7,
            TotalSelfPips: -16.200000000000003,
            TotalFollowPips: 2439.8999999999996,
            FollowMoney: 93.31,
            Standardlots: 1.1,
            SelfMoney: -33,
            Time: '1550073600',
            Value: -10638.29,
          },
          {
            Date: '1550160000',
            Money: 1040.8,
            TotalMoney: -9597.490000000002,
            TotalSelfMoney: -1144.26,
            TotalFollowMoney: -8453.230000000001,
            TotalStandardlots: 50.580000000000005,
            TotalSelfStandardlots: 8.809999999999999,
            TotalFollowStandardlots: 41.77,
            TotalPips: 2891.2999999999997,
            TotalSelfPips: -16.200000000000003,
            TotalFollowPips: 2907.4999999999995,
            FollowMoney: 1040.8,
            Standardlots: 2.8000000000000003,
            SelfMoney: 0,
            Time: '1550160000',
            Value: -9597.490000000002,
          },
          {
            Date: '1550246400',
            Money: 855.81,
            TotalMoney: -9597.490000000003,
            TotalSelfMoney: -1144.26,
            TotalFollowMoney: -8453.230000000003,
            TotalStandardlots: 50.58,
            TotalSelfStandardlots: 8.809999999999999,
            TotalFollowStandardlots: 41.769999999999996,
            TotalPips: 2891.2999999999997,
            TotalSelfPips: -16.20000000000001,
            TotalFollowPips: 2907.4999999999995,
            FollowMoney: 855.81,
            Standardlots: 2.4000000000000004,
            SelfMoney: 0,
            Time: '1550246400',
            Value: -9597.490000000003,
          },
          {
            Date: '1550332800',
            Money: 0,
            TotalMoney: -9597.490000000003,
            Time: '1550332800',
            Value: -9597.490000000003,
          },
          {
            Date: '1550419200',
            Money: 131.7899999999999,
            TotalMoney: -9465.700000000003,
            TotalSelfMoney: -1144.26,
            TotalFollowMoney: -8321.440000000002,
            TotalStandardlots: 51.730000000000004,
            TotalSelfStandardlots: 8.809999999999999,
            TotalFollowStandardlots: 42.92,
            TotalPips: 3139.2,
            TotalSelfPips: -16.200000000000003,
            TotalFollowPips: 3155.3999999999996,
            FollowMoney: 131.7899999999999,
            Standardlots: 1.1500000000000001,
            SelfMoney: 0,
            Time: '1550419200',
            Value: -9465.700000000003,
          },
          {
            Date: '1550505600',
            Money: 1210.1599999999999,
            TotalMoney: -8255.540000000003,
            TotalSelfMoney: -1144.26,
            TotalFollowMoney: -7111.2800000000025,
            TotalStandardlots: 54.68000000000001,
            TotalSelfStandardlots: 8.809999999999999,
            TotalFollowStandardlots: 45.870000000000005,
            TotalPips: 4505.2,
            TotalSelfPips: -16.200000000000003,
            TotalFollowPips: 4521.4,
            FollowMoney: 1210.1599999999999,
            Standardlots: 2.950000000000001,
            SelfMoney: 0,
            Time: '1550505600',
            Value: -8255.540000000003,
          },
          {
            Date: '1550592000',
            Money: 1001.9800000000001,
            TotalMoney: -7253.560000000002,
            TotalSelfMoney: -1144.26,
            TotalFollowMoney: -6109.300000000002,
            TotalStandardlots: 58.28000000000001,
            TotalSelfStandardlots: 8.809999999999999,
            TotalFollowStandardlots: 49.470000000000006,
            TotalPips: 5435,
            TotalSelfPips: -16.200000000000003,
            TotalFollowPips: 5451.2,
            FollowMoney: 1001.9800000000001,
            Standardlots: 3.6000000000000005,
            SelfMoney: 0,
            Time: '1550592000',
            Value: -7253.560000000002,
          },
          {
            Date: '1550678400',
            Money: 1106.6100000000001,
            TotalMoney: -6146.950000000003,
            TotalSelfMoney: -1144.26,
            TotalFollowMoney: -5002.690000000002,
            TotalStandardlots: 61.330000000000005,
            TotalSelfStandardlots: 8.809999999999999,
            TotalFollowStandardlots: 52.52,
            TotalPips: 6621.9,
            TotalSelfPips: -16.200000000000003,
            TotalFollowPips: 6638.099999999999,
            FollowMoney: 1106.6100000000001,
            Standardlots: 3.0500000000000003,
            SelfMoney: 0,
            Time: '1550678400',
            Value: -6146.950000000003,
          },
          {
            Date: '1550764800',
            Money: 230.46,
            TotalMoney: -5916.4900000000025,
            TotalSelfMoney: -1144.26,
            TotalFollowMoney: -4772.230000000002,
            TotalStandardlots: 62.730000000000004,
            TotalSelfStandardlots: 8.809999999999999,
            TotalFollowStandardlots: 53.92,
            TotalPips: 6825.799999999999,
            TotalSelfPips: -16.200000000000003,
            TotalFollowPips: 6841.999999999999,
            FollowMoney: 230.46,
            Standardlots: 1.4,
            SelfMoney: 0,
            Time: '1550764800',
            Value: -5916.4900000000025,
          },
          {
            Date: '1550851200',
            Money: 0,
            TotalMoney: -5916.4900000000025,
            Time: '1550851200',
            Value: -5916.4900000000025,
          },
          {
            Date: '1550937600',
            Money: 0,
            TotalMoney: -5916.4900000000025,
            Time: '1550937600',
            Value: -5916.4900000000025,
          },
          {
            Date: '1551024000',
            Money: 1416.5499999999997,
            TotalMoney: -4499.940000000002,
            TotalSelfMoney: -958.26,
            TotalFollowMoney: -3541.680000000002,
            TotalStandardlots: 69.68,
            TotalSelfStandardlots: 10.309999999999999,
            TotalFollowStandardlots: 59.370000000000005,
            TotalPips: 7467.4,
            TotalSelfPips: -3.8000000000000025,
            TotalFollowPips: 7471.199999999999,
            FollowMoney: 1230.55,
            Standardlots: 6.950000000000002,
            SelfMoney: 186,
            Time: '1551024000',
            Value: -4499.940000000002,
          },
          {
            Date: '1551110400',
            Money: -1504.6400000000003,
            TotalMoney: -6004.580000000003,
            TotalSelfMoney: -815.26,
            TotalFollowMoney: -5189.320000000002,
            TotalStandardlots: 81.63000000000001,
            TotalSelfStandardlots: 11.61,
            TotalFollowStandardlots: 70.02000000000001,
            TotalPips: 8125,
            TotalSelfPips: 7.1999999999999975,
            TotalFollowPips: 8117.799999999999,
            FollowMoney: -1647.6400000000003,
            Standardlots: 11.950000000000001,
            SelfMoney: 143,
            Time: '1551110400',
            Value: -6004.580000000003,
          },
          {
            Date: '1551196800',
            Money: -129.88999999999987,
            TotalMoney: -6134.470000000003,
            TotalSelfMoney: -815.26,
            TotalFollowMoney: -5319.210000000003,
            TotalStandardlots: 87.43,
            TotalSelfStandardlots: 11.61,
            TotalFollowStandardlots: 75.82000000000001,
            TotalPips: 8487.8,
            TotalSelfPips: 7.1999999999999975,
            TotalFollowPips: 8480.599999999999,
            FollowMoney: -129.88999999999987,
            Standardlots: 5.800000000000001,
            SelfMoney: 0,
            Time: '1551196800',
            Value: -6134.470000000003,
          },
          {
            Date: '1551283200',
            Money: -42.60000000000005,
            TotalMoney: -6177.070000000003,
            TotalSelfMoney: -815.26,
            TotalFollowMoney: -5361.810000000003,
            TotalStandardlots: 93.82000000000001,
            TotalSelfStandardlots: 11.61,
            TotalFollowStandardlots: 82.21000000000001,
            TotalPips: 8792.199999999999,
            TotalSelfPips: 7.1999999999999975,
            TotalFollowPips: 8784.999999999998,
            FollowMoney: -42.60000000000005,
            Standardlots: 6.390000000000002,
            SelfMoney: 0,
            Time: '1551283200',
            Value: -6177.070000000003,
          },
          {
            Date: '1551369600',
            Money: 9.340000000000003,
            TotalMoney: -6167.730000000003,
            TotalSelfMoney: -815.26,
            TotalFollowMoney: -5352.470000000003,
            TotalStandardlots: 100.32000000000001,
            TotalSelfStandardlots: 11.61,
            TotalFollowStandardlots: 88.71000000000001,
            TotalPips: 8906.9,
            TotalSelfPips: 7.1999999999999975,
            TotalFollowPips: 8899.699999999999,
            FollowMoney: 9.340000000000003,
            Standardlots: 6.5,
            SelfMoney: 0,
            Time: '1551369600',
            Value: -6167.730000000003,
          },
          {
            Date: '1551456000',
            Money: 9.87,
            TotalMoney: -6167.730000000002,
            TotalSelfMoney: -815.26,
            TotalFollowMoney: -5352.470000000002,
            TotalStandardlots: 100.32,
            TotalSelfStandardlots: 11.61,
            TotalFollowStandardlots: 88.71000000000001,
            TotalPips: 8906.900000000001,
            TotalSelfPips: 7.19999999999999,
            TotalFollowPips: 8899.7,
            FollowMoney: 9.87,
            Standardlots: 0.15,
            SelfMoney: 0,
            Time: '1551456000',
            Value: -6167.730000000002,
          },
          {
            Date: '1551542400',
            Money: 0,
            TotalMoney: -6167.730000000002,
            Time: '1551542400',
            Value: -6167.730000000002,
          },
          {
            Date: '1551628800',
            Money: 478.19,
            TotalMoney: -5689.540000000004,
            TotalSelfMoney: -815.26,
            TotalFollowMoney: -4874.280000000003,
            TotalStandardlots: 107.22000000000001,
            TotalSelfStandardlots: 11.61,
            TotalFollowStandardlots: 95.61000000000001,
            TotalPips: 9193.1,
            TotalSelfPips: 7.1999999999999975,
            TotalFollowPips: 9185.9,
            FollowMoney: 478.19,
            Standardlots: 6.900000000000001,
            SelfMoney: 0,
            Time: '1551628800',
            Value: -5689.540000000004,
          },
          {
            Date: '1551715200',
            Money: 59.32,
            TotalMoney: -5630.220000000004,
            TotalSelfMoney: -755.9399999999999,
            TotalFollowMoney: -4874.280000000003,
            TotalStandardlots: 107.42000000000002,
            TotalSelfStandardlots: 11.809999999999999,
            TotalFollowStandardlots: 95.61000000000001,
            TotalPips: 9236.4,
            TotalSelfPips: 50.49999999999999,
            TotalFollowPips: 9185.9,
            FollowMoney: 0,
            Standardlots: 0.2,
            SelfMoney: 59.32,
            Time: '1551715200',
            Value: -5630.220000000004,
          },
          {
            Date: '1551801600',
            Money: 617.31,
            TotalMoney: -5012.9100000000035,
            TotalSelfMoney: -597.3,
            TotalFollowMoney: -4415.610000000003,
            TotalStandardlots: 108.62000000000002,
            TotalSelfStandardlots: 11.959999999999999,
            TotalFollowStandardlots: 96.66000000000001,
            TotalPips: 9564,
            TotalSelfPips: 172.4,
            TotalFollowPips: 9391.6,
            FollowMoney: 458.67,
            Standardlots: 1.2,
            SelfMoney: 158.64,
            Time: '1551801600',
            Value: -5012.9100000000035,
          },
          {
            Date: '1551888000',
            Money: 712.72,
            TotalMoney: -4300.190000000003,
            TotalSelfMoney: -597.3,
            TotalFollowMoney: -3702.890000000003,
            TotalStandardlots: 111.67000000000002,
            TotalSelfStandardlots: 11.959999999999999,
            TotalFollowStandardlots: 99.71000000000001,
            TotalPips: 9820.1,
            TotalSelfPips: 172.4,
            TotalFollowPips: 9647.7,
            FollowMoney: 712.72,
            Standardlots: 3.05,
            SelfMoney: 0,
            Time: '1551888000',
            Value: -4300.190000000003,
          },
          {
            Date: '1551974400',
            Money: 794.13,
            TotalMoney: -3506.060000000003,
            TotalSelfMoney: -597.3,
            TotalFollowMoney: -2908.760000000003,
            TotalStandardlots: 114.07000000000002,
            TotalSelfStandardlots: 11.959999999999999,
            TotalFollowStandardlots: 102.11000000000001,
            TotalPips: 10455.300000000001,
            TotalSelfPips: 172.4,
            TotalFollowPips: 10282.900000000001,
            FollowMoney: 794.13,
            Standardlots: 2.3999999999999995,
            SelfMoney: 0,
            Time: '1551974400',
            Value: -3506.060000000003,
          },
          {
            Date: '1552060800',
            Money: 81.16,
            TotalMoney: -3506.060000000002,
            TotalSelfMoney: -597.3,
            TotalFollowMoney: -2908.760000000002,
            TotalStandardlots: 114.07,
            TotalSelfStandardlots: 11.959999999999999,
            TotalFollowStandardlots: 102.11,
            TotalPips: 10455.300000000003,
            TotalSelfPips: 172.39999999999998,
            TotalFollowPips: 10282.900000000003,
            FollowMoney: 81.16,
            Standardlots: 0.15,
            SelfMoney: 0,
            Time: '1552060800',
            Value: -3506.060000000002,
          },
          {
            Date: '1552147200',
            Money: 0,
            TotalMoney: -3506.060000000002,
            Time: '1552147200',
            Value: -3506.060000000002,
          },
          {
            Date: '1552233600',
            Money: 2374.79,
            TotalMoney: -1131.2700000000032,
            TotalSelfMoney: 79.70000000000005,
            TotalFollowMoney: -1210.970000000003,
            TotalStandardlots: 118.67000000000002,
            TotalSelfStandardlots: 12.459999999999999,
            TotalFollowStandardlots: 106.21000000000001,
            TotalPips: 11224.000000000002,
            TotalSelfPips: 307.8,
            TotalFollowPips: 10916.2,
            FollowMoney: 1697.79,
            Standardlots: 4.6,
            SelfMoney: 677,
            Time: '1552233600',
            Value: -1131.2700000000032,
          },
          {
            Date: '1552320000',
            Money: 1295.5400000000004,
            TotalMoney: 164.26999999999725,
            TotalSelfMoney: 79.70000000000005,
            TotalFollowMoney: 84.56999999999744,
            TotalStandardlots: 122.37000000000002,
            TotalSelfStandardlots: 12.459999999999999,
            TotalFollowStandardlots: 109.91000000000001,
            TotalPips: 12015.2,
            TotalSelfPips: 307.8,
            TotalFollowPips: 11707.400000000001,
            FollowMoney: 1295.5400000000004,
            Standardlots: 3.6999999999999993,
            SelfMoney: 0,
            Time: '1552320000',
            Value: 164.26999999999725,
          },
          {
            Date: '1552406400',
            Money: 458.44999999999993,
            TotalMoney: 622.7199999999972,
            TotalSelfMoney: 74.99000000000005,
            TotalFollowMoney: 547.7299999999974,
            TotalStandardlots: 125.02000000000002,
            TotalSelfStandardlots: 13.459999999999999,
            TotalFollowStandardlots: 111.56000000000002,
            TotalPips: 11928.2,
            TotalSelfPips: -62.19999999999999,
            TotalFollowPips: 11990.400000000001,
            FollowMoney: 463.15999999999997,
            Standardlots: 2.6499999999999995,
            SelfMoney: -4.71,
            Time: '1552406400',
            Value: 622.7199999999972,
          },
          {
            Date: '1552492800',
            Money: 196.76999999999992,
            TotalMoney: 819.489999999997,
            TotalSelfMoney: 74.99000000000005,
            TotalFollowMoney: 744.4999999999973,
            TotalStandardlots: 126.97000000000003,
            TotalSelfStandardlots: 13.459999999999999,
            TotalFollowStandardlots: 113.51000000000002,
            TotalPips: 12020.7,
            TotalSelfPips: -62.19999999999999,
            TotalFollowPips: 12082.900000000001,
            FollowMoney: 196.76999999999992,
            Standardlots: 1.9499999999999997,
            SelfMoney: 0,
            Time: '1552492800',
            Value: 819.489999999997,
          },
          {
            Date: '1552579200',
            Money: 269.05999999999995,
            TotalMoney: 1088.549999999997,
            TotalSelfMoney: 74.99000000000005,
            TotalFollowMoney: 1013.5599999999972,
            TotalStandardlots: 128.97000000000003,
            TotalSelfStandardlots: 13.459999999999999,
            TotalFollowStandardlots: 115.51000000000002,
            TotalPips: 11930.1,
            TotalSelfPips: -62.19999999999999,
            TotalFollowPips: 11992.300000000001,
            FollowMoney: 269.05999999999995,
            Standardlots: 1.9999999999999998,
            SelfMoney: 0,
            Time: '1552579200',
            Value: 1088.549999999997,
          },
          {
            Date: '1552665600',
            Money: 62.5,
            TotalMoney: 1088.5499999999981,
            TotalSelfMoney: 74.99000000000005,
            TotalFollowMoney: 1013.5599999999984,
            TotalStandardlots: 128.96999999999997,
            TotalSelfStandardlots: 13.459999999999999,
            TotalFollowStandardlots: 115.50999999999999,
            TotalPips: 11930.100000000004,
            TotalSelfPips: -62.200000000000045,
            TotalFollowPips: 11992.300000000005,
            FollowMoney: 62.5,
            Standardlots: 0.1,
            SelfMoney: 0,
            Time: '1552665600',
            Value: 1088.5499999999981,
          },
          {
            Date: '1552752000',
            Money: 0,
            TotalMoney: 1088.5499999999981,
            Time: '1552752000',
            Value: 1088.5499999999981,
          },
          {
            Date: '1552838400',
            Money: 416.03,
            TotalMoney: 1504.579999999997,
            TotalSelfMoney: 74.99000000000005,
            TotalFollowMoney: 1429.5899999999972,
            TotalStandardlots: 130.27000000000004,
            TotalSelfStandardlots: 13.459999999999999,
            TotalFollowStandardlots: 116.81000000000002,
            TotalPips: 12264,
            TotalSelfPips: -62.19999999999999,
            TotalFollowPips: 12326.2,
            FollowMoney: 416.03,
            Standardlots: 1.2999999999999998,
            SelfMoney: 0,
            Time: '1552838400',
            Value: 1504.579999999997,
          },
          {
            Date: '1552924800',
            Money: 313.18,
            TotalMoney: 1817.759999999997,
            TotalSelfMoney: 74.99000000000005,
            TotalFollowMoney: 1742.7699999999973,
            TotalStandardlots: 132.77000000000004,
            TotalSelfStandardlots: 13.459999999999999,
            TotalFollowStandardlots: 119.31000000000002,
            TotalPips: 12544.6,
            TotalSelfPips: -62.19999999999999,
            TotalFollowPips: 12606.800000000001,
            FollowMoney: 313.18,
            Standardlots: 2.5000000000000004,
            SelfMoney: 0,
            Time: '1552924800',
            Value: 1817.759999999997,
          },
          {
            Date: '1553011200',
            Money: 4778.6900000000005,
            TotalMoney: 6596.449999999997,
            TotalSelfMoney: 443.5400000000001,
            TotalFollowMoney: 6152.909999999998,
            TotalStandardlots: 139.17000000000004,
            TotalSelfStandardlots: 14.01,
            TotalFollowStandardlots: 125.16000000000001,
            TotalPips: 14760.2,
            TotalSelfPips: 301.90000000000003,
            TotalFollowPips: 14458.300000000001,
            FollowMoney: 4410.140000000001,
            Standardlots: 6.4,
            SelfMoney: 368.55,
            Time: '1553011200',
            Value: 6596.449999999997,
          },
          {
            Date: '1553097600',
            Money: 4093.78,
            TotalMoney: 10690.229999999998,
            TotalSelfMoney: 443.5400000000001,
            TotalFollowMoney: 10246.689999999999,
            TotalStandardlots: 147.12000000000006,
            TotalSelfStandardlots: 14.01,
            TotalFollowStandardlots: 133.11,
            TotalPips: 16114.6,
            TotalSelfPips: 301.90000000000003,
            TotalFollowPips: 15812.7,
            FollowMoney: 4093.78,
            Standardlots: 7.950000000000003,
            SelfMoney: 0,
            Time: '1553097600',
            Value: 10690.229999999998,
          },
          {
            Date: '1553184000',
            Money: 1845.1299999999999,
            TotalMoney: 12535.359999999997,
            TotalSelfMoney: 443.5400000000001,
            TotalFollowMoney: 12091.819999999998,
            TotalStandardlots: 154.87000000000006,
            TotalSelfStandardlots: 14.01,
            TotalFollowStandardlots: 140.86,
            TotalPips: 16954,
            TotalSelfPips: 301.90000000000003,
            TotalFollowPips: 16652.100000000002,
            FollowMoney: 1845.1299999999999,
            Standardlots: 7.750000000000003,
            SelfMoney: 0,
            Time: '1553184000',
            Value: 12535.359999999997,
          },
          {
            Date: '1553270400',
            Money: 205.79999999999998,
            TotalMoney: 12535.359999999999,
            TotalSelfMoney: 443.5400000000001,
            TotalFollowMoney: 12091.82,
            TotalStandardlots: 154.86999999999998,
            TotalSelfStandardlots: 14.01,
            TotalFollowStandardlots: 140.86,
            TotalPips: 16954.000000000004,
            TotalSelfPips: 301.9,
            TotalFollowPips: 16652.100000000006,
            FollowMoney: 205.79999999999998,
            Standardlots: 2.3000000000000003,
            SelfMoney: 0,
            Time: '1553270400',
            Value: 12535.359999999999,
          },
          {
            Date: '1553356800',
            Money: 0,
            TotalMoney: 12535.359999999999,
            Time: '1553356800',
            Value: 12535.359999999999,
          },
          {
            Date: '1553443200',
            Money: 1552.7899999999997,
            TotalMoney: 14088.149999999996,
            TotalSelfMoney: 443.5400000000001,
            TotalFollowMoney: 13644.609999999997,
            TotalStandardlots: 161.77000000000007,
            TotalSelfStandardlots: 14.01,
            TotalFollowStandardlots: 147.76000000000002,
            TotalPips: 17023.8,
            TotalSelfPips: 301.90000000000003,
            TotalFollowPips: 16721.9,
            FollowMoney: 1552.7899999999997,
            Standardlots: 6.899999999999999,
            SelfMoney: 0,
            Time: '1553443200',
            Value: 14088.149999999996,
          },
          {
            Date: '1553529600',
            Money: 1479.1599999999999,
            TotalMoney: 15567.309999999996,
            TotalSelfMoney: 443.5400000000001,
            TotalFollowMoney: 15123.769999999997,
            TotalStandardlots: 169.37000000000006,
            TotalSelfStandardlots: 14.01,
            TotalFollowStandardlots: 155.36,
            TotalPips: 17447.899999999998,
            TotalSelfPips: 301.90000000000003,
            TotalFollowPips: 17146,
            FollowMoney: 1479.1599999999999,
            Standardlots: 7.6,
            SelfMoney: 0,
            Time: '1553529600',
            Value: 15567.309999999996,
          },
          {
            Date: '1553616000',
            Money: 13294.09,
            TotalMoney: 28861.399999999994,
            TotalSelfMoney: 443.5400000000001,
            TotalFollowMoney: 28417.859999999997,
            TotalStandardlots: 188.27000000000007,
            TotalSelfStandardlots: 14.01,
            TotalFollowStandardlots: 174.26000000000002,
            TotalPips: 18549.199999999997,
            TotalSelfPips: 301.90000000000003,
            TotalFollowPips: 18247.3,
            FollowMoney: 13294.09,
            Standardlots: 18.9,
            SelfMoney: 0,
            Time: '1553616000',
            Value: 28861.399999999994,
          },
          {
            Date: '1553702400',
            Money: -60.39999999999995,
            TotalMoney: 28800.999999999993,
            TotalSelfMoney: 443.5400000000001,
            TotalFollowMoney: 28357.459999999995,
            TotalStandardlots: 191.42000000000007,
            TotalSelfStandardlots: 14.01,
            TotalFollowStandardlots: 177.41000000000003,
            TotalPips: 18566.6,
            TotalSelfPips: 301.90000000000003,
            TotalFollowPips: 18264.7,
            FollowMoney: -60.39999999999995,
            Standardlots: 3.1500000000000004,
            SelfMoney: 0,
            Time: '1553702400',
            Value: 28800.999999999993,
          },
          {
            Date: '1553788800',
            Money: 2950.8899999999994,
            TotalMoney: 31751.889999999992,
            TotalSelfMoney: 443.5400000000001,
            TotalFollowMoney: 31308.349999999995,
            TotalStandardlots: 201.82000000000008,
            TotalSelfStandardlots: 14.01,
            TotalFollowStandardlots: 187.81000000000003,
            TotalPips: 19464.899999999998,
            TotalSelfPips: 301.90000000000003,
            TotalFollowPips: 19163,
            FollowMoney: 2950.8899999999994,
            Standardlots: 10.4,
            SelfMoney: 0,
            Time: '1553788800',
            Value: 31751.889999999992,
          },
          {
            Date: '1553875200',
            Money: -806.79,
            TotalMoney: 31751.89,
            TotalSelfMoney: 443.5400000000001,
            TotalFollowMoney: 31308.350000000002,
            TotalStandardlots: 201.81999999999996,
            TotalSelfStandardlots: 14.01,
            TotalFollowStandardlots: 187.81,
            TotalPips: 19464.900000000005,
            TotalSelfPips: 301.9,
            TotalFollowPips: 19163.000000000007,
            FollowMoney: -806.79,
            Standardlots: 1.7000000000000002,
            SelfMoney: 0,
            Time: '1553875200',
            Value: 31751.89,
          },
          {
            Date: '1553961600',
            Money: 0,
            TotalMoney: 31751.89,
            Time: '1553961600',
            Value: 31751.89,
          },
          {
            Date: '1554048000',
            Money: 1966.35,
            TotalMoney: 33718.23999999999,
            TotalSelfMoney: 443.5400000000001,
            TotalFollowMoney: 33274.7,
            TotalStandardlots: 212.07000000000008,
            TotalSelfStandardlots: 14.01,
            TotalFollowStandardlots: 198.06000000000003,
            TotalPips: 19948.6,
            TotalSelfPips: 301.90000000000003,
            TotalFollowPips: 19646.7,
            FollowMoney: 1966.35,
            Standardlots: 10.250000000000002,
            SelfMoney: 0,
            Time: '1554048000',
            Value: 33718.23999999999,
          },
          {
            Date: '1554134400',
            Money: 1417.16,
            TotalMoney: 35135.399999999994,
            TotalSelfMoney: 443.5400000000001,
            TotalFollowMoney: 34691.86,
            TotalStandardlots: 225.27000000000007,
            TotalSelfStandardlots: 14.01,
            TotalFollowStandardlots: 211.26000000000002,
            TotalPips: 20475,
            TotalSelfPips: 301.90000000000003,
            TotalFollowPips: 20173.100000000002,
            FollowMoney: 1417.16,
            Standardlots: 13.2,
            SelfMoney: 0,
            Time: '1554134400',
            Value: 35135.399999999994,
          },
          {
            Date: '1554220800',
            Money: 2349.790000000001,
            TotalMoney: 37485.189999999995,
            TotalSelfMoney: 448.3400000000001,
            TotalFollowMoney: 37036.85,
            TotalStandardlots: 237.57000000000008,
            TotalSelfStandardlots: 14.209999999999999,
            TotalFollowStandardlots: 223.36,
            TotalPips: 20470.9,
            TotalSelfPips: 304.3,
            TotalFollowPips: 20166.600000000002,
            FollowMoney: 2344.9900000000007,
            Standardlots: 12.299999999999999,
            SelfMoney: 4.8,
            Time: '1554220800',
            Value: 37485.189999999995,
          },
        ],
      },
    ];
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

  sortTitleData: any = { orderby: null, order: null };

  sortChange({ prop, order: ord }: any) {
    this.sortTitleData = { prop, order: ord };
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

  lang(path: string) {
    return this.$i18n.t(path) as string;
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
    const _this = this;
    console.log(params, 'pppppp');
    if (!this.hasMore) {
      return new Promise(() => ({}));
    }
    this.dataLoading = true;
    return this.getRankFollowers(params).then((res: any) => {
      if (res && !res.error) {
        const { items } = res;
        _this.TotalCount = res.total;
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

  fixDomStyle(dom: any, scrollTop: any) {
    if (dom) {
      const top = getElementTop(dom);
      if (scrollTop > top) {
        const navHeight = this.getTopNavHeight();
        this.setStyleProp(dom, 'fixed', 'position');
        this.setStyleProp(dom, `${navHeight}px`, 'top');
        this.setStyleProp(dom, 200, 'zIndex');
      } else {
        this.setStyleProp(dom, 'unset', 'position');
      }
    }
  }

  needFixTableHeader(scrollTop: number) {
    const el = this.$el;
    if (el) {
      const rankTable = el.querySelector('.follower-rank-table');
      const cardTableHeade = el.querySelector('.card-table-header');
      if (rankTable) {
        const header: any = rankTable.querySelector(
          '.el-table__header-wrapper',
        );
        this.fixDomStyle(header, scrollTop);
      } else {
        this.fixDomStyle(cardTableHeade, scrollTop);
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

  computeTrHeight(n?: number) {
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
.listNone {
  text-align: center;
  font-size: 14px;
  padding-top: 20px;
  color: #666;
}
</style>
