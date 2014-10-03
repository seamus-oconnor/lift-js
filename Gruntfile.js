/* jshint node:true */

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    },
    mocha: {
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
        files: ['src/builder.js', 'tests/spec/build_spec.js', 'tests/*.html'],
        tasks: ['test'],
      },
    },
  });

  grunt.registerTask('test', [
    // 'build',
    'mochaTest',
    'mocha',
  ]);
};

