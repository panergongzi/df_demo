<template>
  <div
    ref="mousePosintion"
    :style="{
      ...mousePosintionStyle,
    }"
    class="mosu-tool-t"
  >
  经纬度：
    <div class="item-body"> {{ longitudeString }}</div>
    <div class="item-body"> {{ latitudeString }}</div>

    <div class="item-body">转换</div>
    <div ref="right" v-show="stakeMark != ''" class="item-body">
      <p>桩号：{{ stakeMark }}</p>
    </div>
  </div>
</template>
<script>
let Init = tqsdk.widgets.MousePosition;
let stakeMarkCalculation = tqsdk.utils.stakeMarkCalculation;
import stakeMarkData from "@/data/zhuang.js";
export default {
  data() {
    return {
      longitudeString: "",
      latitudeString: "",
      heightString: 0,
      cameraHeight: "",
      heading: "",
      pitch: "",
      roll: "",
      stakeMark: "",
      isShow: false,
      mousePosintionStyle: {},
      leftStyle: {},
      rightStyle: {},
    };
  },
  mounted() {},
  methods: {
    async init(viewer, state = true, position) {
      this.isShow = state;
      if (position) {
        this.mousePosintionStyle = {
          position: "relative",
          top: 0,
          left: 0,
          bottom: 0,
          height: "66%",
        };
        this.leftStyle = {
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
        };
        this.rightStyle = {
          position: "absolute",
          bottom: 0,
        };
      }
      this.mousePosition = new tqsdk.widgets.MousePosition(
        viewer,
        (res) => {
          let {
            mousePosition,
            cameraHeight,
            heading,
            pitch,
            roll,
            northDirection,
          } = res;
          this.longitudeString = Init.keepDecimal(mousePosition[0], 8);
          this.latitudeString = Init.keepDecimal(mousePosition[1], 8);

          if (mousePosition[2] < 0.5 && mousePosition[2] > -0.5) {
            this.heightString = 0;
          } else if (mousePosition[2] < 100 && mousePosition[2] > -100) {
            this.heightString = Init.keepDecimal(mousePosition[2], 2);
          } else if (mousePosition[2] < -1000) {
            this.heightString = -1000;
          } else if (mousePosition[2] > 100000) {
            this.heightString = 100000;
          } else {
            this.heightString = Init.keepDecimal(mousePosition[2], 1);
          }

          this.cameraHeight = Init.keepDecimal(cameraHeight, 2);
          this.heading = northDirection;
          this.pitch = Init.keepDecimal(pitch, 2);
          this.roll = Init.keepDecimal(roll, 2);
          let zhData = stakeMarkData;
          // console.log('桩号', JSON.stringify(zhData));
          if (zhData) {
            let data = stakeMarkCalculation.getStakeMark(
              mousePosition, //桩号坐标 例如[113.12,23.45,0]
              stakeMarkCalculation.convertData(zhData), //桩号数据，可以通过桩号接口获得
              1000
            );

            if (data && data.length > 0) {
              //超出20公里就不显示桩号
              if (data[0].distance < 1000) {
                let distance = data[0].distance;
                if (distance < 100) {
                  distance = "0" + distance;
                }
                this.stakeMark = data[0].name + "+" + distance;
              } else {
                this.stakeMark = "";
              }
            } else {
              this.stakeMark = "";
            }
          }
        },
        30
      );
    },
    // 动态生成类名
  },
  created() {
    this.mousePosition = undefined;
  },
  beforeDestroy() {
    if (this.mousePosition) {
      this.mousePosition.destroy();
      this.mousePosition = undefined;
    }
  },
  props: {
    isPositioning: {
      typeof: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.mousePosintion.x-convert {
}
.mouse-position-name.x-convert {
  display: flex;
  padding-left: 10px;
  position: fixed;
  bottom: 16px;
  z-index: 10;
  padding: 0 8px;
  height: 33px;
  color: #fff;
  line-height: 33px;

  width: 450px;
  justify-content: space-between;
  right: 300px;
  /* background: rgba(0, 0, 0, 0.3); */
  /* box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16); */
  border-radius: 4px 4px 4px 4px;
}
.mouse-position-name2.x-convert {
  position: fixed;
  bottom: 16px;
  z-index: 10;
  padding: 0 8px;
  height: 33px;
  color: #fff;
  line-height: 33px;

  right: 16px;
  /* background: rgba(0, 0, 0, 0.2); */
  /* box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16); */
  border-radius: 4px 4px 4px 4px;
  width: 110px;
  white-space: nowrap; /* 禁止换行 */
}
.mouse-position-name span {
  color: aquamarine;
}
.mouse-height {
  display: inline;
  width: 100px;
}
.item-body {
  display: inline-block;
  margin: 0 4px;
}
.mosu-tool-t {
  position: absolute;
    /* width: 100%; */
    background: #1b9f2be3;
    /* bottom: 0px; */
    z-index: 666;
    height: 50px;
    line-height: 50px;
    color: #fff;
    /* left: 300px; */
    right: 0px;
    width: 414px;
    overflow: hidden;
    border: 1px solid #379719;
    text-align: center;
}
</style>
