describe("String.prototype.startsWith", function() {
  it("should exist", function() {
    expect(String.prototype.startsWith).to.be.a('function');
  });

  it("should find a match", function() {
    expect("foobar".startsWith("foo")).to.be(true);
    expect(" foobar".startsWith(" foo")).to.be(true);
    expect("\nfoobar".startsWith("\nfoo")).to.be(true);
    expect("\nfoobar".startsWith("foo", 1)).to.be(true);
  });

  it("should not find a match", function() {
    expect("foobar".startsWith("bar")).to.be(false);
    expect("foobar".startsWith("oo")).to.be(false);
    expect("foobar".startsWith("foo", 1)).to.be(false);
  });
});
