describe("Array.prototype.filter", function() {
  it("should exist", function() {
    expect(Array.prototype.filter).to.be.a('function');
  });

  it("should return [12, 44]", function() {
    expect([12, 4, 8, 1, 44].filter(function(item, index, array) {
      return item >= 10;
    })).to.eql([12, 44]);
  });

  it("should have the correct index", function() {
    [0,1,2,3,4,5,6].filter(function(item, i, arr) {
      expect(item).to.be(i);
    });
  });

  it("should pass a reference to the original array", function() {
    var original = [0,1,2,3,4,5,6];
    original.filter(function(item, i, arr) {
      expect(arr).to.be(original);
    });
  });

  it("should return a new array", function() {
    var original = [1,2,3];

    expect(original.filter(function() {
      return true;
    })).to.not.be(original);
  });

  it("should have the correct context", function() {
    var obj = { foo: 'bar' };
    [1].filter(function() {
      expect(this).to.be(obj);
    }, obj);
  });
});
