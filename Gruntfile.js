/* jshint node:true */

var browsers = [
  { browserName: "firefox", platform: "Windows 8.1" },
  { browserName: "firefox", platform: "Windows 7" },
  { browserName: "firefox", platform: "XP" },
  { browserName: "chrome", platform: "Windows 8.1" },
  { browserName: "chrome", platform: "Windows 7" },
  { browserName: "chrome", platform: "XP" },
  { browserName: "internet explorer", platform: "Windows 8.1", version: "11" },
  { browserName: "internet explorer", platform: "Windows 8", version: "10" },
  { browserName: "internet explorer", platform: "Windows 7", version: "11" },
  { browserName: "internet explorer", platform: "Windows 7", version: "10" },
  { browserName: "internet explorer", platform: "Windows 7", version: "9" },
  { browserName: "internet explorer", platform: "Windows 7", version: "8" },
  { browserName: "internet explorer", platform: "XP", version: "8" },
  { browserName: "safari", platform: "OS X 10.9", version: "7" },
  { browserName: "safari", platform: "OS X 10.8", version: "6" },
];


var popularBrowsers = [
  // { browserName: "firefox", version: "32", platform: "XP" },
  { browserName: "internet explorer", platform: "Windows 7", version: "11" },
  { browserName: "internet explorer", platform: "Windows 7", version: "10" },
  { browserName: "chrome", platform: "Windows 7" },
  { browserName: "firefox", platform: "Windows 7" },
  { browserName: "safari", platform: "OS X 10.9", version: "7" },
];

const DEV_HOST = 'http://127.0.0.1';
const TEST_PATH = '/tests';

var srcTestUrls = [
  '/index.html',
  '/noamd.html',
].map(function(url) {
  return DEV_HOST + TEST_PATH + url;
});

var optimizedTestUrls = srcTestUrls.map(function(url) {
  return url + '?liftjs=optimized';
});


var JS_COPYRIGHT_HEADER = "" +
  "/*!\n" +
  "* LiftJS Javascript Library v<%= bower.version %>\n" +
  "* http://liftjs.github.io/\n" +
  "*\n" +
  "* Copyright 2013 - <%= grunt.template.today('yyyy') %> Pneumatic Web Technologies Corp. and other contributors\n" +
  "* Released under the MIT license\n" +
  "* http://liftjs.github.io/license\n" +
  "*/\n" +
  "\n\n";


var gruntConfig = {
  clean: ['dist/'],
  mkdir: {
    build: {
      options: {
        create: ['dist/']
      },
    },
  },
  uglify: {
    beautify: {
      options: {
        ASCIIOnly: true,
        mangle: false,
        width: 80,
        beautify: {
          beautify: true,
          indent_level: 2,
        },
        preserveComments: 'some',
        banner: JS_COPYRIGHT_HEADER
      },
      files: [
        { expand: true, src: ['**/*.js'], dest: 'dist/modules/', cwd: 'src/modules' },
        { expand: true, src: ['lift.js'], dest: 'dist/', flatten: true, cwd: 'src/' },
      ]
    },
  },
  exec: {
    all: {
      cmd: 'node ./build.js "*"'
    },
    getownpropertynames: {
      cmd: 'node ./build.js "es5/object/getownpropertynames"'
    },
  },
  mocha: {
    options: {
      log: true,
      logErrors: true,
      run: false,
    },
    test: {
      options: {
        urls: srcTestUrls.concat(optimizedTestUrls)
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
  connect: {
    server: {
      options: {
        base: '',
        port: 80,
      }
    }
  },
  watch: {
    scripts: {
      files: ['src/**/*.js', 'tests/spec/**/*.js', 'tests/*.html'],
      tasks: [
        'build',
        '_mochaTests',
      ],
    },
  },
  'saucelabs-mocha': {
    quick: {
      options: {
        urls: [ DEV_HOST + TEST_PATH + '/index.html' ],
        tunnelTimeout: 5,
        browsers: popularBrowsers,
        testname: 'popular browsers',
        // tags: ["master"]
      }
    },
    all: {
      options: {
        urls: srcTestUrls.concat(optimizedTestUrls),
        tunnelTimeout: 5,
        build: '<%= grunt.template.today("isoDateTime") %>',
        browsers: browsers,
        testname: 'all browsers',
        // tags: ["master"]
      }
    }
  },
  bump: {
    options: {
      files: ['bower.json', 'package.json'],
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-saucelabs');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-bump');

  gruntConfig.bower = grunt.file.readJSON('bower.json');

  grunt.initConfig(gruntConfig);

  grunt.registerTask('_mochaTests', [
    'mochaTest',
    'mocha',
  ]);

  grunt.registerTask('build', [
    'clean',
    'mkdir',
    'uglify:beautify',
    'exec:all',
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
    'saucelabs-mocha:all',
  ]);

  grunt.registerTask('dev', [
    'build',
    'connect',
    'watch'
  ]);
};
