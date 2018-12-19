<template>
  <div class="address-book-container page-group">
    <div class="page page-inner">
      <search-input></search-input>
      <div class="content">
        <div class="list-block contacts-block">
          <div class="list-group">
            <ul id="A">
              <li
                class="list-group-title"
                v-show="hasTitle"
              >A</li>
              <li
                v-for="(item,index) in 30"
                :key="index"
              >
                <div class="item-content">
                  <div class="item-title">
                    <check-box
                      shape="circle"
                      v-model="checkbox"
                    >
                      <span class="main-title">USD/JPY</span>
                      <span class="sub-title">美元/日元</span>
                    </check-box>
                  </div>
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
import CheckBox from '@/components/check-box/CheckBox.vue';

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
    CheckBox,
  },
})
export default class AddressBook extends Vue {
  @Prop({
    default: false,
  })
  hasTitle!: boolean;

  checkbox: boolean = false;
}
</script>

<style lang="less" scoped>
@import url("./AddressBook.less");
</style>
