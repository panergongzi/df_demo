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
      <el-collapse v-model="activeNames" @change="handleChange"  accordion>
        <el-collapse-item title="数据展示" name="1">
          <MJNode></MJNode>
        </el-collapse-item>
        <el-collapse-item title="数据查询转换" name="2">
          <Search ref="Search"></Search>
        </el-collapse-item>
        <el-collapse-item title="ETC拥堵展示" name="3">
          <ETCInfor ref="ETCInfor"></ETCInfor>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import MJNode from "@/components/RoadInfor/MJTool.vue";
import ETCInfor from "./ETCInfor.vue";
import Search from "./Search.vue";
let viewPoint = {
  position: {
    x: -2287862.462134481,
    y: 5416080.480403744,
    z: 2474562.649991016,
  },
  heading: 6.2625810081116535,
  pitch: -0.7739710246618308,
  roll: 0.00007980210181290914,
};
export default {
  mounted() {
    this.$nextTick(() => {
      tqsdk.camera.setCamera(viewer, viewPoint);
    });
  },
  components: {
    MJNode,
    ETCInfor,
    Search,
  },
  data() {
    return {
      time1: [new Date(2024, 10, 1, 10, 10), new Date(2024, 10, 1, 12, 0)],
      activeNames: "1",
    };
  },
  methods: {
    handleChange() {
      this.$refs.Search.removeAll();
      this.$refs.ETCInfor.removeAll();
    },
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