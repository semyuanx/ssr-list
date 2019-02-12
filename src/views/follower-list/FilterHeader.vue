<template>
  <div>
    <div class="filter-header">
      <div class="select-container">
        <div class="select-title">{{ $t('jytime') }}</div>
        <div class="selected-content">
          <span @click="toggleShow" class="selected-detail">{{selected.label}}</span>
          <i  @click="toggleShow" :class="{'default-icon-set': true, 'icon-caret_up_small_24px': isShow, 'icon-caret_down_small_24px': !isShow,}"></i>
          <transition name="select-fade">
            <div v-show="isShow" class="option-container">
              <div class="select-option">
                <div @click.capture="selectSlef(i)" :key="i.val" v-for="i in options" :class="{'option-content': true, 'option-selected': i.selected}">
                  <span class="option-title">{{i.label}}</span>
                  <span class="option-icon"><i v-if="i.selected" class="icon-check_24px"></i></span>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <div>
          <input
          style="width: 1px; height: 1px; border: none; caret-color: transparent; background: transparent; outline: none;"
          @blur.capture="handleBlur" ref="hiddenInput" type="text" />
        </div>

      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component, Vue, Watch, Emit, Prop,
} from 'vue-property-decorator';
// import { namespace } from 'vuex-class';
import zhCN from '@/i18n/zh-CN/views/follower-list/FilterHeader';
import zhTW from '@/i18n/zh-TW/views/follower-list/FilterHeader';
import enUS from '@/i18n/en-US/views/follower-list/FilterHeader';
import zhHK from '@/i18n/zh-HK/views/follower-list/FilterHeader';


@Component({
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
      'zh-HK': zhHK,
    },
  },
  components: {

  },
})
export default class FilterHeader extends Vue {
  selected: any = {
    label: this.lang('jyyyjy'),
    val: 30,
    selected: false,
  };
  // @Prop({
  //   default: () => ({
  //     label: '全部',
  //     val: 0,
  //     selected: false
  //   })
  // })
  // selected: any;

  public isShow: boolean = false;

  options: any = [
    {
      label: this.lang('all'),
      val: 0,
      selected: false,
    },
    {
      label: this.lang('jyryjy'),
      val: 1,
      selected: false,
    },
    {
      label: this.lang('jyzyjy'),
      val: 7,
      selected: false,
    },
    {
      label: this.lang('jyyyjy'),
      val: 30,
      selected: true,
    },
  ];

  toggleShow() {
    if (!this.isShow) {
      this.afterHook();
    }
    this.isShow = !this.isShow;
  }

  afterHook() {
    const { hiddenInput } = this.$refs;
    if (hiddenInput) {
      (hiddenInput as any).focus();
    }
  }

  lang(val: any) {
    return this.$i18n.t(val);
  }

  handleBlur() {
    if (this.isShow) {
      setTimeout(() => {
        this.isShow = false;
      }, 100);
    }
  }

  selectSlef(item: any) {
    this.options.forEach((element: any, index: any) => {
      if (item.val === element.val && !element.selected) {
        this.options[index].selected = true;
        this.selected = element;
      } else if (item.val !== element.val && element.selected) {
        this.options[index].selected = false;
      }
    });
    this.isShow = false;
    this.$emit('filter-changed', item);
  }
}
</script>
<style lang="less" scoped>

.filter-header {
  // padding: 20px 0;
  padding-bottom: 10px;
  .select-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    // min-height: 66px;
    .select-title {
      font-size:12px;
      font-family:MicrosoftYaHei;
      color:rgba(153,153,153,1);
      line-height:16px;
      margin-right: 10px;
    }
    .selected-content {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      min-width: 180px;
      .selected-detail {
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(51,51,51,1);
        line-height:19px;
      }
      .default-icon-set {
        font-size: 18px;
      }

      .option-container {
        position: absolute;
        z-index: 200;
        top: 30px;

        .select-option {
          font-size: 14px;
          box-shadow:0px 0px 20px 0px rgba(0,0,0,0.1);
          border-radius:6px;
          min-width: 130%;
          padding: 5px 0;
          background-color: #ffffff;

          .option-content {
            padding-left: 16px;
            padding-right: 16px;
            height: 40px;
            line-height: 40px;
            display: flex;
            flex-direction: row;
            &:hover {
              background-color: #F0F0F0;
            }
            .option-title {
              flex: 1;
              font-size:14px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(51,51,51,1);
            }
            .option-icon {
              // padding: 0 5px;
              display: table-row;
              >i {
                font-size: 20px;
                vertical-align: sub;
              }
            }
          }
          .option-selected {
            .option-title {
              color: @default-color;
            }
            .option-icon {
              i {
                color: @default-color;
              }
            }
          }

          &::before {
            top: -14px;
            left: 10px;
            content: "";
            position: absolute;
            border: 8px solid transparent;
            border-bottom-color: #ffffff;
          }

        }
      }
    }

  }
}

.select-fade-enter-active, .select-fade-leave-active {
  transition: opacity .5s;
}
.select-fade-enter, .select-fade-leave-to {
  opacity: 0;
}

</style>
