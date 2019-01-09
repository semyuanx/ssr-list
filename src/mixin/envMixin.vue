<script lang="js">
// import { getDomain } from 'fmcomponents/src/utils/domain';

const urlMap = {
  traderRegister: '/open/upgrade?type=2',
  tradeMaster: '/trading-strategy/follower',
  personalPage: params => `/user/${params.userId}/trade-account/exhibition?index=${params.index}`,
};

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
        if (newTab) {
          window.open(url, '_blank');
        } else {
          window.location.href = url;
        }
      }
    },
  },
};
</script>
