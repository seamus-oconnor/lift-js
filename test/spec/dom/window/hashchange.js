describe("window #onhashchange", function() {
  it("should fire an event", function(done) {
    window.onhashchange = function() {
      done();
    };
    window.location.hash = '#testing';
  });
});
