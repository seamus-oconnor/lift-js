/*!
* LiftJS Javascript Library v0.1.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*
* Build Date: Wednesday, October 22nd, 2014, 10:23:36 PM
*/


!function() {
  "use strict";
  function test(fn) {
    try {
      return fn();
    } catch (e) {
      return !1;
    }
  }
  function walk(obj1, obj2, prefix) {
    var list = [];
    prefix = prefix || "";
    for (var name in obj1) if (obj1.hasOwnProperty(name)) {
      var val1 = obj1[name], val2 = obj2[name];
      "*" === val1 && (val1 = val2), "object" == typeof val1 ? list = list.concat(walk(val1, val2, prefix + name + "/")) : obj2[name] || list.push(prefix + name);
    }
    return list;
  }
  function buildBundle() {
    if (void 0 !== reqs && browser) {
      for (var versions = bundleVersions[browser.name] || [], last_ver = "", i = 0; i < versions.length; i++) {
        var ver = versions[i], still_unsupported = "*" === ver;
        if (still_unsupported) return [ "./bundles/" + browser.name + last_ver + "+" ];
        var verParts = ver.split("."), minor = null, major = +verParts[0];
        if (minor = +verParts[1], major > browser.major || major === browser.major && minor > browser.minor) return [ "./bundles/" + browser.name + last_ver + "-" + ver ];
        last_ver = ver;
      }
      return [];
    }
  }
  function liftJSDefine(deps, fn) {
    function makeScript(id, callback) {
      var s = document.createElement("script");
      s.src = baseUrl + id + ".js", s.onload = callback, s.onerror = function() {}, head.appendChild(s);
    }
    function done() {
      count--, 0 === count && fn();
    }
    1 === arguments.length && (fn = deps, deps = []);
    var count = deps.length;
    if (0 === count) fn(); else for (var i = deps.length - 1; i >= 0; i--) makeScript(deps[i], done);
  }
  var ua = navigator.userAgent, testel = document.createElement("div");
  testel.innerHTML = "<svg></svg>";
  var svgel = testel.firstChild || {}, support = {
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
        defineproperty: !!Object.defineProperty,
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
      "function": {
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
    window: {
      innersize: !!window.innerWidth,
      hashchange: "onhashchange" in window,
      wheel: "onwheel" in testel,
      base64: !(!window.atob || !window.btoa),
      raf: !(!window.requestAnimationFrame || !window.cancelAnimationFrame),
      eventconstructor: test(function() {
        return !!new window.CustomEvent("foo");
      }),
      console: window.console && console.log
    },
    dom: {
      document: {
        defaultview: !!document.defaultView
      },
      node: {
        children: "children" in testel,
        classlist: "classList" in testel,
        contains: "contains" in testel,
        dataset: "dataset" in testel,
        textcontent: "textContent" in testel,
        getelementsbyclassname: !!document.getElementsByClassName,
        comparedocumentposition: !!testel.compareDocumentPosition,
        transitionend: "transition" in testel.style
      },
      svg: {
        children: "children" in svgel,
        classlist: "classList" in svgel
      },
      ie: {}
    }
  };
  !window.createEvent && document.createEventObject && !window.addEventListener && window.attachEvent && !window.dispatchEvent && document.fireEvent && (support.dom.ie.events = !1), 
  !window.getComputedStyle && testel.currentStyle && (support.dom.ie.getcomputedstyle = !1);
  var browser, browsers = {
    ff: /Firefox\/((\d+)\.(\d+))?/,
    chrome: /Chrome\/((\d+)\.(\d+))?/,
    ie: /MSIE ((\d+)\.(\d+))?/
  };
  for (var name in browsers) if (browsers.hasOwnProperty(name)) {
    var match = ua.match(browsers[name]);
    if (match) {
      browser = {
        match: match[0],
        name: name,
        major: +match[2],
        minor: +match[3]
      };
      break;
    }
  }
  for (var reqs, bundleVersions = {}, deps = buildBundle() || walk(reqs || support, support, "./modules/"), now = new Date().getTime(), head = document.head || document.getElementsByTagName("head")[0], baseUrl = "/", scripts = document.getElementsByTagName("script"), i = scripts.length - 1; i >= 0; i--) {
    var script = scripts[i], url_match = script.src.match(/^((https?:\/\/|file:\/\/\/)[^\/]+(\/.+\/))lift[^\/]*\.js$/);
    if (url_match) {
      baseUrl = url_match[1];
      break;
    }
  }
  var liftJS = {
    browser: browser,
    support: support,
    reqs: reqs
  };
  "function" == typeof window.define && define.amd || (window.define = liftJSDefine, 
  liftJS.ready = !1, window.LiftJS = liftJS, window.require = function() {}), define(deps, function() {
    new Date().getTime() - now;
    return define === liftJSDefine && (delete window.define, liftJS.ready = !0, "function" == typeof liftJS.onload && liftJS.onload()), 
    liftJS;
  });
}();