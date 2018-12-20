<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch, Emit,
} from 'vue-property-decorator';
import CheckBox from './CheckBox.vue';
import Base from './base';

@Component({
  name: 'fm-checkbox-group',
})
export default class CheckBoxGroup extends Base {
  // 双向绑定值
  @Prop({
    type: Array,
    default: [],
  })
  value!: any[];

  // 选择后回调，返回当前选中值
  @Prop({
    type: Function,
    default: () => {},
  })
  callback: any;

  @Emit('input')
  change(val: string) {
    this.callback(val);
  }

  public childrens: CheckBox[] = [];

  @Watch('value')
  updateValue() {
    this.childrens = (this.$children as any).filter(
      (item: CheckBox) => item.$options.name === 'fm-checkbox',
    );
    if (this.childrens) {
      this.childrens.forEach((child: CheckBox) => {
        child.model = this.value;
      });
    }
  }

  mounted() {
    this.$nextTick(this.updateValue);
  }
}
</script>
