let measureToolList = [
  {
    name: "距离测量",
    type: "distance",
    icon: "./img/6.png",
    style: {
      endpoint: {
        pixelSize: 5,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        disableDepthTestDistance: 1e11,
        show: false,
      },
      polyline: {
        material: Cesium.Color.fromCssColorString("green"),
        width: 5,
        depthFailMaterial: Cesium.Color.fromCssColorString("green"),
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
        showBackground: false,
        fillColor: Cesium.Color.fromCssColorString("red"),
        backgroundColor: Cesium.Color.fromCssColorString("#04A4B4"),
        scaleByDistance: new Cesium.NearFarScalar(0, 1, 1e6, 0.3),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5e4),
      },
    },
  },

  {
    name: "表面积测量",
    type: "areaSurface",
    icon: "./img/7.png",
    style: {
      endpoint: {
        pixelSize: 5,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        disableDepthTestDistance: 1e11,
        show: false,
      },
      label: {
        text: "测量",
        font: "14px sans-serif",
        pixelOffset: new Cesium.Cartesian2(0, -30),
        disableDepthTestDistance: Number.MAX_VALUE,
        showBackground: false,
        backgroundColor: Cesium.Color.fromCssColorString("#04A4B4"),
        scaleByDistance: new Cesium.NearFarScalar(0, 1, 1e6, 0.5),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5e4),
      },
      polygon: {
        material: Cesium.Color.GREEN.withAlpha(0.4),
        outline: true,
        outlineWidth: 10,
        fill: true,
        outlineColor: Cesium.Color.RED,
      },
      polyline: {
        width: 5,
        material: Cesium.Color.fromCssColorString("red"),
        depthFailMaterial: Cesium.Color.fromCssColorString("red"),
        clampToGround: true, //贴地
        show: true,
      },
    },
  },
  {
    name: "体积测量",
    type: "volume",
    icon: "./img/8.png",
    style: {
      endpoint: {
        pixelSize: 5,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        disableDepthTestDistance: 1e11,
        show: false,
      },
      label: {
        show: false,
        text: "测量",
        font: "14px sans-serif",
        pixelOffset: new Cesium.Cartesian2(0, -30),
        disableDepthTestDistance: Number.MAX_VALUE,
        showBackground: true,
        backgroundColor: Cesium.Color.fromCssColorString("#04A4B4"),
        scaleByDistance: new Cesium.NearFarScalar(0, 1, 1e6, 0.5),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5e4),
      },
      polygon: {
        material: Cesium.Color.YELLOW.withAlpha(0.4),
        outline: true,
        outlineWidth: 10,
        fill: true,
        outlineColor: Cesium.Color.YELLOW,
      },
      polyline: {
        width: 5,
        material: Cesium.Color.fromCssColorString("red"),
        depthFailMaterial: Cesium.Color.fromCssColorString("red"),
        clampToGround: true, //贴地
        show: true,
      },
    },
  },
];
export default measureToolList;
