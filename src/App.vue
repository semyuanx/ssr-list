<template>
  <div id="app">

    <div v-if="!isAppVisit" class="fm-content-header">
      <!--顶部导航栏-->
      <FMNav :test='isAppVisit'/>
    </div>
    <div class="fm-content-container">
      <div class="router-container">
        <router-view />
      </div>
    </div>
    <div class="page-footer" v-show="isShow">
      <FMFooter :show-links="false" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FMNav from 'fmcomponents/src/components/nav2';
// import FMFooter from 'fmcomponents/src/components/footer2';
import eventBus from '@/utils/event';
import 'minireset.css';
import '@/theme/main.less';

import 'v2-datepicker/lib/index.css';
import V2Datepicker from 'v2-datepicker';

Vue.use(V2Datepicker);

@Component({
  components: {
    FMNav,
    FMFooter: () => import('fmcomponents/src/components/footer2'),
  },
})
export default class App extends Vue {
  // 是否是从APP访问
  @Prop({ type: Boolean, default: true }) isAppVisit!: boolean;

  public isShow: boolean = true;

  private resize() {
    const this$ = this;
    const optimizedResize = (function optimizedResize() {
      const cbs:Array<Function> = [];
      let running: boolean = false;

      function runCbs() {
        cbs.forEach((cb) => {
          cb.call(this$, this$);
        });
        running = false;
      }

      function resize() {
        if (!running) {
          running = true;
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(runCbs);
          } else {
            setTimeout(runCbs, 60);
          }
        }
      }

      function addCb(cb: Function) {
        if (cb && cb instanceof Function) {
          cbs.push(cb);
        }
      }
      return {
        add(cb: Function) {
          if (!cbs.length) {
            window.addEventListener('resize', resize);
          }
          addCb(cb);
        },
      };
    }());

    this.computeIsShow();
    optimizedResize.add(() => {
      this.computeIsShow();
      eventBus.$emit('window-resize');
    });
  }

  public computeIsShow() {
    const w = window.innerWidth;
    if (w && w < 880) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }

  public mounted() {
    this.resize();
  }
}
</script>
<style lang="less">
  .fm-content-header+.fm-content-container {
    margin-top: 60px;
    width: 100%;
    .router-container {
      width: 100%;
      max-width: @pc-max-width;
      margin: 0 auto;
    }
  }
  .page-footer {
    padding-top: 20px;
    position: relative;
  }
</style>
