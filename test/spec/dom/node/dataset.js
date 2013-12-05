describe("DOM Element #dataset", function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it("should exist", function() {
    expect(div.dataset).to.be.ok();
  });

  it("should get 'bar' from .foo", function() {
    div.setAttribute('data-foo', 'bar');
    expect(div.dataset.foo).to.be('bar');
  });

  it("should get multiple values", function() {
    div.setAttribute('data-foo', 1);
    div.setAttribute('data-bar', 2);
    expect(div.dataset.foo).to.be('1');
    expect(div.getAttribute('data-foo')).to.be('1');
    expect(div.dataset.bar).to.be('2');
    expect(div.getAttribute('data-bar')).to.be('2');
  });

  it("should set existing value", function() {
    div.setAttribute('data-foo', 'bar');
    expect(div.dataset.foo).to.be('bar');
    expect(div.getAttribute('data-foo')).to.be('bar');
    div.dataset.foo = 'baz';
    expect(div.dataset.foo).to.be('baz');
    expect(div.getAttribute('data-foo')).to.be('baz');
  });

  // NOTE: It is currently impossible for shimed dataset to detect when a new
  // property is added.
  // it("should set new data-* attribute", function() {
  //   div.setAttribute('data-foo', 'bar');
  //   expect(div.dataset.foo).to.be('bar');
  //   div.dataset.foo = 'baz';
  //   expect(div.dataset.foo).to.be('baz');
  // });

  it("should get convert to camelCase", function() {
    div.setAttribute('data-foo-bar-baz', '123');
    expect(div.dataset.fooBarBaz).to.be('123');
  });
});
