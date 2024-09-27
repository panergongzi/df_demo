<template>
  <div>
    <div v-for="item in mjData" :key="item.name" @click="clickMj(item)">
      {{ item.name }}
    </div>
    <vxe-modal
      v-model="showPop"
      :mask="false"
      :lock-view="false"
      title="基本信息"
      :position="{ left: 320, top: 100 }"
    >
      <template #default>
        <div>
          <div>门架名称：{{ selectedMj.name }}</div>
          <div>坐标：{{ selectedMj.coor[0] }} {{ selectedMj.coor[1] }}</div>
          <div>
            ETC序列号：{{ selectedMj.coor[0] }}
            {{ selectedMj.ETC["设备信息"]["序列号"] }}
          </div>
          <div>拥堵指数:{{ selectedMj["拥堵指数"] }}</div>
          <div>流量指数:{{ selectedMj["流量指数"] }}</div>
          <div>阻断指数:{{ selectedMj["阻断指数"] }}</div>
          <div>
            摄像头：{{ selectedMj.ETC["摄像头"] }}
            <el-button
              size="mini"
              type="primary"
              @click="projectApply(selectedMj)"
              >地图投射</el-button
            >
          </div>
        </div>
      </template>
    </vxe-modal>
  </div>
</template>

<script>
import mjData from "@/data/mj.js";
const videoData = {
  id: "xxxxx3eeeee",
  url: "http://192.168.2.85/test/img/0786ba5d918aaf8f72dfefde13ceb25b.mp4",
  alpha: 1,
  heading: -19.8,
  pitch: -90,
  roll: 0,
  showFrustum: false,
  horizontal: 45,
  isEclosion: false,
  vertical: 73.7,
  far: 1000,
  type: 0,
  coor: {
    lng: 103.82772188805694,
    lat: 30.655784302613554,
    alt: 476.26000976428764,
  },
  focalLength: 4.5,
};
let videoMergeList = {};
export default {
  data() {
    return {
      mjData,
      showPop: false,
      selectedMj: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.addMJ(mjData);
    });
  },
  methods: {
    //门架
    addMJ(arr) {
      for (let l = 0; l < arr.length; l++) {
        //初始化
        //判断是否无几何数据
        let coor = arr[l].coor;
        let point = Cesium.Cartesian3.fromDegrees(coor[0], coor[1], coor[2]);
        let popup = new tqsdk.popup.HeightPopup(
          { position: point, height: 40, id: "XXSSS" + l },
          {
            label: {
              text: arr[l].name,
              font: "14pt monospace",
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                0,
                1e6
              ),
              pixelOffset: new Cesium.Cartesian2(0, -50),
              backgroundColor: Cesium.Color.fromCssColorString("green"),
            },
            billboard: {
              image: "./img/2-2.png",
              disableDepthTestDistance: 1e11,
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                0,
                1e7
              ),
              scaleByDistance: new Cesium.NearFarScalar(0, 1, 1e6, 0.5),
              width: 82,
              height: 48,
              pixelOffset: new Cesium.Cartesian2(12, 0),
              type: "Image",
            },
            verticalLine: {
              material: Cesium.Color.fromCssColorString("#E27F21"),
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                0,
                1e4
              ),
              show: true,
            },
          }
        );
        let entity = window.viewer.entities.add(popup.entitys[0]);
      }
    },
    clickMj(v) {
      console.log("点击选择", v);
      let center = v.coor;
      tqsdk.camera.flyTo(viewer, {
        position: Cesium.Cartesian3.fromDegrees(
          center[0],
          center[1],
          center[2] + 100
        ),
      });
      this.showPop = true;
      this.selectedMj = v;
    },
    projectApply(v) {
      let id = v.id;
      if (videoMergeList[id]) {
        videoMergeList[id].destroy();
        videoMergeList[id] = undefined;
        return;
      }
      videoData.coor.lng = v.coor[0];
      videoData.coor.lat = v.coor[1];
      videoData.coor.alt = 40;
      let tcamera = new tqsdk.common.videoMerge.VideoMerge(viewer, videoData);
      tcamera.setView();
      setTimeout(() => {
        tcamera.play = true;
      }, 1000);
      videoMergeList[id] = tcamera;
    },
  },
};
</script>

<style>
</style>