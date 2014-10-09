/* jshint node:true */

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  grunt.initConfig({
    exec: {
      // build: 'node ./build.js "es5/object/getownpropertynames"'
      build: 'node ./build.js "*"'
    },
    mocha: {
      options: {
        log: true,
        logErrors: true,
        run: false,
      },
      test: {
        src: ['tests/*.html']
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
        tasks: ['test'],
      },
    },
  });

  grunt.registerTask('test', [
    'build',
    'mochaTest',
    'mocha',
  ]);

  grunt.registerTask('build', [
    'exec'
  ]);
};

