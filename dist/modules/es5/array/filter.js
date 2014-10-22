/*!
* LiftJS Javascript Library v0.1.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*
* Build Date: Wednesday, October 22nd, 2014, 10:23:36 PM
*/


define(function() {
  "use strict";
  return Array.prototype.filter ? !1 : (Array.prototype.filter = function(fun) {
    if (!this) throw new TypeError("this is null or not defined");
    {
      var objects = Object(this);
      objects.length >>> 0;
    }
    if ("function" != typeof fun) throw new TypeError();
    var res = [], thisp = arguments[1];
    for (var i in objects) objects.hasOwnProperty(i) && fun.call(thisp, objects[i], i, objects) && res.push(objects[i]);
    return res;
  }, !0);
});