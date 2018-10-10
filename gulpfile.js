process.env.PORT = process.env.PORT || 3001;
process.env.TENANT = process.env.TENANT || 'central';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const fs = require('fs');
const del = require('del');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const gulpLoadPlugins = require('gulp-load-plugins');
const webpack = require('webpack-stream');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const $ = gulpLoadPlugins();

const srcFolder = 'src';
const outFolder = 'build';

$.protocol = $.stringReplace(/https?:\/\//g, '//');

const useminOptions = () => {
  return {
    development: {
      scss: [],
      es6: [],
      css: [$.minifyCss, $.protocol, $.rev],
      js: [$.uglify, $.rev]
    },
    production: {
      scss: [$.minifyCss, $.rev],
      es6: [$.ngAnnotate, $.uglify, $.rev],
      css: [$.minifyCss, $.protocol, $.rev],
      js: [$.uglify, $.rev]
    }
  }[process.env.NODE_ENV];
};

const configFile = () => `config/${process.env.NODE_ENV}.js`;
const replaceEnvVar = (variable) => $.stringReplace(`<${variable}>`, process.env[variable]);

gulp.task('clean', () => del(`${outFolder}`, {force: true}));
gulp.task('release', (done) => {
  del('release', {force: true})
    .then(() => fs.renameSync(`${outFolder}`, 'release'))
    .then(done, done)
});

gulp.task('config', () => {
  return gulp.src(`${configFile()}`)
    .pipe(replaceEnvVar('MUMUKI_COOKIES_DOMAIN'))
    .pipe(replaceEnvVar('MUMUKI_LABORATORY_URL'))
    .pipe(replaceEnvVar('MUMUKI_CLASSROOM_URL'))
    .pipe(replaceEnvVar('MUMUKI_CLASSROOM_API_URL'))
    .pipe(replaceEnvVar('MUMUKI_BIBLIOTHECA_API_URL'))
    .pipe(replaceEnvVar('MUMUKI_ORGANIZATION_MAPPING'))
    .pipe($.rename('config.js'))
    .pipe(gulp.dest(`${srcFolder}/scripts/config`))
});

gulp.task('dev:js', ['config'], () => {
  return gulp.src([`${srcFolder}/scripts/**/*.js`])
    .pipe(webpack({
      mode: process.env.NODE_ENV,
      output: {filename: "main.js"},
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ["angularjs-annotate"]
              }
            }
          }
        ]
      },
      devtool: 'source-map'
    }))
    .pipe(gulp.dest(`${outFolder}/scripts`))
    .pipe($.livereload());
});

gulp.task('prod:js', ['config'], () => {
  return gulp.src([`${srcFolder}/scripts/**/*.js`])
    .pipe(webpack({
      mode: process.env.NODE_ENV,
      output: {filename: "main.js"},
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ["angularjs-annotate"]
              }
            }
          }
        ]
      },
      devtool: 'source-map'
    }))
    //TODO: uglify
    // .pipe($.uglify())
    .pipe(gulp.dest(`${outFolder}/scripts`))
    .pipe($.livereload());
});

gulp.task('jade:views', () => {
  return gulp.src([`${srcFolder}/views/**/*.jade`])
    .pipe($.jade())
    .pipe(gulp.dest(`${outFolder}/views`))
    .pipe($.livereload());
});

gulp.task('jade:index', () => {
  return gulp.src([`${srcFolder}/index.jade`])
    .pipe($.jade({pretty: true}))
    .pipe($.usemin(useminOptions()))
    .pipe(gulp.dest(`${outFolder}`))
    .pipe($.livereload());
});

gulp.task('scss', () => {
  return gulp.src([`${srcFolder}/styles/main.scss`])
    .pipe(webpack({
      mode: process.env.NODE_ENV,
      module: {
        rules: [{
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
          ]
        }, {
          test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
          use: [{
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
              outputPath: "../fonts/"
            }
          }]
        }]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "main.css"
        })
      ]
    }))
    .pipe(gulp.dest(`${outFolder}/styles`))
    .pipe($.livereload());
});

gulp.task('images', () => {
  return gulp.src([`${srcFolder}/images/**/*`])
    .pipe(gulp.dest(`${outFolder}/images`))
    .pipe($.livereload());
});

gulp.task('assets', () => {
  return gulp.src([`${srcFolder}/assets/**/*`])
    .pipe(gulp.dest(`${outFolder}/assets`))
    .pipe($.livereload());
});

gulp.task('jade', ['jade:index', 'jade:views']);

gulp.task('gzip', () => {
  const toGzip = ['css', 'html', 'js', 'svg'].map((ext) => `${outFolder}/**/*.${ext}`);
  return gulp.src(toGzip)
    .pipe($.gzip())
    .pipe(gulp.dest(outFolder));
});

gulp.task('dev:build', (done) => {
  runSequence('clean', 'dev:js', 'scss', 'jade', 'images', 'assets', 'gzip', done);
});

gulp.task('prod:build', (done) => {
  runSequence('clean', 'prod:js', 'scss', 'jade', 'images', 'assets', 'release', 'gzip', done);
});

gulp.task('dev:serve', ['dev:build'], () => {
  return gulp.src(`${outFolder}`)
    .pipe($.webserver({
      open: `/#/${process.env.TENANT}/home`,
      port: process.env.PORT,
      host: 'localhost',
      livereload: true
    }));
});

gulp.task('dev:watch', () => {
  gulp.watch(`${configFile()}`, ['dev:js']);
  gulp.watch(`${srcFolder}/index.jade`, ['jade:index']);
  gulp.watch(`${srcFolder}/assets/**/*`, ['assets']);
  gulp.watch(`${srcFolder}/images/**/*`, ['images']);
  gulp.watch(`${srcFolder}/scripts/**/*.js`, ['dev:js']);
  gulp.watch(`${srcFolder}/styles/**/*.scss`, ['scss']);
  gulp.watch(`${srcFolder}/views/**/*.jade`, ['jade:views']);
});

gulp.task('prod:serve', () => {
  return gulp.src(`${outFolder}`)
    .pipe($.webserver({
      port: process.env.PORT,
      host: '0.0.0.0',
      path: '/central/home'
    }));
});

gulp.task('dev', (done) => {
  process.env.NODE_ENV = 'development';
  runSequence('dev:serve', 'dev:watch', done);
});

gulp.task('prod', (done) => {
  process.env.NODE_ENV = 'production';
  runSequence('prod:serve', done);
});


gulp.task('test', (done) => {
  process.env.NODE_ENV = 'test';
  runSequence('config');

  const Server = require('karma').Server;

  new Server({
    configFile: `${__dirname}/karma.conf.js`,
    action: 'run',
    files: [
      {pattern: `${srcFolder}/scripts/**/*.js`, watched: false},
      "node_modules/angular-mocks/angular-mocks.js",
      'config/test.js',
      'test/context.js',
      {pattern: `test/**/*.js`, watched: false},
    ]
  }, done).start();
});
