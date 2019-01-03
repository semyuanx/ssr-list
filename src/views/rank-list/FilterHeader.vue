<template>
  <div>
    <div class="filter-header fm-show-pc">
      <div class="header-content">
        <div class="header-fitler-title"><span>筛选条件：</span></div>
        <div class="header-tag-lists">
          <div
            :key="index"
            v-for="(params,index) in filterRes.filter(v=>v.val)"
            class="header-tag-item"
          >
            <FmTag
              :msg="params.label"
              :desc="params.val"
            />
          </div>
          <!-- <div class="header-tag-item">
            <FmTag
              type="2"
              msg="PTA"
              desc="会员"
            />
          </div> -->
        </div>
        <div class="header-filter">
          <div
            @click="emitFilter"
            class="filter-content"
          >
            <i class="icon-filtrate_24px"></i><span>筛选器</span>
          </div>
          <div class="filter-pop-container">
          <div class="filter-pop">
            <filter-popover
              ref="filterPopover"
              @close="closeFilter"
              :show="isShow"
              @filter="handleFilter"
              @reset="handleReset"
            >

              <template slot="brokerId">
                <filter-tag
                  :border="true"
                  :closed="true"
                  v-for="item in checkedBrokers"
                  class="has-close-tag"
                  @close="handleCloseTag(item)"
                  :key="item"
                >{{brokersList.find(v=>v.BrokerId === item) && brokersList.find(v=>v.BrokerId === item).Broker}}</filter-tag>
                <button
                  class="add-button"
                  @click="addBorker=!addBorker"
                ><i class="fm-fonticon icon-plus_24px"></i>添加</button>
                <check-box-group
                  v-model="checked"
                  class="borkersDialog"
                  v-show="addBorker && isShow"
                >
                  <ul>
                    <li
                      v-for="(item,index) in brokersList"
                      :key="index"
                    >
                      <check-box :val="item.BrokerId">{{item.Broker}}</check-box>
                    </li>
                  </ul>
                </check-box-group>
              </template>
            </filter-popover>

          </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fm-show-mobile">
      <mobile-filter-header />
    </div>

  </div>
</template>
<script lang="ts">
import {
  Component, Vue, Watch, Emit,
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import FmTag from '@/components/tag/tag.vue'; // @ is an alias to /src
import FilterPopover from '@/components/filter-popover/FilterPopover.vue';
import FilterTag from '@/components/filter-popover/FilterTag.vue';
import CheckBoxGroup from '@/components/check-box/CheckBoxGroup.vue';
import CheckBox from '@/components/check-box/CheckBox.vue';
import MobileFilterHeader from '@/components/mobile-filter/FilterHeader.vue';
import { rankList, brokersList } from '@/api/home';

const RankStore = namespace('RankStore');

// const HomeStore = namespace('HomeStore');

@Component({
  components: {
    FmTag,
    FilterPopover,
    FilterTag,
    CheckBoxGroup,
    CheckBox,
    MobileFilterHeader,
  },
})
export default class FilterHeader extends Vue {
  private params: object = {};

  isShow: boolean = false;

  addBorker: boolean = false;

  private checked: any = [];

  @RankStore.State
  brokersList: any;

  @RankStore.Action
  getBrokersList: any;

  @RankStore.State
  rankParams: any;

  @RankStore.Mutation
  setRankParams: any;

  @RankStore.State
  checkedBrokers: any;

  @RankStore.Mutation
  setCheckedBrokers: any;

  @RankStore.State
  filterRes: any;

  closeFilter() {
    this.isShow = false;
  }

  emitFilter() {
    this.isShow = !this.isShow;
    this.addBorker = false;
    this.$emit('filter-click');
  }

  @Emit('filter')
  handleFilter(value: object) {
    this.isShow = false;
  }

  handleReset(value: object) {
    this.setCheckedBrokers([]);
    this.checked = [];
  }

  handleCloseTag(item: string) {
    const checked = this.checkedBrokers.filter((v: any) => v !== item);
    this.setCheckedBrokers(checked);
  }

  @Watch('checked', { deep: true })
  sync(val: any) {
    this.setCheckedBrokers(val);
  }

  mounted() {
    this.checked = this.checkedBrokers;
    this.getBrokersList({
      commonlyused: 1,
    });
  }
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
      flex-direction: column;
      justify-content: center;

      .filter-content {
        position: relative;
        > i {
          vertical-align: middle;
        }
      }
      .filter-pop-container {
        position: absolute;
        width: 100%;
        height: 1px;
        // background: red;
        bottom: 0;
        .filter-pop {
          position: absolute;
          top: 8px;
          right: 0;
          z-index: 100;
        }
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
