describe("Array.prototype.every", function() {
  function isBigEnough(element, index, array) {
    return element >= 10;
  }

  it("should exist", function() {
    expect(Array.prototype.every).to.be.a('function');
  });

  it("should pass", function() {
    expect([12, 54, 18, 130, 44].every(isBigEnough)).to.be(true);
  });

  it("should fail", function() {
    expect([12, 5, 8, 130, 44].every(isBigEnough)).to.be(false);
  });
});
