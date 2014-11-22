describe("DOM Element #contains", function() {
  function get(tag) {
    return div.getElementsByTagName(tag)[0];
  }

  var div = document.createElement('div');
  div.innerHTML = '<div><p></p><span><b><i></i></b></span></div>';
  var p = get("p"), span = get("span"), b = get("b"), i = get("i");
  var other = document.createElement('div');

  it("should exist", function() {
    expect(div.compareDocumentPosition).to.be.ok();
  });

  it("should return true", function() {
    expect(div.contains(p)).to.be(true);
    expect(div.contains(span)).to.be(true);
    expect(div.contains(b)).to.be(true);
    expect(div.contains(i)).to.be(true);
    expect(b.contains(i)).to.be(true);
  });

  it("should return false", function() {
    expect(i.contains(b)).to.be(false);
    expect(span.contains(p)).to.be(false);
    expect(p.contains(div)).to.be(false);
    expect(div.contains(other)).to.be(false);
    expect(div.contains(document.body)).to.be(false);
  });

  it("should throw", function() {
    // Can't use the normal exepct().throwError() check because in IE 8
    // div.contains is not a real function. It is is weirdo native object.
    // expect(div.contains).to.throwError();

    try {
      expect(div.contains(123)).to.be("impossible");
    } catch(e) {
      expect(true).to.be(true);
    }
  });
});
