/*!
* LiftJS Javascript Library v0.1.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  function shimSplit(separator, limit) {
    if ("[object RegExp]" !== Object.prototype.toString.call(separator)) return nativeSplit.call(this, separator, limit);
    var output = [], flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + (separator.sticky ? "y" : ""), lastLastIndex = 0;
    separator = new RegExp(separator.source, flags + "g");
    var separator2, match, lastIndex, lastLength;
    for (compliantExecNpcg || (separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags)), 
    limit = limit === undef ? -1 >>> 0 : limit >>> 0; (match = separator.exec(this)) && (lastIndex = match.index + match[0].length, 
    !(lastIndex > lastLastIndex && (output.push(this.slice(lastLastIndex, match.index)), 
    !compliantExecNpcg && match.length > 1 && match[0].replace(separator2, function() {
      for (var i = 1; i < arguments.length - 2; i++) arguments[i] === undef && (match[i] = undef);
    }), match.length > 1 && match.index < this.length && Array.prototype.push.apply(output, match.slice(1)), 
    lastLength = match[0].length, lastLastIndex = lastIndex, output.length >= limit))); ) separator.lastIndex === match.index && separator.lastIndex++;
    return lastLastIndex === this.length ? (lastLength || !separator.test("")) && output.push("") : output.push(this.slice(lastLastIndex)), 
    output.length > limit ? output.slice(0, limit) : output;
  }
  var compliantExecNpcg = void 0 === /()??/.exec("")[1];
  if (compliantExecNpcg) return !1;
  /*!
   * Cross-Browser Split 1.1.1
   * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
   * Available under the MIT License
   * ECMAScript compliant, uniform cross-browser split method
   */
  var nativeSplit = String.prototype.split;
  return String.prototype.split = shimSplit, !0;
});