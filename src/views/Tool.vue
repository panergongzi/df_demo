<template>
  <div>
    <div class="toolMenu">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        tab-position="right"
        style="height: 400px; width: 295px"
      >
        <el-tab-pane label="演示路网信息专题" name="first"></el-tab-pane>
        <!-- <el-tab-pane
          label="演示高速公路边坡巡检专题"
          name="SideSlope"
        ></el-tab-pane> -->
        <el-tab-pane label="演示路径还原专题" name="ResetRoad"></el-tab-pane>
        <el-tab-pane
          label="演示2，3维GIS数据展示能力"
          name="BackgroundData"
        ></el-tab-pane>
        <el-tab-pane label="演示标绘测量工具" name="MeasureTool"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="leftMenu">
      <div v-if="activeName == 'MeasureTool'">
        <div>标绘</div>
        <DrawTool></DrawTool>
        <div>测量</div>
        <MeasureTool></MeasureTool>
        <a-button
          type="primary"
          @click="exportImg"
          class="design-btn"
          size="small"
          >输出图片</a-button
        >
      </div>
      <div v-if="activeName == 'BackgroundData'">
        <BackgroundData></BackgroundData>
      </div>
      <div v-if="activeName == 'ResetRoad'">
        <ResetRoad></ResetRoad>
      </div>
      <div v-if="activeName == 'SideSlope'">
        无演示内容，不做演示
        <!-- <SideSlope></SideSlope> -->
      </div>
      <div v-if="activeName == 'first'">
        <RoadInfor></RoadInfor>
      </div>
    </div>

    <MousePosition ref="MousePositionNode"></MousePosition>
  </div>
</template>

<script>
import DrawTool from "@/components/drawTool.vue";

// import UpFile from "@/components/UpFile.vue";
import ResetRoad from "@/components/resetRoad.vue";
import BackgroundData from "@/components/BackgroundData.vue";
import SideSlope from "@/components/SideSlope.vue";
import MeasureTool from "@/components/MeasureTool.vue";
import zhuangData from "@/data/zhuang.js";

import MousePosition from "@/components/MousePosition/index.vue";
import RoadInfor from "@/components/RoadInfor/index.vue";
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  components: {
    MeasureTool,
    DrawTool,
    BackgroundData,
    ResetRoad,
    SideSlope,
    MousePosition,
    RoadInfor,
  },
  beforeCreate() {
    this.ZDsID = [];
  },
  mounted() {
    this.$nextTick(() => {
      this.showZD(zhuangData);
      this.$refs.MousePositionNode.init(viewer);
    });
  },
  methods: {
    handleClick() {},
    //导出图片
    async exportImg() {
      let thumbnailBase64 = await tqsdk.utils.screenShot.canvasToBase64(
        viewer.scene.canvas
      );
      tqsdk.utils.download.downloadIamge(thumbnailBase64, "输出结果");
    },
    //桩号
    showZD(v) {
      if (!v || !Array.isArray(v)) {
        return;
      }
      //清空已有的桩点数据
      for (let k = 0; k < this.ZDsID.length; k++) {
        window.viewer.entities.removeById(this.ZDsID[k]);
      }
      this.ZDsID = [];
      let arr = v;
      let entityArr = [];
      //循环遍历每一个桩点对象
      for (let l = 0; l < arr.length; l++) {
        //初始化
        //判断是否无几何数据
        let anchor = arr[l].anchor;
        let point = tqsdk.utils.wktTransition.toCartesian3Point(anchor);
        let ID = "ZD_" + arr[l].id.toString();
        // let popup = new tqsdk.popup.HeightPopup(
        //   { position: point, height: 1, id: ID },
        //   {
        //     label: {
        //       text: arr[l].name,
        //       font: "15pt monospace",
        //       distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
        //         0,
        //         1e6
        //       ),
        //       color: Cesium.Color.fromCssColorString("green"),
        //       // backgroundColor: Cesium.Color.fromCssColorString("#000"),
        //       showBackground: true,
        //     },
        //     verticalLine: {
        //       material: new Cesium.PolylineDashMaterialProperty({
        //         color: Cesium.Color.fromCssColorString("#E27F21"),
        //         dashLength: 20,
        //       }),
        //       distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
        //         0,
        //         1e4
        //       ),
        //       show: false,
        //     },
        //   }
        // );
        // let entity = window.viewer.entities.add(popup.entitys[0]);
        let entity = viewer.entities.add({
          position: point,
          label: {
            text: arr[l].name,
            font: "15pt monospace",
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              0,
              1e6
            ),
            fillColor: Cesium.Color.fromCssColorString("green"),
            // backgroundColor: Cesium.Color.fromCssColorString("#000"),
            showBackground: false,
            disableDepthTestDistance: Number.MAX_VALUE,
            pixelOffset: new Cesium.Cartesian2(0, -15),
          },
          point: {
            pixelSize: 10,
            color: Cesium.Color.fromCssColorString("green"),
            disableDepthTestDistance: Number.MAX_VALUE,
          },
        });
        //存入管理数据
        this.ZDsID.push(ID);
        entityArr.push(entity);
      }
      window.viewer.flyTo(entityArr);
    },
  },
};
</script>

<style scoped>
.toolMenu {
  /* width: 220px;
  height: 420px;
  background: #373232de;
  position: absolute;
  top: 60px;
  right: 10px;
  z-index: 3;
  border-radius: 5px;
  color: #fff;
  margin: 0 15px; */
  width: 295px;
  height: 420px;
  /* background: #373232de; */
  position: absolute;
  top: 60px;
  left: 0px;
  z-index: 333;
  border-radius: 5px;
  color: #fff;
  margin: 5px;
}
/deep/ .el-tabs__item {
  color: #fff;
}
.leftMenu {
  position: absolute;
    top: 60px;
    right: 10px;
    z-index: 3;
    background: #fff;
    width: 400px;
    height: 500px;
    border-radius: 5px;
    overflow-x: hidden;
    padding: 5px;
}
/deep/ .el-tabs__item {
  color: #282121 !important;
  font-size: 17px;
}
/deep/ .el-tabs__item.is-active {
  color: #409eff !important;
  font-size: 17px;
}
</style>