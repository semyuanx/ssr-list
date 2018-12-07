<template>
  <div class="header">
    <FmHeader>
      <template slot="left">
        <div class="content-header">
          <h2 class="h2-titile">精选策略</h2>
          <div class="flex-center sub-title">
            <i class="icon-plus_24px"></i>
            <span>{{ subTitle || '' }}</span>
            <i class="icon-right_24px"></i>
          </div>
        </div>
      </template>
      <template slot="right">
        <div class="content-header">
          <div class="flex-center right-filter">
            <i class="icon-filtrate_24px"></i>
            <span>{{ rightTitle || '' }}</span>
          </div>
        </div>
      </template>
    </FmHeader>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FmHeader from '@/components/FmHeader.vue'; // @ is an alias to /src

@Component({
  components: {
    FmHeader,
  },
})
export default class Home extends Vue {
  public name: string = 'fm-strategy';

  @Prop() private title!: string;

  @Prop() private subTitle!: string;

  @Prop() private rightTitle!: string;

  @Prop() private icon!: string;
}
</script>
<style lang="less" scoped>
.header {
  margin-bottom: 20px;
  .flex-center {
      display: flex;
      align-items: center;
      flex-direction: row;
  }
  .content-header {
    display: flex;
    align-items: center;
    padding: 5px 0;
    width: 100%;
    color: #333333;
    .h2-titile {
      font-size:24px;
    }
    .sub-title {
      background-color: #fff;
      border-radius: 13px;
      height: 26px;
      padding: 0 15px;
      margin-left: 10px;
      font-size: 12px;
    }
    .right-filter {
      justify-content: flex-end;
      width: 100%;
      font-size: 14px;
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

  .header {
    margin-bottom: 10px;
    .content-header {
      .generate-padding();
      .h2-titile {
        flex: 1;
        font-size: 16rem / @base-font;
      }
      .sub-title {
        background-color: transparent;
        font-size: 14rem / @base-font;
        padding: 0;
        .icon-plus_24px {
          display: none;
        }
      }
    }
  }
}

</style>
