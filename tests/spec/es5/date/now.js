describe("Date.now", function() {
  it("should exist", function() {
    expect(Date.now).to.be.a('function');
  });

  it("should return current time", function() {
    var date_now = Date.now(), date_gettime = new Date().getTime();

    expect(date_now).to.be.a('number');
    expect(Math.round((date_now - date_gettime) / 1000)).to.be(0);
  });
});
