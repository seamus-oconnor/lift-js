/*!
* LiftJS Javascript Library v0.2.0
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  if ("onhashchange" in window) return !1;
  var location = window.location, oldURL = location.href, oldHash = location.hash;
  return setInterval(function() {
    var newURL = location.href, newHash = location.hash;
    newHash !== oldHash && "function" == typeof window.onhashchange && (window.onhashchange({
      type: "hashchange",
      oldURL: oldURL,
      newURL: newURL
    }), oldURL = newURL, oldHash = newHash);
  }, 100), !0;
});