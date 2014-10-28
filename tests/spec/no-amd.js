describe("no AMD", function() {
  it("should have created window.LiftJS", function() {
    expect(window.LiftJS).to.be.ok();
  });

  it("should have loaded", function(done) {
    function loaded() {
      expect(window.LiftJS.ready).to.be(true);
      done();
    }
    if(window.LiftJS.ready) {
      loaded();
    } else {
      window.LiftJS.onload = loaded;
    }
  });
});
