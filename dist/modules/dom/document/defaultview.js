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

  if(document.defaultView) { return false; }

  // IE <= 9 supports document.parentWindow. Everyone else supports
  // document.defaultView.
	document.defaultView = document.parentWindow;

  return true;
});
