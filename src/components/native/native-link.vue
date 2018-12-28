<template>
  <router-link
      :event="[]"
      :to="to"
      @click.prevent.stop.native="toLink"><slot /></router-link>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Location } from 'vue-router';

import { openWebView } from '@/utils/native';

@Component
export default class NativeLink extends Vue {
    @Prop({ type: Object, required: true, default: () => ({}) }) to!: Location;

    toLink(event:any) {
      openWebView(this.to);
    }
}
</script>
