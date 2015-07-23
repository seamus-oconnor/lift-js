/*!
* LiftJS Javascript Library v0.2.6
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  if(Number.isFinite) { return false; }

  Number.isFinite = function shimNumberIsFinite(val) {
    if(typeof val !== 'number') { return false; }

    return isFinite(val);
  };

  return true;
});
