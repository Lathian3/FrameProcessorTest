module.exports = function (api) {
  api.cache(true);
  plugins: [
    ['react-native-worklets-core/plugin'],
  ]
  return {
    presets: ['babel-preset-expo'],
  };
};
