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
        meta: {
          title: 'followme-排行榜个人榜单',
        },
        component: Home,
      },
      {
        path: '/ranking',
        name: 'rankList',
        meta: {
          title: '外汇优秀交易员排名__经纪商交易员操盘排行_ Followme外汇社区',
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
          title: '投资管家_外汇投资理财托管产品大全-Followme外汇社区',
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './pages/InvestManager.vue'),
      },
      // {
      //   path: '/test',
      //   name: 'test',
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
      //   component: () => import(/* webpackChunkName: "about" */ './pages/test.vue'),
      // },
      {
        path: '/filter',
        name: 'filter',
        meta: {
          title: 'followme-筛选设置',
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
          title: 'followme-经纪商选择',
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './components/address-book/AddressBook.vue'),
      },

      // {
      //   path: '/follower1', // 跟随大师
      //   name: 'follower1',
      //   meta: {
      //     title: 'followme-跟随大师',
      //   },
      //   component: () => import(/* webpackChunkName: "about" */ './pages/Follower.vue'),
      // },
      {
        path: '/follower', // 跟随大师
        name: 'follower',
        meta: {
          title: '最新跟随交易排行榜_外汇跟单盈利榜单_ Followme外汇社区',
        },
        component: () => import(/* webpackChunkName: "about" */ './pages/follower/follower.vue'),
      },
      {
        path: '/dynamic', // 交易动态
        name: 'tradedynamics',
        meta: {
          title: 'Followme最新交易员和投资者跟随交易动态_Followme外汇社区',
        },
        component: () => import(/* webpackChunkName: "about" */ './pages/tradedynamics/index.vue'),
      },
    ],

    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      return { x: 0, y: 0 };
    },
  });
}
