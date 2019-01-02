// import cookie, { LocalCookies } from '@/utils/cookie';

// interface Options {
//   cookies: LocalCookies;
// }

// const options: Options = {
//   cookies: {
//     get USER_TOKEN(): string {
//       return '';
//     },
//     get lang(): string {
//       return cookie.get('lang');
//     },
//     get xAppInfo() {
//       return cookie.get('xAppInfo');
//     },
//     get xSDKInfo() {
//       return cookie.get('xSDKInfo');
//     },
//     get clientType() {
//       return cookie.get('clientType');
//     },
//   },
// };

interface Data {
  '10000': {
    token: string;
  };
  '10001': {
    accountIndex: number;
  };
  '10002': {};
  '10003': {
    lang: string;
  };
}

export default {
  /**
   * 登录
   * data         { token: 'Bearer 4N6XQTIDbLjqVGnUdDJzCcHN2BVeBGVyK6xPrc64xjKPNlwBvF1GTi-D1lggR_8YNvOWRrL4jj89IYl4efsgEg' }
   */
  10000(app: any, data: Data['10000']) {
    const { info, tradeAccounts } = app.$store.currentUser;
    info.getCurrentUserInfo();
    tradeAccounts.getAccounts();
  },
  /**
   * 切换账户
   * data         { accountIndex: 1 }
   */
  10001(app: any, data: Data['10001']) {
    // 切换账户
    const { info, tradeAccounts } = app.$store.currentUser;
    info.getCurrentUserInfo();
    tradeAccounts.getAccounts();
  },
  /**
   * 退出
   * data         {}
   */
  10002(app: any, data: Data['10002']) {
    window.location.reload();
  },
  /**
   * 切换语言版本
   * data          { lang: 'zh-CN' }
   */
  10003(app: any, data: Data['10003']) {
    if (data.lang in app.$i18n.messages) {
      app.$i18n.locale = data.lang;
    }
  },
};
