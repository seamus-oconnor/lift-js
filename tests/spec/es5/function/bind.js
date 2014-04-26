describe("Function.prototype.bind", function() {
  it("should exist", function() {
    expect(Function.prototype.bind).to.be.a('function');
  });

  it("should bind the correct this", function() {
    var that = {};

    function test() {
      expect(this).to.be(that);
    }

    var bound = test.bind(that);

    bound();
  });

  it("should hold arguments", function() {
    var that = {};

    function test() {
      expect(Array.prototype.slice.call(arguments)).to.eql([1, 2, 3]);
    }

    var bound = test.bind(that, 1, 2, 3);

    bound();
  });

  it("should pass bound args first", function() {
    var that = {};

    function test() {
      expect(Array.prototype.slice.call(arguments)).to.eql([1, 2, 3, 4, 5, 6]);
    }

    var bound = test.bind(that, 1, 2, 3);

    bound(4, 5, 6);
  });
});
