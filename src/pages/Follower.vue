<template>
<div class="follower">
    <Follower />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Follower from './follower/index.vue';


@Component({
  components: {
    Follower,
  },
})
export default class Home extends Vue {


}

</script>
