let plottingList = [
  {
    type: "drawPoint",
    name: "点",
    icon: "./img/1.png",
    style: {
      point: {
        pixelSize: 20,
        color: "green",
        // outlineColor: "#ffffff",
        // outlineWidth: 2,
        disableDepthTestDistance: 1e11,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e7),
      },
      label: {
        text: "点",
        font: "14px sans-serif",
        outlineColor: "#ffffff",
        outlineWidth: 2,
        pixelOffset: new Cesium.Cartesian2(0, 0),
        disableDepthTestDistance: 1e11,
        showBackground: true,
        backgroundColor: "#04A4B4",
        scaleByDistance: new Cesium.NearFarScalar(0, 1, 1e6, 0.5),
        show: false,
      },
    },
  },
  {
    type: "drawLineString",
    name: "线",
    icon: "./img/2.png",
    style: {
      endpoint: {
        pixelSize: 12,
        color: "green",
        outlineColor: "#ffffff",
        outlineWidth: 2,
        disableDepthTestDistance: 1e11,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e7),
        show: false,
      },
      polyline: {
        // material: "#EEE06C",
        width: 15,
        // depthFailMaterial: "#EEE06C",
        color: "green",
        depthFailColor: "green",
        clampToGround: true, //贴地
        close: false,
        //type: "Color", //材质类型
        type: "PolylineDashMaterialProperty",
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e7),
        alpha: 1,
      },
    },
  },
  {
    type: "drawPolygon",
    name: "多边形",
    icon: "./img/3.png",
    style: {
      polygon: {
        color: "green",
        type: "Color",
        // image: "/img/Fire.gif",
        // type: "Gif",
        fill: true,
        show: true,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e7),
        alpha: 0.5,
      },
      endpoint: {
        pixelSize: 12,
        color: "red",
        outlineColor: "#ffffff",
        outlineWidth: 2,
        disableDepthTestDistance: 1e11,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e7),
        show: false,
        heightReference: 1,
      },
      polyline: {
        width: 5,
        color: "blue",
        depthFailColor: "blue",
        clampToGround: true, //贴地
        close: false,
        type: "Color", //材质类型
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e7),
        show: true,
      },
      label: {
        text: "测量",
        font: "14px sans-serif",
        pixelOffset: new Cesium.Cartesian2(0, -30),
        disableDepthTestDistance: Number.MAX_VALUE,
        showBackground: true,
        backgroundColor: Cesium.Color.fromCssColorString("#04A4B4"),
        scaleByDistance: new Cesium.NearFarScalar(0, 1, 1e6, 0.5),
        show: false,
      },
    },
  },
  {
    type: "drawBillboard",
    name: "图标",
    icon: "./img/4.png",
    style: {
      billboard: {
        color: "#ffffff",
        image: "./img/4.png",
        disableDepthTestDistance: 1e11,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e7),
        scaleByDistance: new Cesium.NearFarScalar(0, 1, 1e6, 0.5),
        width: 64,
        height: 70,
        pixelOffset: new Cesium.Cartesian2(-5, 0),
        type: "Image",
      },
      label: {
        text: "2",
        color: "#000000",
        style: 0,
        font: "14px sans-serif",
        outlineColor: "#ffffff",
        outlineWidth: 2,
        pixelOffset: new Cesium.Cartesian2(0, -50),
        disableDepthTestDistance: 1e11,
        showBackground: true,
        backgroundColor: "red",
        scaleByDistance: new Cesium.NearFarScalar(0, 1, 1e6, 0.5),
        show: false,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e7),
      },
    },
  },
  {
    type: "drawBillboard",
    name: "图标",
    icon: "./img/5.png",
    style: {
      billboard: {
        color: "#ffffff",
        image: "./img/5.png",
        disableDepthTestDistance: 1e11,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e7),
        scaleByDistance: new Cesium.NearFarScalar(0, 1, 1e6, 0.5),
        width: 64,
        height: 70,
        pixelOffset: new Cesium.Cartesian2(-5, 0),
        type: "Image",
      },
      label: {
        text: "1",
        color: "#000000",
        style: 0,
        font: "14px sans-serif",
        outlineColor: "#ffffff",
        outlineWidth: 2,
        pixelOffset: new Cesium.Cartesian2(0, -50),
        disableDepthTestDistance: 1e11,
        showBackground: true,
        backgroundColor: "red",
        scaleByDistance: new Cesium.NearFarScalar(0, 1, 1e6, 0.5),
        show: false,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e7),
      },
    },
  },
];
export default plottingList;
