<template></template>

<script>
import mjData from "@/data/mj.js";
export default {
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
              pixelOffset: new Cesium.Cartesian2(0, 0),
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
  },
};
</script>

<style>
</style>