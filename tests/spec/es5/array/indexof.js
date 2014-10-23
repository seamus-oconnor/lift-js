describe("Array.prototype.indexOf", function() {
  it("should exist", function() {
    expect(Array.prototype.indexOf).to.be.a('function');
  });

  it("should find objects", function() {
    var obj = {a:1};
    var stuff = [1, 'foo', obj, null, undefined, Infinity, 1, NaN, 'foo', new Date(), /a/, window, null, obj, 1];
    expect(stuff.indexOf(1)).to.be(0);
    expect(stuff.indexOf('foo')).to.be(1);
    expect(stuff.indexOf(obj)).to.be(2);
    expect(stuff.indexOf(null)).to.be(3);
    expect(stuff.indexOf(undefined)).to.be(4);
    expect(stuff.indexOf(Infinity)).to.be(5);
    expect(stuff.indexOf(window)).to.be(11);
  });

  it("should not find objects", function() {
    var stuff = [1, 'foo', {a:1}, null, 100, Infinity, NaN, new Date(), /a/, window];
    // not the same strict equality
    expect(stuff.indexOf({a:1})).to.be(-1);
    expect(stuff.indexOf(NaN)).to.be(-1);
    expect(stuff.indexOf(new Date())).to.be(-1);
    expect(stuff.indexOf(/a/)).to.be(-1);
    expect(stuff.indexOf(undefined)).to.be(-1);
    expect(stuff.indexOf(2)).to.be(-1);
    expect(stuff.indexOf('bar')).to.be(-1);
  });
});
