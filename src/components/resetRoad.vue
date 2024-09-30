<template>
  <div>
    <div class="item-p">
      <p class="item-title">选择行车路线</p>
      <div>
        <p
          v-for="(item, index) in drivePath"
          :key="index"
          @click="changeDrive(item)"
        >
          <span style="color: blue">驾驶路段-广龙高速</span>
        </p>
      </div>
      <!-- <a-button type="primary" class="design-btn" @click="drawCarRoute"
        >行车路线</a-button
      > -->
      <el-button
        type="danger"
        @click="removeAll"
        class="design-btn"
        size="small"
        >结束</el-button
      >
    </div>
    <div class="item-p" v-show="isDrive">
      <!-- <div>
        速度：<el-input-number
          v-model="speed"
          @change="changeSpeed"
          :min="1"
        ></el-input-number>
      </div> -->
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
    <div v-show="isDrive">
      <p class="item-title">车辆信息</p>
      <div>车牌：粤A0023XX</div>
      <div>车速：{{ Math.ceil(speed) }}公里/小时</div>
      <div>车辆颜色:红色</div>
    </div>
  </div>
</template>
<script>
import linString from "@/data/line.js";
import drivePath from "@/data/drivePath.js";
let init;
let viewPoint = {
  position: {
    x: -2348965.4212853326,
    y: 5391662.563247876,
    z: 2464782.144144561,
  },
  heading: 6.250215308933214,
  pitch: -0.9062938152133824,
  roll: 6.283169045167003,
};
let markIcons = [
  {
    name: "收费门架1号-广龙高速",
    coor: [113.53088041, 22.88840109, 0],
  },
  {
    name: "收费门架2号-广龙高速",
    coor: [113.53664814, 22.889414444, 50],
  },
  {
    name: "收费门架3号-广龙高速",
    coor: [113.54738058, 22.88807333, 0],
  },
];
let lineMarck = [
  {
    name: "收费路段-广龙高速",
    coor: [113.53847636, 22.88947255, 100],
  },
];
let pthLine;
export default {
  data() {
    return {
      roadDialog: false,
      lineData: linString,
      viewValue: "第一视角",
      isDrive: false,
      speed: 100,
      // sppedShow: 100,
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
  computed: {
    getSpeed() {
      return this.speed * 20;
    },
  },
  mounted() {
    this.$nextTick(() => {
      init = new tqsdk.widgets.DroneRoaming(window.viewer);
      tqsdk.camera.setCamera(viewer, viewPoint);
      this.openCarRoad();
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
    //切换行车路线
    changeDrive(v) {
     
      this.removeAll();
      this.isDrive = true;
      let positions = v.map(
        (item) => new Cesium.Cartesian3(item.x, item.y, item.z)
      );
      this.addAnimation(positions);
    },
    changeSpeed() {
      if (init) {
        init.speed = this.speed / 20;
      }
    },
    //路线
    openCarRoad() {
      let positions = drivePath[0].map(
        (item) => new Cesium.Cartesian3(item.x, item.y, item.z)
      );
      pthLine = viewer.entities.add({
        polyline: {
          positions: positions,
          material: Cesium.Color.RED,
          width: 5,
        },
      });
      markIcons.map((item) => {
        let position = Cesium.Cartesian3.fromDegrees(
          item.coor[0],
          item.coor[1],
          item.coor[2]
        );
        const entity = viewer.entities.add({
          position,
          label: {
            text: item.name,
            font: "15pt monospace",
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              0,
              1e6
            ),
            fillColor: Cesium.Color.fromCssColorString("red"),
            // backgroundColor: Cesium.Color.fromCssColorString("#000"),
            showBackground: false,
            disableDepthTestDistance: Number.MAX_VALUE,
            pixelOffset: new Cesium.Cartesian2(0, -15),
          },
        });
      });

      let popup = new tqsdk.popup.HeightPopup(
        {
          position: Cesium.Cartesian3.fromDegrees(
            lineMarck[0].coor[0],
            lineMarck[0].coor[1],
            lineMarck[0].coor[2]
          ),
          height: 200,
          id: "xxxsssssID",
        },
        {
          label: {
            text: lineMarck[0].name,
            font: "20pt monospace",
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              0,
              1e6
            ),
            backgroundColor: Cesium.Color.fromCssColorString("green"),
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
            show: false,
          },
        }
      );
      let entity = window.viewer.entities.add(popup.entitys[0]);

      // viewer.zoomTo(line);

      // const lableData = [
      //   {
      //     id: 100,
      //     name: "起点",
      //     anchor: "POINT(112.8793658969 22.0180811407)",
      //   },
      //   {
      //     id: 101,
      //     name: "终点",
      //     anchor: "POINT(113.0311272839 22.0002253674)",
      //   },
      // ];
      // this.ZDsID = [];
      // let entityArr = [];
      // //循环遍历每一个桩点对象
      // for (let l = 0; l < lableData.length; l++) {
      //   //初始化
      //   //判断是否无几何数据
      //   let anchor = lableData[l].anchor;
      //   let point = tqsdk.utils.wktTransition.toCartesian3Point(anchor);
      //   let ID = "ZD_" + lableData[l].id.toString();
      //   let popup = new tqsdk.popup.HeightPopup(
      //     { position: point, height: 180, id: ID },
      //     {
      //       label: {
      //         text: lableData[l].name,
      //         font: "20pt monospace",
      //         distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
      //           0,
      //           1e6
      //         ),
      //         backgroundColor: Cesium.Color.fromCssColorString("red"),
      //       },
      //       verticalLine: {
      //         material: new Cesium.PolylineDashMaterialProperty({
      //           color: Cesium.Color.fromCssColorString("#E27F21"),
      //           dashLength: 20,
      //         }),
      //         distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
      //           0,
      //           1e4
      //         ),
      //       },
      //     }
      //   );
      //   let entity = window.viewer.entities.add(popup.entitys[0]);
      //   //存入管理数据
      //   this.ZDsID.push(ID);
      //   entityArr.push(entity);
      // }
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
        speed: this.speed / 20, //速度
        name: "粤A0023XX", //车牌
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
            Cesium.Math.toRadians(0), //倾斜角度
            0.3
          ),
        },
        pathStyle: {
          material: Cesium.Color.RED,
          width: 4,
          show: false,
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
        popupStyle: {
          label: {
            text: ``,
            font: "13px Helvetica",
            pixelOffset: new Cesium.Cartesian2(0, -40),
            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1e4, 0),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              0,
              1e5
            ),
            showBackground: false,
            backgroundColor: Cesium.Color.GREEN.withAlpha(0.5),
          },
        },
      };
      init.add(params);
      init.path.featureLayer.flyToEntitys();
      if (pthLine) {
        pthLine.show = false;
      }
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
            Cesium.Math.toRadians(0), //倾斜角度
            0.3
          ),
        };
      }
    },
    threeCarView() {
      if (init) {
        init.animation._viewAngle = {
          type: 2,
          offset: new Cesium.HeadingPitchRange(
            Cesium.Math.toRadians(90), //水平角度
            Cesium.Math.toRadians(0), //倾斜角度
            5
          ),
        };
      }
    },
    removeAll() {
      this.isDrive = false;
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
.item-p {
  margin-bottom: 10px;
}
.item-title {
  font-size: 17px;
  font-weight: bold;
}
</style>
