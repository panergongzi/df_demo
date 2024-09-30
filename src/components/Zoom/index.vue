<template>
  <div class="zoom-grout x-convert">
    <div class="zoom-item" v-show="isHome">
      <a-button @click="flyHome" icon="home"></a-button>
    </div>
    <div class="zoom-item" v-show="isZoomIn">
      <a-button @click="zoomIn" icon="plus"></a-button>
    </div>
    <div class="zoom-item" v-show="isZoomOut">
      <a-button @click="zoomOut" icon="minus"></a-button>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.zoom = undefined;
  },
  props: {
    isZoomIn: {
      type: Boolean,
      default: true,
    },
    isZoomOut: {
      type: Boolean,
      default: true,
    },
    isHome: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    init(viewer, viewPoint) {
      if (!this.zoom) {
        // viewPoint = tqsdk.utils.defaultValue(
        //     viewPoint,
        //     this.getViewPoint()
        // );
        this.zoom = new tqsdk.scene.sceneControl.Zoom(viewer, viewPoint);
      }
    },
    zoomIn() {
      this.zoom.zoomIn();
    },
    zoomOut() {
      this.zoom.zoomOut();
    },
    flyHome() {
      this.zoom.flyHome();
    },
    getViewPoint() {
      let viewPoint;
      //设置视角
      if (
        this.$store.state.userModule &&
        this.$store.state.userModule.gisBusinesData &&
        this.$store.state.userModule.gisBusinesData.viewPoint
      ) {
        if (this.$store.state.userModule.gisBusinesData.viewPoint) {
          viewPoint = JSON.parse(
            this.$store.state.userModule.gisBusinesData.viewPoint
          );
          return viewPoint;
        }
      }
    },
  },
  beforeDestroy() {
    this.zoom = undefined;
  },
};
</script>

<style lang="less" scoped>
.zoom-grout.x-convert {
  // position: absolute;
  // right: 5px;
  // bottom: 35px;
  //z-index: 3;
  // width: 40px;
  // text-align: center;

  z-index: 3;
  width: 40px;
  text-align: center;
  position: absolute;
  right: 20px;
  bottom: 50px;
  .zoom-item {
    margin-bottom: 10px;
  }
}
</style>
