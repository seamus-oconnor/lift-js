describe("String.prototype.contains", function() {
  it("should exist", function() {
    expect(String.prototype.contains).to.be.a('function');
  });

  it("find match", function() {
    expect("foobarbaz".contains("foo")).to.be(true);
    expect("foobarbaz".contains("bar")).to.be(true);
    expect("foobarbaz".contains("baz")).to.be(true);
    expect("foobarbaz".contains("baz", 0)).to.be(true);
    expect("foobarbaz".contains("baz", 6)).to.be(true);
  });

  it("don't match", function() {
    expect("foobarbaz".contains("foz")).to.be(false);
    expect("foobarbaz".contains("bax")).to.be(false);
    expect("foobarbaz".contains("baf")).to.be(false);
    expect("foobarbaz".contains("foo", 1)).to.be(false);
  });
});
