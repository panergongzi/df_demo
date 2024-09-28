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
        <DrawTool ref="DrawTool"></DrawTool>
        <div>测量</div>
        <MeasureTool ref="MeasureTool"></MeasureTool>
        <div>
          <a-button
            type="info"
            @click="importData"
            class="design-btn"
            size="small"
            >导入数据</a-button
          >
          <a-button
            type="primary"
            @click="exportData"
            class="design-btn"
            size="small"
            >导出数据</a-button
          >
          <a-button
            type="primary"
            @click="exportImg"
            class="design-btn"
            size="small"
            >输出图片</a-button
          >
        </div>
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
    <vxe-modal
      v-model="plottingPopupShow"
      :mask="false"
      :lock-view="false"
      title="收费单元"
      :position="{ left: 320, top: 100 }"
    >
      <template #default>
        <div>
          <div>下方导入标绘数据</div>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入数据"
            v-model="importD"
          >
          </el-input>
          <a-button type="info" @click="addPlotting" size="small"
            >导入</a-button
          >
        </div>
      </template>
    </vxe-modal>
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
let importD = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        style: {
          point: {
            pixelSize: 10,
            color: "green",
            disableDepthTestDistance: 100000000000,
            distanceDisplayCondition: { _near: 0, _far: 10000000 },
          },
          label: {
            text: "点",
            font: "14px sans-serif",
            outlineColor: "red",
            outlineWidth: 2,
            pixelOffset: { x: 0, y: 0 },
            disableDepthTestDistance: 100000000000,
            showBackground: false,
            backgroundColor: "red",
            scaleByDistance: {
              near: 0,
              nearValue: 1,
              far: 1000000,
              farValue: 0.5,
            },
            show: false,
          },
        },
        id: "id17275130722165",
        type: "Point",
      },
      geometry: {
        type: "Point",
        coordinates: [113.53326366, 22.8893062, 41.16],
      },
    },
    {
      type: "Feature",
      properties: {
        style: {
          endpoint: {
            pixelSize: 12,
            color: "red",
            outlineColor: { red: 1, green: 1, blue: 1, alpha: 1 },
            outlineWidth: 2,
            disableDepthTestDistance: 100000000000,
            distanceDisplayCondition: { _near: 0, _far: 10000000 },
            show: false,
          },
          polyline: {
            width: 5,
            color: "green",
            depthFailColor: "red",
            clampToGround: true,
            close: false,
            type: "Color",
            distanceDisplayCondition: { _near: 0, _far: 10000000 },
            alpha: 1,
          },
        },
        id: "id17275130744486",
        type: "LineString",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [113.53332805, 22.88932436, 41.1],
          [113.53330339, 22.88924065, 40.92],
          [113.53321882, 22.88925718, 41.13],
          [113.53318876, 22.88927816, 41.26],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        style: {
          polygon: {
            color: "green",
            type: "Color",
            fill: true,
            show: true,
            distanceDisplayCondition: { _near: 0, _far: 10000000 },
            alpha: 0.5,
          },
          endpoint: {
            pixelSize: 12,
            color: "red",
            outlineColor: { red: 1, green: 1, blue: 1, alpha: 1 },
            outlineWidth: 2,
            disableDepthTestDistance: 100000000000,
            distanceDisplayCondition: { _near: 0, _far: 10000000 },
            show: false,
            heightReference: 1,
          },
          polyline: {
            width: 5,
            color: "blue",
            depthFailColor: "blue",
            clampToGround: true,
            close: false,
            type: "Color",
            distanceDisplayCondition: { _near: 0, _far: 10000000 },
            show: true,
          },
          label: {
            text: "测量",
            font: "14px sans-serif",
            pixelOffset: { x: 0, y: -30 },
            disableDepthTestDistance: 1.7976931348623157e308,
            showBackground: true,
            backgroundColor: "red",
            scaleByDistance: {
              near: 0,
              nearValue: 1,
              far: 1000000,
              farValue: 0.5,
            },
            show: false,
          },
        },
        id: "id17275130847127",
        type: "Polygon",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [113.53342703, 22.88931382, 40.89],
            [113.53338238, 22.88925796, 40.8],
            [113.5334277, 22.88923599, 40.67],
            [113.53347273, 22.88926106, 40.66],
            [113.53347575, 22.88929937, 40.76],
            [113.5334667, 22.88931303, 40.8],
            [113.53342703, 22.88931382, 40.89],
          ],
        ],
      },
    },
  ],
};
export default {
  data() {
    return {
      activeName: "first",
      plottingPopupShow: false,
      importD: JSON.stringify(importD),
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
      thumbnailBase64 = await this.imageAddText(thumbnailBase64, {
        text: "K桩号：RK149+" + Math.ceil(1000 * Math.random()),
        coor: [30, 30],
        color: "red",
        font: "bold 24px Arial",
        mimeType: "image/png",
      });
      tqsdk.utils.download.downloadIamge(thumbnailBase64, "输出结果");
    },
    async imageAddText(url, options) {
      return new Promise((res, rej) => {
        // 创建一个 Image 对象，加载图片
        let img = new Image();
        img.src = url;
        // 在图片加载完成后执行绘制操作
        img.onload = function () {
          // 设置 Canvas 的尺寸和图片的尺寸一致
          // res(img);
          let { text, coor, color, font, mimeType } = options;
          //   return new Promise((res, rej) => {
          // 获取 Canvas 元素和上下文
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          // 绘制图片
          ctx.drawImage(img, 0, 0);
          // 设置文本样式
          ctx.font = font;
          ctx.fillStyle = color;
          // 绘制数字
          let x = coor[0];
          let y = coor[1];
          ctx.fillText(text, x, y);
          let URLData = canvas.toDataURL(mimeType);
          canvas = null;
          res(URLData);
        };
      });
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
    importData() {
      this.plottingPopupShow = true;
    },
    addPlotting() {
      this.$refs.DrawTool.importData(this.importD);
      this.plottingPopupShow = false;
    },
    exportData() {
      this.$refs.DrawTool.downloadAll();
      this.$refs.MeasureTool.downloadAll();
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