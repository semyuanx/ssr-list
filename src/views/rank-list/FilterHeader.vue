<template>
  <div class="filter-header">
    <div class="header-content">
      <div class="header-fitler-title"><span>筛选条件：</span></div>
      <div class="header-tag-lists">
        <div
          :key="i"
          v-for="i in Array(10).fill(0)"
          class="header-tag-item"
        >
          <FmTag
            msg="账户评级"
            desc="A"
          />
        </div>

        <div class="header-tag-item">
          <FmTag
            msg="账户评级"
            desc="XAU/USD,XAU/USD,XAU/USD,XAU/USD,XAU/USD…"
          />
        </div>
        <div class="header-tag-item">
          <FmTag
            msg="账户评级"
            desc="XAU/USD,XAU/USD,XAU/USD,XAU/USD,XAU/USD…"
          />
        </div>
        <div class="header-tag-item">
          <FmTag
            type="2"
            msg="PTA"
            desc="会员"
          />
        </div>
      </div>
      <div class="header-filter">
        <div
          @click="emitFilter"
          class="filter-content"
        >
          <i class="icon-filtrate_24px"></i><span>筛选器</span>
        </div>
        <div class="filter-pop">
          <filter-popover
            @close="closeFilter"
            :show="isShow"
            @filter="handleFilter"
            @reset="handleReset"
          >

            <template slot="brokerId">
              <filter-tag
                :border="true"
                :closed="true"
                v-for="(item,index) in checkbox"
                class="has-close-tag"
                @close="handleCloseTag(index)"
                :key="item"
              >{{item}}</filter-tag>
              <button
                class="add-button"
                @click="addBorker=!addBorker"
              ><i class="fm-fonticon icon-plus_24px"></i>添加</button>
              <check-box-group
                v-model="checkbox"
                class="borkersDialog"
                v-show="addBorker && isShow"
              >
                <ul>
                  <li
                    v-for="(item,index) in borkers"
                    :key="index"
                  >
                    <check-box :val="item">{{item}}</check-box>
                  </li>
                </ul>
              </check-box-group>
            </template>
          </filter-popover>

        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import FmTag from '@/components/tag/tag.vue'; // @ is an alias to /src
import FilterPopover from '@/components/filter-popover/FilterPopover.vue';
import FilterTag from '@/components/filter-popover/FilterTag.vue';
import CheckBoxGroup from '@/components/check-box/CheckBoxGroup.vue';
import CheckBox from '@/components/check-box/CheckBox.vue';

const RankStore = namespace('RankStore');

// const HomeStore = namespace('HomeStore');

@Component({
  components: {
    FmTag,
    FilterPopover,
    FilterTag,
    CheckBoxGroup,
    CheckBox,
  },
})
export default class FilterHeader extends Vue {
  isShow: boolean = false;

  addBorker: boolean = false;

  checkbox: any[] = [];

  borkers: any[] = ['USD/JPY', 'XAU/USD'];

  @RankStore.State
  rankParams: any;

  @RankStore.Mutation
  setRankParams: any;

  closeFilter() {
    this.isShow = false;
  }

  emitFilter() {
    this.isShow = !this.isShow;
    this.addBorker = false;
    this.$emit('filter-click');
  }

  handleFilter(value: object) {
    this.isShow = false;
    this.refactor(value);
  }

  handleReset(value: object) {
    this.checkbox = [];
    this.refactor(value);
  }

  refactor(obj: any) {
    const tempObj = {
      maxScore: obj.Score.split('-')[1],
      minScore: obj.Score.split('-')[0],
      minRoi: obj.Roi.split('-')[0],
      maxRoi: obj.Roi.split('-')[1],
      maxRetracement: obj.Retracement.split('-')[1],
      minRetracement: obj.Retracement.split('-')[0],
      maxWeeks: obj.Weeks.split('-')[1],
      minWeeks: obj.Weeks.split('-')[0],
      maxEquity: obj.Equity.split('-')[1],
      minEquity: obj.Equity.split('-')[0],
      brokerId: this.checkbox.join(','),
    };
    this.setRankParams(tempObj);
  }

  handleCloseTag(index: number) {
    this.checkbox.splice(index, 1);
  }

  mounted() {}
}
</script>
<style lang="less" scoped>
.add-button {
  outline: none;
  border: none;
  background-color: transparent;
  height: 24px;
  line-height: 24px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
}
.filter-header {
  padding: 20px 0;

  .header-content {
    display: flex;
    flex-direction: row;
    // align-items: center;
    // flex-wrap: wrap;
    .header-fitler-title {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
      line-height: 19px;
      width: 76px;
    }
    .header-tag-lists {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      flex: 1;
      .header-tag-item {
        margin-right: 10px;
        margin-bottom: 10px;
        display: flex;
      }
    }
    .header-filter {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
      line-height: 19px;
      cursor: pointer;
      position: relative;

      .filter-content {
        position: relative;
        > i {
          vertical-align: middle;
        }
      }

      .filter-pop {
        position: absolute;
        top: 85%;
        right: 0;
        z-index: 100;
      }
    }
  }
}
</style>


<style lang="less" scoped>
.borkersDialog {
  position: absolute;
  max-width: 640px;
  max-height: 130px;
  overflow: auto;
  left: 0;
  bottom: 100%;
  z-index: 1000;
  padding: 20px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  border: 1px solid rgba(230, 230, 230, 1);
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      margin-right: 20px;
    }
  }
}
.has-close-tag {
  margin-right: 10px;
}
.tag-container:first-child + .has-close-tag {
  margin-left: 10px;
}
</style>
