/* jshint node:true */

var browsers = [
  { platform: 'Windows 8.1', browserName: 'firefox', },
  { platform: 'Windows 8.1', browserName: 'chrome', },
  { platform: 'Windows 8.1', browserName: 'internet explorer', version: '11' },
  { platform: 'Windows 8',   browserName: 'internet explorer', version: '10' },
  { platform: 'Windows 7',   browserName: 'firefox' },
  { platform: 'Windows 7',   browserName: 'chrome' },
  { platform: 'Windows 7',   browserName: 'internet explorer', version: '11' },
  { platform: 'Windows 7',   browserName: 'internet explorer', version: '10' },
  { platform: 'Windows 7',   browserName: 'internet explorer', version: '9' },
  { platform: 'Windows 7',   browserName: 'internet explorer', version: '8' },
  { platform: 'Windows XP',  browserName: 'firefox',  },
  { platform: 'Windows XP',  browserName: 'chrome',  },
  { platform: 'Windows XP',  browserName: 'internet explorer', version: '8' },
  { platform: 'OS X 10.9',   browserName: 'safari', version: '7' },
  { platform: 'OS X 10.9',   browserName: 'firefox', },
  { platform: 'OS X 10.9',   browserName: 'chrome',  },
  { platform: 'Linux',   browserName: 'firefox', },
  { platform: 'Linux',   browserName: 'chrome',  },
  // { browserName: 'safari', platform: 'OS X 10.8', version: '6' },
];


var popularBrowsers = [
  // { browserName: 'firefox', version: '32', platform: 'Windows XP' },
  { browserName: 'internet explorer', platform: 'Windows 7', version: '11' },
  { browserName: 'internet explorer', platform: 'Windows 7', version: '10' },
  { browserName: 'chrome', platform: 'Windows 7' },
  { browserName: 'firefox', platform: 'Windows 7' },
  { browserName: 'safari', platform: 'OS X 10.9', version: '7' },
];

const DEV_HOST = 'http://127.0.0.1';
const TEST_PATH = '/tests';

var testUrls = [
  '/amd-load.html',
  '/tag-load.html',
  '/amd-load.html?liftjs=optimized',
  '/tag-load.html?liftjs=optimized',
  '/shims.html',
].map(function(url) { return DEV_HOST + TEST_PATH + url; });


var JS_COPYRIGHT_HEADER = "" +
  "/*!\n" +
  "* LiftJS Javascript Library v<%= bower.version %>\n" +
  "* http://liftjs.github.io/\n" +
  "*\n" +
  "* Copyright 2013 - <%= grunt.template.today('yyyy') %> Pneumatic Web Technologies Corp. and other contributors\n" +
  "* Released under the MIT license\n" +
  "* http://liftjs.github.io/license\n" +
  "*/\n\n\n";


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
      files: [
        { src: 'src/lift.js', dest: 'dist/lift.amd.js' },
        { expand: true, src: ['modules/**/*.js'], dest: 'dist/', cwd: 'src/'}
      ]
    },
  },
  concat: {
    amd: {
      options: {
        stripBanners: { block: true },
        nonull: true,
        banner: 'window.LiftJS = {};\n'
      },
      src: ['bower_components/micro-amd/dist/micro-amd.js', 'dist/lift.amd.js', 'src/global.js'],
      dest: 'dist/lift.js',
    },
    all: {
      options: {
        banner: JS_COPYRIGHT_HEADER,
        nonull: true,
      },
      files: [
        { expand: true, src: ['**/*.js'], dest: 'dist/', cwd: 'dist/' },
      ]
    },
  },
  replace: {
    liftjs: {
      src: [ 'dist/lift.js' ],
      dest: 'dist/lift.js',
      replacements: [{
        from: /\/\*\ LIFT_AMD_MODULE_NAME \*\//,
        to: "'liftjs', "
      }],
    }
  },
  uglify: {
    liftjsamd: {
      options: {
        ASCIIOnly: true,
        mangle: true,
        preserveComments: false,
        banner: JS_COPYRIGHT_HEADER,
        sourceMap: true,
        compress: {
          drop_console: true
        }
      },
      files: [
        { expand: true, src: ['dist/**/*.js'], ext: '.min.js' },
        { src: 'dist/lift.amd.js', dest: 'dist/lift.amd.min.js' },
      ]
    },
  },
  removelogging: {
    liftjs: {
      src: 'dist/lift.*',
    }
  },
  comments: {
    js: {
      options: {
        singleline: true,
        multiline: true,
      },
      src: [ 'dist/*.js' ]
    },
  },
  exec: {
    all: {
      cmd: 'node ./build.js "*"'
    },
    getownpropertynames: {
      cmd: 'node ./build.js "es5:object:getownpropertynames"'
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
        urls: testUrls
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
        'exec:all',
        '_mochaTests',
      ],
    },
  },
  'saucelabs-mocha': {
    oneoff: {
      options: {
        urls: [ DEV_HOST + TEST_PATH + '/index.html' ],
        tunnelTimeout: 5,
        browsers: [ { platform: 'Windows 7', browserName: 'internet explorer', version: '11' } ],
        testname: 'one off test',
      }
    },
    browsers: {
      options: {
        urls: [ DEV_HOST + TEST_PATH + '/index.html' ],
        tunnelTimeout: 5,
        build: '<%= grunt.template.today("isoDateTime") %>',
        browsers: popularBrowsers,
        testname: 'popular browsers',
        maxRetries: 2,
        tags: ['master']
      }
    },
    release: {
      options: {
        urls: [ DEV_HOST + TEST_PATH + '/index.html' ],
        tunnelTimeout: 5,
        build: '<%= grunt.template.today("isoDateTime") %>',
        browsers: browsers,
        testname: 'release candiate: <%= releaseVer %>',
        maxRetries: 2,
        // tags: ['master']
      }
    },
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
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-remove-logging');
  grunt.loadNpmTasks('grunt-saucelabs');
  grunt.loadNpmTasks('grunt-stripcomments');
  grunt.loadNpmTasks('grunt-text-replace');

  gruntConfig.bower = grunt.file.readJSON('bower.json');
  gruntConfig.releaseVer = gruntConfig.bower.version + '-RC';

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
    'concat',
    'replace',
    'comments',
    'uglify',
  ]);

  grunt.registerTask('test', [
    'build',
    'exec:all',
    'connect',
    '_mochaTests',
  ]);

  grunt.registerTask('test:oneoff', [
    'test',
    'saucelabs-mocha:oneoff',
  ]);

  grunt.registerTask('test:browsers', [
    'test',
    'saucelabs-mocha:browsers',
  ]);

  grunt.registerTask('test:release', [
    'test',
    'saucelabs-mocha:release',
  ]);

  grunt.registerTask('dev', [
    'jshint',
    'connect',
    'watch'
  ]);
};
