<template>
  <div>
    <div class="item-p">
      <p>在地图上绘制规划行车路线</p>
      <div>
        <p
          v-for="(item, index) in drivePath"
          :key="index"
          @click="changeDrive(item)"
        >
          驾驶路线{{ index + 1 }}
        </p>
      </div>
      <!-- <a-button type="primary" class="design-btn" @click="drawCarRoute"
        >行车路线</a-button
      > -->
      <el-button
        type="danger"
        icon="el-icon-delete"
        @click="removeAll"
        class="design-btn"
        size="small"
      ></el-button>
    </div>
    <div  class="item-p">
      <el-select
        v-model="viewValue"
        placeholder="切换视角"
        @change="changeView"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import linString from "@/data/line.js";
import drivePath from "@/data/drivePath.js";
let init;
export default {
  data() {
    return {
      roadDialog: false,
      lineData: linString,
      viewValue: "第一视角",
      options: [
        {
          value: "第一视角",
          label: "第一视角",
        },
        {
          value: "第三视角",
          label: "第三视角",
        },
      ],
      drivePath,
    };
  },
  mounted() {
    this.$nextTick(() => {
      init = new tqsdk.widgets.DroneRoaming(window.viewer);
    });
  },
  beforeCreate() {
    this.ZDsID = [];
  },
  beforeDestroy() {
    if (init) {
      this.removeAll();
      init.destroy();
      init = undefined;
    }
  },
  methods: {
    changeDrive(v) {
      let positions = v.map(
        (item) => new Cesium.Cartesian3(item.x, item.y, item.z)
      );
      this.addAnimation(positions);
    },
    //路线
    openCarRoad() {
      let positions = this.lineData.map((item) =>
        Cesium.Cartesian3.fromDegrees(item[0], item[1], item[2])
      );
      const line = viewer.entities.add({
        polyline: {
          positions: positions,
          material: Cesium.Color.YELLOW,
          width: 5,
        },
      });
      viewer.zoomTo(line);

      const lableData = [
        {
          id: 100,
          name: "起点",
          anchor: "POINT(112.8793658969 22.0180811407)",
        },
        {
          id: 101,
          name: "终点",
          anchor: "POINT(113.0311272839 22.0002253674)",
        },
      ];
      this.ZDsID = [];
      let entityArr = [];
      //循环遍历每一个桩点对象
      for (let l = 0; l < lableData.length; l++) {
        //初始化
        //判断是否无几何数据
        let anchor = lableData[l].anchor;
        let point = tqsdk.utils.wktTransition.toCartesian3Point(anchor);
        let ID = "ZD_" + lableData[l].id.toString();
        let popup = new tqsdk.popup.HeightPopup(
          { position: point, height: 180, id: ID },
          {
            label: {
              text: lableData[l].name,
              font: "20pt monospace",
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                0,
                1e6
              ),
              backgroundColor: Cesium.Color.fromCssColorString("red"),
            },
            verticalLine: {
              material: new Cesium.PolylineDashMaterialProperty({
                color: Cesium.Color.fromCssColorString("#E27F21"),
                dashLength: 20,
              }),
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                0,
                1e4
              ),
            },
          }
        );
        let entity = window.viewer.entities.add(popup.entitys[0]);
        //存入管理数据
        this.ZDsID.push(ID);
        entityArr.push(entity);
      }
    },
    async drawCarRoute() {
      let positions = await init.addLines({
        endpoint: {
          pixelSize: 5,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          disableDepthTestDistance: 1e11,
          show: false,
        },
        polyline: {
          material: Cesium.Color.fromCssColorString("red"),
          width: 5,
          depthFailMaterial: Cesium.Color.fromCssColorString("red"),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e7),
          clampToGround: true, //开启贴地
        },
        label: {
          text: "测量",
          font: "14px sans-serif",
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          pixelOffset: new Cesium.Cartesian2(0, -30),
          disableDepthTestDistance: 1e11,
          // disableDepthTestDistance: Number.MAX_VALUE,
          showBackground: true,
          backgroundColor: Cesium.Color.fromCssColorString("#04A4B4"),
          scaleByDistance: new Cesium.NearFarScalar(0, 1, 1e6, 0.3),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5e4),
          show: false,
        },
      });
      this.addAnimation(positions);
      console.log("行车路线", JSON.stringify(positions));
    },
    addAnimation(positions) {
      let params = {
        id: Cesium.createGuid(),
        url: "static/xiaofangche.gltf",
        positions: positions,
        animationType: 1,
        speedType: 0,
        speed: 5, //速度
        name: "粤A0023", //车牌
        hpr: {
          heading: 0,
          pitch: 0,
          roll: 0,
        },
        viewAngle: {
          // type: 1, //无视角0-无视角，1-锁定视角，2-第一视角,
          type: 1,
          offset: new Cesium.HeadingPitchRange(
            Cesium.Math.toRadians(90), //水平角度
            Cesium.Math.toRadians(-10), //倾斜角度
            10
          ),
        },
        pathStyle: {
          material: Cesium.Color.RED,
          width: 4,
        },
        entpointStyle: {
          polyline: {
            material: new Cesium.PolylineDashMaterialProperty({
              color: Cesium.Color.YELLOW,
              dashLength: 20,
            }),
            width: 2,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              0,
              1e4
            ),
            show: false,
          },
          point: {
            pixelSize: 10,
            color: new Cesium.Color(0 / 255, 0 / 255, 255 / 255, 1),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              0,
              1e4
            ),
            show: false,
          },
        },
      };
      init.add(params);
      init.path.featureLayer.flyToEntitys();
    },
    changeView(v) {
      if (v === "第一视角") {
        this.firstCarView();
      } else {
        this.threeCarView();
      }
    },
    firstCarView() {
      if (init) {
        init.animation._viewAngle = {
          type: 1,
          offset: new Cesium.HeadingPitchRange(
            Cesium.Math.toRadians(90), //水平角度
            Cesium.Math.toRadians(-10), //倾斜角度
            10
          ),
        };
      }
    },
    threeCarView() {
      if (init) {
        init.animation._viewAngle = {
          type: 2,
          offset: new Cesium.HeadingPitchRange(
            Cesium.Math.toRadians(180), //水平角度
            Cesium.Math.toRadians(-45), //倾斜角度
            50
          ),
        };
      }
    },
    removeAll() {
      init && init.removeAll();
      viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
      viewer.trackedEntity = undefined;
    },
  },
};
</script>
<style scoped>
.design-btn {
  margin: 5px 8px;
}
.item-p{
  margin-bottom: 10px;
}
</style>
