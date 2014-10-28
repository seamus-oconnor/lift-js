describe("DOM Element #addEventListeners", function() {
  var wasteland;

  beforeEach(function() {
    wasteland = document.createElement('div');
    document.getElementById('wasteland').innerHTML = '';
    document.getElementById('wasteland').appendChild(wasteland);
  });

  it("should catch a click event", function(done) {
    var anchor = document.createElement('a');
    anchor.addEventListener('click', function(e) {
      expect(e.button).to.be(0);
      done();
    }, false);
    wasteland.appendChild(anchor);
    var evt = document.createEvent('MouseEvent');
    var canBubble = false;
    var cancelable = false;
    var view = window;
    var detail = 1;
    var screenX = 0;
    var screenY = 0;
    var clientX = 0;
    var clientY = 0;
    var ctrlKey = false;
    var altKey = false;
    var shiftKey = false;
    var metaKey = false;
    var button = 0;
    var relatedTarget = null;
    evt.initMouseEvent('click', canBubble, cancelable, view, detail, screenX,
      screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button,
      relatedTarget);
    anchor.dispatchEvent(evt);
  });

  it("should support event constructors", function(done) {
    var anchor = document.createElement('a');
    anchor.addEventListener('click', function() { done(); }, false);
    wasteland.appendChild(anchor);
    var evt = new window.MouseEvent('click');
    anchor.dispatchEvent(evt);
  });

  it("should catch a custom event", function(done) {
    var div = document.createElement('div');
    wasteland.appendChild(div);
    div.addEventListener('custom', function(e) {
      expect(e.detail).to.be('foobar');
      done();
    }, false);
    var evt = new CustomEvent('custom', { detail: 'foobar' });
    div.dispatchEvent(evt);
  });
});
