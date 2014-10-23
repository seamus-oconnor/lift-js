describe("Array.prototype.reduce", function() {
  it("should exist", function() {
    expect(Array.prototype.reduce).to.be.a('function');
  });

  it("should return sum", function() {
    expect([12, 4, 8, 1, 44].reduce(function(prev, item) {
      return prev + item;
    })).to.eql(12 + 4 + 8 + 1 + 44);

    expect([0, -1, 1].reduce(function(prev, item) {
      return prev + item;
    })).to.eql(0);
  });

  it("should return 0", function() {
    expect([12, 4, 8, 1, 44].reduce(function(/*prev, item*/) {
      return 0;
    })).to.eql(0);
  });

  it("should walk left to right", function() {
    expect([144, 2, 2, 2, 2].reduce(function(prev, item) {
      return prev / item;
    })).to.eql(144 / 2 / 2 / 2 / 2);
  });

  it("should use an initial value", function() {
    expect([0].reduce(function(prev, item) {
      return prev + item;
    }, 10)).to.eql(10);
  });

  it("should have the correct index", function() {
    [0,1,2,3,4,5,6].reduce(function(prev, item, i/*, arr*/) {
      expect(item).to.be(i);
    });
  });

  it("should pass a reference to the original array", function() {
    var original = [0,1,2,3,4,5,6];
    original.reduce(function(prev, item, i, arr) {
      expect(arr).to.be(original);
    });
  });

  it("should return a new array", function() {
    var original = [1,1,1];

    expect(original.reduce(function() {
      return 1;
    })).to.not.be(original);
  });
});
