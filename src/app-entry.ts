import Vue, { CreateElement } from 'vue';
import App from './App.vue';
import createRouter from './router';
import createStore from './stores';
import { sync } from 'vuex-router-sync';
import './registerServiceWorker';
import fmui from '@fmfe/fm-vue-ui';
import '@fmfe/fm-vue-ui/lib/theme-default/index.css';
import fmcomponents from 'fmcomponents';

import envMixin from './mixin/envMixin.vue';
import { isWebview } from './utils/device';


import createI18n from './i18n';

export function createApp(ctx: any) {
  const { domain } = ctx;
  if (process.env.NODE_ENV === 'production') {
    Vue.config.productionTip = false;
  }
  let lang = 'zh-CN';
  // const lang = 'en-US';
  // const gLang = (window as any).FMLANG;
  // if (gLang) {
  //   lang = gLang;
  // } else {
  const cLang = (window as any).LANG;
  if (cLang) {
    lang = cLang;
  }
  // }
  const injectEnv: any = {
    install(vue: any, option: any) {
      const v: any = vue;
      v.prototype.$baseStrings = option;
    },
  };
  const mainDomain = Object.assign({
    API: process.env.VUE_APP_FM_API,
    BASE: process.env.VUE_APP_FM_BASE,
    AuthURL: process.env.VUE_APP_FM_AUTH,
    ENV: process.env.NODE_ENV,
    CDN: process.env.VUE_APP_FM_CDN,
    KAIHU: process.env.VUE_APP_FM_KAIHU,
    TRADE: process.env.VUE_APP_FM_TRADE,
    locale: lang || 'zh-CN',
  }, domain);
  Vue.use(injectEnv, mainDomain);
  Vue.use(fmcomponents, mainDomain);
  Vue.use(fmui, {
    lang,
  });
  Vue.mixin(envMixin);

  const i18n = createI18n(lang);
  const store = createStore();
  const router = createRouter();
  router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title || 'Followme';
    next();
  });
  const isAppVisit = isWebview(window.location && window.location.search);

  sync(store, router);
  const app = new Vue({
    i18n,
    router,
    store,
    render: (h: CreateElement) => h(App, {
      props: {
        isAppVisit,
      },
    }),
  });

  (window as any).app = app;

  app.$mount('#app');
}

export const none = {};
