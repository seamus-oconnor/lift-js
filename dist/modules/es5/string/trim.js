/*!
* LiftJS Javascript Library v0.2.5
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";

  if(String.prototype.trim) { return false; }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim

  var space = " \f\n\r\t\\u000B\\u00A0\\u1680​\\u180e\\u2000​\\u2001\\u2002​\\u2003\\u2004​" +
    "\\u2005\\u2006​\\u2007\\u2008​\\u2009\\u200a​\\u2028\\u2029​​\\u202f\\u205f​\\u3000\\uFEFF";

  var TRIM_RE = new RegExp('^[' + space + ']+|[' + space + ']+$', 'g');
  String.prototype.trim = function shimStringTrim() {
    return this.replace(TRIM_RE, '');
  };

  return true;
});
