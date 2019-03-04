<template>
  <div class="header">
    <FmHeader>
      <template slot="left">
        <div class="content-header">
          <h2 class="h2-titile">{{title || ''}}</h2>
          <div @click="leftClick" :style="subTitle ? {} : {background: 'transparent'}" class="flex-center sub-title">
            <slot name="left">
              <i :class="`icon-${subIcon}`"></i>
              <span>{{ subTitle || '' }}</span>
            </slot>
          </div>
        </div>
      </template>
      <template slot="right">
        <div class="content-header">
          <div class="flex-center right-filter">
            <slot name="right">
              <div @click="rightClick" class="right-click right-big">
                <i
                  v-if="rightIconDirection === 'left'"
                  :class="`icon-${rightIcon}` + ' icon-font'"></i>
                <span>{{ rightTitle || '' }}</span>
                <i v-if="rightIconDirection ==='right'"
                  :class="`icon-${rightIcon}`+ ' icon-font'"></i>
              </div>
              <div @click="leftClick" class="right-click right-small">
                <span v-if="subTitle">{{ subTitle || '' }}</span>
                <i :class="`icon-right_24px`"></i>
              </div>
            </slot>
          </div>
        </div>
      </template>
    </FmHeader>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FmHeader from '@/components/header/FmHeader.vue'; // @ is an alias to /src

@Component({
  components: {
    FmHeader,
  },
})
export default class Home extends Vue {
  public name: string = 'fm-strategy';

  @Prop() private title!: string;

  @Prop() private subTitle!: string;

  @Prop() private rightTitle!: string;

  @Prop({
    default() {
      return 'plus_24px';
    },
  })
  private subIcon!: string;

  @Prop({
    default() {
      return 'right';
    },
  })
  private rightIconDirection!: string;

  @Prop({
    default() {
      return 'right_24px';
    },
  })
  private subRespIcon!: string;

  @Prop({
    default() {
      return 'filtrate_24px';
    },
  })
  private rightIcon!: string;

  public rightClick() {
    this.$emit('rightClick');
  }

  public leftClick() {
    this.$emit('leftClick');
  }
}
</script>
<style lang="less" scoped>
i[class^="icon-"] {
  font-size: 18px;
}
.icon-font {
  vertical-align: text-bottom;
}
.header {
  // margin-bottom: 20px;
  .flex-center {
      display: flex;
      align-items: center;
      flex-direction: row;
  }
  .content-header {
    display: flex;
    align-items: center;
    padding: 5px 0;
    width: 100%;
    color: #333333;
    .h2-titile {
      font-size:24px;
    }
    .sub-title {
      cursor: pointer;
      background-color: #fff;
      border-radius: 13px;
      height: 26px;
      // padding: 0 15px;
      margin-left: 10px;
      font-size: 12px;
      &:hover {
        color: @default-color;
      }
    }
    .right-filter {
      justify-content: flex-end;
      width: 100%;
      font-size: 14px;
      .right-small {
        display: none;
      }
      .right-click {
        cursor: pointer;
      }
    }
  }
}

// @media screen and (max-width: 880px) {
//   @base-font: 20;
//   @page-padding: 15rem / @base-font;
//   .generate-padding() {
//     padding-right: @page-padding;
//     padding-left: @page-padding;
//   }

//   .header {
//     margin-bottom: 10px;
//     .content-header {
//       .generate-padding();
//       .h2-titile {
//         flex: 1;
//         font-size: 16rem / @base-font;
//       }
//       .sub-title {
//         background-color: transparent;
//         font-size: 14rem / @base-font;
//         padding: 0;
//         display: none;
//         .icon-plus_24px {
//           display: none;
//         }
//       }
//     }
//     .right-filter {
//       .right-small {
//         display: block !important;
//       }
//       .right-big {
//         display: none;
//       }
//     }
//   }
// }

</style>
