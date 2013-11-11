define(function() {
  "use strict";

  var domloaded = document.readyState === 'complete';

  function fireDOMContentLoadedEvent() {
    if(domloaded) return;

    domloaded = true;

    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('DOMContentLoaded', true, false);
    document.dispatchEvent(evt);
  }

  // IE 8 doesn't support addEventListener but that is ok since
  // attachEvent('onDOMContentLoaded', ...) wouldn't work anyways.
  if(document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function() {
      domloaded = true;
    }, false);
  }

  // We can test the ready state of the document and fire a DOMContentLoaded
  function testReadyState() {
    if(document.readyState === 'complete') {
      fireDOMContentLoadedEvent();
    }
  }

  document.onreadystatechange = testReadyState;
  // testReadyState();

  return true;
});
