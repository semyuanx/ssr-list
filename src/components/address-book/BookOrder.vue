<template>
  <ul class="book-order-container">
    <li
      v-for="(code,index) in codes"
      :key="index"
    >
      <a
        :href="'#'+code"
        class="linkTo"
      >{{code}}</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class BookOrder extends Vue {
  @Prop({
    default: () => [
      '#',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ],
  })
  codes!: string[];
}
</script>

<style scoped lang="less">
.book-order-container {
  width: 16px;
  padding: 10px 0;
  background-color: #b2b2b2;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 8px;
  z-index: 100;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-height: 400px;
  flex-wrap: nowrap;
  li {
    padding: 0;
    flex: 1;
    font-size:0;
  }
  .linkTo {
    color: #fff;
    text-decoration: none;
    font-size: 12px;
  }
}
</style>
