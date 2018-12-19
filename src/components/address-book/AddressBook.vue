<template>
  <div class="address-book-container page-group">
    <div class="page page-inner">
      <search-input></search-input>
      <div class="content">
        <div class="list-block contacts-block">
          <div class="list-group">
            <ul id="A">
              <li class="list-group-title" >A</li>
              <li
                v-for="(item,index) in 30"
                :key="index"
              >
                <div class="item-content">
                  <div class="item-title">标题a</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="list-group">
            <ul id="B">
              <li class="list-group-title">B</li>
              <li
                v-for="(item,index) in 30"
                :key="index"
              >
                <div class="item-content">
                  <div class="item-title">标题b</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="list-group">
            <ul id="C">
              <li class="list-group-title" >C</li>
              <li
                v-for="(item,index) in 30"
                :key="index"
              >
                <div class="item-content">
                  <div class="item-title">标题c</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    <book-order />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';
import SearchInput from './SearchInput.vue';
import BookOrder from './BookOrder.vue';

import zhCN from '@/i18n/zh-CN/components/filter-popover/FilterTag';
import zhTW from '@/i18n/zh-TW/components/filter-popover/FilterTag';
import enUS from '@/i18n/en-US/components/filter-popover/FilterTag';

@Component({
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
    },
  },
  components: {
    SearchInput,
    BookOrder,
  },
})
export default class AddressBook extends Vue {}
</script>

<style lang="less" scoped>
@import url("./AddressBook.less");
</style>
