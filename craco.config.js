module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      console.log("Watch Options:", webpackConfig.watchOptions); // 输出调试信息
      webpackConfig.watchOptions = {
        ignored: /public/,
      };
      return webpackConfig;
    },
  },
};
