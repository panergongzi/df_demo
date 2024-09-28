<template>
  <div>
    <div
      type="primary"
      class="design-btn"
      v-for="(item, index) in plottingList"
      :key="index"
      @click="drawPlottiing(item)"
    >
      <img :src="item.icon" width="24" />
      <span class="icon-plotting"> {{ item.name }}</span>
    </div>
    <el-button
      type="danger"
      icon="el-icon-delete"
      @click="removeAllPlotting"
      class="design-btn"
      size="small"
    ></el-button>
    <div></div>
  </div>
</template>
<script>
import configData from "@/data/draw.js";

let platting;
export default {
  data() {
    return {
      plottingList: configData,
    };
  },
  beforeCreate() {
    this.ZDsID = [];
  },
  mounted() {
    this.$nextTick(() => {
      platting = new tqsdk.widgets.Plotting(window.viewer);
    });
  },
  methods: {
    async drawPlottiing(item) {
      let { style, type } = item;
      if (platting[type] && typeof platting[type] === "function") {
        let re = await platting[type](style);
        console.log(11111, re);
      }
    },
    //清除
    removeAllPlotting() {
      platting.removeAll();
    },

    removeAll() {
      for (let k = 0; k < this.ZDsID.length; k++) {
        window.viewer.entities.removeById(this.ZDsID[k]);
      }
    },
    async importData(v) {
      this.removeAllPlotting();
      let re = await platting.importJson(JSON.parse(v));
      re.flyTo();
    },
    downloadAll() {
      platting.downloadAll("标绘数据", "txt");
    },
  },
  destroyed() {
    this.removeAll();
    platting.destroy();
  },
};
</script>
<style scoped>
.design-btn {
  margin: 5px;
  display: inline-block;
}
.icon-plotting {
}
</style>
