/*!
* LiftJS Javascript Library v0.2.4
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";

  // Originally from:
  // https://github.com/shawnbot/aight/blob/master/js/computed-style.js

  if(window.getComputedStyle) { return false; }

  function NotSupportedError(message) {
    this.message = message;
  }
  NotSupportedError.prototype = new Error();
  NotSupportedError.prototype.name = 'NotSupportedError';

  window.getComputedStyle = function shimGetComputedStyle() {
    var Push = Array.prototype.push;

    function getComputedStylePixel(element, property, fontSize) {
      var
      value = element.currentStyle[property].match(/([\d\.]+)(%|cm|em|in|mm|pc|pt|)/) || [0, 0, ''],
      size = value[1],
      suffix = value[2],
      rootSize;

      fontSize = fontSize !== null ? fontSize : /%|em/.test(suffix) && element.parentElement ? getComputedStylePixel(element.parentElement, 'fontSize', null) : 16;
      rootSize = property === 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;

      return suffix === '%' ? size / 100 * rootSize :
             suffix === 'cm' ? size * 0.3937 * 96 :
             suffix === 'em' ? size * fontSize :
             suffix === 'in' ? size * 96 :
             suffix === 'mm' ? size * 0.3937 * 96 / 10 :
             suffix === 'pc' ? size * 12 * 96 / 72 :
             suffix === 'pt' ? size * 96 / 72 :
             size;
    }

    function setShortStyleProperty(style, property) {
      var
      borderSuffix = property === 'border' ? 'Width' : '',
      t = property + 'Top' + borderSuffix,
      r = property + 'Right' + borderSuffix,
      b = property + 'Bottom' + borderSuffix,
      l = property + 'Left' + borderSuffix;

      style[property] = (style[t] === style[r] && style[t] === style[b] && style[t] === style[l] ? [ style[t] ] :
                         style[t] === style[b] && style[l] === style[r] ? [ style[t], style[r] ] :
                         style[l] === style[r] ? [ style[t], style[r], style[b] ] :
                         [ style[t], style[r], style[b], style[l] ]).join(' ');
    }

    function CSSStyleDeclaration(element) {
      var
      style = this,
      currentStyle = element.currentStyle,
      fontSize = getComputedStylePixel(element, 'fontSize');

      function dasherize(property) {
        property.replace(/[A-Z]/, function(match) {
          return '-' + match.toLowerCase();
        });
      }

      for (var property in currentStyle) {
        if(currentStyle.hasOwnProperty(property)) {
          Push.call(style, property === 'styleFloat' ? 'float' : dasherize(property));

          if (property === 'width') {
            style[property] = element.offsetWidth + 'px';
          } else if (property === 'height') {
            style[property] = element.offsetHeight + 'px';
          } else if (property === 'styleFloat') {
            style['float'] = currentStyle[property];
          } else if (/margin.|padding.|border.+W/.test(property) && style[property] !== 'auto') {
            style[property] = Math.round(getComputedStylePixel(element, property, fontSize)) + 'px';
          } else {
            style[property] = currentStyle[property];
          }
        }
      }

      setShortStyleProperty(style, 'margin');
      setShortStyleProperty(style, 'padding');
      setShortStyleProperty(style, 'border');

      style.fontSize = Math.round(fontSize) + 'px';
    }

    CSSStyleDeclaration.prototype = {
      constructor: CSSStyleDeclaration,
      getPropertyPriority: function () {
        throw new NotSupportedError('DOM Exception 9');
      },
      getPropertyValue: function (property) {
        if (property === undefined) {
          throw new TypeError('Not enough arguments to CSSStyleDeclaration.getPropertyValue');
        }
        property = property.replace(/-\w/g, function (match) {
          return match[1].toUpperCase();
        });
        return (typeof this[property] === 'function' ||
          property.match(/^(?:cssText|length|\d+)$/)) ? '' : this[property];
      },
      item: function (index) {
        if(index === undefined) {
          throw new TypeError('Not enough arguments to CSSStyleDeclaration.item');
        }
        return this[parseInt(index, 10)];
      },
      removeProperty: function () {
        throw new Error('NoModificationAllowedError: DOM Exception 7');
      },
      setProperty: function () {
        throw new Error('NoModificationAllowedError: DOM Exception 7');
      },
      getPropertyCSSValue: function () {
        throw new NotSupportedError('DOM Exception 9');
      }
    };

    return function (element) {
      return new CSSStyleDeclaration(element);
    };
  };


  return true;
});


