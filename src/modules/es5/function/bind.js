define(function() {
  "use strict";

  if(Function.prototype.bind) return false;

  // Oringally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("this must be callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1);
    var fToBind = this;
    var NoOp = function () {};
    var fBound = function () {
      return fToBind.apply(this instanceof NoOp && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
    };

    NoOp.prototype = this.prototype;
    fBound.prototype = new NoOp();

    return fBound;
  };

  return true;
});
