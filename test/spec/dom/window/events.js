describe("DOM Element #addEventListeners", function() {
  it("should catch click event", function(done) {
    var a = document.createElement('a');
    a.addEventListener('click', function() { done(); }, false);
    var evt = new MouseEvent('click');
    a.dispatchEvent(evt);
  });

  it("should catch a custom event", function(done) {
    var div = document.createElement('div');
    div.addEventListener('custom', function() { done(); }, false);
    var evt = new CustomEvent('custom');
    div.dispatchEvent(evt);
  });
});
