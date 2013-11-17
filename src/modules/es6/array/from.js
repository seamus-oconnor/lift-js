define(['../../es5/array/map'], function() {
  "use strict";

  if(Array.from) return false;

  // Copied from: https://github.com/monolithed/ECMAScript-6/blob/master/ES6.js
  Array.from = function shimArrayFrom(object, callback, context) {
    return Array.prototype.map.call(object, typeof callback == 'function' ? callback : function(item) {
      return item;
    }, context);
  };

  return true;
});
