describe("Array.prototype.some", function() {
  function isBigEnough(item, i, arr) {
    return item >= 10;
  }

  it("should exist", function() {
    expect(Array.prototype.some).to.be.a('function');
  });

  it("should pass", function() {
    expect([12, 1, 18, 2, 44].some(isBigEnough)).to.be(true);
  });

  it("should fail", function() {
    expect([0, 2, -1, 3, 5].some(isBigEnough)).to.be(false);
  });

  it("should have the correct index", function() {
    [0,1,2,3,4,5,6].some(function(item, i, arr) {
      expect(item).to.be(i);
    });
  });

  it("should pass a reference to the original array", function() {
    var original = [0,1,2,3,4,5,6];
    original.some(function(item, i, arr) {
      expect(arr).to.be(original);
    });
  });

  it("should have the correct context", function() {
    var obj = { foo: 'bar' };
    [1].some(function() {
      expect(this).to.be(obj);
    }, obj);
  });
});
