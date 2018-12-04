<template>
  <div id="app">
    <div>
      <!--顶部导航栏-->
      <FMNav :baseStrings="baseStrings" @blogPosted="onBlogPosted"></FMNav>
    </div>
    <div class="content-container">
      <router-view/>
    </div>
    <div>
      <FMFooter :base-strings="baseStrings"></FMFooter>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FMNav from 'fmcomponents/lib/nav2';
import FMFooter from 'fmcomponents/lib/footer';

import 'fmcomponents/src/styles/global.css';
import 'fmcomponents/lib/nav2-main.css';
import 'fmcomponents/lib/footer-main.css';
import 'fmcomponents/src/styles/icon.less';
import 'fmcomponents/src/styles/arrow.less';
import 'fmcomponents/src/styles/btn.less';

import '@/theme/main.less';

@Component({
  components: {
    FMNav,
    FMFooter,
  },
})
export default class App extends Vue {


}
</script>


<style lang="less">

    .content-container {
      margin-top: 50px;
    }
</style>
