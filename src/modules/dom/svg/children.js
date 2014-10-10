define(function() {
  "use strict";

  var div = document.createElement('div');

  if('children' in div) { return false; }

  if(Object.defineProperty) {
    var classListPropDesc = {
      get: function() {
        return classListGetter.call(this);
      },
      enumerable: true,
      configurable: true
    };

    try {
      Object.defineProperty(svgProto, 'classList', classListPropDesc);
    } catch(ex) { // IE 8 doesn't support enumerable:true
      if(ex.number === -0x7FF5EC54) {
        classListPropDesc.enumerable = false;
        Object.defineProperty(svgProto, 'classList', classListPropDesc);
      }
    }
  } else if(Object.prototype.__defineGetter__) {
    svgProto.__defineGetter__('classList', classListGetter);
  }

  return true;
});
