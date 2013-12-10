describe("DOM Element #transitionEnd", function() {
  var prefixes = ['msT', 'WebkitT', 'OT', 'MozT', 't'];
  it("should fire transitionEnd", function(done) {
    var a = document.createElement('a');
    a.style.color = 'black';
    for (var i = prefixes.length - 1; i >= 0; i--) {
      a.style[prefixes[i] + 'ransition'] = '10ms color';
    }
    a.addEventListener('transitionend', function() {
      done();
    }, false);
    document.body.appendChild(a);
    document.body.offsetTop; // flush layout
    a.style.color = 'white';
    setTimeout(function() { document.body.removeChild(a); }, 100);
  });
});
