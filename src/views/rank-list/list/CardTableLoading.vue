<template>
  <div class="append-loading">

    <!-- <div class="append-header">
      <div class="header-left">
        <span class="col-1"></span>
        <span class="col-2"></span>
      </div>
      <div class="header-right"></div>
    </div>
    <div class="append-img"></div>
    <div class="append-list">
      <div class="append-item"></div>
      <div class="append-item"></div>
      <div class="append-item"></div>
      <div class="append-item"></div>
    </div>
    <div class="append-bto">
      <div class="append-bto-left"></div>
      <div class="append-bto-right"></div>
    </div> -->
    <SvgIcon
      width="1180"
      height="382"
      name="data-loading"
    >123</SvgIcon>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import SvgIcon from '@/components/svg/index.ts';
@Component({
  components: {
    SvgIcon,
  },
})
export default class CardTableLoading extends Vue {}
</script>
<style lang="less" scoped>
.append-loading {
  animation: animations-loading 2s ease-in-out 0.1s infinite forwards;
  width: 100%;
  height: 388px;
  margin-bottom: 12px;
  background-color: #fff;
}
@keyframes animations-loading {
  0% {
    opacity: 0.1;
  }
  10% {
    opacity: 0.2;
  }
  20% {
    opacity: 0.4;
  }
  30% {
    opacity: 0.6;
  }
  40% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  60% {
    opacity: 0.8;
  }
  70% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.4;
  }
  90% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.1;
  }
}
</style>
