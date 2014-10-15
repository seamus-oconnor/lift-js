define(function() {
  "use strict";

  /*global SVGElement*/

  var div = document.createElement('div');
  div.innerHTML = '<svg></svg>';
  var svg = div.firstChild;

  if(svg && ('classList' in svg)) { return false; }

  function initDOMTokenListPolyFill() {
    function _argumentsToClasses(args) {
      var classes = {};
      Array.prototype.forEach.call(args, function _processArgs(arg) {
        if (Array.isArray(arg)) {
          arg.forEach(function _processArrayOfArgs(arrayArg) {
            classes[arrayArg] = null;
          });
        }
        else {
          classes[arg] = null;
        }
      });
      return Object.freeze(classes);
    }

    Object.defineProperties(window.DOMTokenList.prototype, {
      addAll: {
        value: function addAll() {
          var classes = _argumentsToClasses(arguments)
          for (var i in classes) {
            this.add(i);
          }
        }
      },
      removeAll: {
        value: function removeAll() {
          var classes = _argumentsToClasses(arguments)
          for (var i in classes) {
            this.remove(i);
          }
        }
      },
      containsAny: {
        value: function containsAny() {
          var classes = _argumentsToClasses(arguments);
          for (var i in classes) {
            if (this.contains(i)) {
              return true;
            }
          }
        }
      },
      containsAll: {
        value: function containsAll() {
          var classes = _argumentsToClasses(arguments);
          for (var i in classes) {
            if (!this.contains(i)) {
              return false;
            }
          }
          return true;
        }
      }
    });
  }

  var classListGetter = (function() {
    if(Object.getOwnPropertyDescriptor) {
      // IE <= 10 test
      var clpd = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'classList');
      if(clpd) {
        return clpd.get;
      }

      // Old Chrome test
      clpd = Object.getOwnPropertyDescriptor(div, 'classList');
      if(clpd) {
        return clpd.value;
      }
    }
    // TODO: Could this work as a fallback?
    // } else if(div.__lookupGetter__) {
    //   classListGetter = div.__lookupGetter__('classList');
    // }
  })();

  if(classListGetter) {
    var svgProto = SVGElement.prototype;

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
  }

  return false;
});
