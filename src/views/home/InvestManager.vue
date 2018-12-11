<template>
  <div class="invest-container">
    <div class="header">
      <LineHeader
        subIcon="flag_24px"
        rightIcon="right_24px"
        rightTitle="更多"
        subTitle="发起产品"
        title="投资管家">

        <!-- <template slot="right">
          <span>{{ rightTitle || '' }}</span>
          <i :class="`icon-right_24px`"></i>
        </template> -->
      </LineHeader>
    </div>
    <div class="invest-content">
      <div class="left">
        <div><span>交易大牛</span></div>
        <div>
          <button>立即订阅</button>
        </div>
      </div>
      <div class="right">
        <div class="right-lists">
          <div class="list-item">
            <LineCard />
          </div>
          <div class="list-item">
            <LineCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LineHeader from './LineHeader.vue'; // @ is an alias to /src
import LineCard from '@/components/line-card/card.vue'; // @ is an alias to /src

@Component({
  components: {
    LineHeader,
    LineCard,
  },
})
export default class Index extends Vue {
  public name: string = 'fm-invest-manager';
}
</script>
<style lang="less" scoped>
.invest-container {
  .invest-content {
    display: flex;
    flex-direction: row;
    .left {
      width:280px;
      height:240px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: #ffffff;
    }
    .right {
      width: 95%;
      margin-left: 2%;
      .right-lists {
        display: flex;
        flex-direction: column;
        .list-item {
          display: flex;
          flex-direction: row;
          margin-bottom: 1px;
        }
      }
    }
  }
}
@media screen and (max-width: 880px) {
  @base-font: 20;
  @page-padding: 15rem / @base-font;
  .generate-padding() {
    padding-right: @page-padding;
    padding-left: @page-padding;
  }
  .invest-container {

  }

}
</style>
