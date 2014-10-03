/* jshint node:true */

var fs = require('fs');
var path = require('path');
var util = require('util');
var chalk = require('chalk');
var winston = require('winston');


const HR = '---------------------------------------';
const BUILD_DIR = path.join(__dirname, '..', 'dist');
const SRC_DIR = __dirname;
const BROWSERS_DIR = path.join(SRC_DIR, 'browsers');
const DEFINE_RE = /\s*define\s*\(([^,]+,\s*)?function(.+)/;


var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'warn' }),
  ]
});


function increaseVerbosity() {
  logger.transports.console.level = 'debug';
}

function turnOffLogging() {
  logger.remove(winston.transports.Console);
}


function Version(ver) {
  if(ver === '*' || ver === Infinity) {
    this.all = true;
    this.major = Infinity;
    this.minor = Infinity;
  } else {
    this.all = false;

    if(ver.indexOf('.') === -1) { // no '.'
      this.major = parseInt(ver, 10);
      this.minor = 0;
    } else {
      var parts = ver.split('.');
      this.major = parseInt(parts[0], 10);
      this.minor = parseInt(parts[1], 10);
    }
  }
}


Version.cmp = function versionCmp(a, b) {
  // logger.debug('Version.cmp(%s, %s)', a, b);

  function checkType(obj) {
    if(typeof obj === 'string') {
      obj = new Version(obj);
    } else if(!(obj instanceof Version)) {
      throw new Error("Versions can only be compared to other Version objects");
    }
  }

  checkType(a);
  checkType(b);

  if(a.all === true && b.all === true) { // * === *
    return 0;
  } else if(a.major === b.major && a.minor === b.minor) { // 1.0 === 1.0
    return 0;
  } else if(a.all) { // * > 1.0
    return 1;
  } else if(a.major > b.major) { // 2.0 > 1.0
    return 1;
  } else if(a.major === b.major && a.minor > b.minor) { // # 2.1 > 2.0
    return 1;
  }

  return -1;
};

Version.prototype.toString = function() {
  return this.all ? '*' : this.major + '.' + this.minor;
};

Version.prototype.toJSON = function() {
  return this.toString();
};


function isFeatureInReq(feature, reqs) {
  // logger.debug('isFeatureInReq(%s, %s)', feature, JSON.stringify(reqs));

  if(typeof reqs === 'object' && Object.keys(reqs).length === 0) { return true; } // if empty obj return true

  var featureParts = feature.trim().split(':');
  var tree = reqs;
  // logger.debug(featureParts)
  for(var i = 0; i < featureParts.length; i++) {
    var part = featureParts[i];
    // logger.debug("part %s. part in tree? %s", part, !!tree[part]);
    if(tree[part]) {
      tree = tree[part];
      // logger.debug('tree === true || tree === *', tree === true || tree === '*');
      if(tree === true || tree === '*') { return true; }
    }
  }

  return false;
}


function buildFeatureTree(args) {
  var reqs = {};

  for(var i = 0; i < args.length; i++) {
    var arg = args[i];

    if(arg === '*') {
      return {};
    }

    var tree = reqs;
    var branch = tree;

    var parts = arg.trim().split(':');

    for(var j = 0; j < parts.length; j++) {
      var part = parts[j];
      var val = j < (parts.length - 1) ? {} : true;

      if(j > 0 && part === '*') {
        branch[parts[j - 1]] = '*';
        break;
      } else if(tree[part] === '*') {
        break;
      } else {
        branch = tree;
        if(!tree[part]) {
          tree[part] = val;
        }
        tree = tree[part];
      }
    }
  }

  return reqs;
}


function unique(arr) {
  return arr.filter(function(item, pos) {
    return !pos || item + '' !== arr[pos - 1] + '';
  });
}

