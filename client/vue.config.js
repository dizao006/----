const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5008",
      },
    },
  },
  outputDir: path.resolve(__dirname, "../public"),
});
