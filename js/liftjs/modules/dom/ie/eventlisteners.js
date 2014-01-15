define(function() {
  // TODO: Is this a bad assumption for removeEventListener, els, and doc?
  if(window.addEventListener) return false;

  // TODO: Sanity (insanity?) check like this needed?
  if(!window.attachEvent) {
    console.warn("Browser has support for neither window.addEventListener or window.attachEvent.");
    return null;
  }

  var attached_events_list = [];
  var window_events = {};

  //window.attachEvent('onunload', function() {
  //  for(fn in attached_events_list) {
  //    var attached_event = attached_events_list[fn];
  //
  //    attached_event.el.detachEvent(attached_event.name, fn);
  //  }
  //});

  function fix_event_object(e) {
    e.pageX = e.pageX || (e.clientX + document.documentElement.scrollLeft);
    e.pageY = e.pageY || (e.clientY + document.documentElement.scrollTop);
    e.target = e.target || e.srcElement;
    e.preventDefault = function() {
      e.returnValue = false;
    };

    //window.event = null;

    return e;
  }

  function shimAddEventListener(name, fn, use_capture) {
    if(use_capture) {
      throw new Error('Capture not supported in IE');
    }

    var self = this;

    var handler = function() {
      fn.call(self, fix_event_object(window.event));
    };

    this.attachEvent('on' + name, handler);

    attached_events_list.push({fn: fn, el: this, event: name, callback: handler});
  }

  function shimRemoveEventListener(name, fn, use_capture) {
    if(use_capture) {
      throw new Error('Capture not supported in IE');
    }

    for(var i = 0, _len = attached_events_list.length; i < _len; i++) {
      if(fn === attached_events_list[i].fn) {
        this.detachEvent('on' + name, attached_events_list[i].callback);
        attached_events_list.splice(i, 1);
        break;
      }
    }
  }

  function shimWindowAddEventListener(name, fn, use_capture) {
    if(use_capture) {
      throw new Error('Capture not supported in IE');
    }

    var events = window_events[name] = window_events[name] || [];
    events.push(fn);

    shimAddEventListener.call(this, name, fn, use_capture);
  }

  function shimWindowRemoveEventListener(name, fn, use_capture) {
    if(use_capture) {
      throw new Error('Capture not supported in IE');
    }

    var events = window_events[name] || [];
    var i = events.indexOf(fn);
    if(i !== -1) events.splice(i, 1);

    shimRemoveEventListener.call(this, name, fn, use_capture);
  }

  // TODO: Need to check for presense of window.addEventListener ?
  if(window.attachEvent) {
    window.addEventListener = shimWindowAddEventListener;
  }

  // TODO: Need to check for presense of window.removeEventListener ?
  if(window.detachEvent) {
    window.removeEventListener = shimWindowRemoveEventListener;
  }

  // TODO: Need to check for presense of Document.prototype.addEventListener ?
  if(HTMLDocument.prototype.attachEvent) {
    HTMLDocument.prototype.addEventListener = shimAddEventListener;
  }

  // TODO: Need to check for presense of Document.prototype.removeEventListener ?
  if(HTMLDocument.prototype.detachEvent) {
    HTMLDocument.prototype.removeEventListener = shimRemoveEventListener;
  }

  // TODO: Need to check for presense of Element.prototype.addEventListener ?
  if(Element.prototype.attachEvent) {
    Element.prototype.addEventListener = shimAddEventListener;
  }

  // TODO: Need to check for presense of Element.prototype.removeEventListener ?
  if(Element.prototype.detachEvent) {
    Element.prototype.removeEventListener = shimRemoveEventListener;
  }

  return true;
});
