describe("no AMD", function() {
  it("should have created window.LiftJS", function() {
    expect(window.LiftJS).to.be.ok();
  });

  it("should have loaded", function(done) {
    if(!LiftJS.ready) {
      LiftJS.onload = function() {
        expect(LiftJS.ready).to.be(true);
        done();
      };
    }
  });
});
