describe("String.prototype.repeat", function() {
  it("should exist", function() {
    expect(String.prototype.repeat).to.be.a('function');
  });

  it("should work", function() {
    expect("foo".repeat(0)).to.eql("");
    expect("foo".repeat(2)).to.eql("foofoo");
    expect("foo".repeat(5)).to.eql("foofoofoofoofoo");
  });

  it("should throw an exception", function() {
    expect("foo".repeat).withArgs(-1).to.throwException();
    expect("foo".repeat).withArgs(Infinity).to.throwException();
  });
});
