<template>
    <div class="load-box">
        <div class="loading" v-if="loading">
            <img :src="cdn+'/images/loading.gif'"
                 width="53"
                 height="10"></div>
        <div class="no-data" v-if="nodata">
            <p >{{$t("message.noData")}}
                <template v-if="keyword">
                    <span class="nickname">"{{keyword}}"</span>
                    <span>{{$t("message.isNotEsixt")}}</span>
                    <a :href="base+ '/social/search/synthesis/?search='+ keyword" class="search" target="_blank">{{$t("message.searchInall")}}</a>
                </template>
            </p>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
    //   base: this.base,
    //   cdn: this.cdn,
    };
  },
  props: ['loading', 'nodata', 'keyword'],
};
</script>
<style lang="less">
@import "./index.less";
</style>
