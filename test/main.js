(function() {
  curl.config({
    apiName: 'require',
    // preloads: ['liftjs'],
    baseUrl: '',
    paths: {
      local: './',
      bundle: 'js/lib/liftjs/bundles',
    },
    packages: {
      liftjs: {
        location: 'js/lib/liftjs',
        main: 'lift'
      }
    }
  });

  // require(['local/module'], function(mod) {
  //   mod.hi('testing');
  // });

  require(['liftjs'], function(liftjs) {
    console.log(liftjs);
  });
})();
