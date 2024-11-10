module.exports = function (config) {
  config.set({
      basePath: "",
      frameworks: ["jasmine", "@angular-devkit/build-angular"],
      plugins: [
          require("karma-jasmine"),
          require("karma-chrome-launcher"),
          require("@angular-devkit/build-angular/plugins/karma"),
          require("karma-mocha-reporter"),
          require("karma-junit-reporter"),
      ],
      files: [
          'node_modules/jquery/dist/jquery.min.js'
      ],
      client: {
          clearContext: false,
      },
      reporters: ["mocha", "junit"],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ["ChromeHeadless"],
      singleRun: true,
      restartOnFileChange: true,
      junitReporter: {
          useBrowserName: false,
          outputFile: "../output/task15.xml",
          suite: "unit",
      },
  });
};