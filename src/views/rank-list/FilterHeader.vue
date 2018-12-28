<template>
  <div class="filter-header">
    <div class="header-content">
      <div class="header-fitler-title"><span>筛选条件：</span></div>
      <div class="header-tag-lists">
        <div :key="index" v-for="(i, index) in Array(10).fill(0)" class="header-tag-item">
          <FmTag msg="账户评级" desc="A" />
        </div>
        <div key="24" class="header-tag-item">
          <FmTag type="2" msg="PTA" desc="会员" />
        </div>
      </div>
      <div class="header-filter">
        <div @click="emitFilter" class="filter-content">
          <i class="icon-filtrate_24px"></i><span>筛选器</span>
        </div>
        <div class="filter-pop"><FilterPopover @close="closeFilter" :show="isShow" /></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import FmTag from '@/components/tag/tag.vue'; // @ is an alias to /src
import FilterPopover from '@/components/filter-popover/FilterPopover.vue';

// const HomeStore = namespace('HomeStore');

@Component({
  components: {
    FmTag, FilterPopover,
  },
})
export default class FilterHeader extends Vue {
  isShow: boolean = false;

  closeFilter() {
    this.isShow = false;
  }

  emitFilter() {
    this.isShow = !this.isShow;
    this.$emit('filter-click');
  }

  mounted() {

  }
}
</script>
<style lang="less" scoped>
.filter-header {
  padding: 20px 0;

  .header-content {
    display: flex;
    flex-direction: row;
    // align-items: center;
    // flex-wrap: wrap;
    .header-fitler-title {
      font-size:14px;
      font-family:MicrosoftYaHei;
      color:rgba(51,51,51,1);
      line-height:19px;
      width:76px;
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
      font-size:14px;
      font-family:MicrosoftYaHei;
      color:rgba(51,51,51,1);
      line-height:19px;
      cursor: pointer;
      position: relative;

      .filter-content {
        position: relative;
        >i {
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
