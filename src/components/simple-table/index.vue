<template>
  <div class="simple-table-container">
    <el-table
      class="rank-table"
      :stripe="false"
      :border="false"
      :data="data"
    >
      <el-table-column
        :key="i.prop"
        v-for="(i,index) of header"
        :align="i.align || null"
        :label="i.label"
        :prop="i.prop"
      >
        <template slot-scope="scope">
          <slot
            :row="scope.row"
            v-if="index===0"
          >
          </slot>
          <span v-else>{{scope.row[i.prop]}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="预期收益率" prop="b" />
      <el-table-column label="剩余名额" prop="c" /> -->
    </el-table>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Emit,
} from 'vue-property-decorator';
import { Table, TableColumn } from 'element-ui';

@Component({
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
})
export default class SimpleTable extends Vue {
  public name: string = 'fm-simple-table';

  @Prop({
    type: Array,
  })
  header: any;

  @Prop() private title!: string;

  @Prop({
    type: Array,
  })
  data: any;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url(./index.less);
</style>
