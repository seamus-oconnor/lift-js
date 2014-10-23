/*jshint node:true*/
/*global -expect*/

var liftBuilder = require('../../src/builder');
var expect = require('expect');
var V = liftBuilder.Version;

// liftBuilder.increaseVerbosity();
liftBuilder.turnOffLogging();


describe('Feature parser', function() {

  it('should parse simnple args', function() {
    expect(liftBuilder.buildFeatureTree(['a:b', 'b:a']))
      .toEqual({a: {b: true}, b: {a: true}});

    expect(liftBuilder.buildFeatureTree(['a:b', 'b:a', 'a:b', 'b:a']))
      .toEqual({a: {b: true}, b: {a: true}});

    expect(liftBuilder.buildFeatureTree(['a:b', 'a:c']))
      .toEqual({a: {b: true, c: true}});
  });

  it('should parse wildcard args', function() {
    expect(liftBuilder.buildFeatureTree(['a:b', 'a:*']))
      .toEqual({'a': '*'});
    expect(liftBuilder.buildFeatureTree(['a:b', 'a:*', 'a:c']))
      .toEqual({'a': '*'});

    // just a '*' means all supported features
    expect(liftBuilder.buildFeatureTree(['*']))
      .toEqual({});

    // just a '*' means all supported features
    expect(liftBuilder.buildFeatureTree(['*', 'a']))
      .toEqual({});
  });

});


describe('Browser File', function() {
  it('should be parse ok', function() {
    var data = '*  es5:date:now';
    var bundle = liftBuilder.parseFeatureFile(data, { 'es5': '*' });
    expect(bundle).toEqual({'*': ['es5:date:now']});
  });

  it('should be ignore comments', function() {
    var data = '# IGNORE ME\n*  es5:date:now';
    var bundle = liftBuilder.parseFeatureFile(data, { 'es5': '*' });
    expect(bundle).toEqual({'*': ['es5:date:now']});
  });

  it('should be handle spaces', function() {
    var data = '       # IGNORE ME\n\n    \n\n   *    \t\t  es5:date:now\n\n\n';
    var bundle = liftBuilder.parseFeatureFile(data, { 'es5': '*' });
    expect(bundle).toEqual({'*': ['es5:date:now']});
  });

  it('should be error on invalid syntax', function() {
    var data = 'Testing';
    expect(function() {
      liftBuilder.parseFeatureFile(data, { 'es5': '*' });
    }).toThrow();
  });

  it('should be parse wildcard versions', function() {
    var data = '* foo\n9 bar\n8 baz\n* foo:blork';
    var bundle = liftBuilder.parseFeatureFile(data, { 'foo': '*', 'bar': true });
    expect(bundle).toEqual({"9.0":["foo","bar","foo:blork"],"*":["foo","foo:blork"]});
  });

  it('should be match two requirements', function() {
    var data = '* foo\n9 bar\n8 baz\n* foo:blork';
    var bundle = liftBuilder.parseFeatureFile(data, { 'foo': '*' });
    expect(bundle).toEqual({'*': ['foo', 'foo:blork']});
  });
});


describe('Versions', function() {
  it('should parse versions properly', function() {
    expect(new V('2.0') + '').toEqual(new V('2.0') + '');
    expect(new V('*') + '').toEqual(new V('*') + '');
    expect(new V('*') + '').toEqual('*');
    expect(new V('  2.0  ') + '').toEqual('2.0');
    expect(new V('  2.0  ') + '').toEqual('2.0');
  });

  it('should be greater then lower versions', function() {
    expect(V.cmp(new V('2.1'), new V('2.0'))).toBeGreaterThan(-1);
    expect(V.cmp(new V('10.0'), new V('2.0'))).toBeGreaterThan(-1);
    expect(V.cmp(new V('2.0'), new V('2.0'))).toBeGreaterThan(-1);
  });

  it('should be less then higher versions', function() {
    expect(V.cmp(new V('2.0'), new V('2.1'))).toBeLessThan(1);
    expect(V.cmp(new V('1.0'), new V('2.0'))).toBeLessThan(1);
    expect(V.cmp(new V('2.0'), new V('2.0'))).toBeLessThan(1);
  });

  it('should compare wildcards greater then a version', function() {
    expect(V.cmp(new V('*'), new V('2.0'))).toBeGreaterThan(-1);
    expect(V.cmp(new V('*'), new V('20.0'))).toBeGreaterThan(-1);
    expect(V.cmp(new V('*'), new V('200.0'))).toBeGreaterThan(-1);
  });

  it('should compare version less then a wildcard', function() {
    expect(V.cmp(new V('2.0'), new V('*'))).toBeLessThan(1);
    expect(V.cmp(new V('20.0'), new V('*'))).toBeLessThan(1);
    expect(V.cmp(new V('200.0'), new V('*'))).toBeLessThan(1);
  });

  it('should sort versions', function() {
    var versions = [
      new V('*'),
      new V('9.0'),
      new V('2.1'),
    ];
    versions.sort(V.cmp);
    expect(versions).toEqual([
      new V('2.1'),
      new V('9.0'),
      new V('*'),
    ]);
  });

  it('should sort and remove duplicate versions', function() {
    var versions = [
      new V('9.0'),
      new V('*'),
      new V('9.0'),
      new V('*'),
      new V('2.1'),
      new V('*'),
      new V('2.1'),
    ];
    versions.sort(V.cmp);
    versions = liftBuilder.unique(versions);
    expect(versions).toEqual([
      new V('2.1'),
      new V('9.0'),
      new V('*'),
    ]);
  });
});
