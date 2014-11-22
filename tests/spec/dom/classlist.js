/*jshint loopfunc:true*/

describe("DOM Element #classlist", function() {
  var div = document.createElement('div');
  div.innerHTML = '<svg></svg>';
  var svg = div.firstChild;

  beforeEach(function() {
    div.className = 'foo bar';
  });

  var nodes = {
    html: div
  };

  if(svg) {
    beforeEach(function() {
      svg.setAttribute('class', 'foo bar');
    });

    nodes.svg = svg;

    it("does support svg", function() {
      expect(svg).to.be.ok();
    });
  }

  for(var type in nodes) {
    if(nodes.hasOwnProperty(type)) {
      var el = nodes[type];

      it("should exist on " + type + " nodes", function() {
        expect(el.classList).to.be.ok();
      });

      it("should have class 'foo' on " + type + " nodes", function() {
        expect(el.classList.contains('foo')).to.be(true);
      });

      it("should add class 'baz' on " + type + " nodes", function() {
        expect(el.classList.add('baz')).to.be(undefined);
        expect(el.getAttribute('class')).to.be('foo bar baz');
      });

      it("should remove class 'foo' from " + type + " nodes", function() {
        expect(el.classList.remove('foo')).to.be(undefined);
        expect(el.getAttribute('class')).to.be('bar');
      });

      it("should toggle class 'foo' on " + type + " nodes", function() {
        expect(el.classList.toggle('foo')).to.be(false);
        expect(el.getAttribute('class')).to.be('bar');
        expect(el.classList.toggle('foo')).to.be(true);
        expect(el.getAttribute('class')).to.be('bar foo');
      });

      it("should be indexable at 0 and 1 on " + type + " nodes", function() {
        expect(el.classList.item(0)).to.be('foo');
        expect(el.classList.item(1)).to.be('bar');
        expect(el.classList.item(2)).to.be(null);
      });

      it("should be a string 'foo bar' on " + type + " nodes", function() {
        expect(el.classList + '').to.be('foo bar');
        expect(el.classList.toString()).to.be('foo bar');
      });
    }
  }
});
