<template>
  <div class="invest-container">
    <div class="header">
      <LineHead
        @rightClick="toRankList"
        :title="data.RankName"
        :subTitle="subTitle"
      />
    </div>
    <div class="content">
      <SimpleTable
        :header="initHeader"
        :data="refactorData"
      >
        <template slot-scope="slotProps">
          <div class="slot-container">
            <div class="avatar">
              <img
                :onerror="errorUrl"
                :src="avatarSrc(slotProps.row.UserID)"
                alt=""
              >
            </div>
            <span class="name-span">{{ slotProps.row.NickName}}</span>
            <span class="index-span">#{{ slotProps.row.AccountIndex}}</span>
          </div>
        </template>
      </SimpleTable>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import LineHead from '@/components/line-head/index.vue'; // @ is an alias to /src
import SimpleTable from '@/components/simple-table/index.vue'; // @ is an alias to /src
import propMaps from '@/constant/propMap';
import { percentFormat } from '@/utils/format';

const numeral = require('numeral');

@Component({
  components: {
    LineHead,
    SimpleTable,
  },
})
export default class Index extends Vue {
  public name: string = 'fm-invest-manager-mobile';

  propMaps: any = propMaps;

  @Prop()
  data: any;

  toRankList() {
    this.$router.push({ name: 'rankList' });
  }

  get initHeader() {
    if (this.data) {
      const firstLine = {
        label: '交易员',
        prop: '',
        align: 'left',
      };
      const keys = Object.keys(this.data.HideConfig ? this.data.HideConfig : {})
        .filter(v => this.data.HideConfig[v])
        .slice(0, 2);
      const res = keys.map(v => ({
        label: this.propMaps[v],
        prop: v,
        align: 'right',
      }));
      return [firstLine, ...res];
    }
    return [];
  }

  get refactorData() {
    if (!this.data.listData) {
      return [];
    }
    return this.data.listData.List.map((v: any) => ({
      ...v,
      ROI: numeral(v.ROI).format('0.00%'),
      Profit: numeral(v.Profit).format('$0.00'),
      Score: numeral(v.Score).format('0.000'),
    }));
  }

  avatarSrc(UserID: string): string {
    return `${this.base}/avata/${UserID}`;
  }

  get subTitle(): string {
    function createStr(obj: {Max: 0, Min: 0}, title: string, format: boolean = false) {
      const { Max, Min } = obj;
      const max = format ? percentFormat(Max) : Max;
      const min = format ? percentFormat(Min) : Min;
      if (Max && Min) return ` ${title} ${min} ~ ${max}`;
      if (Min) return ` ${title}>${min}`;
      if (Max) return ` ${title}<${max}`;
      return '';
    }

    let title: string = '';
    const condObject = this.data.CondCfg ? this.data.CondCfg.CondConfig : {};

    Object.keys(condObject).forEach((key) => {
      const value = condObject[key];
      if (typeof value === 'object') {
        if (key === 'Roi') { // 注意字段名称和propMaps不一样, Roi和MaxRetracement两个值需要格式化
          const roi = createStr(value, this.propMaps.ROI, true);
          if (roi) {
            title = title.concat(roi);
          }
        } else if (key === 'MaxRetracement') {
          const mr = createStr(value, this.propMaps[key], true);
          if (mr) {
            title = title.concat(mr);
          }
        } else {
          const str = createStr(value, this.propMaps[key]);
          if (str) {
            title = title.concat(str);
          }
        }
      } else if (key === 'ExpSymbol' && value) {
        title = title.concat(` ${this.propMaps[key]} ${value}`);
      }
    });

    return title;
  }
}
</script>
<style lang="less" scoped>
.invest-container {
}
.avatar {
  @size: 36px;
  width: @size;
  height: @size;
  line-height: @size;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  overflow: hidden;
  font-size: 14px;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
  }
}

.slot-container {
  max-width: 100%;
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  .name-span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex:1;
  }
  .index-span{
    white-space: nowrap;
    color:#C0C0C0;
    width: 20px;
  }
}
</style>
