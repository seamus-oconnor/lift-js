define(function() {
  "use strict";

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/Reference/Events/hashchange
  if('onhashchange' in window) return false;

  var location = window.location;
  var oldURL = location.href;
  var oldHash = location.hash;

  // check the location hash on a 100ms interval
  setInterval(function() {
    var newURL = location.href;
    var newHash = location.hash;

    // if the hash has changed and a handler has been bound...
    if(newHash != oldHash && typeof window.onhashchange === "function") {
      // execute the handler
      window.onhashchange({
        type: "hashchange",
        oldURL: oldURL,
        newURL: newURL
      });

      oldURL = newURL;
      oldHash = newHash;
    }
  }, 100);

  return true;
});
