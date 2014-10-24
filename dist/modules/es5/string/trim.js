/*!
* LiftJS Javascript Library v0.2.1
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  if (String.prototype.trim) return !1;
  var space = " \f\n\r	\\u000B\\u00A0\\u1680\u200b\\u180e\\u2000\u200b\\u2001\\u2002\u200b\\u2003\\u2004\u200b\\u2005\\u2006\u200b\\u2007\\u2008\u200b\\u2009\\u200a\u200b\\u2028\\u2029\u200b\u200b\\u202f\\u205f\u200b\\u3000\\uFEFF", TRIM_RE = new RegExp("^[" + space + "]+|[" + space + "]+$", "g");
  return String.prototype.trim = function() {
    return this.replace(TRIM_RE, "");
  }, !0;
});