describe("lift.js", function() {
  var liftjs;

  beforeEach(function(done) {
    require(['liftjs'], function(_liftjs) {
      liftjs = _liftjs;
      done();
    });
  });

  it("should have loaded", function() {
    expect(liftjs).to.be.ok();
    expect(liftjs).to.only.have.keys('reqs', 'browser', 'support');
  });
});
