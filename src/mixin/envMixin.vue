<script lang="js">
// import { getDomain } from 'fmcomponents/src/utils/domain';

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
};
</script>
