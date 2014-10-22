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
  function InvalidCharacterError(message) {
    this.message = message;
  }
  if (window.atob && window.btoa) return !1;
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  return InvalidCharacterError.prototype = new Error(), InvalidCharacterError.prototype.name = "InvalidCharacterError", 
  window.btoa || (window.btoa = function(input) {
    for (var block, charCode, idx = 0, map = chars, output = ""; input.charAt(0 | idx) || (map = "=", 
    idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
      if (charCode = input.charCodeAt(idx += .75), charCode > 255) throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      block = block << 8 | charCode;
    }
    return output;
  }), window.atob || (window.atob = function(input) {
    if (input = input.replace(/=+$/, ""), input.length % 4 == 1) throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    for (var bs, buffer, bc = 0, idx = 0, output = ""; buffer = input.charAt(idx++); ~buffer && (bs = bc % 4 ? 64 * bs + buffer : buffer, 
    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) buffer = chars.indexOf(buffer);
    return output;
  }), !0;
}());