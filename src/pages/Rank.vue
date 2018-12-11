<template>
  <div class="rank-container">

  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import FilterHeader from '@/views/rank-list/FilterHeader.vue';

// const HomeStore = namespace('HomeStore');

@Component({
  components: {
    FilterHeader,
  },
})
export default class RankList extends Vue {
  mounted() {

  }
}
</script>
<style lang="less" scoped>
.rank-container {

}
</style>
