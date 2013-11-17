define(function() {
  "use strict";

  /*
   * classList.js: Cross-browser full element.classList implementation.
   * 2012-11-15
   *
   * By Eli Grey, http://eligrey.com
   * Public Domain.
   * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
   */

  /*global self, document, DOMException */

  /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
  // NOTE: Heavily modified from above to work with the rest of lift JS.

  var div = document.createElement('div');
  div.innerHTML = '<svg></svg>';
  var svg = div.firstChild;

  if(('classList' in div) && svg && ('classList' in svg)) return false;

  var strTrim = String.prototype.trim || function() {
    return this.replace(/^\s+|\s+$/g, '');
  };
  var arrIndexOf = Array.prototype.indexOf || function(item) {
    for(var i = 0; i < this.length; i++) {
      if(i in this && this[i] === item) {
        return i;
      }
    }
    return -1;
  };

  // Vendors: please allow content code to instantiate DOMExceptions
  function DOMEx(type, message) {
    this.name = type;
    this.code = DOMException[type];
    this.message = message;
  }
  // Most DOMException implementations don't allow calling DOMException's toString()
  // on non-DOMExceptions. Error's toString() is sufficient here.
  DOMEx.prototype = Error.prototype;

  function ClassList(elem) {
    var classes = strTrim.call(elem.className).split(/\s+/);
    var self = this;

    function checkTokenAndGetIndex(token) {
      if(token === '') {
        throw new DOMEx('SYNTAX_ERR', "An invalid or illegal string was specified");
      }
      if(/\s/.test(token)) {
        throw new DOMEx('INVALID_CHARACTER_ERR', "String contains an invalid character");
      }
      return arrIndexOf.call(classes, token);
    }

    function updateClassName() {
      elem.className = self.toString();
    }

    this.item = function(i) {
      return classes[i] || null;
    };

    this.contains = function contains(token) {
      return checkTokenAndGetIndex(token + '') !== -1;
    };

    this.add = function() {
      var i = 0, updated = false;
      var l = arguments.length;

      do {
        var token = arguments[i];

        if(checkTokenAndGetIndex(token) === -1) {
          classes.push(token + '');
          updated = true;
        }
      } while(++i < l);

      if(updated) {
        updateClassName();
      }
    };

    this.remove = function() {
      var i = 0, updated = false;
      var l = arguments.length;

      do {
        var index = checkTokenAndGetIndex(arguments[i]);

        if(index !== -1) {
          classes.splice(index, 1);
          updated = true;
        }
      } while(++i < l);

      if(updated) {
        updateClassName();
      }
    };

    this.toggle = function(token, force) {
      token += '';

      var result = self.contains(token);
      var method = result ? force !== true && 'remove' : force !== false && 'add';

      if(method) {
        self[method](token);
      }

      return !result;
    };

    this.toString = function() {
      return classes.join(' ');
    };
  }

  function classListGetter() {
    /*jshint validthis:true */
    return new ClassList(this);
  }

  var elemCtrProto = Element.prototype;
  if(Object.defineProperty) {
    var classListPropDesc = {
      get: classListGetter,
      enumerable: true,
      configurable: true
    };

    try {
      Object.defineProperty(elemCtrProto, 'classList', classListPropDesc);
    } catch(ex) { // IE 8 doesn't support enumerable:true
      if(ex.number === -0x7FF5EC54) {
        classListPropDesc.enumerable = false;
        Object.defineProperty(elemCtrProto, 'classList', classListPropDesc);
      }
    }
  } else if(Object.prototype.__defineGetter__) {
    elemCtrProto.__defineGetter__('classList', classListGetter);
  }

  return true;
});
