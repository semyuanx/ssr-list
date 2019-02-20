// eslint-disable-next-line
import '@babel/polyfill';
import { createApp } from './app-entry';

if (process.env.MODE_ENV === 'production' && typeof console !== 'undefined' && console.log) {
  console.log = () => {};
}
declare global {
  interface Window {
    FM_BASE: string;
    FM_API: string;
    FM_TRADE: string;
    FM_LIVE: string;
    FM_AUTH: string;
    FM_CDN: string;
    FM_KAIHU: string;
    FM_PUSH: string;
    app: any;
  }
}
createApp({
  domain: {
    BASE: window.FM_BASE || process.env.VUE_APP_FM_BASE,
    API: window.FM_API || process.env.VUE_APP_FM_API,
    TRADE: window.FM_TRADE || process.env.VUE_APP_FM_TRADE,
    LIVE: window.FM_LIVE || process.env.VUE_APP_FM_LIVE,
    AuthURL: window.FM_AUTH || process.env.VUE_APP_FM_AUTH,
    CDN: window.FM_CDN || process.env.VUE_APP_FM_CDN,
    KAIHU: window.FM_KAIHU || process.env.VUE_APP_FM_KAIHU,
    PUSH: window.FM_PUSH || process.env.VUE_APP_FM_KAIHU,
  },
});
