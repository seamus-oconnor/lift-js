describe("Array.prototype.forEach", function() {
  it("should exist", function() {
    expect(Array.prototype.forEach).to.be.a('function');
  });

  it("should loop 5 times", function() {
    var i = 0;
    [12, 4, 8, 1, 44].forEach(function() {
      i++;
    });
    expect(i).to.be(5);
  });

  it("should loop 0 times", function() {
    var i = 0;
    [].forEach(function() {
      i++;
    });
    expect(i).to.be(0);
  });

  it("should have the correct index", function() {
    [0,1,2,3,4,5,6].forEach(function(item, i/*, arr*/) {
      expect(item).to.be(i);
    });
  });

  it("should pass a reference to the original array", function() {
    var original = [0,1,2,3,4,5,6];
    original.forEach(function(item, i, arr) {
      expect(arr).to.be(original);
    });
  });

  it("should have the correct context", function() {
    var obj = { foo: 'bar' };
    [1].forEach(function() {
      expect(this).to.be(obj);
    }, obj);
  });
});
