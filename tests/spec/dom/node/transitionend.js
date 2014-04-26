describe("DOM Element #transitionEnd", function() {
  var support = false;
  var prefixes = ['msT', 'WebkitT', 'OT', 'MozT', 't'];
  var div = document.createElement('a');
  for(var i = prefixes.length - 1; i >= 0; i--) {
    if((prefixes[i] + 'ransition') in div.style) {
      support = true;
    }
  }

  if(support) {
    it("should fire transitionEnd", function(done) {
      var a = document.createElement('a');
      a.style.color = 'black';
      for(var i = prefixes.length - 1; i >= 0; i--) {
        a.style[prefixes[i] + 'ransition'] = '10ms color';
      }
      a.addEventListener('transitionend', function() {
        done();
      }, false);
      wasteland.appendChild(a);
      document.body.offsetTop; // flush layout
      a.style.color = 'white';
    });
  } else {
    it("doesn't support CSS transitions", function() {
    });
  }

});
