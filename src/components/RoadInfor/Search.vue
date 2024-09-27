<template>
  <div>
    <div>
      门架查询
      <div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-select v-model="mj1" placeholder="开始门架" @change="mjSearch">
              <el-option
                v-for="item in mjData"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option> </el-select
          ></el-col>
          <el-col :span="12">
            <el-select v-model="mj2" placeholder="结束门架" @change="mjSearch">
              <el-option
                v-for="item in mjData"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option> </el-select
          ></el-col>
        </el-row>
      </div>
    </div>
    <div>
      收费单元查询
      <div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-select
              v-model="sddy1"
              placeholder="开始收费单元"
              @change="sfdySearch"
            >
              <el-option
                v-for="item in sfdyData"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option> </el-select
          ></el-col>
          <el-col :span="12">
            <el-select
              v-model="sddy2"
              placeholder="结束收费单元"
              @change="sfdySearch"
            >
              <el-option
                v-for="item in sfdyData"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option> </el-select
          ></el-col>
        </el-row>
      </div>
    </div>
    <div>
      K桩号查询
      <div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-select v-model="zh1" placeholder="开始桩号" @change="zhSearch">
              <el-option
                v-for="item in zhuangData"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option> </el-select
          ></el-col>
          <el-col :span="12">
            <el-select v-model="zh2" placeholder="结束桩号" @change="zhSearch">
              <el-option
                v-for="item in zhuangData"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option> </el-select
          ></el-col>
        </el-row>
      </div>
    </div>
    <div>
      K桩号定位
      <div>
        <el-select
          v-model="zhFlyto"
          placeholder="选择K桩号然后地图跳转"
          @change="zhChange"
        >
          <el-option
            v-for="item in zhuangData"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <p class="label-ts">注意：K桩号和经纬度之间的互相转换在页面底部可以看到</p>
    <el-button
      type="danger"
      icon="el-icon-delete"
      @click="removeAll"
      class="design-btn"
      size="small"
    ></el-button>
  </div>
</template>

<script>
import mjData from "@/data/mj.js";
import zhuangDatas from "@/data/zhuang.js";
import sfdyData from "@/data/sfdy.js";
import { v } from "vxe-table";
//
let zhuangData = zhuangDatas.map((item) => {
  let coor = tqsdk.utils.wktTransition.toArrayPoint(item.anchor);
  return {
    ...item,
    coor,
  };
});
let featureCollection;
export default {
  data() {
    return {
      mjData,
      zhuangData,
      sfdyData,
      mj1: "",
      mj2: "",
      zh1: "",
      zh2: "",
      sddy1: "",
      sddy2: "",
      zhFlyto: "",
    };
  },
  mounted() {},
  methods: {
    zhChange() {
      let indexItem = zhuangData.find((item) => item.name === this.zhFlyto);
      console.log(this.zhFlyto, indexItem);
      if (indexItem) {
        window.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            indexItem.coor[0],
            indexItem.coor[1],
            indexItem.coor[2] + 100
          ),
        });
      }
    },
    //门架查询
    mjSearch() {
      if (this.mj1 === "" || this.mj2 === "") {
        return;
      }
      let item1 = this.mjData.findIndex((item) => item.name === this.mj1);
      let item2 = this.mjData.findIndex((item) => item.name === this.mj2);

      const newData = this.mjData.slice(item1, item2 + 1);
      console.log("门架", item1, item2, newData);
      this.addLine(newData);
    },
    sfdySearch() {
      if (this.sddy1 === "" || this.sddy2 === "") {
        return;
      }
      let item1 = this.sfdyData.findIndex((item) => item.name === this.sddy1);
      let item2 = this.sfdyData.findIndex((item) => item.name === this.sddy2);
      const newData = this.sfdyData.slice(item1, item2 + 1);
      console.log("收费单元", item1, item2, newData);
      this.addLine(newData);
    },
    zhSearch() {
      if (this.zh1 === "" || this.zh2 === "") {
        return;
      }
      let item1 = this.zhuangData.findIndex((item) => item.name === this.zh1);
      let item2 = this.zhuangData.findIndex((item) => item.name === this.zh2);
      const newData = this.zhuangData.slice(item1, item2 + 1);
      console.log("桩号", item1, item2, newData);
      this.addLine(newData);
    },
    addLine(v) {
      if (!featureCollection) {
        featureCollection = new tqsdk.layer.FeatureCollection(viewer);
      }
      this.removeAll();
      let entityArr = [];
      let len = v.length;
      for (let i = 0; i < len; i++) {
        if (i === len - 1) {
          continue;
        }

        let point1 = Cesium.Cartesian3.fromDegrees(
          v[i].coor[0],
          v[i].coor[1],
          v[i].coor[2]
        );
        let point2 = Cesium.Cartesian3.fromDegrees(
          v[i + 1].coor[0],
          v[i + 1].coor[1],
          v[i + 1].coor[2]
        );
        let positions = [point1, point2];
        let path = featureCollection.addEntity({
          polyline: {
            material: Cesium.Color.fromCssColorString("yellow"),
            width: 8,
            // depthFailMaterial: Cesium.Color.YELLOW,
            positions,
            clampToGround: true,
          },
        });
        entityArr.push(path);
      }
      viewer.flyTo(entityArr);
    },
    removeAll() {
      if (featureCollection) {
        featureCollection.removeAll();
      }
    },
  },
};
</script>

<style scoped>
.label-ts {
  color: red;
}
</style>