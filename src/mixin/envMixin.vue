<script lang="js">
// import { getDomain } from 'fmcomponents/src/utils/domain';

const urlMap = {
  traderRegister: '/open/upgrade?type=2',
  mamCreate: '/open/upgrade/mam',
  tradeMaster: '/trading-strategy/follower',
  personalPage: params => `/user/${params.userId}/trade-account/exhibition?index=${params.index}`,
};

const urlNewTabWhiteList = ['traderRegister'];

export default {
  computed: {
    // baseStrings() {
    //   return getDomain();
    // },
    cdn() {
      return this.$baseStrings.CDN;
    },
    base() {
      return this.$baseStrings.BASE;
    },
    kaiHu() {
      return this.$baseStrings.KAIHU;
    },
  },
  methods: {
    redirectTo(alias, params, newTab = false) {
      let url = urlMap[alias];
      if (url) {
        if (typeof url === 'function') {
          url = url(params || {});
        }
      } else {
        url = alias;
      }

      if (/^https?/.test(url) || /^\/\//.test(url)) {
        console.log('is url');
      } else if (alias === 'traderRegister') {
        url = this.kaiHu + url;
      } else {
        url = this.base + url;
      }
      if (typeof window !== 'undefined') {
        if (urlNewTabWhiteList.includes(alias) || newTab) {
          window.open(url, '_blank');
        } else {
          window.location.href = url;
        }
      }
    },
    isObject(val) {
      return Object.prototype.toString.call(val) === '[object Object]';
    },
    $errorDialog(msg, cb = () => {}) {
      return this.$fmdialog({
        message: msg || '抱歉~失败了，请重试！',
        type: 'error',
        duration: 2000,
        isSingle: true,
        onConfirm: cb,
      });
    },

    log(...params) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(params);
      }
    },

    isBrowser() {
      return typeof window !== 'undefined';
    },
  },

};
</script>
