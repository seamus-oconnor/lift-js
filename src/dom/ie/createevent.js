define(function(elmod) {
  "use strict";

  if(document.createEvent) return false;

  document.createEvent = function shimCreateEvent(type) {
    var e = document.createEventObject();

    e.CAPTURING_PHASE = 1;
    e.AT_TARGET = 2;
      e.BUBBLING_PHASE = 3;

    e.type = undefined;
    e.target = undefined;
    e.currentTarget = undefined;
    e.eventPhase = undefined;
    e.bubbles = undefined;
    e.cancelable = undefined;
    e.timeStamp = undefined;
    e.view = undefined;

    e.stopPropagation = function() {
      if(this.cancelable) {
        this.cancelBubble = true;
      }
    };
    e.preventDefault = function() {
      if(this.cancelable) {
        this.returnValue = false;
      }
    };

    e.initEvent = function(eventTypeArg, canBubbleArg, cancelableArg) {
      this.timeStamp = new Date();
      this.type = eventTypeArg;
      this.bubbles = canBubbleArg;
      this.cancelable = cancelableArg;

      // IE specific
      this.cancelBubble = true;
    };

    var parent_type = null;

    if(type === 'UIEvents') {
      e.initUIEvent = function(eventTypeArg, canBubbleArg, cancelableArg, viewArg, detailArg) {
        this.view = viewArg;
        this.detail = detailArg;

        this.initEvent(eventTypeArg, canBubbleArg, cancelableArg);
      };
    } else if(type === 'MouseEvents') {
      e.initMouseEvent = function(eventTypeArg, canBubbleArg, cancelableArg, viewArg, detailArg, screenXArg, screenYArg, clientXArg, clientYArg, ctrlKeyArg, altKeyArg, shiftKeyArg, metaKeyArg, buttonArg, relatedTargetArg) {
        this.screenX = screenXArg;
        this.screenY = screenYArg;
        this.clientX = clientXArg;
        this.clientY = clientYArg;
        this.ctrlKey = ctrlKeyArg;
        this.shiftKey = shiftKeyArg;
        this.altKey = altKeyArg;
        this.metaKey = metaKeyArg;
        this.button = buttonArg;
        this.relatedTarget = relatedTargetArg;

        this.initUIEvent(eventTypeArg, canBubbleArg, cancelableArg, viewArg, detailArg);
      };
    } else if(type === 'HTMLEvents') { // NOTE: Should this be empty?
    } else {
      throw new Error('IE doesn\'t support createEvent with ' + type + ' type.');
    }

    return e;
  };

  return true;
});
