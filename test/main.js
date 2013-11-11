(function() {
  var deps = [];

  curl.config({
    baseUrl: './',
    paths: {
      my: './',
      bundle: '../build/bundles',
      lib: '../src/'
    },
    preloads: ['lib/lift']
  });

  curl(['my/module'], function(mod) {
    // assert(true);

    // mod.hi('test');
  });
})();
