/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

if (workbox.core.skipWaiting) {
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
 } else {
  workbox.skipWaiting();
  workbox.clientsClaim();
 }

workbox.core.setCacheNameDetails({prefix: "ssr-rank-list"});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  new RegExp("https://cdn\.staticfile\.org/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'rank-staticfile'
  })
);
workbox.routing.registerRoute(
  new RegExp("https://cdn\.followme\.com/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'rank-cdn-follow'
  })
);
workbox.routing.registerRoute(
  new RegExp("https://static\.followme\.com/"),
  workbox.strategies.cacheFirst({
    cacheName: 'rst:img',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 12 * 60 * 60
      })
    ]
  })
);
var cacheList = [
  '/trading-strategy',
  '/trading-strategy/',
  '/trading-strategy/ranking',
];

workbox.routing.registerRoute(
  function(event) {
    // 需要缓存的HTML路径列表
    if (~cacheList.indexOf(event.url.pathname)) 
    {
      return false;
    } else {
      return false;
    }
  },
  workbox.strategies.networkFirst({
    cacheName: 'rl:html',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10
      })
    ]
  })
);