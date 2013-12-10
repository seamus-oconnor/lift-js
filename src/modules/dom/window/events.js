define(function(elmod) {
  "use strict";

  try {
    new window.CustomEvent();
    return false;
  } catch(e) {}

  function shimCreateEvent(klass, type, properties) {
    if(!type) { throw new TypeError("Not enough arguments to Event.constructor."); }
    if(properties !== undefined && typeof properties !== 'object') { throw new TypeError("Value can't be converted to a dictionary."); }

    properties = properties || {};

    function getEvent() {
      try {
        return document.createEvent(klass);
      } catch(e) {
        // FF < 6 doesn't support CustomEvents so just use a regular event and
        // cram on a .detail property.
        var old_klass = klass;
        klass = 'Event';
        var evt = document.createEvent(klass);
        if(old_klass == 'CustomEvent') {
          evt.detail = properties.detail;
        }
        return evt;
      }
    }

    var evt = getEvent();
    var initFn = evt['init' + klass];
    switch(klass) {
      case 'Event':
        initFn.call(evt, type, !!properties.bubbles, !!properties.cancelable);
        break;
      case 'CustomEvent':
        initFn.call(evt, type, !!properties.bubbles, !!properties.cancelable, properties.detail);
        break;
      case 'UIEvent':
        initFn.call(evt, type,
          !!properties.bubbles,
          !!properties.cancelable,
          properties.view || window,
          properties.detail || 1
        );
        break;
      case 'MouseEvent':
        initFn.call(evt, type,
          !!properties.bubbles,
          !!properties.cancelable,
          properties.view || window,
          properties.detail,
          properties.screenX,
          properties.screenY,
          properties.clientX,
          properties.clientY,
          properties.ctrlKey,
          properties.altKey,
          properties.shiftKey,
          properties.metaKey,
          properties.button,
          properties.relatedTarget || null
        );

        break;
    }

    return evt;
  }

  var events = [
    'Event',
    'CustomEvent',
    'UIEvent',
    'MouseEvent'
  ];

  function buildEvent(name) {
    return function(type, properties) {
      return shimCreateEvent(name, type, properties);
    };
  }

  for(var i = events.length - 1; i >= 0; i--) {
    var name = events[i];
    var klass = buildEvent(name);

    klass.prototype = (window[name] || window['Event']).prototype;
    window[name] = klass;
  }

  return true;
});
