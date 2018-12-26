
<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode, CreateElement } from 'vue';

@Component
export default class Tag extends Vue {
  public name: string = 'fm-tag';

  @Prop({
    default() {
      return '';
    },
  })
  public msg!: string;

  @Prop({
    default() {
      return '';
    },
  })
  public desc!: string;

  @Prop({
    default() {
      return 1;
    },
  })
  public type!: number;

  tagClick() {
    this.$emit('click');
  }

  render(h: CreateElement): VNode {
    return (
      <div onClick={this.tagClick} class="tag-container">
        <span class={this.type === 1 ? 'tag-msg' : 'tag-desc'}>{this.msg || ''}</span>
        <span class="tag-desc">{this.desc || ''}</span>
      </div>
    );
  }
}
</script>
<style lang="less" scoped>
.tag-container {
  max-width: 260px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  flex: 1;
  font-size:12px;
  font-family:MicrosoftYaHei;
  color:rgba(102,102,102,1);
  line-height:24px;
  height: 24px;
  background:rgba(255,255,255,1);
  border-radius:12px;
  padding: 0 10px;
  // &:hover {
  //   border: 1px solid #FF6200;
  // }
  .tag-msg {
    color: #666666;
    margin-right: 5px;
  }
  .tag-desc {
    color: #FF6200;
  }
}
</style>
