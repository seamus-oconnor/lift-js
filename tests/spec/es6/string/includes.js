describe("String.prototype.includes", function() {
  it("should exist", function() {
    expect(String.prototype.includes).to.be.a('function');
  });

  it("find match", function() {
    expect("foobarbaz".includes("foo")).to.be(true);
    expect("foobarbaz".includes("bar")).to.be(true);
    expect("foobarbaz".includes("baz")).to.be(true);
    expect("foobarbaz".includes("baz", 0)).to.be(true);
    expect("foobarbaz".includes("baz", 6)).to.be(true);
  });

  it("don't match", function() {
    expect("foobarbaz".includes("foz")).to.be(false);
    expect("foobarbaz".includes("bax")).to.be(false);
    expect("foobarbaz".includes("baf")).to.be(false);
    expect("foobarbaz".includes("foo", 1)).to.be(false);
  });
});
