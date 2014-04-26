describe("DOM Element #getElementsByClassName", function() {
  function get(tag) {
    return div.getElementsByTagName(tag)[0];
  }

  var div = document.createElement('div');
  div.innerHTML = '<p class="foo"><b class="bar baz"></b><i class="bar"></i></p>';
  var p = get("p"), b = get("b");

  it("should exist", function() {
    expect(div.getElementsByClassName).to.be.ok();
    expect(document.getElementsByClassName).to.be.ok();
  });

  it("should return .foo", function() {
    var els = div.getElementsByClassName('foo');
    expect(els.length).to.be(1);
    expect(els[0]).to.be(p);
  });

  it("should return 1 element for .bar.baz", function() {
    // should ignore second argument too
    var els = div.getElementsByClassName('bar baz', 'bar');
    expect(els.length).to.be(1);
    expect(els[0]).to.be(b);
  });
});
