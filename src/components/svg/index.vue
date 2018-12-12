<template>
    <svg :style="{width: `${width}px`, height: `${height}px`, color: color}">
        <symbol :id="SVGId" v-html="svgs[name]"></symbol>
        <use :xlink:href="`#${SVGId}`"/>
    </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import svgs from './loader';

@Component
export default class SvgIcon extends Vue {
        @Prop({
          required: true,
          type: String,
        })
        public name!: string;

        @Prop({
          type: String,
          default() {
            return '12';
          },
        })
        public width!: string;

        @Prop({
          type: String,
          default() {
            return '12';
          },
        })
        public height!: string;

        @Prop({
          type: String,
          default() {
            return 'currentColor';
          },
        })
        public color!: string;

        public get SVGId() {
          return `fm-svg-icon-${this.name}-${this.width}`;
        }

        public svgs: any[] = svgs;
}
</script>

<style scoped>

</style>
