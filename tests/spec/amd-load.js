/*global require*/

describe("lift.js", function() {
  it("should have loaded", function(done) {
    require(['liftjs'], function(liftjs) {
      expect(liftjs).to.be.ok();
      expect(liftjs).to.only.have.keys('reqs', 'browser', 'support');
      done();
    });
  });
});
