describe("Object.keys", function() {
  it("should exist", function() {
    expect(Object.keys).to.be.a('function');
  });

  it("should have the right number of keys", function() {
    var obj = {foo: 1, bar: null};
    var keys = Object.keys(obj);

    expect(keys).to.eql(['foo', 'bar']);
  });

  it("should not return prototype keys in array", function() {
    function TestObj() { }
    TestObj.prototype.foo = 'foo';

    expect(Object.keys(new TestObj())).to.eql([]);

    var test = new TestObj();
    test.bar = 1;
    expect(Object.keys(test)).to.eql(['bar']);
  });

  it("should not return any prototype hierarchy keys in array", function() {
    function ParentObj() { }
    ParentObj.prototype.pfoo = 'parentprop';

    function ChildObj() {
      ParentObj.call(this);
    }
    ChildObj.prototype.bar = 'childprop';
    var test = new ChildObj();
    test.zorb = 3;

    expect(Object.keys(test)).to.eql(['zorb']);
  });

  it("should work with window", function() {
    expect(Object.keys).withArgs(window).to.not.throwException();
  });

  it("should work with document", function() {
    expect(Object.keys).withArgs(document).to.not.throwException();
  });

  it("should work with node.contains", function() {
    var div = document.createElement('div');
    expect(Object.keys).withArgs(div.contains).to.not.throwException();
  });
});
