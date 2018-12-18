import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home.vue';

Vue.use(Router);

export default function createRouter() {
  return new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/rank-list',
        name: 'rankList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './pages/Rank.vue'),
      },
      {
        path: '/invest',
        name: 'investManager',
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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './components/mobile-filter/FilterSetting.vue'),
      },
    ],
  });
}
