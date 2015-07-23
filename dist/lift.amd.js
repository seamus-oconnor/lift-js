/*!
* LiftJS Javascript Library v0.2.6
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


/*
 TODO:
 - Check Jquery to see what other shims are required to match it's API.
 - matches():
   http://caniuse.com/#feat=matchesselector
 - ChannelMessaging:
   http://caniuse.com/#feat=channel-messaging
   Pollyfill using postmessage + prefix?
 - DataChannel:
   https://github.com/ShareIt-project/DataChannel-polyfill
 - Any need to normalize touch events?
   http://caniuse.com/#feat=touch
 - JSON:
   needed?
   use JSON3 if required: http://bestiejs.github.io/json3/lib/json3.js
 - ClipBoard:
   http://caniuse.com/#feat=clipboard
 - Pointer Events:
   http://caniuse.com/#feat=pointer
 - Form validation:
   http://caniuse.com/#feat=form-validation
 - File & Blob stuff:
   Can they build off each other? (Say IE 8 supports new Blob but not FileReader...)
   http://caniuse.com/#feat=filereader
   http://caniuse.com/#feat=fileapi
   http://caniuse.com/#feat=blobbuilder
   http://caniuse.com/#feat=bloburls
 - Web Audio?
   http://caniuse.com/#feat=audio-api
 - Event Source:
   http://caniuse.com/#feat=eventsource
 - Drag & Drop:
   Shim IE by using their version of D&D
   http://caniuse.com/#feat=dragndrop
 - Download Attribute:
   http://caniuse.com/#feat=download
 - IndexDB:
   Shim using WebSQL?
   https://hacks.mozilla.org/2012/07/using-indexeddb-api-today-the-indexeddb-polyfills/
   http://html5doctor.com/introducing-web-sql-databases/
   http://caniuse.com/#feat=indexeddb
 - History State Mangement:
   http://caniuse.com/#feat=history
 - Text selection:
   http://stackoverflow.com/questions/11128130/select-text-in-javascript
*/

(function() {
  "use strict";

  var ua = navigator.userAgent;
  var testel = document.createElement('div');
  testel.innerHTML = '<svg></svg>';
  var svgel = testel.firstChild || {};

  function test(fn) {
    try {
      return fn();
    } catch(e) {
      return false;
    }
  }

  var support = {
    es5: {
      array: {
        indexof: !!Array.prototype.indexOf,
        lastindexof: !!Array.prototype.lastIndexOf,
        every: !!Array.prototype.every,
        some: !!Array.prototype.some,
        foreach: !!Array.prototype.forEach,
        map: !!Array.prototype.map,
        filter: !!Array.prototype.filter,
        reduce: !!Array.prototype.reduce,
        reduceright: !!Array.prototype.reduceRight,
        isarray: !!Array.isArray
      },
      object: {
        create: !!Object.create,
        defineproperty: !!Object.defineProperty, // TODO: add IE 8 test for conformance?
        defineproperties: !!Object.defineProperties,
        getprototypeof: !!Object.getPrototypeOf,
        keys: !!Object.keys,
        seal: !!Object.seal,
        freeze: !!Object.freeze,
        preventextensions: !!Object.preventExtensions,
        issealed: !!Object.isSealed,
        isfrozen: !!Object.isFrozen,
        isextensible: !!Object.isExtensible,
        getownpropertynames: !!Object.getOwnPropertyDescriptor
      },
      'function': {
        bind: !!Function.prototype.bind
      },
      date: {
        toisostring: !!Date.prototype.toISOString,
        now: !!Date.now
      },
      string: {
        trim: !!"".trim
      }
    },
    es6: {
      array: {
        from: !!Array.from
      },
      string: {
        repeat: !!String.prototype.repeat,
        startswith: !!String.prototype.startsWith,
        endswith: !!String.prototype.endsWith,
        includes: !!String.prototype.includes
      }
    },
    'window': {
      innersize: !!window.innerWidth,
      hashchange: 'onhashchange' in window,
      wheel: 'onwheel' in testel,
      base64: !!(window.atob && window.btoa),
      raf: !!(window.requestAnimationFrame && window.cancelAnimationFrame),
      eventconstructor: test(function() { return !!new window.CustomEvent('foo') && !!new window.MouseEvent('bar'); }),
      console: window.console && console.log
    },
    dom: {
      'document': {
        defaultview: !!document.defaultView
      },
      node: {
        children: 'children' in testel,
        classlist: 'classList' in testel,
        contains: 'contains' in testel,
        dataset: 'dataset' in testel,
        textcontent: 'textContent' in testel,
        getelementsbyclassname: !!document.getElementsByClassName,
        comparedocumentposition: !!testel.compareDocumentPosition,
        transitionend: 'transition' in testel.style
      },
      svg: {
        children: 'children' in svgel,
        classlist: 'classList' in svgel
      },
      ie: {} // IE specific shims
    }
  };
  if( !window.createEvent && document.createEventObject &&
      !window.addEventListener && window.attachEvent &&
      !window.dispatchEvent && document.fireEvent ) {
    support.dom.ie.events = false;
  }
  if(!window.getComputedStyle && testel.currentStyle) {
    support.dom.ie.getcomputedstyle = false;
  }

  function walk(obj1, obj2, prefix) {
    var list = [];
    prefix = prefix || '';
    for(var name in obj1) {
      if(obj1.hasOwnProperty(name)) {
        var val1 = obj1[name];
        var val2 = obj2[name];

        if(val1 === '*') {
          val1 = val2;
        }

        if(typeof val1 === 'object') {
          list = list.concat(walk(val1, val2, prefix + name + '/'));
        } else if(!obj2[name]) {
          list.push(prefix + name);
        }
      }
    }

    return list;
  }
  var browsers = {
    ff: /Firefox\/((\d+)\.(\d+))?/,
    chrome: /Chrome\/((\d+)\.(\d+))?/,
    ie: /MSIE ((\d+)\.(\d+))?/
  };

  var reqs, bundleVersions = {};
  /*! BUILD OPTIMIZATIONS */

  var browser;
  for(var name in browsers) {
    if(browsers.hasOwnProperty(name)) {
      var match = ua.match(browsers[name]);
      if(match) {
        browser = {
          match: match[0],
          name: name,
          major: +match[2],
          minor: +match[3]
        };
        break;
      }
    }
  }

  function buildBundle() {
    if(reqs === undefined || !browser) { return; }

    var versions = bundleVersions[browser.name] || [];
    var last_ver = '';

    for(var i = 0; i < versions.length; i++) {
      var ver = versions[i];
      var still_unsupported = ver === '*';

      if(still_unsupported) {
        return ['./bundles/' + browser.name + last_ver + '+'];
      } else {
        var verParts = ver.split('.'), minor = null;
        var major = +verParts[0];
        minor = +verParts[1];
        if(major > browser.major || (major === browser.major && minor > browser.minor)) {
          return ['./bundles/' + browser.name + last_ver + '-' + ver];
        }
      }

      last_ver = ver;
    }

    return [];
  }
  var deps = buildBundle() || walk(reqs || support, support, './modules/');

  
  

  var now = new Date().getTime();

  var liftJS = {
    browser: browser,
    support: support,
    reqs: reqs,
  };

  if(window.LiftJS) {
    window.LiftJS = liftJS;
  }
  define(/* LIFT_AMD_MODULE_NAME */deps, function() {

    var howLong = (new Date().getTime() - now);
    

    return liftJS;
  });

})();
