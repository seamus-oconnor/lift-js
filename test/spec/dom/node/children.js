describe("DOM Node #children", function() {
  var div = document.createElement('div');

  it("should exist", function() {
    expect(div.children).to.be.ok();
  });

  it("should have 1 child", function() {
    div.innerHTML = '<p></p>';
    expect(div.children.length).to.be(1);
  });

  it("should have 1 child", function() {
    div.innerHTML = 'foo<p>bar</p>baz';
    expect(div.children.length).to.be(1);
  });

  it("should have 3 children", function() {
    div.innerHTML = '<p><span>foo</span></p>bar<div></div>baz<span></span>'; // 3 child elements
    expect(div.children.length).to.be(3);
  });
});
