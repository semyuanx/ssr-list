<template>
  <div id="app">

    <div v-if="!isAppVisit" class="fm-content-header">
      <!--顶部导航栏-->
      <FMNav :test='isAppVisit' :activeMenu="1"/>
    </div>
    <div class="fm-content-container">
      <div class="router-container">
        <router-view />
      </div>
    </div>
    <div class="page-footer" v-show="isShow">
      <FMFooter :show-links="false" />
    </div>
    <FMSlideTool></FMSlideTool>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
// import FMNav from 'fmcomponents/src/components/nav2';
// import FMFooter from 'fmcomponents/src/components/footer2';
import eventBus from '@/utils/event';
import { loadScript } from '@/utils/util';
import 'minireset.css';
import '@/theme/main.less';

import 'v2-datepicker/lib/index.css';
import V2Datepicker from 'v2-datepicker';

Vue.use(V2Datepicker);

@Component({
  components: {
    FMNav: () => import(/* webpackChunkName: "nav2" */ 'fmcomponents/src/components/nav2'),
    FMSlideTool: () => /* webpackChunkName: "fm-footer" */ new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(import(/* webpackChunkName: "slide-tool" */ 'fmcomponents/src/components/slide-tool'));
      }, 1300);
    }),
    FMFooter: () => new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(import(/* webpackChunkName: "footer2" */ 'fmcomponents/src/components/footer2'));
      }, 1000);
    }),
  },
  metaInfo() {
    const lang: any = (key: any, ...args: any[]) => this.$i18n.t(`message.meta.${key}`, ...args);
    return {
      title: lang('title'),
      meta: [
        { name: 'description', content: lang('description') },
        { name: 'keywords', content: lang('keywords') },
      ],
    };
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

  uploadloadingInfo() {
    setTimeout(() => {
      loadScript('https://cdn.followme.com/common/raven/vue/raven.min.js', () => {
        const Raven = (window as any).Raven;
        Raven.config('https://27bdc53567784bb3b1a471e61ec0ed15@sentry.followme.com/16', {
          release: 'rank-self@1.0',
          // sampleRate: 1,
          whitelistUrls: [/sentry\.followme\.com/, /cdn\.followme\.com/],
        }).install();
        if (performance && performance.timing) {
          const t: any = performance.timing;
          Raven.captureException({
            message: t,
            connect: {
              d: '握手时间',
              t: t.connectEnd - t.connectStart,
            },
            unload: {
              d: '卸载',
              t: t.unloadEventEnd - t.unloadEventStart,
            },
            dns: {
              d: 'dns lookup',
              t: t.domainLookupEnd - t.domainLookupStart,
            },
            index: {
              d: 'index.html time',
              t: t.domLoading - t.navigationStart,
            },
            pageShow: {
              d: 'page is loaded an finished',
              t: t.domComplete - t.navigationStart,
            },
            domInteractive: {
              d: 'page is showed',
              t: t.domInteractive - t.navigationStart,
            },
          }, {
            tags: { time: 'timeRecord' },
          });
        }
      });
    }, 4000);
  }

  public mounted() {
    this.resize();
    // if (process.env.NODE_ENV === 'production') {
    this.uploadloadingInfo();
    // }
  }
}
</script>

<style lang="less">
  .el-table .sort-caret.descending {
    bottom: 8px!important;
  }
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
  .el-table::before{
    content: none!important;
  }
</style>
