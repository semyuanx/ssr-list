<script lang="js">
// import { getDomain } from 'fmcomponents/src/utils/domain';

import { isWebview } from '@/utils/device';

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
    isApp() {
      return isWebview(this.$route.query);
    },
  },
};
</script>
