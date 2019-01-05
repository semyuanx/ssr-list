<script lang="js">
// import { getDomain } from 'fmcomponents/src/utils/domain';

const urlMap = {
  traderRegister: 'https://alibetacreate.followme.com/open/upgrade?type=2',
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
  },
  methods: {
    redirectTo(alias) {
      const url = urlMap[alias];
      if (url) {
        window.location.href = url;
      }
    },
  },
};
</script>
