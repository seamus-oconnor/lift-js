describe("String.prototype.endsWith", function() {
  it("should exist", function() {
    expect(String.prototype.endsWith).to.be.a('function');
  });

  it("should find a match", function() {
    expect("foobarbaz".endsWith("baz")).to.be(true);
    expect("foobar ".endsWith("bar ")).to.be(true);
    expect("foobar\n".endsWith("bar\n")).to.be(true);
    expect("foobar\n".endsWith("foo", 3)).to.be(true);
  });

  it("should not find a match", function() {
    expect("foobarbaz".endsWith("bar")).to.be(false);
    expect("foobarbaz".endsWith("foo")).to.be(false);
    expect("foobarbaz".endsWith("ba")).to.be(false);
    expect("foobarbaz".endsWith("baz", 6)).to.be(false);
  });
});
