/*!
* LiftJS Javascript Library v0.2.5
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


/*jshint bitwise:false*/

define(function() {
  "use strict";

  if(String.prototype.repeat) { return false; }

  // Copied from: https://github.com/monolithed/ECMAScript-6/blob/master/ES6.js
  String.prototype.repeat = function shimStringRepeat(count) {
    // Added check for Infinity
    if(count === Infinity) {
      throw new RangeError("repeat count must be less than infinity and not overflow maximum string size");
    }

    // NOTE: changed to be < 0 to match FF's 'foo'.repeat(0) == ''
    if((count |= 0 ) < 0) {
      throw new RangeError("repeat count must be non-negative");
    }

    var result = '';
    var self = this;

    while(count) {
      if(count & 1) {
        result += self;
      }

      if(count >>= 1) {
        self += self;
      }
    }

    return result;
  };

  return true;
});
