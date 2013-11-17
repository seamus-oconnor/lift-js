define(function() {
  if(Number.isFinite) return false;

  Number.isFinite = function shimNumberIsFinite(val) {
    if(typeof val !== "number") return false;

    return isFinite(val);
  };

  return true;
});
