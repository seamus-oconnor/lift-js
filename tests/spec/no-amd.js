describe("no AMD", function() {
  it("should have created window.LiftJS", function() {
    expect(window.LiftJS).to.be.ok();
  });

  it("should have loaded", function(done) {
    function loaded() {
      expect(LiftJS.ready).to.be(true);
      done();
    }
    if(LiftJS.ready) {
      loaded();
    } else {
      LiftJS.onload = loaded;
    }
  });
});
