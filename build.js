#!/usr/bin/env node

/* jshint node:true */

var fs = require('fs');
var fse = require('fs-extra')
var path = require('path');
var rimraf = require('rimraf');
var chalk = require('chalk');
var argv = require('minimist')(process.argv.slice(2), { boolean: [ 'v', 'verbose', 'h', 'help' ] });
var liftBuilder = require('./src/builder');

const BUILD_DIR = path.join(__dirname, 'dist');
const SRC_DIR = path.join(__dirname, 'src');
const BROWSERS_DIR = path.join(SRC_DIR, 'browsers');
const FEATURES = argv._;


function cleanDist() {
  if(fs.existsSync(BUILD_DIR)) {
    rimraf.sync(BUILD_DIR);
  }

  fs.mkdir(BUILD_DIR);
}

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


function main() {
  cleanDist();

  fse.copySync(path.join(SRC_DIR, 'modules'), path.join(BUILD_DIR, 'modules'));

  if(FEATURES.length > 0) {
    var reqs = liftBuilder.buildFeatureTree(FEATURES);
    var browserVersions = {};

    console.log('Selected features:\n%s', prettyKeys(reqs, 1));

    // Create dist/bundles dir
    fs.mkdir(path.join(BUILD_DIR, 'bundles'));

    fs.readdirSync(BROWSERS_DIR).forEach(function(filename) {
      var browser = path.basename(filename, '.txt');

      // Build browser AMD modules into dist/bundles/[browser]-[ver].js
      browserVersions[browser] = liftBuilder.buildBrowserBundle(browser, reqs);
    });

    // Copy all AMD modules into the dist/modules dir

    var liftJsSource = fs.readFileSync(path.join(SRC_DIR, 'lift.js')).toString();

    // Parse lift.js and output reqs and browser_ranges as JSON.
    var customLiftJS = liftBuilder.customizeLiftJS(reqs, browserVersions, liftJsSource);
    var outFp = fs.openSync(path.join(BUILD_DIR, 'lift.js'), 'w');

    try {
      fs.writeSync(outFp, customLiftJS);
    } finally {
      fs.closeSync(outFp);
    }
  } else {
    console.log('No specific features. Building unoptimzed.');
    fse.copySync(path.join(SRC_DIR, 'lift.js'), path.join(BUILD_DIR, 'lift.js'));
  }


  console.log("-- Build Complete --");

  return 0;
}

// TODO: copy dist/ to output / BUILD_DIR directory
// logger.debug('Default build dir ' + BUILD_DIR);

// if(argv.o || argv.BUILD_DIR) {
//   var BUILD_DIR = argv.o || argv.BUILD_DIR;
//   BUILD_DIR = path.join(process.cwd(), BUILD_DIR);

//   if(!fs.existsSync(BUILD_DIR)) {
//     fail('Invalid build directory:', BUILD_DIR);
//   }
// }

// console.log('Building lift-js into ', chalk.blue(BUILD_DIR));

process.exit(main());
