<template>
  <div
    class="filter-section-item"
    :class="{'sel':item.moreBtn === 2,'more':item.moreBtn>0}"
  >

    <span
      class="all-check"
      :class="{'sel':item.item.length===0}"
      @click="item.item=[]"
    >全部</span>
    <el-checkbox-group
      v-model="item.item"
      class="filter-checkbox"
    >
      <el-checkbox
        v-for="(v,k) in item.filter"
        :label="v.BrokerId||v.value"
        :key="k"
      >{{v.BrokerName || v.name}}</el-checkbox>
    </el-checkbox-group>
    <div
      v-if="item.moreBtn>0 && item.filter.length>5"
      class="filter-section-more"
      :class="{'sel':item.moreBtn === 2}"
    ><span @click="item.moreBtn===1?item.moreBtn = 2 :item.moreBtn=1">
      {{item.moreBtn===1?'更多':'收起'}}</span>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component, Vue, Prop, Watch, Emit,
} from 'vue-property-decorator';
import {
  CheckboxGroup, Checkbox, CheckboxButton, Button,
} from 'element-ui';
@Component({
  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [CheckboxButton.name]: CheckboxButton,
    [Button.name]: Button,
  },
})
export default class rankCheckbox extends Vue {
  @Prop({
    default: () => ({
      label: '',
      value: '',
      desc: '',
      item: '',
      filter: [],
      moreBtn: -1,
    }),
  })
  item: any;
}
</script>
<style lang="less">
  .el-checkbox__input {
    &.is-checked{
      .el-checkbox__inner{
          background-color: @form-color !important;
          border-color: @form-color !important;
      }
    }
    &.is-focus{
      .el-checkbox__inner{
          border-color: @form-color !important;
      }
    }
    .el-checkbox__inner:hover{
      border-color: @form-color !important;
    }
  }

  .el-input__inner:hover,.el-input__inner:focus{
    border-color: @form-color !important;
  }
</style>
