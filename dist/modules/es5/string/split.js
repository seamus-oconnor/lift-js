/*!
* LiftJS Javascript Library v0.2.6
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";

  var compliantExecNpcg = /()??/.exec('')[1] === undefined; // NPCG: nonparticipating capturing group

  if(compliantExecNpcg) { return false; }

  // Originally From:
  // http://blog.stevenlevithan.com/archives/cross-browser-split

  /*!
   * Cross-Browser Split 1.1.1
   * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
   * Available under the MIT License
   * ECMAScript compliant, uniform cross-browser split method
   */

  /**
   * Splits a string into an array of strings using a regex or string separator. Matches of the
   * separator are not included in the result array. However, if `separator` is a regex that contains
   * capturing groups, backreferences are spliced into the result each time `separator` is matched.
   * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
   * cross-browser.
   * @param {String} str String to split.
   * @param {RegExp|String} separator Regex or string to use for separating the string.
   * @param {Number} [limit] Maximum number of items to include in the result array.
   * @returns {Array} Array of substrings.
   * @example
   *
   * // Basic use
   * split('a b c d', ' ');
   * // -> ['a', 'b', 'c', 'd']
   *
   * // With limit
   * split('a b c d', ' ', 2);
   * // -> ['a', 'b']
   *
   * // Backreferences in result array
   * split('..word1 word2..', /([a-z]+)(\d+)/i);
   * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
   */

  var nativeSplit = String.prototype.split;

  function shimSplit(separator, limit) {
    /*jshint validthis:true */

    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== '[object RegExp]') {
      return nativeSplit.call(this, separator, limit);
    }

    var output = [];
    var flags = (separator.ignoreCase ? 'i' : '') +
              (separator.multiline  ? 'm' : '') +
              (separator.extended   ? 'x' : '') + // Proposed for ES6
              (separator.sticky     ? 'y' : ''); // Firefox 3+
    var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
    separator = new RegExp(separator.source, flags + 'g');
    var separator2, match, lastIndex, lastLength;
    // this += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    /*jshint bitwise:false, boss:true, loopfunc:true*/
    limit = limit === undefined ?
      -1 >>> 0 : // Math.pow(2, 32) - 1
      limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(this)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(this.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function () {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undefined) {
                match[i] = undefined;
              }
            }
          });
        }
        if (match.length > 1 && match.index < this.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === this.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(this.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  }

  // For convenience
  String.prototype.split = shimSplit;

  return true;
});
