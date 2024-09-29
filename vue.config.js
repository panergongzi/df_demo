const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8494, //修改服务端口号
    client: {
      overlay: false,
    },
  },
});
