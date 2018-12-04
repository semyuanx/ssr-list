import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const r:any = require.context('./', false, /\.ts/);
const modules = r.keys().filter((i: any) => i !== './index.ts').map((file: any) => {
  // eslint-disable-next-line
  const m: any = new r(file).default;
  return { [m.namespace]: m };
}).reduce((j: any, k: any) => ({ ...j, ...k }));
export default function createStore() {
  return new Vuex.Store({
    modules: { ...modules },
    strict: process.env.NODE_ENV !== 'production',
  });
}
