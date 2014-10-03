/* global define */

  // TODO:
  // - Check Jquery to see what other shims are required to match it's API.
  // - matches():
  //   http://caniuse.com/#feat=matchesselector
  // - ChannelMessaging:
  //   http://caniuse.com/#feat=channel-messaging
  //   Pollyfill using postmessage + prefix?
  // - DataChannel:
  //   https://github.com/ShareIt-project/DataChannel-polyfill
  // - Any need to normalize touch events?
  //   http://caniuse.com/#feat=touch
  // - JSON:
  //   needed?
  //   use JSON3 if required: http://bestiejs.github.io/json3/lib/json3.js
  // - ClipBoard:
  //   http://caniuse.com/#feat=clipboard
  // - Pointer Events:
  //   http://caniuse.com/#feat=pointer
  // - Form validation:
  //   http://caniuse.com/#feat=form-validation
  // - File & Blob stuff:
  //   Can they build off each other? (Say IE 8 supports new Blob but not FileReader...)
  //   http://caniuse.com/#feat=filereader
  //   http://caniuse.com/#feat=fileapi
  //   http://caniuse.com/#feat=blobbuilder
  //   http://caniuse.com/#feat=bloburls
  // - Web Audio?
  //   http://caniuse.com/#feat=audio-api
  // - Event Source:
  //   http://caniuse.com/#feat=eventsource
  // - Drag & Drop:
  //   Shim IE by using their version of D&D
  //   http://caniuse.com/#feat=dragndrop
  // - Download Attribute:
  //   http://caniuse.com/#feat=download
  // - IndexDB:
  //   Shim using WebSQL?
  //   https://hacks.mozilla.org/2012/07/using-indexeddb-api-today-the-indexeddb-polyfills/
  //   http://html5doctor.com/introducing-web-sql-databases/
  //   http://caniuse.com/#feat=indexeddb
  // - History State Mangement:
  //   http://caniuse.com/#feat=history
  // - Text selection:
  //   http://stackoverflow.com/questions/11128130/select-text-in-javascript

(function() {
  "use strict";

  var ua = navigator.userAgent;
  var testel = document.createElement('div');
  testel.innerHTML = '<svg></svg>';
  var svgel = testel.firstChild || {};

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
        contains: !!String.prototype.contains
      }
    },
    dom: {
      'window': {
        innersize: !!window.innerWidth,
        hashchange: 'onhashchange' in window,
        wheel: 'onwheel' in testel,
        base64: !!(window.atob && window.btoa),
        raf: !!(window.requestAnimationFrame && window.cancelAnimationFrame),
        // IE 8 (not 7) says that window.Event exists IE 9 lies and says it has
        // a CustomEvent object but you can't call it as a contructor (e.g. new
        // CustomEvent();)
        events: (function() {
          try {
            new window.CustomEvent('foo');
            return true;
          } catch(e) {
            return false;
          }
        })()
      },
      'document': {
        defaultview: !!document.defaultView
      },
      node: {
        // IE 9 supports .children on <div>s but not SVG elements inline in an HTML5
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
    },
    console: window.console && console.log
  };

  // Test for IE's non-standard APIs
  if(!support.dom.window.events && !window.CustomEvent && document.createEventObject) {
    delete support.dom.window.events;
    support.dom.ie.events = false;
  }
  if(!window.dispatchEvent && document.fireEvent) {
    support.dom.ie.dispatchevent = false;
  }
  if(!window.addEventListener && window.attachEvent) {
    support.dom.ie.eventlisteners = false;
  }
  if(!window.getComputedStyle && testel.currentStyle) {
    support.dom.ie.getcomputedstyle = false;
  }

  function walk(obj1, obj2, prefix) {
    // console.log('walk', obj1, obj2, prefix);
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

  // Mozilla/5.0 (X11; Linux x86_64; rv:26.0) Gecko/20100101 Firefox/26.0
  // Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.66 Safari/537.36
  // Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)
  var browsers = {
    ff: /Firefox\/((\d+)\.(\d+))?/,
    chrome: /Chrome\/((\d+)\.(\d+))?/,
    ie: /MSIE ((\d+)\.(\d+))?/
    // safari: //, TODO: iOS Safari as a different UA?
    // opera: /Opera .../, TODO: Old Opera Presto or new Opera Webkit?
  };

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

  var reqs = null, bundle_versions = {};

  function buildBundle() {
    if(!reqs || !browser) { return; }

    var versions = bundle_versions[browser.name] || [];
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
        // console.log(ver[0], ver[1], '---', browser.major, browser.minor, ver[0] > browser.major, (ver[0] == browser.major && ver[1] > browser.minor));
        if(major > browser.major || (major === browser.major && minor > browser.minor)) {
          return ['./bundles/' + browser.name + last_ver + '-' + ver];
        }
      }
      last_ver = ver;
    }

    return [];
  }
  // -- BUILD REQUIREMENTS --

  // If there are built reqs (i.e. array.indexOf, string.trim, etc) then we know
  // that there are built bundles for known browsers too. If we were able to
  // sniff the browser properly then we will load a bundle of all the required
  // modules. If the right bundle can't be loaded we need to build a list of
  // dependencies for the unsupported features.
  var deps = buildBundle() || walk(reqs || support, support, './modules/');

  console.log(reqs);

  console.log('LiftJS: built with requirements?', !!reqs);
  console.log('LiftJS: AMD deps:', deps.join(' '));

  var now = new Date().getTime();
  var head = document.head || document.getElementsByTagName('head')[0];
  var baseUrl = '/';
  var scripts = document.getElementsByTagName('script');
  for(var i = scripts.length - 1; i >= 0; i--) {
    var script = scripts[i];
    var url_match = script.src.match(/^https?:\/\/[^\/]+(\/.+\/)lift[^\/]*\.js$/);
    if(url_match) {
      baseUrl = url_match[1];
      break;
    }
  }

  // Very crude AMD based define that will only work within the limited scope
  // needed for LiftJS modules.
  function _define(deps, fn) {
    function makeScript(id, callback) {
      var s = document.createElement('script');
      s.src = baseUrl + id + '.js';
      s.onload = callback;
      head.appendChild(s);
    }

    var count = deps.length;
    function done() {
      count--;
      if(count === 0) {
        fn();
      }
    }

    for(var i = deps.length - 1; i >= 0; i--) {
      makeScript(deps[i], done);
    }
  }

  var liftJS = {
    browser: browser,
    support: support,
    reqs: reqs
  };

  if(!(typeof define === "function" && define.amd)) { // no AMD define()
    window.define = _define;
    liftJS.ready = false;
    window.LiftJS = liftJS;
  }

  define(deps, function() {
    console.log('LiftJS: Time to load deps: ' + (new Date().getTime() - now) + "ms");

    // Remove shimmed non-AMD complient define() function;
    if(define === _define) {
      delete window.define;
      liftJS.ready = true;
      if(typeof liftJS.onload === 'function') {
        liftJS.onload();
      }
    }

    return liftJS;
  });

})();
