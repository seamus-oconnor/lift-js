describe("DOM Element #classlist", function() {
  var div = document.createElement('div');

  beforeEach(function() {
    div.className = 'foo bar';
  });

  it("should exist", function() {
    expect(div.classList).to.be.ok();
  });

  it("should have class 'foo'", function() {
    expect(div.classList.contains('foo')).to.be(true);
  });

  it("should add class 'baz'", function() {
    expect(div.classList.add('baz')).to.be(undefined);
    expect(div.className).to.be('foo bar baz');
  });

  it("should remove class 'foo'", function() {
    expect(div.classList.remove('foo')).to.be(undefined);
    expect(div.className).to.be('bar');
  });

  it("should toggle class 'foo'", function() {
    expect(div.classList.toggle('foo')).to.be(false);
    expect(div.className).to.be('bar');
    expect(div.classList.toggle('foo')).to.be(true);
    expect(div.className).to.be('bar foo');
  });

  it("should be indexable at 0 and 1", function() {
    expect(div.classList.item(0)).to.be('foo');
    expect(div.classList.item(1)).to.be('bar');
    expect(div.classList.item(2)).to.be(null);
  });

  it("should be a string 'foo bar'", function() {
    expect(div.classList + '').to.be('foo bar');
    expect(div.classList.toString()).to.be('foo bar');
  });
});
