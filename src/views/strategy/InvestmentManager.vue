<template>
  <div class="manager-container">
    <Navbar @change="handleChange"></Navbar>
    <div class="panel-wrapper">
      <Panel
        class="panel"
        v-for="(item,index) in 2"
        :key="index"
      ></Panel>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Navbar, Panel } from './components';

@Component({
  components: {
    Navbar,
    Panel,
  },
})
export default class Manager extends Vue {
  created() {
    console.log(this);
  }

  handleChange() {
    console.log('切换成功了');
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.manager {
  &-container {
    width: 1180px;
    margin: 0 auto;
    padding-top: 30px;
    .panel-wrapper {
      .panel {
        display: inline-block;
        margin-top: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>
