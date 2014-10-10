define(function() {
  "use strict";

  /*global SVGElement*/

  var div = document.createElement('div');
  div.innerHTML = '<svg></svg>';
  var svg = div.firstChild;

  if(svg && ('classList' in svg)) { return false; }

  var svgProto = SVGElement.prototype;
  var classListGetter;

  if(Object.getOwnPropertyDescriptor) {
    var classListPropDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'classList');
    classListGetter = classListPropDescriptor.get;
  } else if(div.__lookupGetter__) {
    classListGetter = div.__lookupGetter__('classList');
  }

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
