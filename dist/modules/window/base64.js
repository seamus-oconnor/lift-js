/*!
* LiftJS Javascript Library v0.2.3
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  function InvalidCharacterError(message) {
    this.message = message;
  }
  function base64encode(str) {
    var out, i, len, c1, c2, c3;
    for (len = str.length, i = 0, out = ""; len > i; ) {
      if (c1 = str.charCodeAt(i++), c1 > 255) throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      if (i === len) {
        out += base64EncodeChars.charAt(c1 >> 2), out += base64EncodeChars.charAt((3 & c1) << 4), 
        out += "==";
        break;
      }
      if (c2 = str.charCodeAt(i++), i === len) {
        out += base64EncodeChars.charAt(c1 >> 2), out += base64EncodeChars.charAt((3 & c1) << 4 | (240 & c2) >> 4), 
        out += base64EncodeChars.charAt((15 & c2) << 2), out += "=";
        break;
      }
      c3 = str.charCodeAt(i++), out += base64EncodeChars.charAt(c1 >> 2), out += base64EncodeChars.charAt((3 & c1) << 4 | (240 & c2) >> 4), 
      out += base64EncodeChars.charAt((15 & c2) << 2 | (192 & c3) >> 6), out += base64EncodeChars.charAt(63 & c3);
    }
    return out;
  }
  function base64decode(str) {
    var c1, c2, c3, c4;
    str = str.replace(/=+$/, "");
    var len = str.length;
    if (len % 4 === 1) throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    for (var i = 0, out = ""; len > i; ) {
      do c1 = base64DecodeChars[255 & str.charCodeAt(i++)]; while (len > i && -1 === c1);
      if (-1 === c1) break;
      do c2 = base64DecodeChars[255 & str.charCodeAt(i++)]; while (len > i && -1 === c2);
      if (-1 === c2) break;
      out += String.fromCharCode(c1 << 2 | (48 & c2) >> 4);
      do {
        if (c3 = 255 & str.charCodeAt(i++), 61 === c3) return out;
        c3 = base64DecodeChars[c3];
      } while (len > i && -1 === c3);
      if (-1 === c3) break;
      out += String.fromCharCode((15 & c2) << 4 | (60 & c3) >> 2);
      do {
        if (c4 = 255 & str.charCodeAt(i++), 61 === c4) return out;
        c4 = base64DecodeChars[c4];
      } while (len > i && -1 === c4);
      if (-1 === c4) break;
      out += String.fromCharCode((3 & c3) << 6 | c4);
    }
    return out;
  }
  if (window.atob && window.btoa) return !1;
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
  return InvalidCharacterError.prototype = new Error(), InvalidCharacterError.prototype.name = "InvalidCharacterError", 
  window.btoa || (window.btoa = base64encode), window.atob || (window.atob = base64decode), 
  !0;
});