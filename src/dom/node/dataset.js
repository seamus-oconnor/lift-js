define(function() {
  "use strict";

  var test = document.createElement('div');

  if('dataset' in test) return false;

  // TODO:
  // http://johndyer.name/native-browser-get-set-properties-in-javascript/

  function toString() {
    return '[object DOMStringMap]';
  }

  function LiveDataset() {}
  LiveDataset.prototype.toString = toString;

  function forEach(arr, cb) {
    for(var i = 0; i < arr.length; i++) {
      var item = arr[i];

      cb.call(null, item);
    }
  }

  function defProp(obj, name, properties) {
    if(Object.defineProperty) {
      Object.defineProperty(obj, name, properties);
    } else {
      if('get' in properties) {
        obj.__defineGetter__(name, properties.get);
      }
      if('set' in properties) {
        obj.__defineSetter__(name, properties.set);
      }
    }
  }

  function getDatasetObject(el) {
    var obj = null;
    try { // simulate DOMStringMap w/accessor support
      ({}).__defineGetter__("test", function(){}); // test setting accessor on normal object
      obj = new LiveDataset();
    } catch(e) {
      obj = document.createElement("div");  // use a DOM object for IE8
      obj.toString = toString;
    }

    function replaceFn(m) {
      return m.charAt(1).toUpperCase();
    }

    forEach(el.attributes, function(attr) {
      if(/^data-\w[\w-]*$/.test(attr.name)) {
        var name = attr.name.substr(5).replace(/-./, replaceFn);

        var property = {
          enumerable: true,
          get: function() {
            return attr.value;
          },

          set: function(val) {
            attr.value = val;
          }
        };

        try {
          defProp(obj, name, property);
        } catch(e) { // try to define with enumerable: true
          delete property.enumerable; // if the above fails then delete the enumerable: true property
          defProp(obj, name, property);
        }
      }
    });

    return obj;
  }

  try {
    defProp(Element.prototype, 'dataset', {
      get: function() {
        return getDatasetObject(this);
      }
    });
  } catch(e) {
    console.warn('No support for element.datalist in this browser');
  }

  return true;
});
