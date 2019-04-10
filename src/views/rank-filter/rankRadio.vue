<template>
  <div
    class="filter-section-item"
    :class="{'sel':moreState}"
  >
    <span
      class="all-check"
      :class="{'sel':item.item.length===0}"
      @click="item.item=[];item.input[0]='';item.input[1]=''"
    >全部</span>
    <div
      class="filter-radio"
      style="margin-left:-15px;"
    >
      <ul class="filter-radio-item">
        <li
          v-for="(v,i) in item.filter"
          :key="i"
          @click="changeItem(item,v)"
          :class="{'sel':item.item[0]?item.item[0].value === v.value:false}"
        >{{v.name}}</li>
        <li class="filter-radio-item-input">
          <el-input v-model="item.input[0]">
            <i
              slot="suffix"
              class="el-input__icon"
            >{{item.tip}}</i>
          </el-input>
          <span style="color:#DBDBDB">&nbsp;-&nbsp;</span>
          <el-input v-model="item.input[1]">
            <i
              slot="suffix"
              class="el-input__icon"
            >{{item.tip}}</i>
          </el-input>
          <el-button
            v-show="item.input[0]||item.input[1]"
            @click="sylSub(item)"
          >确定</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';
import { Input, Button } from 'element-ui';
@Component({
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
  },
})
export default class rankRadio extends Vue {
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

  @Emit('sylSub')
  sylSub(obj: any) {}

  @Emit('changeItem')
  changeItem(o: any, obj: any) {}
}
</script>

<style lang="less">

</style>
