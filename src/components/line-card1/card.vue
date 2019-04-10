<template>
  <div class="line-card-content">
    <div class="line-title">
      <!-- <h2>{{data.name}}</h2> -->
      <div class="line-title-top">
        <h2 @click="toPersonal">{{data.name}}</h2>
        <span>{{data.danger}}</span>
      </div>
      <div class="line-title-bto" >
        <div class="card-avatar">
          <img
            :alt="data.trader.name || '头像'"
            v-lazyLoad="data.trader.Signature"
            src="//cdn.followme.com/images/default_avata.png"
            :src1="data.trader.Signature"
          >
        </div>
        <h3
            @mouseenter.self="mouseenter($event)"
            @mouseleave="mouseleave($event)"
            @click="toPersonal"
        >{{data.trader.Nickname}}&nbsp;#{{data.trader.BrokerID}}</h3>
      </div>
    </div>
    <div
      class="line-list"
      v-for="(i,index) in data.data"
      :key="index"
    >
      <div
        class="line-list-val"
        :class="{'rate-val': true, green: index < 2}"
      >
        {{i && i.val}}
      </div>
      <div class="line-list-key">{{i && i.prop || ''}}</div>
    </div>
    <div class="line-btn">
      <div
        v-if="data.confirmBtn"
        @click="sub"
        class="subscribe-btn"
      >{{data.confirmBtn}}</div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { loadAsyncImage } from '@/utils/util';

@Component({
  directives: {
    lazyLoad: {
      bind: (el: any, binding: any) => {
        const src = binding.value;
        loadAsyncImage(src, 0)
          .then((res: any) => {
            el.src = src;
          })
          .catch(() => {
            el.src = src;
          });
      },
    },
  },
})
export default class LineCard extends Vue {
  @Prop()
  data: any;

  mounted() {
    console.log(this.data, '000-000');
  }

  mouseenter($event: any) {
    this.$emit('showCard', $event);
  }

  mouseleave($event: any) {
    this.$emit('hideCard', $event);
  }

  toPersonal() {
    this.$emit('toPersonal', this.data);
  }

  sub() {
    console.log('sub');
    this.$emit('subscribe', this.data);
  }
}
</script>


<style lang="less" scoped>
.line-card-content {
  height: 80px;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .line-title {
    flex: 3;
    .line-title-top {
      display: flex;
      align-items: center;
      h2 {
        font-size: 18px;
        color: #333;
        font-weight: 600;
        cursor: pointer;
        &:hover{
            color: @default-color;
        }
      }
      span {
        height: 18px;
        line-height: 18px;
        margin-left: 5px;
        padding: 0 4px;
        color: @default-color;
        border-radius: 5px;
        font-size: 12px;
        border: 1px solid @default-color;
      }
    }

    .line-title-bto {
      display: flex;
      align-items: center;
      .card-avatar {
        border-radius: 20px;
        img {
          width: 20px;
          height: 20px;
          display: block;
        }
      }
      h3 {
        color: #666666;
        // line-height: 20px;
        font-size: 12px;
        line-height: 25px;
      }
    }
  }
  .line-list {
    flex: 2;
    .line-list-val {
      font-size: 18px;
      line-height: 1.5;
      font-weight: 500;
      &.green {
        color: #1fbb95;
      }
    }
    .line-list-key {
      font-size: 12px;
      color: #999999;
      line-height: 25px;
    }
  }
  .line-btn {
    .subscribe-btn {
      color: @default-color;
      font-size: 14px;
      border: 1px solid @default-color;
      border-radius: 30px;
      line-height: 30px;
      width: 80px;
      text-align: center;
      cursor: pointer;
      transition: all .3s ease-in-out;
      &:hover {
        background-color: @default-color;
        color: #fff;
      }
    }
  }
  &:hover {
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 1);
    z-index: 10;
  }
}
</style>
