/*!
* LiftJS Javascript Library v0.2.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  function NotSupportedError(message) {
    this.message = message;
  }
  return window.getComputedStyle ? !1 : (NotSupportedError.prototype = new Error(), 
  NotSupportedError.prototype.name = "NotSupportedError", window.getComputedStyle = function() {
    function getComputedStylePixel(element, property, fontSize) {
      var rootSize, value = element.currentStyle[property].match(/([\d\.]+)(%|cm|em|in|mm|pc|pt|)/) || [ 0, 0, "" ], size = value[1], suffix = value[2];
      return fontSize = null !== fontSize ? fontSize : /%|em/.test(suffix) && element.parentElement ? getComputedStylePixel(element.parentElement, "fontSize", null) : 16, 
      rootSize = "fontSize" === property ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight, 
      "%" === suffix ? size / 100 * rootSize : "cm" === suffix ? .3937 * size * 96 : "em" === suffix ? size * fontSize : "in" === suffix ? 96 * size : "mm" === suffix ? .3937 * size * 96 / 10 : "pc" === suffix ? 12 * size * 96 / 72 : "pt" === suffix ? 96 * size / 72 : size;
    }
    function setShortStyleProperty(style, property) {
      var borderSuffix = "border" === property ? "Width" : "", t = property + "Top" + borderSuffix, r = property + "Right" + borderSuffix, b = property + "Bottom" + borderSuffix, l = property + "Left" + borderSuffix;
      style[property] = (style[t] === style[r] && style[t] === style[b] && style[t] === style[l] ? [ style[t] ] : style[t] === style[b] && style[l] === style[r] ? [ style[t], style[r] ] : style[l] === style[r] ? [ style[t], style[r], style[b] ] : [ style[t], style[r], style[b], style[l] ]).join(" ");
    }
    function CSSStyleDeclaration(element) {
      function dasherize(property) {
        property.replace(/[A-Z]/, function(match) {
          return "-" + match.toLowerCase();
        });
      }
      var style = this, currentStyle = element.currentStyle, fontSize = getComputedStylePixel(element, "fontSize");
      for (var property in currentStyle) currentStyle.hasOwnProperty(property) && (Push.call(style, "styleFloat" === property ? "float" : dasherize(property)), 
      "width" === property ? style[property] = element.offsetWidth + "px" : "height" === property ? style[property] = element.offsetHeight + "px" : "styleFloat" === property ? style["float"] = currentStyle[property] : style[property] = /margin.|padding.|border.+W/.test(property) && "auto" !== style[property] ? Math.round(getComputedStylePixel(element, property, fontSize)) + "px" : currentStyle[property]);
      setShortStyleProperty(style, "margin"), setShortStyleProperty(style, "padding"), 
      setShortStyleProperty(style, "border"), style.fontSize = Math.round(fontSize) + "px";
    }
    var Push = Array.prototype.push;
    return CSSStyleDeclaration.prototype = {
      constructor: CSSStyleDeclaration,
      getPropertyPriority: function() {
        throw new NotSupportedError("DOM Exception 9");
      },
      getPropertyValue: function(property) {
        if (void 0 === property) throw new TypeError("Not enough arguments to CSSStyleDeclaration.getPropertyValue");
        return property = property.replace(/-\w/g, function(match) {
          return match[1].toUpperCase();
        }), "function" == typeof this[property] || property.match(/^(?:cssText|length|\d+)$/) ? "" : this[property];
      },
      item: function(index) {
        if (void 0 === index) throw new TypeError("Not enough arguments to CSSStyleDeclaration.item");
        return this[parseInt(index, 10)];
      },
      removeProperty: function() {
        throw new Error("NoModificationAllowedError: DOM Exception 7");
      },
      setProperty: function() {
        throw new Error("NoModificationAllowedError: DOM Exception 7");
      },
      getPropertyCSSValue: function() {
        throw new NotSupportedError("DOM Exception 9");
      }
    }, function(element) {
      return new CSSStyleDeclaration(element);
    };
  }, !0);
});