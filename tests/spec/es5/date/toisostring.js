describe("Date.prototype.toISOString", function() {
  it("should exist", function() {
    expect(Date.prototype.toISOString).to.be.a('function');
  });

  it("should return ISO 8601 string", function() {
    expect(new Date(0).toISOString()).to.be('1970-01-01T00:00:00.000Z');
    expect(new Date('05 October 2011 14:48 UTC').toISOString()).to.be('2011-10-05T14:48:00.000Z');
    expect(new Date(-1 * Math.pow(10, 12)).toISOString()).to.be('1938-04-24T22:13:20.000Z');
  });
});
