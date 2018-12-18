<template>
  <div class="filter-setting-wrap">
    <div class="filter-normal-item">
      <filter-button>PTA会员</filter-button>
      <filter-button>免费订阅</filter-button>
    </div>
    <fm-collapse accordion>
      <fm-collapse-item
        title="评级"
        :icon-classes="iconClasses"
      >
        <section class="filter-item-section">
          <filter-button>S</filter-button>
          <filter-button>A+</filter-button>
          <filter-button>A</filter-button>
          <filter-button>A-</filter-button>
          <filter-button>B</filter-button>
        </section>
      </fm-collapse-item>
      <fm-collapse-item
        title="活跃度"
        :icon-classes="iconClasses"
      >
        <section class="filter-item-section">
          <filter-button>近1月有交易</filter-button>
          <filter-button>近3月有交易</filter-button>
          <filter-button>近6月有交易</filter-button>
          <filter-button>近1月有交易</filter-button>
          <filter-button>近3月有交易</filter-button>
          <filter-button>近6月有交易</filter-button>
        </section>
      </fm-collapse-item>
      <fm-collapse-item
        title="收益"
        :icon-classes="iconClasses"
      >
        <section class="filter-item-section">
          <filter-button></filter-button>
          <filter-button>>$0</filter-button>
          <filter-button>>$1000</filter-button>
          <filter-button>>$5000</filter-button>

        </section>
      </fm-collapse-item>
      <fm-collapse-item
        title="最大回撤"
        :icon-classes="iconClasses"
      >
        <section class="filter-item-section">
          <filter-button></filter-button>
          <filter-button> ≤30% </filter-button>
          <filter-button> ≤50% </filter-button>
          <filter-button> >50% </filter-button>
          <filter-button>>$5000</filter-button>

        </section>
      </fm-collapse-item>
      <fm-collapse-item
        title="账户净值"
        :icon-classes="iconClasses"
      >
        <section class="filter-item-section">
          <filter-button></filter-button>
          <filter-button> ≤10% </filter-button>
          <filter-button> ≤20% </filter-button>
          <filter-button> ≤30% </filter-button>
          <filter-button> ≤50% </filter-button>
          <filter-button> >50% </filter-button>
          <filter-button>>$5000</filter-button>

        </section>
      </fm-collapse-item>
      <fm-collapse-item
        title="交易周期"
        :icon-classes="iconClasses"
      >
        <section class="filter-item-section">
          <filter-button></filter-button>
        </section>
      </fm-collapse-item>
      <fm-collapse-item
        title="交易能力值"
        :icon-classes="iconClasses"
      >
        <section class="filter-item-section">
          <filter-button></filter-button>
        </section>
      </fm-collapse-item>
      <fm-collapse-item
        title="交易品种"
        :icon-classes="iconClasses"
      >
        <section class="filter-item-section">
          <filter-button>全部</filter-button>
          <filter-button :closed="true">USD/JPY</filter-button>
          <filter-plus />
        </section>
      </fm-collapse-item>
      <fm-collapse-item
        title="经纪商"
        :icon-classes="iconClasses"
      >
        <section class="filter-item-section">
          <filter-button>全部</filter-button>
          <filter-button :closed="true">FxPro浦汇</filter-button>
          <filter-plus />
        </section>
      </fm-collapse-item>
    </fm-collapse>
    <filter-submit />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';
import FilterButton from './FilterButton.vue';
import FilterSubmit from './FilterSubmit.vue';
import FilterPlus from './FilterPlus.vue';

@Component({
  components: {
    FilterButton,
    FilterSubmit,
    FilterPlus,
  },
})
export default class FilterSetting extends Vue {
  private iconClasses: string =
    'edit-icon edit-hover-icon edit-icon-active edit-hover-icon-active icon-up_24px';
}
</script>

<style lang="less" scoped>
.filter-setting-wrap {
  background-color: #fff;
  padding: 0 16px;
  padding-bottom: 100px;
}
.filter-normal-item {
  padding: 20px 0 10px;
  border-bottom: 1px solid #edeff4;
}
</style>

<style lang="less">
.edit-icon:before {
  content: "\e926";
}
.edit-icon-active:before {
  content: "\e927";
}
.filter-setting-wrap {
  font-family: PingFang-SC-Medium;
  .fm-collapse-item {
    border: none;
    border-bottom: 1px solid #edeff4;
    border-radius: 0;
  }
  .fm-collapse-item-header {
    border: none;
    background-color: #fff;
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    padding-left: 0;
    padding-right: 0;
    span.fm-collapse-item-act {
      right: 0;
    }
    .fm-collapse-item-title {
      font-size: 14px;
      color: #333;
    }
  }
  .filter-item-section {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 10px;
  }
}
</style>
