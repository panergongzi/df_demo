<template>
  <div>
    <!-- <a-button
      type="primary"
      class="design-btn"
      v-for="(item, index) in toolList"
      :key="index"
      @click="apply(item)"
      >{{ item.name }}</a-button
    > -->
    <div
      type="primary"
      class="design-btn"
      v-for="(item, index) in toolList"
      :key="index"
      @click="apply(item)"
    >
      <img :src="item.icon" width="24" />
      <span class="icon-plotting"> {{ item.name }}</span>
    </div>
    <el-button
      type="danger"
      icon="el-icon-delete"
      @click="removeAll"
      class="design-btn"
      size="small"
    ></el-button>
  </div>
</template>
<script>
import measureToolList from "@/data/measure.js";
let measureTool;
let toolList = measureToolList.map((item) => {
  return {
    name: item.name,
    type: item.type,
    icon: item.icon,
  };
});
let modelLayer = {
  label: "高速公路倾斜模型",
  type: "threeDTile",
  id: "64d6de1a-9761-4dc7-a6f9-b71dd17771f44743",
  isShow: false,
  userId: "a4785bfe-7498-4a40-8f70-fadbad304729",
  thumbnail: null,
  center: [113.401134, 22.70118805, 100],
  info: {
    url: "http://192.168.2.85/test/%E9%A1%B9%E7%9B%AE/%E5%8D%97%E4%BA%8C%E7%8E%AF/%E6%B5%B7%E9%B8%A5%E5%B2%9B/terra_b3dms/tileset.json",
    maximumScreenSpaceError: 1,
  },
  //调节图层是色调，饱和度，亮度，对比度等
  colorAdjust: null,
  expansion: JSON.stringify({
    transform: {
      0: 1,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 1,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 1,
      11: 0,
      12: 0,
      13: 10,
      14: 0,
      15: 1,
    },
  }),
};
let backgroundData;
export default {
  data() {
    return {
      type: "",
      volume: {
        digVolumes: "",
        fillVolumes: "",
        minHeight: "",
        maxHeight: "",
        projectionArea: "",
        surfaceAreas: "",
        perimeter: "",
        standardHeight: 0,
        progress: 0,
      },
      areaSurface: {
        projectionArea: "",
        surfaceAreas: "",
        perimeter: "",
        progress: 0,
      },
      toolList: toolList,
    };
  },
  mounted() {
    this.$nextTick(() => {
      measureTool = new tqsdk.widgets.MeasureTool(window.viewer);
      this.addModel();
    });
  },
  destroyed() {
    if (measureTool) {
      measureTool.destroy();
      measureTool = undefined;
    }

    if (backgroundData) {
      backgroundData.destroy();
      backgroundData = undefined;
    }
  },
  methods: {
    async apply(v) {
      let type = v.type;
      this.type = type;
      let res;
      let indexOb = measureToolList.find((item) => item.type === type);
      if (type === "volume") {
        res = await this.applyVolume(indexOb.style);
      } else if (type === "areaSurface") {
        res = await this.applyMeasurementAreaSurface(indexOb.style);
      } else if (
        measureTool &&
        measureTool[type] &&
        typeof measureTool[type] === "function" &&
        type !== "volume"
      ) {
        res = await measureTool[type](indexOb.style);
      }
    },
    //表面积测量
    async applyMeasurementAreaSurface(style) {
      let res = await measureTool.areaSurface(style, true, (data) => {
        this.areaSurface.progress = data.progress;
      });
      this.areaSurface.surfaceAreas = res.surfaceAreas || "";
      this.areaSurface.projectionArea = res.projectionArea || "";
      this.areaSurface.perimeter = res.perimeter || "";
    },

    //体积测量
    async applyVolume(style) {
      this.volume.progress = 0;
      let volumeRes = await measureTool.volume({
        // positions: res.positions,
        style,
        standardHeight: this.volume.standardHeight,
        isCopy: true,
        callBack: (data) => {
         
          this.volume.progress = data.progress;
        },
        id: undefined,
      });

      this.volume.digVolumes = volumeRes.digVolumes;
      this.volume.fillVolumes = volumeRes.fillVolumes;
      this.volume.minHeight = volumeRes.minHeight;
      this.volume.maxHeight = volumeRes.maxHeight;
      this.volume.projectionArea = volumeRes.projectionArea;
      this.volume.surfaceAreas = volumeRes.surfaceAreas;
      this.volume.perimeter = volumeRes.perimeter;
      this.volume.standardHeight = volumeRes.standardHeight;
    },
    removeAll() {
      measureTool.removeAll();
      if (this.volume.progress) {
        this.volume.progress = 0;
      }
      this.type = "";
    },
    async addModel() {
      if (!backgroundData) {
        backgroundData = new tqsdk.widgets.BackgroundData(viewer);
      }
      let data = await backgroundData.add3dtiles(modelLayer, true);
      viewer.flyTo(data.ly);
    },
  },
};
</script>
<style scoped>
.design-btn {
  margin: 5px;
  display: inline-block;
}
.icon-plotting {
}
</style>
