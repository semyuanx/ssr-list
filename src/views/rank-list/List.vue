<template>
<div class="main-list-container">
  <div class="fm-show-pc">
    <FmList />
  </div>
  <div class="fm-show-mobile">
    <MobileList />
  </div>
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import FmList from './list/List.vue';
import MobileList from './list/ListMobile.vue';

@Component({
  components: {
    FmList: () => import('./list/List.vue'),
    MobileList,
  },
})
export default class List extends Vue {
  name: string = 'response-list';
}
</script>
<style lang="less" scoped>
.main-list-container {

}

</style>
