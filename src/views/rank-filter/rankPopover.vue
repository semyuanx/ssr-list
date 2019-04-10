<template>
  <section class="filter-section">
    <div class="filter-section-label">更多选项：</div>
    <ul
      class="filter-pop"
      style="margin-left:10px;"
    >
      <li
        v-for="(obj,key) in data"
        :key="key"
      >
        <el-popover
          v-if="obj.type.indexOf('radio')>-1"
          placement="bottom-start"
          v-model="obj.popState"
        >
          <ul class="filter-more-item">
            <li
              @click="clearItem(obj);"
              :class="{'sel':obj.item.length===0}"
            >全部</li>
            <li
              v-for="(v,k) in obj.filter"
              :key="k"
              @click="changeItem(obj,v)"
              :class="{'sel':obj.item[0]?obj.item[0].value === v.value:false}"
            >{{v.name}}</li>
            <li
              class="filter-radio-item-input"
              style="padding-left:0"
            >
              <!-- {{obj.input[0]}} -->
              <el-input v-model="obj.input[0]">
                <i
                  slot="suffix"
                  class="el-input__icon"
                >{{obj.tip}}</i>
              </el-input>
              <span>&nbsp;-&nbsp;</span>
              <el-input v-model="obj.input[1]">
                <i
                  slot="suffix"
                  class="el-input__icon"
                >{{obj.tip}}</i>
              </el-input>
              <el-button
                v-show="obj.input[1]||obj.input[0]"
                @click="sylSub(obj,obj)"
              >确定</el-button>
            </li>
          </ul>
          <div
            class="filter-more-title"
            slot="reference"
            :class="{'sel':obj.item.length>0}"
            @click="obj.openState = !obj.openState;"
          >
            {{obj.label}}
          </div>
        </el-popover>
        <el-checkbox-group
          v-if="obj.type==='more-checkbox'"
          v-model="obj.item"
        >
          <el-checkbox
            v-for="(v,k) in obj.filter"
            :key="k"
            :label="v.value"
          >{{v.name}}</el-checkbox>
        </el-checkbox-group>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit, Watch,
} from 'vue-property-decorator';
import {
  Input, Button, Popover, Checkbox, CheckboxGroup,
} from 'element-ui';
@Component({
  components: {
    [Popover.name]: Popover,
    [Input.name]: Input,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Button.name]: Button,
  },
})
export default class RankPopover extends Vue {
  @Prop()
  data: any;

  popState: any = false;


  // 清除当前所有选项
  clearItem(obj: any) {
    if (obj.popState) {
      obj.popState = false;
    }
    this.$emit('clearItem', obj);
  }

  // 单选添加项
  changeItem(obj: any, item: any) {
    // console.log(this.$ref.ss)
    if (obj.popState) {
      obj.popState = false;
    }
    this.$emit('changeItem', obj, item);
  }

  @Emit('sylSub')
  sylSub(obj: any) {}
}
</script>

<style lang="less" scoped>
.filter-pop {
  li {
    float: left;
    margin-right: 25px;
  }
}
</style>
