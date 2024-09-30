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
      <el-collapse v-model="activeNames" @change="handleChange" accordion>
        <el-collapse-item name="1">
          <template slot="title">
            <i class="header-icon el-icon-info icon-tt"></i>数据展示
          </template>
          <MJNode></MJNode>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <i class="header-icon el-icon-search icon-tt"></i>数据查询转换
          </template>
          <Search ref="Search"></Search>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <i class="header-icon el-icon-s-promotion icon-tt"></i>ETC拥堵展示
          </template>
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
  position: { x: -2288527.633595279, y: 5416701.680130981, z: 2479141.5121104 },
  heading: 6.205986638440257,
  pitch: -1.5194748924219752,
  roll: 0.00016533437211396773,
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
.icon-tt {
  margin-right: 5px;
}
</style>