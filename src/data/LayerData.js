let list = [
  {
    label: "高速公路正射影像",
    type: "dom",
    id: "64d6de1a-9761-4dc7-a6f9-b71dd17771f44www742",
    isShow: false,
    userId: "a4785bfe-7498-4a40-8f70-fadbad304729",
    thumbnail: null,
    center: [113.22024104, 23.97970104, 1000],
    info: {
      url: window.YANSSHIURL.dom,
      maximumLevel: 20,
    },
    //调节图层是色调，饱和度，亮度，对比度等
    colorAdjust: null,
    expansion: {
      tilingScheme: "webMercator",
    },
  },
  {
    label: "CAD设计图纸",
    type: "designVector",
    id: "64d6de1a-9761-4dc7-a6f9-b71dd17774422ss1f44741",
    isShow: false,
    userId: "a4785bfe-7498-4a40-8f70-fadbad304729",
    thumbnail: null,
    center: [113.401134, 22.70118805, 113.63540833, 22.8085079],
    info: {
      url: window.YANSSHIURL.cad,
    },
    //调节图层是色调，饱和度，亮度，对比度等
    colorAdjust: null,
    expansion: JSON.stringify({
      // clampToGround: true,
      material: Cesium.Color.RED,
      width: 5,
    }),
  },
  //   {
  //     label: "高速公路CAD设计图纸",
  //     type: "dom",
  //     id: "64d6de1a-9761-4dc7-a6f9-b71dd17771f44742",
  //     isShow: false,
  //     userId: "a4785bfe-7498-4a40-8f70-fadbad304729",
  //     thumbnail: null,
  //     center: [113.401134, 22.70118805, 100],
  //     info: {
  //url: window.YANSSHIURL.cad,
  //       maximumLevel: 20,
  //     },
  //     //调节图层是色调，饱和度，亮度，对比度等
  //     colorAdjust: null,
  //     expansion: {
  //       tilingScheme: "webMercator",
  //     },
  //   },
  {
    label: "高速公路倾斜模型",
    type: "threeDTile",
    id: "64d6de1a-9761-4dc7-a6f9-b71dd17771f44743",
    isShow: false,
    userId: "a4785bfe-7498-4a40-8f70-fadbad304729",
    thumbnail: null,
    center: [113.53618944, 22.8895736, 1000],
    info: {
      url: window.YANSSHIURL.tiles,
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
  },
  {
    label: "桥梁点云",
    type: "threeDPoint",
    id: "64d6de1a-9761-4dc7-a6f9-b71dd17771f447478993222",
    isShow: false,
    userId: "a4785bfe-7498-4a40-8f70-fadbad30472955332",
    thumbnail: null,
    center: [124.73202766, 45.19260848, 180],
    info: {
      url: window.YANSSHIURL.dy,
      maximumScreenSpaceError: 1,
    },
    //调节图层是色调，饱和度，亮度，对比度等
    colorAdjust: undefined,
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
        13: -210,
        14: 0,
        15: 1,
      },
    }),
  },
];
let data = [{ label: "二三维GIS数据", children: list }];
export default data;
