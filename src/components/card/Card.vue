<template>
  <div class="card-contain">
    <div class="user" @click="toPersonal">
      <div class="avatar-con">
        <div class="avatar">
          <img
            @mouseenter.self="mouseenter($event)"
            @mouseleave="mouseleave($event)"
            v-if="data.avatar" :src="data.avatar" />
        </div>
      </div>
      <div class="user-name">
        <span><span @mouseenter.self="mouseenter($event)"
            @mouseleave="mouseleave($event)">{{data.name}}</span> #{{data.index}}</span>
        <div class="broker">
          <span class="broker">{{data.brokerName}}</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="price">
        <div class="price-line num-val">
          <div class="num-percent">{{data.data.length ? data.data[0].val : ''}}</div>
          <div class="sub-num">{{data.data.length >1 ? data.data[1].val : ''}}</div>
        </div>
        <div class="price-line desc">
          <div :key="i.prop + i.val" v-for="i in data.data">{{i && i.prop || ''}}</div>
          <!-- <div>{{data.data.length ? data.data[0].prop : ''}}</div>
          <div>{{data.data.length >1 ? data.data[1].prop : ''}}</div> -->
        </div>
      </div>
      <div class="sub">
        <div @click="sub" class="subscibe-content">
          <span>
            {{data.price ? `$${data.price}/月` : '免费订阅'}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export interface dataType {
  avatar: string;
}

@Component
export default class FmCard extends Vue {
  public name: string = 'fm-card';

  @Prop({
    default: () => {},
  })
  private data!: any;

  @Prop() private rightMsg!: string;

  mouseenter($event: any) {
    this.$emit('showCard', $event);
  }

  mouseleave($event: any) {
    this.$emit('hideCard', $event);
  }

  sub() {
    this.$emit('subscribe', this.data);
  }

  toPersonal() {
    this.$emit('toPersonal', this.data);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import url(./card.less);
</style>
