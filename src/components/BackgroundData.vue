<template>
  <div>
    <div>
      <el-tree
        :data="LayerData"
        @node-click="handleNodeClick"
        default-expand-all
        show-checkbox
        @check-change="checkChange"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span v-show="data.type" class="tool-item">
            <i class="el-icon-position" @click="flyTo(data)">定位</i>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import LayerData from "@/data/LayerData.js";
let Init = tqsdk.widgets.BackgroundData;
let init;
export default {
  data() {
    return {
      LayerData,
    };
  },
  mounted() {
    this.$nextTick(() => {
      init = new Init(viewer, "containCesium");
    });
  },
  methods: {
    handleNodeClick() {},
    checkChange(v, state) {
      // console.log(22222222, v, state);
      if (v.type) {
        this.addBackdata(v, state);
        // this.flyTo(v);
      }
    },
    async addBackdata(item, state) {
      let type = item.type;
      // 加载实景三维
      if (type == "threeDTile" || type == "bim" || type == "threeDPoint") {
        let data = await init.add3dtiles(item, state);
      } else if (type == "terrain") {
        await init.addTerrain(item, state);
        //加载全景图
      } else if (type == "panorama") {
        await init.addPanorama(item, state);
      } else if (type == "dom" || type == "insar") {
        let data = await init.addCustomTileLayer(item, state);
      } else if (type == "designVector") {
        let data = await init.addKML(item, state);
      } else if (type == "designRaster") {
        let data = await init.addCustomTileLayer(item, state);
      } else {
        let data = await init.add3dtiles(item, state);
      }
    },
    //定位到数据范围
    flyTo(v) {
      let type = v.type;
      console.log(33333333333, type);
      if (
        type == "threeDTile" ||
        type == "bim" ||
        type == "threeDPoint" ||
        type == "designVector"
      ) {
        init.flyToExtent(v.id);
      } else {
        let center = v.center;
        tqsdk.camera.setCamera(viewer, {
          position: Cesium.Cartesian3.fromDegrees(
            center[0],
            center[1],
            center[2]
          ),
        });
      }
    },
  },
};
</script>

<style scoped>
.tool-item {
  color: blue;
}
</style>