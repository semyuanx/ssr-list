import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home.vue';

Vue.use(Router);

const base = '/trading-strategy';
export default function createRouter() {
  return new Router({
    mode: 'history',
    base: base || process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/ranking',
        name: 'rankList',
        meta: {
          title: '筛选器',
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './pages/Rank.vue'),
      },
      {
        path: '/invest',
        name: 'investManager',
        meta: {
          title: '投资管家',
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './pages/InvestManager.vue'),
      },
      {
        path: '/test',
        name: 'test',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './pages/test.vue'),
      },
      {
        path: '/filter',
        name: 'filter',
        meta: {
          title: '筛选设置',
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/rank-list/mobileList/Filter.vue'),
      },
      {
        path: '/book',
        name: 'book',
        meta: {
          title: '经纪商选择',
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './components/address-book/AddressBook.vue'),
      },

      {
        path: '/follower', // 跟随大师
        name: 'follower',
        meta: {
          title: '跟随大师',
        },
        component: () => import(/* webpackChunkName: "about" */ './pages/Follower.vue'),
      },
      {
        path: '/dynamic', // 交易动态
        name: 'tradedynamics',
        component: () => import(/* webpackChunkName: "about" */ './pages/tradedynamics/index.vue'),
      },
    ],
  });
}
