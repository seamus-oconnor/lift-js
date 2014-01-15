define(function() {
  "use strict";

  if(document.getElementsByClassName) return false;

  // TODO: Implement fallback that doesn't depend on .querySelectorAll()

  // IE 8 doesn't have getElementsByClassName but we can just use
  // querySelectorAll instead.
  function shimGetElementsByClassName(names) {
    /*jshint validthis:true */

    var classes = (names + '').replace(/^\s+|\s+$/g, '').split(/\s+/);

    if(classes.length > 0) {
      return this.querySelectorAll('.' + classes.join('.'));
    }

    // Return empty NodeList
    return document.createElement('div').getElementsByTagName('*');
  }

  document.getElementsByClassName = shimGetElementsByClassName;
  Element.prototype.getElementsByClassName = shimGetElementsByClassName;

  return true;
});
