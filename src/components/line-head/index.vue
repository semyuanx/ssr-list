<template>
  <div class="line-head-contain">
    <div class="main-line">
      <div class=" main-line-title">{{title || ''}}</div>
      <div @click="rightClick" class=" left-line-icon">
        <i class="icon-right_24px"></i>
      </div>
    </div>
    <div class="sub-title-container">
      <slot name="subTitle">
        <div v-if="subTitle" class="sub-title">
          {{subTitle || ''}}
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Emit,
} from 'vue-property-decorator';

@Component
export default class FmCard extends Vue {
  public name: string = 'fm-card';

  @Prop() private title!: string;

  @Prop() private subTitle!: string;

  @Emit('rightClick')
  rightClick() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import url(./index.less);
</style>
