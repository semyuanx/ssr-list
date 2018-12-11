<template>
  <div id="app">
    <div>
      <!--顶部导航栏-->
      <FMNav
        :baseStrings="baseStrings"
        @blogPosted="onBlogPosted"
      ></FMNav>
    </div>
    <div class="content-container">
      <div class="router-container">
        <router-view />
      </div>
    </div>
    <div class="page-footer" v-show="isShow">
      <FMFooter :base-strings="baseStrings"></FMFooter>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FMNav from 'fmcomponents/lib/nav2';
import FMFooter from 'fmcomponents/lib/footer';

import 'minireset.css';
import 'fmcomponents/src/styles/global.css';
import 'fmcomponents/lib/nav2-main.css';
import 'fmcomponents/lib/footer-main.css';
import 'fmcomponents/lib/sidebar-main.css';

import 'fmcomponents/src/styles/btn.less';
import 'fmcomponents/src/styles/icon.less';
import 'fmcomponents/src/styles/arrow.less';

import '@/theme/main.less';

@Component({
  components: {
    FMNav,
    FMFooter,
  },
})
export default class App extends Vue {
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
  .content-container {
    margin-top: 50px;
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
    padding-bottom: 146px;
  }
</style>
