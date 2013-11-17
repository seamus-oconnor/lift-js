define(function() {
  "use strict";

  if(document.defaultView) return false;

  // IE <= 9 supports document.parentWindow. Everyone else supports
  // document.defaultView.
	document.defaultView = document.parentWindow;

  return true;
});
