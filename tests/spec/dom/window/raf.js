describe("window #requestAnimationFrame", function() {
  it("should to exist", function() {
    expect(window.requestAnimationFrame).to.be.ok();
  });

  it("should fire an event", function(done) {
    window.requestAnimationFrame(function() {
      done();
    });
  });

  it("should fire only once", function(done) {
    var once = false;
    function callback() {
      expect(once).to.be(false);
      once = true;
    }
    window.requestAnimationFrame(callback);
    setTimeout(function() {
      expect(once).to.be(true);
      done();
    }, 100);
  });

  it("should be cancelable", function(done) {
    function frame() {
      expect().fail("Shouldn't get here");
    }
    var timer = window.requestAnimationFrame(frame);
    window.cancelAnimationFrame(timer);

    setTimeout(function() {
      done();
    }, 50);
  });
});
