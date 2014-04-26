describe("String.prototype.toArray", function() {
  it("should exist", function() {
    expect(String.prototype.toArray).to.be.a('function');
  });

  it("should turn into an array", function() {
    expect("foobarbaz".toArray()).to.be.an(Array);
    expect("foobarbaz".toArray()).to.eql(["f", "o", "o", "b", "a", "r", "b", "a", "z"]);
  });
});
