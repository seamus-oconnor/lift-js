/* jshint node:true */

var browsers = [
  { browserName: "firefox", version: "19", platform: "XP" },
  // { browserName: "chrome", platform: "XP" },
  // { browserName: "chrome", platform: "linux" },
  // { browserName: "internet explorer", platform: "WIN8", version: "10" },
  // { browserName: "internet explorer", platform: "VISTA", version: "9" },
  // { browserName: "opera", platform: "Windows 2008", version: "12" }
];


var popularBrowsers = [
  { browserName: "firefox", version: "32", platform: "XP" },
  // { browserName: "chrome", platform: "XP" },
  // { browserName: "chrome", platform: "linux" },
  // { browserName: "internet explorer", platform: "WIN8", version: "10" },
  // { browserName: "internet explorer", platform: "VISTA", version: "9" },
  // { browserName: "opera", platform: "Windows 2008", version: "12" }
];

const DEV_HOST = 'http://127.0.0.1';
const TEST_PATH = '/tests';

var distTestUrls = [
  '/index.html',
  '/noamd.html',
].map(function(url) {
  return DEV_HOST + TEST_PATH + url;
});

var srcTestUrls = distTestUrls.map(function(url) {
  return url + '?use=built';
});


var gruntConfig = {
  clean: ['dist/'],
  connect: {
    server: {
      options: {
        base: '',
        port: 80,
      }
    }
  },
  exec: {
    // build: 'node ./build.js "es5/object/getownpropertynames"'
    optimized: {
      cmd: 'node ./build.js "*"'
    },
    unoptimzied: {
      cmd: 'node ./build.js'
    }
  },
  mocha: {
    options: {
      // log: true,
      logErrors: true,
      run: false,
    },
    test: {
      options: {
        urls: distTestUrls.concat(srcTestUrls)
      }
    }
  },
  mochaTest: {
    test: {
      options: {
        reporter: 'spec',
      },
      src: ['tests/spec/build_spec.js']
    }
  },
  watch: {
    scripts: {
      files: ['src/**/*.js', 'tests/spec/**/*.js', 'tests/*.html'],
      tasks: [
        'clean',
        'exec:optimized',
        '_mochaTests',
      ],
    },
  },
  'saucelabs-mocha': {
    quick: {
      options: {
        urls: distTestUrls.concat(srcTestUrls),
        tunnelTimeout: 5,
        // build: process.env.TRAVIS_JOB_ID,
        concurrency: 1,
        browsers: popularBrowsers,
        testname: 'mocha tests',
        // tags: ["master"]
      }
    },
    all: {
      options: {
        urls: distTestUrls.concat(srcTestUrls),
        tunnelTimeout: 5,
        // build: process.env.TRAVIS_JOB_ID,
        concurrency: 1,
        browsers: browsers,
        testname: 'mocha tests',
        // tags: ["master"]
      }
    }
  },
  bump: {
    options: {
      files: ['bower.json'],
      updateConfigs: [],
      commitFiles: ['-a'],
      pushTo: 'origin',
      push: false,
    }
  },
};

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-saucelabs');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-bump');

  grunt.initConfig(gruntConfig);

  grunt.registerTask('_mochaTests', [
    'mochaTest',
    'mocha',
  ]);

  grunt.registerTask('build', [
    'clean',
    'exec:optimized',
  ]);

  grunt.registerTask('test', [
    'build',
    'connect',
    '_mochaTests',
  ]);

  grunt.registerTask('test:browsers', [
    'build',
    'connect',
    'saucelabs-mocha:quick',
  ]);

  grunt.registerTask('test:all', [
    'test',
    'test:browsers',
    'saucelabs-mocha:all',
  ]);

  grunt.registerTask('dev', [
    'connect',
    'watch'
  ]);
};
