/* jshint node:true */

var browsers = [
  { platform: "Windows 8.1", browserName: "firefox", },
  { platform: "Windows 8.1", browserName: "chrome", },
  { platform: "Windows 8.1", browserName: "internet explorer", version: "11" },
  { platform: "Windows 8",   browserName: "internet explorer", version: "10" },
  { platform: "Windows 7",   browserName: "firefox" },
  { platform: "Windows 7",   browserName: "chrome" },
  { platform: "Windows 7",   browserName: "internet explorer", version: "11" },
  { platform: "Windows 7",   browserName: "internet explorer", version: "10" },
  { platform: "Windows 7",   browserName: "internet explorer", version: "9" },
  { platform: "Windows 7",   browserName: "internet explorer", version: "8" },
  { platform: "Windows XP",  browserName: "firefox",  },
  { platform: "Windows XP",  browserName: "chrome",  },
  { platform: "Windows XP",  browserName: "internet explorer", version: "8" },
  { platform: "OS X 10.9",   browserName: "safari", version: "7" },
  { platform: "OS X 10.9",   browserName: "firefox", },
  { platform: "OS X 10.9",   browserName: "chrome",  },
  { platform: "Linux",   browserName: "firefox", },
  { platform: "Linux",   browserName: "chrome",  },
  // { browserName: "safari", platform: "OS X 10.8", version: "6" },
];


var popularBrowsers = [
  // { browserName: "firefox", version: "32", platform: "Windows XP" },
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

var NO_AMD_DIST_TEST_URL = DEV_HOST + TEST_PATH + '/noamd.html?liftjs=optimized';


var JS_COPYRIGHT_HEADER = "" +
  "/*!\n" +
  "* LiftJS Javascript Library v<%= bower.version %>\n" +
  "* http://liftjs.github.io/\n" +
  "*\n" +
  "* Copyright 2013 - <%= grunt.template.today('yyyy') %> Pneumatic Web Technologies Corp. and other contributors\n" +
  "* Released under the MIT license\n" +
  "* http://liftjs.github.io/license\n" +
  "*/\n\n\n";


var UGLIFY_OPTIONS = {
  ASCIIOnly: true,
  mangle: false,
  width: 80,
  beautify: {
    beautify: true,
    indent_level: 2,
  },
  preserveComments: false,
  banner: JS_COPYRIGHT_HEADER
};

var gruntConfig = {
  jshint: {
    source: {
      options: {
        jshintrc: true,
      },
      files: {
        src: ['src/**/*.js', 'Gruntfile.js', 'build.js', 'tests/**/*.js']
      },
    }
  },
  clean: ['dist/'],
  mkdir: {
    build: {
      options: {
        create: ['dist/']
      },
    },
  },
  copy: {
    liftjs: {
      src: 'src/lift.js',
      dest: 'dist/lift.js',
    },
  },
  uglify: {
    modules: {
      options: UGLIFY_OPTIONS,
      files: [
        { expand: true, src: ['**/*.js'], dest: 'dist/modules/', cwd: 'src/modules' },
      ]
    },
    liftjs: {
      options: UGLIFY_OPTIONS,
      files: [
        { src: ['dist/lift.js'], dest: 'dist/lift.js' },
        { src: ['dist/lift-optimized.js'], dest: 'dist/lift-optimized.js' },
      ]
    },
  },
  removelogging: {
    liftjs: {
      src: 'dist/lift.js',
    }
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
        urls: [ NO_AMD_DIST_TEST_URL ],
        tunnelTimeout: 5,
        browsers: popularBrowsers,
        testname: 'popular browsers',
        // tags: ["master"]
      }
    },
    browsers: {
      options: {
        urls: [ NO_AMD_DIST_TEST_URL ],
        tunnelTimeout: 5,
        build: '<%= grunt.template.today("isoDateTime") %>',
        browsers: browsers,
        testname: 'all browsers',
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
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-remove-logging');
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
    'jshint',
    'clean',
    'mkdir',
    'copy',
    'removelogging',
    'uglify:modules',
    'exec:all',
    'uglify:liftjs',
  ]);

  grunt.registerTask('test', [
    'build',
    'connect',
    '_mochaTests',
  ]);

  grunt.registerTask('test:quick', [
    'build',
    'connect',
    'saucelabs-mocha:quick',
  ]);

  grunt.registerTask('test:browsers', [
    'build',
    'connect',
    'saucelabs-mocha:browsers',
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
