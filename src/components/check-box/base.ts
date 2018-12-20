import { Component, Vue, Prop } from 'vue-property-decorator';
import { isColor } from '@/utils/util';

@Component
export default class Base extends Vue {
  // 复选框颜色
  @Prop({
    default: '#FF6200',
    validator(value) {
      if (!value) return true;
      return isColor(value);
    },
  })
  color!: string;

  // 复选框尺寸
  @Prop({
    validator(val) {
      return /^([1-9]\d*)$/.test(val);
    },
    default: 16,
  })
  size!: number;
}
