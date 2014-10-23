describe("Array.prototype.every", function() {
  function isBigEnough(item/*, i, arr*/) {
    return item >= 10;
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

  it("should have the correct index", function() {
    [0,1,2,3,4,5,6].every(function(item, i/*, arr*/) {
      expect(item).to.be(i);
    });
  });

  it("should pass a reference to the original array", function() {
    var original = [0,1,2,3,4,5,6];
    original.every(function(item, i, arr) {
      expect(arr).to.be(original);
    });
  });

  it("should have the correct context", function() {
    var obj = { foo: 'bar' };
    [1].every(function() {
      expect(this).to.be(obj);
    }, obj);
  });
});
