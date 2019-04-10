<template>
  <div class="filter-container">
    <div class="filter-title">
      <ul
        slot="left"
        class="filter-title-left"
      >
        <li class="select">优质上榜</li>
        <li>MAM策略</li>
        <li>我的关注</li>
      </ul>
      <div
        slot="right"
        class="filter-title-right"
        @click="rightClick"
      >
        <span>{{ $t('cwjyy') || '' }}</span>
      </div>
    </div>
    <div class="filter-main">
      <section class="filter-section">
        <div class="filter-section-label">
          经济商
        </div>
        <div
          class="filter-section-item"
          :class="{'sel':moreState}"
        >
          <!-- {{allItem}} -->
          <span
            class="all-check"
            :class="{'sel':allItem[0]}"
            @click="item1Check"
          >全部</span>
          <el-checkbox-group
            v-model="checkedCities"
            @change="changeItem1"
          >
            <el-checkbox
              v-for="(v,key) in csshuju"
              :label="v.name"
              :key="key"
            >{{v.value}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div
          class="filter-section-more"
          :class="{'sel':moreState}"
          @click="moreState=!moreState"
        >更多</div>
      </section>

      <section class="filter-section">
        <div class="filter-section-label">
          账户评级
        </div>
        <div
          class="filter-section-item"
          :class="{'sel':moreState}"
        >
          <!-- {{allItem}} -->
          <span
            class="all-check"
            :class="{'sel':allItem[0]}"
            @click="item1Check"
          >全部</span>
          <el-checkbox-group
            v-model="checkedCities"
            @change="changeItem1"
          >
            <el-checkbox
              v-for="(v,key) in csshuju"
              :label="v.name"
              :key="key"
            >{{v.value}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div
          class="filter-section-more"
          :class="{'sel':moreState}"
          @click="moreState=!moreState"
        >更多</div>
      </section>
    </div>
    <div class="filter-bottom"></div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch, Emit,
} from 'vue-property-decorator';
import { CheckboxGroup, Checkbox, CheckboxButton } from 'element-ui';
import zhCN from '@/i18n/zh-CN/views/home/pc/Strategy';
import zhTW from '@/i18n/zh-TW/views/home/pc/Strategy';
import enUS from '@/i18n/en-US/views/home/pc/Strategy';
import zhHK from '@/i18n/zh-HK/views/home/pc/Strategy';
@Component({
  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [CheckboxButton.name]: CheckboxButton,
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
export default class RankFilter extends Vue {
  //   @Prop() rightClick: any;
  // @Emit("rightClick")

  moreState: boolean = false;

  checkedCities: any = [];

  allItem: any = [false, false, false, false];

  csshuju: any = [
    {
      name: 'a',
      value: 0,
    },
    {
      name: 'b',
      value: 1,
    },
    {
      name: 'c',
      value: 2,
    },
    {
      name: 'd',
      value: 0,
    },
  ];

  public lang(path:string) {
    return this.$i18n.t(path) as string;
  }

  rightClick() {
    this.$emit('rightClick');
  }

  item1Check() {
    this.$set(this.allItem, 0, !this.allItem[0]);
    this.checkedCities = this.allItem[0]
      ? this.csshuju.map((val: any) => val.name)
      : [];
  }

  changeItem1(val: any) {
    const len = val.length;
    if (len < this.csshuju.length) {
      this.$set(this.allItem, 0, false);
    } else {
      this.$set(this.allItem, 0, true);
    }
  }
}
</script>

<style lang="less" scoped>
@color: #ff6200;
.filter-container {
  width: 100%;
  height: 300px;
  background-color: #ffffff;
  .filter-title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    .filter-title-left {
      display: flex;
      color: #333;
      > li {
        cursor: pointer;
        float: left;
        padding: 5px 0;
        font-size: 16px;
        margin: 0 20px;
        border-bottom: transparent 2px solid;
      }
      > li.select {
        border-bottom-color: @color;
      }
    }
    .filter-title-right {
      padding: 5px 10px;
      display: inline-flex;
      align-items: center;
      font-size: 14px;
      color: @color;
      border-radius: 30px;
      cursor: pointer;
    }
  }
  .filter-main {
    .filter-section {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      font-size: 14px;
      line-height: 1.5;
      padding: 20px;
      .filter-section-label {
        width: 90px;
        color: #999;
      }
      .filter-section-item {
        flex: 1;
        display: flex;
        align-items: flex-start;
        padding-right: 50px;
        height: 20px;
        overflow: hidden;
        &.sel {
          height: auto;
        }
        .all-check {
          // width: 80px;
          padding: 0 10px;
          color: #333;
          margin-right: 30px;
          cursor: pointer;
          text-align: center;
          &.sel {
            background-color: @color;
            color: #ffffff;
            border-radius: 10px;
          }
        }
      }
      .filter-section-more {
        width: 40px;
        justify-content: flex-end;
        position: relative;
        cursor: pointer;
        &::after {
          content: "";
          position: absolute;
          width: 5px;
          height: 5px;
          right: 3px;
          top: 5px;
          border: 1px solid transparent;
          border-top-color: #999;
          border-right-color: #999;
          transform: rotate(135deg);
        }
        &.sel {
          color: @color;
        }
        &.sel::after {
          top: 8px;
          border-top-color: @color;
          border-right-color: @color;
          transform: rotate(-45deg);
        }
      }
    }
  }
}
</style>
<style>
.filter-container .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #606266 !important;
}
</style>
