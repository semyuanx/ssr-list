import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en-US';
import cn from './zh-CN';
import tw from './zh-TW';
import hk from './zh-HK';

Vue.use(VueI18n);

const lang = 'zh-CN';

// eslint-disable-next-line
export let i18n = {};

export default function createI18n(l?: string, fbl: string = 'zh-CN') {
  if (i18n instanceof VueI18n) {
    return i18n;
  }
  i18n = new VueI18n({
    // locale: l || lang,
    locale: 'en-US',
    fallbackLocale: fbl || 'zh-CN',
    messages: {
      'zh-CN': cn,
      'en-US': en,
      'zh-TW': tw,
      'zh-HK': hk,
    },
  });
  return i18n;
}
