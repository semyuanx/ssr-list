import { Location } from 'vue-router';

import {
  isNativeFuncExist,
  createNativeBridge,
  getNativeFnList,
} from 'lib-app-base/packages/native-lib';

const native = createNativeBridge({
  downloadUrl: 'https://www.followme.com/download/index.html',
  onCallSuccess() {
    // alert('success');
  },
  onCallError() {
    // alert('err');
  },
});

export { isNativeFuncExist, getNativeFnList };

/** *********** 全局调用原生接口 start ************ */
/**
 * 关闭 webview 页面，原生都是返回到打开 webview 之前的页面
 * version 3.2
 */
export const closeWebView = (): any => {
  if (isNativeFuncExist('closeWebView')) {
    return native('closeWebView', {});
  }
  return window.app.$router.go(-1);
};

/**
 * 在一个新的webview页面打开，比如打开到登录页面: openWebView('login')
 * version 3.2
 * params.path 打开的页面地址
 */
export const openWebView = (location: Location) => {
  if (isNativeFuncExist('openWebView')) {
    const route = window.app.$router.resolve(location);
    const path = `http://${window.location.host}${route.route.fullPath}`;
    return native('openWebView', { path });
  }
  return window.app.$router.push(location);
};
/**
 * 同步 APP 状态，由 H5 主动向APP端要求状态同步，再由APP端调用 window.app.syncAppState({ ... }); 方法
 * version 3.2
 * params.code 触发的状态行为
 * params.data 相关需要的数据
 */
export const syncAppState = ({ code, data }: any) => native('syncAppState', { code, data });

/**
 * 去登录页面
 * version 3.2
 */
export const toLoginPage = () => native('toLoginPage', {});

/**
 * 获取用户信息, 在离线环境下会使用
 * version 4.1
 */
export interface GetAppInfoData {
  // 用户的token信息, 客户端无法设置, 由接口层来控制
  USER_TOKEN: string;
  // 语言的版本
  lang: string;
  // 客户端的类型
  clientType: string;
  // app 相关信息
  xAppInfo: string;
  // sdk 相关信息
  xSDKInfo: string;
}

export const getAppInfo = (): Promise<GetAppInfoData> => native('401004', {});

/** *********** 全局调用原生接口 end ************ */
