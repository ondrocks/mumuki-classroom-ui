process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = (config) => {
  config.set({
    autoWatch: true,
    basePath: './',
    frameworks: ['mocha', 'sinon-chai'],
    exclude: [],
    port: 8081,
    webpack: require("./webpack.test.js"),

    browsers: ['HeadlessChrome'],
    customLaunchers: {
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    preprocessors: {
      'src/scripts/**/*.js ': ['webpack'],
      'test/context.js ': ['babel'],
      'test/**/*.test.js ': ['babel']
    },

    files: [
      { pattern: `${srcFolder}/scripts/app.js`, watched: false },
      "node_modules/angular-mocks/angular-mocks.js",
      'config/test.js',
      'test/context.js',
      { pattern: `test/**/*.js`, watched: false },
    ],

    babelPreprocessor: {
      options: {
        presets: ['latest'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    reporters: ['spec'],

    singleRun: true,
    colors: true,
    debug: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    webpackMiddleware: {
      noInfo: true
    },
  });
};
