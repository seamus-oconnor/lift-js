(function() {
  curl.config({
    apiName: 'require',
    baseUrl: './',
    paths: {
      local: './',
      build: '../build',
      bundle: '../build/bundles',
      lib: '../src/'
    },
    preloads: ['build/lift'],
    packages: {
      liftjs: {
        location: '../build/',
        main: 'lift'
      }
    }
  });

  require(['local/module'], function(mod) {
    mod.hi('testing');
  });

  require(['bundle/ie-9.0'], function() {
    require(['liftjs/modules/es5/object/create'], function(result) {
      console.log(result);
    });
  });
})();
