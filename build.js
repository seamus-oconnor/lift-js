#!/usr/bin/env node

/* jshint node:true */

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var argv = require('minimist')(process.argv.slice(2), { boolean: [ 'v', 'verbose', 'h', 'help' ] });
var liftBuilder = require('./src/builder');
var Promise = require("bluebird");


const BUILD_DIR = path.join(__dirname, 'dist');
const SRC_DIR = path.join(__dirname, 'src');
const BROWSERS_DIR = path.join(SRC_DIR, 'browsers');
const FEATURES = argv._;


// function fail() {
//   console.error(chalk.red(arguments.join(' ')));
//   process.exit(1);
// }

function usage() {
  console.log('usage: node build.js [es5:*, es6:string*]');
  process.exit(0);
}

if(argv.h || argv.help) {
  usage();
}

if(argv.v || argv.verbose) {
  liftBuilder.increaseVerbosity();
}


function repeatString(s, num) {
  return new Array(num + 1).join(s);
}


function prettyKeys(d, indent) {
  indent = indent || 0;
  var output = '';
  for(var key in d) {
    if(d.hasOwnProperty(key)) {
      var value = d[key];

      output += repeatString('  ', indent) + key + (value === '*' ? ': ' + chalk.green('*') : '') + '\n';

      if(typeof value === 'object') {
        output += prettyKeys(value, indent + 1) + '\n';
      }
    }
  }

  return output;
}

function cleanDir(dir) {
  fs.readdirSync(dir).forEach(function(fileName) {
    fs.unlinkSync(path.join(dir, fileName));
  });
}

function buildOptimizedLiftJs() {
  var reqs = liftBuilder.buildFeatureTree(FEATURES);
  var browserVersions = {};
  var promises = [];
  var BUNDLES_DIR = path.join(BUILD_DIR, 'bundles');

  console.log('Selected features:\n%s', prettyKeys(reqs, 1));

  // Create dist/bundles dir
  if(fs.existsSync(BUNDLES_DIR)) {
    cleanDir(BUNDLES_DIR);
  } else {
    fs.mkdirSync(BUNDLES_DIR);
  }

  fs.readdirSync(BROWSERS_DIR).forEach(function(filename) {
    var browser = path.basename(filename, '.txt');

    // Build browser AMD modules into dist/bundles/[browser]-[ver].js
    promises.push(liftBuilder.buildBrowserBundles(browser, reqs).then(function(bundle) {
      browserVersions[browser] = bundle;
    }));
  });

  return Promise.all(promises).then(function() {
    // Copy all AMD modules into the dist/modules dir
    var liftJsSource = fs.readFileSync(path.join(BUILD_DIR, 'lift.js')).toString();

    // Parse lift.js and output reqs and browser_ranges as JSON.
    var customLiftJS = liftBuilder.customizeLiftJS(reqs, browserVersions, liftJsSource);

    var outFp = fs.openSync(path.join(BUILD_DIR, 'lift-optimized.js'), 'w');

    try {
      fs.writeSync(outFp, customLiftJS);
    } finally {
      fs.closeSync(outFp);
    }
  });
}


function main() {
  if(FEATURES.length > 0) {
    buildOptimizedLiftJs().then(function() {
      console.log("-- Build Complete --");
    }, function(e) {
      console.error(e + '');
      console.log("-- Build Failed --");
      process.exit(1);
    });
  } else {
    console.log('Nothing to do');
  }
}

main();
