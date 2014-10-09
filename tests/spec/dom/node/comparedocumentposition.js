describe("DOM Element #dataset", function() {
  function get(tag) {
    return div.getElementsByTagName(tag)[0];
  }

  var div = document.createElement('div');
  div.innerHTML = '<div><p></p><span><b><i></i></b></span></div>';
  var p = get("p"), span = get("span"), b = get("b"), i = get("i");
  var other = document.createElement('div');
  // PhantomJS needs at least one element to be in the DOM.
  document.body.appendChild(div);

  var DOCUMENT_POSITION_DISCONNECTED = 1;
  var DOCUMENT_POSITION_PRECEDING = 2;
  var DOCUMENT_POSITION_FOLLOWING = 4;
  var DOCUMENT_POSITION_CONTAINS = 8;
  var DOCUMENT_POSITION_CONTAINED_BY = 16;

  it("should exist", function() {
    expect(div.compareDocumentPosition).to.be.ok();
  });

  it("should be the same", function() {
    expect(div.compareDocumentPosition(div)).to.be(0);
  });

  it("should be disconnected", function() {
    var ret = div.compareDocumentPosition(other);
    expect(ret & DOCUMENT_POSITION_DISCONNECTED).to.be(DOCUMENT_POSITION_DISCONNECTED);
  });

  it("should be preceding", function() {
    var ret = i.compareDocumentPosition(b);
    expect(ret & DOCUMENT_POSITION_PRECEDING).to.be(DOCUMENT_POSITION_PRECEDING);
    ret = i.compareDocumentPosition(span);
    expect(ret & DOCUMENT_POSITION_PRECEDING).to.be(DOCUMENT_POSITION_PRECEDING);
    ret = i.compareDocumentPosition(p);
    expect(ret & DOCUMENT_POSITION_PRECEDING).to.be(DOCUMENT_POSITION_PRECEDING);
  });

  it("should be following", function() {
    var ret = p.compareDocumentPosition(span);
    expect(ret & DOCUMENT_POSITION_FOLLOWING).to.be(DOCUMENT_POSITION_FOLLOWING);
    ret = p.compareDocumentPosition(b);
    expect(ret & DOCUMENT_POSITION_FOLLOWING).to.be(DOCUMENT_POSITION_FOLLOWING);
    ret = p.compareDocumentPosition(i);
    expect(ret & DOCUMENT_POSITION_FOLLOWING).to.be(DOCUMENT_POSITION_FOLLOWING);
  });

  it("should contain", function() {
    var ret = p.compareDocumentPosition(div);
    expect(ret & DOCUMENT_POSITION_CONTAINS).to.be(DOCUMENT_POSITION_CONTAINS);
    ret = span.compareDocumentPosition(div);
    expect(ret & DOCUMENT_POSITION_CONTAINS).to.be(DOCUMENT_POSITION_CONTAINS);
    ret = b.compareDocumentPosition(div);
    expect(ret & DOCUMENT_POSITION_CONTAINS).to.be(DOCUMENT_POSITION_CONTAINS);
  });

  it("should be contained by", function() {
    var ret = div.compareDocumentPosition(p);
    expect(ret & DOCUMENT_POSITION_CONTAINED_BY).to.be(DOCUMENT_POSITION_CONTAINED_BY);
    ret = div.compareDocumentPosition(span);
    expect(ret & DOCUMENT_POSITION_CONTAINED_BY).to.be(DOCUMENT_POSITION_CONTAINED_BY);
    ret = div.compareDocumentPosition(b);
    expect(ret & DOCUMENT_POSITION_CONTAINED_BY).to.be(DOCUMENT_POSITION_CONTAINED_BY);
  });
});
