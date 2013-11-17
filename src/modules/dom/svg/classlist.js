(function() {
  "use strict";

  var div = document.createElement('div');
  div.innerHTML = '<svg></svg>';
  var svg = div.firstChild;
  var deps = svg && ('classList' in svg) ? [] : ['../node/classlist'];

  define(deps, function(classlist) {
    return classlist;
  });
})();
