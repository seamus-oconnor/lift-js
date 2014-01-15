(function() {
  "use strict";

  var div = document.createElement('div');
  div.innerHTML = '<svg></svg>';
  var svg = div.firstChild;
  var deps = svg && ('children' in svg) ? [] : ['../node/children'];

  define(deps, function(children) {
    return children;
  });
})();
