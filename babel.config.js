module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'inline-dotenv',
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '@src',
        rootPathSuffix: 'src',
      },
    ],
  ],
};
