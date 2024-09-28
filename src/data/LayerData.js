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
      url: "http://192.168.2.85/test/%E9%A1%B9%E7%9B%AE/%E5%B9%BF%E4%B9%90%E9%AB%98%E9%80%9F/%E9%BB%8E%E6%BA%AA%E6%9C%8D%E5%8A%A1%E5%8C%BA%E5%88%87%E7%89%87/{z}/{x}/{y}.png",
      //tilingScheme:"geographic",
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
      //url: "http://192.168.2.85/test/CAD%E7%9F%A2%E9%87%8F%E6%95%B0%E6%8D%AE/%E9%BB%84%E6%9D%91%E4%BA%92%E9%80%9A84.kml",
      url: "http://192.168.2.85/test/kml/%E5%85%A8%E7%81%8C%E6%A1%A9%E5%8F%B7%E7%BA%BF.kml",
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
  //       url: "http://192.168.2.85/test/%E6%AD%A3%E5%B0%84%E5%BD%B1%E5%83%8F/%E6%B3%A5%E5%B7%9E%E6%B0%B4%E9%81%93%E6%A1%A5/map/{z}/{x}/{y}.png",
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
    center: [113.53618944, 22.88957360, 1000],
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
      url: "http://192.168.2.85/test/%E9%A1%B9%E7%9B%AE/%E5%90%89%E6%9E%97/terra_pnts/tileset.json",
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
