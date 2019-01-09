<template>
  <div class="invest-container">
    <div class="header">
      <LineHead
        @rightClick="toMore"
        :title="description.title"
        :subTitle="subTitle"
      />
    </div>
    <div class="content">
      <SimpleTable
        :header="description.header || initHeader"
        :data="refactorData"
      >
        <template slot-scope="slotProps">
          <div class="slot-container">
            <div class="avatar-container" v-if="description.avatar">
              <div class="avatar">
                <img
                  :onerror="errorUrl"
                  :src="avatarSrc(slotProps.row.UserID)"
                  alt=""
                >
              </div>
              <div class="text-container">
                <span class="name-span">{{ slotProps.row.Name}}</span>
                <span class="index-span">#{{ slotProps.row.AccountIndex}}</span>
              </div>
            </div>
            <div v-else class="container-left">
              <div class="name">
                {{slotProps.row.Name}}
              </div>
              <div class="danger">
                {{slotProps.row.danger}}
              </div>
            </div>
          </div>
        </template>
      </SimpleTable>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';
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

  @Prop()
  description: any;

  toMore() {
    this.$emit('toMore', this.description);
    // this.
  }

  get initHeader() {
    if (this.data) {
      // const keys = Object.keys(this.data.HideConfig ? this.data.HideConfig : {})
      //   .filter(v => this.data.HideConfig[v])
      //   .slice(0, 2);
      // const res = keys.map(v => ({
      //   label: this.propMaps[v],
      //   prop: v,
      //   align: 'right',
      // }));
      const res: any = [
        {
          label: '产品名称',
          prop: 'Name',
          align: 'left',
        },
        {
          label: '产品资金',
          prop: 'Balance',
          align: 'right',
        },
        {
          label: '参与人数',
          prop: 'FollowerCount',
          align: 'right',
        },
      ];
      return [...res];
    }
    return [];
  }

  get refactorData() {
    const { data } = this;
    return data || [];
  }

  avatarSrc(UserID: string): string {
    return `${this.base}/avata/${UserID}`;
  }

  get subTitle(): string {
    const title = '';

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
  .avatar-container {
    display: inline-flex;
  }
  .text-container {
    display: flex;
    align-items: center;
    // flex-direction: column;
  }
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

  .container-left {
    display: flex;
    flex-direction: column;
    .name {
      font-size:14px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:20px;
    }
    .danger {
      font-size:12px;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(153,153,153,1);
      line-height:17px;
    }
  }
}
</style>
