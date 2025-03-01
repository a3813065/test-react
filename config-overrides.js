const path = require('path');

module.exports = function override(config) {
  if (config.devServer) {
    config.devServer.watchOptions = {
      ignored: /public/, // 忽略 public 文件夹
      poll: 1000, // 轮询检查文件变化
    };
  }
  return config;
};
