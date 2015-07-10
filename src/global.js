/*global require*/

(function() {
  var currentScript = document.currentScript;

  if(!currentScript) {
    var scripts = document.getElementsByTagName('script');
    currentScript = scripts[scripts.length - 1]; // most likely the last script

    for(var i = scripts.length - 1; i >= 0; i--) {
      var script = scripts[i];
      if(script.readyState === 'interactive') {
        currentScript = script;
      }
    }
  }

  // If there still is no currentScript then just try to load bundles and
  // modules relative to the current URL.
  var baseUrl = currentScript ? currentScript.src + '-/../' : './';

  require.config({
    baseUrl: baseUrl
  });

  require(['liftjs'], function() {
    if(typeof define.destroy === 'function') {
      define.destroy();
    }

    // setTimeout(function() {
    window.LiftJS.ready = true;
    if(typeof window.LiftJS.onload === 'function') {
      window.LiftJS.onload();
    }
    // }, 1000);
  });
})();
