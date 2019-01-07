<template>
    <div class="header" :class="{'head-fixed': fixed}">
        <div class="sub-header">
            <div class="sorting-box">
                <div class="sorting-btnbox">
                    <a href="javascript:;" @click="choose(item.value)" v-for="item in headData" :class="{active: pageField == item.value}" :style="item.style" :title="$t('message.' + item.title)" :key="item">{{$t("message." + item.text)}}
                    <i v-if="item.hasSort != 'false'" class="sort-downup" :class="{'sort-down':pageField == item.value && pageSort == 'desc','sort-up':pageField == item.value && pageSort == 'asc'}"></i>
                  </a>
                </div>
            </div>
            <template v-if="item == 'true'">
                <div class="ph217-btn" @click="open">{{$t("message.condition")}}</div>
                <div class="ph217-box" v-show="show">
                    {{$t("message.inCondition")}}①{{$t("message.jzdy")}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;②{{$t("message.syldy")}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;③{{$t("message.yedy")}}
                    <a @click="close"></a>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      lastChoose: '',
      pageField: '',
      pageSort: 'desc',
      fixed: false,
    };
  },
  props: {
    headData: {
      type: Array,
    },
    item: {
      type: String,
    },
    defaultOrder: {
      type: String,
    },
  },
  methods: {
    choose(text) {
      if (text == '') {
        return;
      }
      if (this.lastChoose === text) {
        this.pageSort = this.pageSort == 'desc' ? 'asc' : 'desc';
      } else {
        this.pageField = text;
        this.lastChoose = text;
        this.pageSort = 'desc';
      }
      this.$emit('sortHeadChange', { pageField: this.pageField, pageSort: this.pageSort });
    },
    close() {
      this.show = false;
    },
    open() {
      this.show = !this.show;
    },
  },
  created() {
    this.lastChoose = this.defaultOrder;
    this.pageField = this.defaultOrder;
  },
  mounted() {
    const fixedHeight = this.$el.offsetTop - 50;
    window.addEventListener('scroll', () => {
      const scollT = document.documentElement.scrollTop || document.body.scrollTop;
      if (scollT > fixedHeight) {
        this.fixed = true;
      } else {
        this.fixed = false;
      }
      // if(document.body.scrollTop == $(el).offset().top-50){
      //     $(el).addClass('head-fixed');
      // }else if(document.body.scrollTop < $(el).offset().top-50){
      //     $(el).removeClass('head-fixed');
      // }
    });
  },
};
</script>
<style lang="less">
@import "./index";
</style>
