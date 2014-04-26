describe("DOM Element #addEventListeners", function() {
  it("should catch click event", function(done) {
    var input = document.createElement('a');
    input.type = 'checkbox';
    input.addEventListener('click', function() { done(); }, false);
    wasteland.appendChild(input);
    var evt = new MouseEvent('click');
    input.dispatchEvent(evt);
  });

  it("should catch a custom event", function(done) {
    var div = document.createElement('div');
    div.addEventListener('custom', function(e) {
      expect(e.detail).to.be('foobar');
      done();
    }, false);
    var evt = new CustomEvent('custom', { detail: 'foobar' });
    div.dispatchEvent(evt);
  });
});
