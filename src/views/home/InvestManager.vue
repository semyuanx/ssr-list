<template>
  <div class="invest-container">
    <div class="header">
      <LineHeader
        subIcon="flag_24px"
        rightIcon="right_24px"
        rightTitle="更多"
        subTitle="发起产品"
        title="投资管家">

        <template slot="right">
          <span>{{ rightTitle || '' }}</span>
          <i :class="`icon-right_24px`"></i>
        </template>
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

      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LineHeader from './LineHeader.vue'; // @ is an alias to /src

@Component({
  components: {
    LineHeader,
  },
})
export default class Home extends Vue {
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
      border: 1px solid red;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .right {
      width: 95%;
      margin-left: 2%;
      border: 1px solid red;
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
