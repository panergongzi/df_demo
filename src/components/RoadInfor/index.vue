<template>
  <div class="grout-t">
    <!-- <div class="tt-line">
      <span>时间：</span>
      <el-date-picker
        v-model="time1"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      >
      </el-date-picker>
    </div> -->
    <div class="tt-line">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="数据展示" name="1">
          <MJNode></MJNode>
        </el-collapse-item>
        <el-collapse-item title="数据查询转换" name="2">
          <MJNode></MJNode>
        </el-collapse-item>
        <el-collapse-item title="ETC拥堵展示" name="3">
          <ETCInfor></ETCInfor>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import MJNode from "@/components/RoadInfor/MJTool.vue";
import ETCInfor from "./ETCInfor.vue";
export default {
  components: {
    MJNode,
    ETCInfor,
  },
  data() {
    return {
      time1: [new Date(2024, 10, 1, 10, 10), new Date(2024, 10, 1, 12, 0)],
    };
  },
  methods: {
    handleChange() {},
  },
};
</script>

<style scoped>
.grout-t {
  padding: 5px;
}
.tt-line {
  margin-bottom: 10px;
}
</style>