<template>
  <div class="card-contain">
    <div class="user" >
      <slot name="header">
        <div class="avatar-con">
          <div class="avatar">
            <img
              @click="toPersonal"
              @mouseenter.self="mouseenter($event)"
              @mouseleave="mouseleave($event)"
              v-if="data.avatar" :src="data.avatar + '?x-oss-process=image/resize,m_fill,h_50,w_50'" alt="avatar" />
          </div>
        </div>

        <div  class="user-name">
          <span class="name-container">
            <span
              @click="toPersonal"
              class="name-active" @mouseenter.self="mouseenter($event)"
              @mouseleave="mouseleave($event)">{{data.name}}</span>
              <span> #{{data.index}}</span>
              <span
                v-if="data.isShowGrade"
                :class="'grade-score-icon ' + mapGradeClass(data.grade)"
              >{{data.grade}}</span>
              <span
                v-if="data.isShowPta"
                :class="'grade-score-icon '"
              >
                <PtaLogo />
              </span>
          </span>
          <div class="broker">
            <span class="broker">{{data.brokerName}}</span>
          </div>
        </div>
      </slot>
    </div>
    <div class="bottom">
      <div :class="'price ' +  (data.showStrategy ? 'in-strategy' : '')">
        <div class="price-line num-val" v-if="Array.isArray(data.data) && data.data.length">
          <div :key="i.prop + i.val" v-for="i in data.data">
            <div :class="{'num-same': true, 'need-green': i.hightlight}">{{ i.val }}</div>
            <div class="desc">{{ i.prop }}</div>
          </div>
        </div>
      </div>
      <div v-if="data.showStrategy" class="strategy-content fm-show-pc">
        <div class="strategy-content-container">
          <span :title="data.strategyDesc" class="strategy-detail">{{data.strategyDesc}}</span>
        </div>
      </div>
      <div v-if="data.confirmBtn" class="sub">
        <div @click="sub" class="subscibe-content">
          <span >
            {{data.confirmBtn}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PtaLogo from '@/components/ptaLogo/index.vue';

export interface dataType {
  avatar: string;
}

@Component({
  components: {
    PtaLogo,
  },
})
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

  mapGradeClass(val: any) {
    const grade = val;
    const gradeMap: any = {
      S: 1,
      'A+': 2,
      A: 3,
      'A-': 4,
      B: 5,
      C: 6,
      D: 7,
    };
    return `grade-score-${gradeMap[grade]}`;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import url(./card.less);
</style>
