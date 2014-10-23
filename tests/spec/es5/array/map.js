describe("Array.prototype.map", function() {
  it("should exist", function() {
    expect(Array.prototype.map).to.be.a('function');
  });

  it("should return square", function() {
    expect([12, 4, 8, 1, 44].map(function(item) {
      return item * item;
    })).to.eql([144, 16, 64, 1, 1936]);
  });

  it("should have the correct index", function() {
    [0,1,2,3,4,5,6].map(function(item, i/*, arr*/) {
      expect(item).to.be(i);
    });
  });

  it("should pass a reference to the original array", function() {
    var original = [0,1,2,3,4,5,6];
    original.map(function(item, i, arr) {
      expect(arr).to.be(original);
    });
  });

  it("should return a new array", function() {
    var original = [1,1,1];

    expect(original.map(function() {
      return 1;
    })).to.not.be(original);
  });

  it("should have the correct context", function() {
    var obj = { foo: 'bar' };
    [1].map(function() {
      expect(this).to.be(obj);
    }, obj);
  });
});
