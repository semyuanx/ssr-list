import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import fmui from '@fmfe/fm-vue-ui';
import fmcomponents from 'fmcomponents/dist/fmcomponents';

import createI18n from './i18n';

if (process.env.NODE_ENV !== 'production') {
  Vue.config.productionTip = false;
}
(window as any).FMLang = 'zh-CN';

const injectEnv: any = {
  install(vue: any, option: any) {
    const v: any = vue;
    v.prototype.$baseStrings = option;
  },
};
Vue.use(injectEnv, {
  API: process.env.VUE_APP_FM_API,
  BASE: process.env.VUE_APP_FM_BASE,
  AuthURL: process.env.VUE_APP_FM_AUTH,
  ENV: process.env.NODE_ENV,
  CDN: process.env.VUE_APP_FM_CDN,
  KAIHU: process.env.VUE_APP_FM_KAIHU,
  TRADE: process.env.VUE_APP_FM_TRADE,
  locale: (window as any).FMLang || 'zh-CN',
});

Vue.use(fmcomponents, {
  API: process.env.VUE_APP_FM_API,
  BASE: process.env.VUE_APP_FM_BASE,
  AuthURL: process.env.VUE_APP_FM_AUTH,
  ENV: process.env.NODE_ENV,
  TRADE: process.env.VUE_APP_FM_TRADE,
});

Vue.use(fmui);

const i18n = createI18n();

const app = new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
});

app.$mount('#app');
