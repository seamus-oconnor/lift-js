describe("window #atob and #btoa", function() {
  var map = {
    "foobar": "Zm9vYmFy",
    "lätín1": "bOR07W4x",
    "123456": "MTIzNDU2",
    "1234567": "MTIzNDU2Nw==",
    "12345678": "MTIzNDU2Nzg=",
  };

  it("should encode", function() {
    for(var input in map) {
      expect(window.btoa(input)).to.be(map[input]);
    }
  });

  it("should decode", function() {
    for(var input in map) {
      expect(window.atob(map[input])).to.be(input);
    }
  });

  it("should roundtrip", function() {
    for(var input in map) {
      expect(window.atob(window.btoa(input))).to.be(input);
      expect(window.atob(window.btoa(map[input]))).to.be(map[input]);
    }
  });

  it("should throw exception", function() {
    expect(window.btoa).withArgs("\u6F22\u5B57").to.throwError();
  });
});
