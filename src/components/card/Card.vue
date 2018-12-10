<template>
  <div class="card-contain">
    <div class="user">
      <div class="avatar-con">
        <div class="avatar"></div>
      </div>
      <div class="user-name">
        <span>黄晓伟 #5</span>
        <div class="broker">
          <span class="broker">KVB昆仑国际</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="price">
        <div class="price-line num-val">
          <div class="num-percent">3,464.67%</div>
          <div class="sub-num">890</div>
        </div>
        <div class="price-line desc">
          <div>收益率</div>
          <div>订阅人数</div>
        </div>
      </div>
      <div class="sub">
        <div class="subscibe-content">
          <span>
            $0.99/月
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FmHeader extends Vue {
  public name: string = 'fm-card';

  @Prop() private title!: string;

  @Prop() private rightMsg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import url(./card.less);
</style>
