import { createApp } from './app-entry';

declare global {
  interface Window {
    FM_BASE: string;
    FM_API: string;
    FM_TRADE: string;
    FM_LIVE: string;
    FM_AUTH: string;
    FM_CDN: string;
    FM_KAIHU: string;
  }
}

createApp({
  domian: {
    FM_BASE: window.FM_BASE || process.env.VUE_APP_FM_BASE,
    FM_API: window.FM_API || process.env.VUE_APP_FM_API,
    FM_TRADE: window.FM_TRADE || process.env.VUE_APP_FM_TRADE,
    FM_LIVE: window.FM_LIVE || process.env.VUE_APP_FM_LIVE,
    FM_AUTH: window.FM_AUTH || process.env.VUE_APP_FM_AUTH,
    FM_CDN: window.FM_CDN || process.env.VUE_APP_FM_CDN,
    FM_KAIHU: window.FM_KAIHU || process.env.VUE_APP_FM_KAIHU,
  },
});
