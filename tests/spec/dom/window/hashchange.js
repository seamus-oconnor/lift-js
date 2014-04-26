describe("window #onhashchange", function() {
  it("should fire an event", function(done) {
    var top = window.scrollY;
    window.location.hash = '';
    window.onhashchange = function() {
      window.location.hash = '';
      window.scrollTo(0, top);
      done();
    };
    window.location.hash = '#testing';
  });
});
