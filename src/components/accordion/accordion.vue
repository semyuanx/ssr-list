<template>
    <div class="fm-accordion">
        <slot></slot>
    </div>
</template>

<script>
// /* eslint-disable */
export default {
  name: 'fm-accordion',
  data() {
    return {
      opening: false,
    };
  },
  props: {
    accordion: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    open(uid) {
      if (this.opening) return;

      this.$children.forEach((item) => {
        // eslint-disable-next-line
        if (item._uid === uid) {
          if (item.show) {
            item.closeItem();
          } else { item.openItem(); }
        } else if (!this.accordion) item.closeItem();
      });
    },
  },
};
</script>

<style lang="less">
    @import "./accordion.less";
</style>
