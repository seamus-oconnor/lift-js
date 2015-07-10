/*!
* LiftJS Javascript Library v0.2.4
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


window.LiftJS = {};
!function(global) {
  "use strict";
  function empty() {}
  function isArray(arr) {
    return "[object Array]" === Object.prototype.toString.call(arr);
  }
  function err(msg) {
    throw new Error(msg);
  }
  function normalizePath(path) {
    var prefix = "http://example.com/";
    return normalizeUrl(prefix + path).substr(prefix.length);
  }
  function normalizeUrl(url) {
    var a = document.createElement("a");
    return a.href = url, a.cloneNode(!1).href;
  }
  function getModule(name) {
    var mod = registry[name];
    return mod || (mod = new Module(name), registry[mod.name] = mod), mod;
  }
  function executingScript() {
    if (document.currentScript) return document.currentScript;
    for (var scripts = document.getElementsByTagName("script"), i = scripts.length - 1; i >= 0; i--) {
      var script = scripts[i];
      if ("interactive" === script.readyState) return script;
    }
  }
  function resolveName(name, parentMod) {
    var scope = "";
    if ("." === name.charAt(0)) parentMod && (scope = parentMod.name + "/../"); else if (name.indexOf("/") > 0) {
      var parts = name.split("/"), prefix = config.paths[parts[0]];
      prefix && (scope = prefix + "/", name = parts.slice(1).join("/"));
    }
    return normalizePath(scope + name);
  }
  function buildUrl(mod) {
    var fqUrl = /https?:\/\//.test(config.baseUrl), baseUrl = fqUrl ? config.baseUrl : location.protocol + "//" + location.host + location.pathname + "-/../" + config.baseUrl;
    return normalizeUrl(baseUrl + mod.name + ".js");
  }
  function loadDependencies(deps, parentMod, fn) {
    function loaded() {
      if (count--, 0 >= count) {
        for (var args = [], i = 0; i < modules.length; i++) args.push(modules[i].obj);
        fn.apply(null, args);
      }
    }
    var count = deps.length, modules = [];
    if (0 === count) loaded(); else for (var i = 0; i < deps.length; i++) {
      var dep = deps[i], name = resolveName(dep, parentMod), mod = getModule(name);
      modules.push(mod), mod.load(loaded);
    }
  }
  function Module(name) {
    this.name = name, this.defined = !1, this.loaded = !1, this.loading = !1;
  }
  function microAmdDefine(name, deps, fn) {
    if ("string" != typeof name && (fn = deps, deps = name, name = null), isArray(deps) || (fn = deps, 
    deps = []), name) getModule(name).setup(deps, fn); else {
      var script = currentlyAddingScript || executingScript();
      if (anonDefine) return void (anonDefine = "error");
      anonDefine = [ fn, deps, script ? script.src : null ];
    }
  }
  function microAmdRequire(deps, fn) {
    deps = deps || [], loadDependencies(deps, null, fn || empty);
  }
  var anonDefine, currentlyAddingScript, registry = {}, head = document.getElementsByTagName("head")[0], logPile = [], config = {
    baseUrl: "./",
    paths: {}
  };
  Module.prototype.load = function(callback) {
    function ready() {
      loadDependencies(self.deps, self, function() {
        if (!self.obj) {
          var obj = self.initFn.apply(null, arguments);
          self.obj = obj;
        }
        callback(self.obj);
      });
    }
    function scriptLoad(e) {
      e = e || window.event;
      var rs = this.readyState;
      if (!(scriptLoaded || rs && "loaded" !== rs && "complete" !== rs)) {
        scriptLoaded = !0, self.loading = !1;
        var url = this.src;
        "error" === anonDefine && err("Multiple anon define()s in " + url);
        var deps = [], fn = empty;
        anonDefine && (url = anonDefine.pop() || url, deps = anonDefine.pop(), fn = anonDefine.pop(), 
        anonDefine = null), self.setup(deps, fn), this.onload = this.onreadystatechange = null, 
        head && this.parentNode && head.removeChild(this), ready();
      }
    }
    var self = this, scriptLoaded = !1;
    if (this.loaded) ready(); else if (this.loading) err("not handled"); else {
      this.loading = !0;
      var s = document.createElement("script");
      s.src = buildUrl(this), s.onload = scriptLoad, s.onreadystatechange = scriptLoad, 
      s.onerror = function() {
        err("Unable to load " + s.src);
      }, currentlyAddingScript = s, head.appendChild(s), currentlyAddingScript = null;
    }
  }, Module.prototype.setup = function(deps, initFn) {
    this.loaded && err("Module " + this.name + " already defined"), this.loaded = !0, 
    this.deps = deps, this.initFn = initFn;
  }, microAmdDefine.amd = !0, microAmdRequire.config = function(cfg) {
    for (var name in cfg) cfg.hasOwnProperty(name) && (config[name] = cfg[name]);
  }, microAmdRequire.destroy = function() {
    delete global.define, delete global.require;
  }, microAmdRequire.logPile = logPile, global.define = microAmdDefine, global.require = microAmdRequire;
}(this);
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
  define('liftjs', deps, function() {

    var howLong = (new Date().getTime() - now);
    

    return liftJS;
  });

})();

(function() {
  var currentScript = document.currentScript;

  if(!currentScript) {
    var scripts = document.getElementsByTagName('script');
    currentScript = scripts[scripts.length - 1]; // most likely the last script

    for(var i = scripts.length - 1; i >= 0; i--) {
      var script = scripts[i];
      if(script.readyState === 'interactive') {
        currentScript = script;
      }
    }
  }
  var baseUrl = currentScript ? currentScript.src + '-/../' : './';

  require.config({
    baseUrl: baseUrl
  });

  require(['liftjs'], function() {
    if(typeof define.destroy === 'function') {
      define.destroy();
    }
    window.LiftJS.ready = true;
    if(typeof window.LiftJS.onload === 'function') {
      window.LiftJS.onload();
    }
  });
})();
