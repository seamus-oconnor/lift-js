describe("Array.prototype.lastIndexOf", function() {
  it("should exist", function() {
    expect(Array.prototype.lastIndexOf).to.be.a('function');
  });

  it("should find objects", function() {
    var obj = {a:1};
    var stuff = [1, 'foo', obj, null, undefined, Infinity, 1, NaN, 'foo', new Date(), /a/, window, null, obj, 1];
    expect(stuff.lastIndexOf(1)).to.be(14);
    expect(stuff.lastIndexOf('foo')).to.be(8);
    expect(stuff.lastIndexOf(obj)).to.be(13);
    expect(stuff.lastIndexOf(null)).to.be(12);
    expect(stuff.lastIndexOf(undefined)).to.be(4);
    expect(stuff.lastIndexOf(Infinity)).to.be(5);
    expect(stuff.lastIndexOf(window)).to.be(11);
  });

  it("should not find objects", function() {
    var stuff = [1, 'foo', {a:1}, null, 100, Infinity, NaN, new Date(), /a/, window];
    // not the same strict equality
    expect(stuff.lastIndexOf({a:1})).to.be(-1);
    expect(stuff.lastIndexOf(NaN)).to.be(-1);
    expect(stuff.lastIndexOf(new Date())).to.be(-1);
    expect(stuff.lastIndexOf(/a/)).to.be(-1);
    expect(stuff.lastIndexOf(undefined)).to.be(-1);
    expect(stuff.lastIndexOf(2)).to.be(-1);
    expect(stuff.lastIndexOf('bar')).to.be(-1);
  });
});