function parseBrowserBundles(bundleFileData, reqs) {
  // logger.debug("buildBundles()");

  var featureSupport = [];
  var versions = [];
  var bundles = {};

  var lines = bundleFileData.split('\n');

  lines.forEach(function(line, i) {
    line = line.trim();

    if(!line || line[0] === '#') { return; }

    try {
      var parts = line.split(/\s+/);
      if(parts.length !== 2) {
        throw new Error('Not able to split line: ' + line);
      }
      var version = new Version(parts[0]);
      var feature = parts[1].trim();

      // logger.debug('isFeatureInReq(feature, reqs)', isFeatureInReq(feature, reqs));
      if(isFeatureInReq(feature, reqs)) {
        // logger.debug('feature required %s', feature);
        versions.push(version);
        featureSupport.push({ version: version, name: feature });
      }
    } catch(e) {
      logger.error(e + '');
      throw new Error("Syntax error in %s:%d\n\"%s\"" % (path.basename(path), i, line));
    }
  });

  versions.sort(Version.cmp);
  versions = unique(versions);

  versions.forEach(function(ver) {
    var browserFeatures = [];

    featureSupport.forEach(function(feature) {
      var fver = feature.version;
      var isFeatureNewer = Version.cmp(fver, ver) >= 0;
      // logger.debug("%s -- %s >= %s is %s", feature.name, fver + '', ver + '', isFeatureNewer);

      if(isFeatureNewer) {
        browserFeatures.push(feature.name);
      }
    });

    bundles[ver + ''] = browserFeatures;
  });

  return bundles;
}


function appendFeatureToBundle(feature, bundlePath) {
  var bundleFp = fs.openSync(bundlePath, 'a');

  try {
    var sourcePath = feature.split(':');

    var moduleId = sourcePath.join('/');
    sourcePath[sourcePath.length - 1] += '.js';

    logger.debug("%s%s", ' \t\t\t\t', moduleId);

    var modulePath = path.join(SRC_DIR, 'modules', path.join.apply(path, sourcePath));
    var sourceLines = fs.readFileSync(modulePath).toString().split('\n');

    for(var i = 0; i < sourceLines.length; i++) {
      var line = sourceLines[i];
      var matches = line.match(DEFINE_RE);

      if(matches) {
        line = util.format('define(\'liftjs/modules/%s\', %sfunction%s', moduleId, matches[1] || '[], ', matches[2]);
      }

      fs.writeSync(bundleFp, line + '\n');
    }
  } finally {
    fs.closeSync(bundleFp);
  }
}


function buildBrowserBundle(browser, reqs) {
  // logger.debug('parsing %s', browser);

  var data = fs.readFileSync(path.join(BROWSERS_DIR, browser + '.txt')).toString();

  var bundles = parseBrowserBundles(data, reqs);

  var needsBundleFile = Object.keys(bundles).length > 0;
  if(needsBundleFile) {
    logger.debug('%s:', chalk.bold.cyan(browser.toUpperCase()));
    logger.debug('Supported In Version\t\tFeature\n' + HR);
  }

  var prevVersion = '';
  var versions = [];

  for(var version in bundles) {
    if(bundles.hasOwnProperty(version)) {
      var features = bundles[version];
      var stillUnsupported = version === '*';

      versions.push(version);

      logger.debug(' %s', stillUnsupported ? '-' : version);

      var bundleFilename = browser + (prevVersion + (stillUnsupported ? '+' : '-' + version)) + '.js';
      var bundlePath = path.join(BUILD_DIR, 'bundles', bundleFilename);
      var bundleFp = fs.openSync(bundlePath, 'a');

      try {
        for(var i = 0; i < features.length; i++) {
          var feature = features[i];
          appendFeatureToBundle(feature, bundlePath);
        }

        fs.writeSync(bundleFp, 'define(function() {});\n');

        logger.debug('');
        console.log(chalk.blue('Created bundle ' + bundleFilename));
        logger.debug('');
      } finally {
        fs.closeSync(bundleFp);
      }

      prevVersion = version;
    }
  }

  return versions;
}


function customizeLiftJS(reqs, browserVersions, source) {
  var sourceLines = source.split('\n');

  for(var i = 0; i < sourceLines.length; i++) {
    var line = sourceLines[i];
    if(line.trim() === '// -- BUILD REQUIREMENTS --') {
      var pad = line.match(/(\s*)/)[1];
      sourceLines.splice(i, 1,
        pad + 'reqs = ' + JSON.stringify(reqs) + ';',
        pad + 'bundle_versions = ' + JSON.stringify(browserVersions) + ';'
      );
    }
  }

  return sourceLines.join('\n');
}


exports.turnOffLogging = turnOffLogging;
exports.increaseVerbosity = increaseVerbosity;
exports.Version = Version;
exports.unique = unique;
exports.parseBrowserBundles = parseBrowserBundles;
exports.buildBrowserBundle = buildBrowserBundle;
exports.buildFeatureTree = buildFeatureTree;
exports.customizeLiftJS = customizeLiftJS;
