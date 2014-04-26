describe("String.prototype.trim", function() {
  it("should exist", function() {
    expect(String.prototype.trim).to.be.a('function');
  });

  it("should trim left and right side space", function() {
    expect("   foobar  ".trim()).to.eql("foobar");
    expect("foobar  ".trim()).to.eql("foobar");
    expect("   foobar".trim()).to.eql("foobar");

    // WhiteSpace and LineTerminator.
    // http://www.ecma-international.org/ecma-262/5.1/#sec-7.2
    // http://www.ecma-international.org/ecma-262/5.1/#sec-7.3

    var whitespace = "\u0009 \u000B \u000C \u0020 \u00A0 \uFEFF";
    var lineterminators = "\u000A \u000D \u2028 \u2029";

    expect((whitespace + lineterminators + " foobar" + whitespace + lineterminators).trim()).to.eql("foobar");
  });
});
