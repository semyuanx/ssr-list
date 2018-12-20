<template>
  <label
    class="fm-checkbox"
    :class="shape == 'circle' ? 'fm-checkbox-circle' : ''"
  >
    <template v-if="group">
      <input
        type="checkbox"
        v-model="model"
        :value="val"
        @change="handleChange"
        :disabled="disabled"
      />
    </template>
    <template v-else>
      <input
        type="checkbox"
        v-model="checked"
        v-checkall="update"
        :disabled="disabled"
        :true-value="trueValue"
        :false-value="falseValue"
      />
    </template>

    <span
      class="fm-checkbox-icon"
      :style="iconStyles()"
    ><i :style="checkIconStyles()"></i></span>

    <template v-if="!$slots.default">
      <span class="fm-checkbox-text">{{val}}</span>
    </template>
    <template v-else>
      <span class="fm-checkbox-text">
        <slot></slot>
      </span>
    </template>
  </label>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch, Emit,
} from 'vue-property-decorator';
import Base from './base';

@Component<CheckBox>({
  directives: {
    checkall: {
      bind(el: any, binding: any) {
        el.addEventListener('click', binding.value);
      },
    },
  },
  name: 'fm-checkbox',
})
export default class CheckBox extends Base {
  // 更改调用方法
  @Prop({ type: Function })
  change: any;

  // 复选框绑定的值，双向绑定
  @Prop({ default: false, type: [Boolean, String, Number] })
  value!: boolean | string | number;

  // 值
  @Prop({ type: [Boolean, String, Number] })
  val!: boolean | string | number;

  // 是否禁用
  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  // 图标形状，默认方形
  @Prop({
    validator(value) {
      return ['square', 'circle'].indexOf(value) > -1;
    },
    default: 'square',
  })
  shape!: string;

  // 选中时的值
  @Prop({
    type: [String, Number, Boolean],
    default: true,
  })
  trueValue!: boolean;

  // 选中时的值
  @Prop({
    type: [String, Number, Boolean],
    default: false,
  })
  falseValue!: boolean;

  public model: Array<any> = [];

  private group: boolean = false;

  private checked: boolean | string | number = this.value;

  private update: any = this.change;

  @Watch('checked')
  @Emit('input')
  handleInput(val: string) {}

  @Watch('value')
  valueChanged(val: string) {
    this.checked = val;
  }

  private getAttr<T extends keyof CheckBox>(key: T): CheckBox[T] {
    const parent: any = this.$parent;
    const v = this.group ? parent[key] : this[key];
    return v;
  }

  public handleChange() {
    if (this.disabled) return;
    setTimeout(() => {
      (this.$parent as any).change(this.model);
    }, 0);
  }

  public iconStyles() {
    const size: string = `${this.getAttr('size')}px`;
    const color: string = this.getAttr('color');

    return {
      width: size,
      height: size,
      color,
    };
  }

  public checkIconStyles(): any {
    const size: number = this.getAttr('size');

    return {
      width: `${Math.round(size / 3.2)}px`,
      height: `${Math.round(size / 1.7)}px`,
    };
  }

  created(): void {
    if (
      this.$parent.$options
      && this.$parent.$options.name === 'fm-checkbox-group'
    ) {
      this.group = true;
    }
  }
}
</script>

<style lang="less">
@css-prefix: fm;
.@{css-prefix} {
  &-checkbox {
    display: inline-flex;
    padding-right: 10px;
    align-items: center;
    justify-content: flex-start;
    > input[type="checkbox"] {
      position: absolute;
      left: -9999em;
      &:checked + .@{css-prefix}-checkbox-icon {
        background-color: currentColor;
        border-color: currentColor;
        > i {
          transform: translate(-50%, -50%) rotate(45deg) scale(1);
          transition: all 0.2s ease-in-out;
        }
      }
      &:disabled ~ .@{css-prefix}-checkbox-text {
        color: #ccc;
      }
      &:disabled + .@{css-prefix}-checkbox-icon {
        border-color: #ccc;
        background-color: #f3f3f3;
        > i {
          border-color: #ccc;
        }
      }
    }
  }

  &-checkbox-icon {
    border: 1px solid #ccc;
    border-radius: 2px;
    display: inline-block;
    position: relative;
    z-index: 10;
    vertical-align: bottom;
    pointer-events: none;
    > i {
      content: "";
      position: absolute;
      top: 45%;
      left: 50%;
      border: 2px solid #fff;
      border-top: 0;
      border-left: 0;
      transform: translate(-50%, -50%) rotate(45deg) scale(0);
    }
  }

  &-checkbox-text {
    margin-left: 8px;
    font-size: 15px;
    color: #666;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &-checkbox-circle {
    .@{css-prefix}-checkbox-icon {
      border-radius: 50%;
    }
  }
}
</style>
