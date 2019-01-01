<template>
  <div class="searchbar">
    <div class="search-input">
      <label
        class="icon-search_24px"
        for="search"
      ></label>
      <input
        type="search"
        id='search'
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SearchInput extends Vue {
  @Prop({
    type: String,
    default: '',
  })
  placeholder!: string;
}
</script>

<style lang="less" scoped>
.searchbar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  height: 54px;
  padding-right: 15px;
  padding-left: 15px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .search-input {
    flex: 1;
    width: 100%;
    height: 34px;
    background-color: #f2f2f2;
    border-radius: 17px;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    padding: 0 10px;
    .icon-search_24px {
      font-size: 18px;
      color: #999;
    }
    #search {
      flex: 1;
      outline: none;
      border: none;
      background-color: transparent;
    }
  }
}
</style>
