<template>
  <div class="header-contain">
    <div class="msg-contain left">
      <slot name="left">
        <h2>{{ title || '' }}</h2>
      </slot>
    </div>
    <div class="msg-contain right">
      <slot name="right">
        <span>{{ rightMsg || '' }}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FmHeader extends Vue {
  public name: string = 'fm-header';

  @Prop() private title!: string;

  @Prop() private rightMsg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base-font: 24px;
.header-contain {
  display: flex;
  flex-direction: row;
  min-height: 40px;
  .msg-contain {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: row;
  }
}
@media screen and (max-width: 880px) {
  .header-contain {
    .right {
      display: none;
    }
  }
}
</style>
