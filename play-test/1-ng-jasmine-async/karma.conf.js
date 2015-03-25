// Karma configuration
// Generated on Sun Mar 22 2015 11:59:48 GMT+0100 (W. Europe Standard Time)

module.exports = function (config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine'],

        files: [
          './bower_components/angular/angular.js',
          './bower_components/angular-mocks/angular-mocks.js',            
          './app/**/*.js',
          './unit/**/*.js'
        ],

        exclude: [
        ],
        preprocessors: {},

        reporters: ['progress'],

        port: 9876,

        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};