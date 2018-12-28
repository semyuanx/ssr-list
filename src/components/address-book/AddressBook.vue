<template>
  <div class="address-book-container page-group">
    <div class="page page-inner">
      <search-input></search-input>
      <div class="content">
        <check-box-group v-model="checked">
          <div class="list-block contacts-block">
            <div class="list-group">
              <ul
                :id="index"
                v-for="(book,index) in bookList"
                :key="index"
              >
                <li
                  class="list-group-title"
                  v-show="hasTitle"
                >{{index}}</li>
                <li
                  v-for="item in book"
                  :key="item.BrokerId"
                >
                  <div class="item-content">
                    <div class="item-title">
                      <check-box
                        shape="circle"
                        :val="item.BrokerId"
                      >
                        <span class="main-title">{{item.Broker}}</span>
                      </check-box>

                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </check-box-group>
      </div>
    </div>
    <book-order :codes="Object.keys(indexs)" />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit, Watch,
} from 'vue-property-decorator';
import SearchInput from './SearchInput.vue';
import BookOrder from './BookOrder.vue';
import CheckBox from '@/components/check-box/CheckBox.vue';
import CheckBoxGroup from '@/components/check-box/CheckBoxGroup.vue';
import { namespace } from 'vuex-class';

import zhCN from '@/i18n/zh-CN/components/filter-popover/FilterTag';
import zhTW from '@/i18n/zh-TW/components/filter-popover/FilterTag';
import enUS from '@/i18n/en-US/components/filter-popover/FilterTag';
// import { mount } from '@vue/test-utils';

const RankStore = namespace('RankStore');

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
    CheckBoxGroup,
  },
})
export default class AddressBook extends Vue {
  @RankStore.State
  brokersList: any;

  get bookList() {
    if (typeof this.brokersList === 'object') {
      this.brokersList.forEach((v: any) => {
        const firstLetter = v.Broker.slice(0, 1).toUpperCase();
        if (this.indexs[firstLetter]) {
          this.indexs[firstLetter].push(v);
        } else {
          this.indexs['#'].push(v);
        }
      });
    }
    return this.indexs;
  }

  @Prop({
    default: () => ({
      '#': [],
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
      I: [],
      J: [],
      K: [],
      L: [],
      M: [],
      N: [],
      O: [],
      P: [],
      Q: [],
      R: [],
      S: [],
      T: [],
      U: [],
      V: [],
      W: [],
      X: [],
      Y: [],
      Z: [],
    }),
  })
  indexs!: any;

  @Prop({
    default: false,
  })
  hasTitle!: boolean;

  private checked: any = [];

  @RankStore.State
  checkedBrokers: any;

  @RankStore.Mutation
  setCheckedBrokers: any;

  @Watch('checked', { deep: true })
  sync(val: any) {
    this.setCheckedBrokers(val);
  }

  mounted() {
    this.checked = this.checkedBrokers;
  }
}
</script>

<style lang="less" scoped>
@import url("./AddressBook.less");
</style>
