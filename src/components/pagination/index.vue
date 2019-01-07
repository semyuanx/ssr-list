<template>
<div class="pagination-box" v-if="pageCount>1">
    <!-- <div class="pageination-text" v-if="isShowPaginationText">
        每页显示<strong>{{pageSize}}</strong>条，共<strong>{{total}}</strong>条
    </div> -->
    <div class="pagination">
        <button class="pagination-btn" @click="change(currentPage - 1)" :disabled="hasPrev">{{$t("message.prePage")}}</button>
        <button class="pagination-btn" @click="change(item.value)" :class="{'active': item.value === currentPage}" v-for="item in list" :key="item.value">
            {{item.text}}
        </button>
        <button class="pagination-btn" @click="change(currentPage + 1)" :disabled="hasNext">{{$t("message.nextPage")}}</button>
    </div>
</div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
    },
    isShowPaginationText: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    pageCount() {
      const { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },
    hasPrev() {
      return this.currentPage === 1;
    },
    hasNext() {
      return this.currentPage === this.pageCount;
    },
    list() {
      const { pageCount, pageSize, currentPage } = this;
      if (pageCount < 1) return [];
      const list = [];
      let start = currentPage - 4;
      if (start < 1 || currentPage < 9 || pageCount <= pageSize) start = 1;
      let end = currentPage + 4;
      if (end > pageCount || pageCount - currentPage < 8) end = pageCount;
      if (start === 1) {
        end = start + 8;
      }
      if (end === pageCount) {
        start = pageCount - 8;
      }
      if (pageCount <= 10) end = pageCount;
      for (let i = start; i <= end; i++) {
        list.push({
          value: i,
          text: i,
        });
        if (i === start && i !== 1) {
          list.unshift({
            value: 1,
            text: '1...',
          });
        }
        if (i === end && i !== pageCount && start !== end) {
          list.push({
            value: pageCount,
            text: `... ${pageCount}`,
          });
        }
      }
      return list;
    },
  },
  methods: {
    change(page) {
      this.$emit('change', page);
    },
  },
};
</script>

<style lang="less">
.pagination-box {
    text-align: right;
    position: relative;
}
.pageination-text {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 14px;
    color: #999;
    line-height: 33px;
    > strong {
        color: #555;
        font-weight: normal;
    }
}
.pagination {
    font-size: 0;
    display: inline-block;
}
.pagination-btn {
    border-radius: 2px;
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 32px;
    margin-left: 5px;
    font-size: 14px;
    color: #333;
    border: 1px solid #ccc;
    background: #FFF;
    cursor: pointer;
    &:first-child{
        margin-left: 5px;
    }
    &:hover {
        border-color: #ff6200;
        color: #ff6200;
    }
    &:disabled {
        color: #999;
        cursor: not-allowed;
    }
    &:disabled:hover {
        border-color: #ccc;
    }
    &.active {
        border-color: #ff6200;
        background-color: #ff6200;
        color: #FFF;
    }
}
</style>
