describe("DOM Element #textContent", function() {
  var div = document.createElement('div');

  beforeEach(function() {
    div.innerHTML = '';
  });

  it("should exist", function() {
    expect(div.textContent).to.be('');
  });

  it("should get text nodes", function() {
    div.appendChild(document.createTextNode('testing'));
    expect(div.textContent).to.be('testing');

    div.appendChild(document.createTextNode(' another node?'));
    expect(div.textContent).to.be('testing another node?');
  });

  it("should get nested text", function() {
    // NOTE: IE 8 will strip leading whitespace from <p>foo <b> bar</b></p>
    // giving "foo bar" with only one space between.

    div.innerHTML = 'ok <b>here <i>is</i> some </b>text!';
    expect(div.textContent).to.be('ok here is some text!');
  });

  it("should set text nodes", function() {
    div.textContent = 'foobar';
    expect(div.firstChild.data).to.be('foobar');
  });

  it("should set text nodes erasing old data", function() {
    div.appendChild(document.createTextNode('testing'));
    div.textContent = 'foobar';
    expect(div.firstChild.data).to.be('foobar');
  });
});
