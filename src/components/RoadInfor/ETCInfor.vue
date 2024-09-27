<template>
  <div>
    <el-button type="primary" class="time-item" @click="addLine(1)"
      >10:00-11:00(ETC)</el-button
    >
    <el-button type="primary" class="time-item" @click="addLine(2)"
      >11:00-12:00(ETC)</el-button
    >
    <el-button type="primary" class="time-item" @click="addLine(3)"
      >12:00-13:00(ETC)</el-button
    >
    <el-button type="primary" class="time-item" @click="addLine(4)"
      >13:00-14:00(ETC)</el-button
    >
    <el-button
      type="danger"
      icon="el-icon-delete"
      @click="removeAll"
      class="design-btn"
      size="small"
    ></el-button>
    <div>
      <span>拥堵图例</span>
      <div
        v-for="item in colorList"
        :key="item.color"
        :style="{ width: '100px' }"
      >
        <div :style="{ background: item.color }" class="color-t"></div>
        <span class="color-label">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import mjData from "@/data/mj.js";
let featureCollection;
let colorList = [
  { color: "green", name: "通畅" },
  { color: "red", name: "拥堵" },
  { color: "#750606", name: "严重拥堵" },
];
export default {
  data() {
    return {
      colorList,
    };
  },
  mounted() {},
  beforeDestroy() {
    if (featureCollection) {
      featureCollection.destroy();
      featureCollection = undefined;
    }
  },
  methods: {
    addLine(v) {
      if (!featureCollection) {
        featureCollection = new tqsdk.layer.FeatureCollection(viewer);
      }
      this.removeAll();
      let entityArr = [];
      let len = mjData.length;
      for (let i = 0; i < len; i++) {
        if (i === len - 1) {
          continue;
        }
        let color = colorList[(i + v) % 3].color;
        let point1 = Cesium.Cartesian3.fromDegrees(
          mjData[i].coor[0],
          mjData[i].coor[1],
          mjData[i].coor[2]
        );
        let point2 = Cesium.Cartesian3.fromDegrees(
          mjData[i + 1].coor[0],
          mjData[i + 1].coor[1],
          mjData[i + 1].coor[2]
        );
        let positions = [point1, point2];
        let path = featureCollection.addEntity({
          polyline: {
            material: Cesium.Color.fromCssColorString(color),
            width: 7,
            // depthFailMaterial: Cesium.Color.YELLOW,
            positions,
            clampToGround: true,
          },
        });
        entityArr.push(path);
      }
      viewer.flyTo(entityArr);
    },
    removeAll() {
      if (featureCollection) {
        featureCollection.removeAll();
      }
    },
  },
};
</script>

<style  scoped>
.time-item {
  margin-bottom: 10px;
}
.color-t {
  margin: 10px;
  width: 60px;
  height: 40px;
}
.color-label {
  /* float: right;
  line-height: 40px; */
}
</style>