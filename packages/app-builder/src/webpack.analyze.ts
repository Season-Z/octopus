const webpackConfig = require('./webpack.config');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

module.exports = () => {
  return new Promise(async (resolve) => {
    const config = await webpackConfig();
    resolve(smp.wrap(config));
  });
};
