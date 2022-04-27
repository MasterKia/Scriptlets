(function(source, args){
function ATInternetSmartTag(source) {
  var setNoopFuncWrapper = {
    set: noopFunc
  };
  var sendNoopFuncWrapper = {
    send: noopFunc
  };
  var ecommerceWrapper = {
    displayCart: {
      products: setNoopFuncWrapper,
      cart: setNoopFuncWrapper
    },
    updateCart: {
      cart: setNoopFuncWrapper
    },
    displayProduct: {
      products: setNoopFuncWrapper
    },
    displayPageProduct: {
      products: setNoopFuncWrapper
    },
    addProduct: {
      products: setNoopFuncWrapper
    },
    removeProduct: {
      products: setNoopFuncWrapper
    }
  }; // eslint-disable-next-line new-cap, func-names

  var tag = function tag() {};

  tag.prototype = {
    setConfig: noopFunc,
    setParam: noopFunc,
    dispatch: noopFunc,
    customVars: setNoopFuncWrapper,
    publisher: setNoopFuncWrapper,
    order: setNoopFuncWrapper,
    click: sendNoopFuncWrapper,
    clickListener: sendNoopFuncWrapper,
    internalSearch: {
      set: noopFunc,
      send: noopFunc
    },
    ecommerce: ecommerceWrapper,
    identifiedVisitor: {
      unset: noopFunc
    },
    page: {
      set: noopFunc,
      send: noopFunc
    },
    selfPromotion: {
      add: noopFunc,
      send: noopFunc
    },
    privacy: {
      setVisitorMode: noopFunc,
      getVisitorMode: noopFunc,
      hit: noopFunc
    },
    richMedia: {
      add: noopFunc,
      send: noopFunc,
      remove: noopFunc,
      removeAll: noopFunc
    }
  };
  var smartTagWrapper = {
    Tracker: {
      Tag: function Tag() {
        return new tag(); // eslint-disable-line new-cap
      }
    }
  };
  window.ATInternet = smartTagWrapper;
  hit(source);
}
function hit(source, message) {
  if (source.verbose !== true) {
    return;
  }

  try {
    var _log = console.log.bind(console);

    var trace = console.trace.bind(console); // eslint-disable-line compat/compat

    var prefix = source.ruleText || '';

    if (source.domainName) {
      var AG_SCRIPTLET_MARKER = '#%#//';
      var UBO_SCRIPTLET_MARKER = '##+js';
      var ruleStartIndex;

      if (source.ruleText.indexOf(AG_SCRIPTLET_MARKER) > -1) {
        ruleStartIndex = source.ruleText.indexOf(AG_SCRIPTLET_MARKER);
      } else if (source.ruleText.indexOf(UBO_SCRIPTLET_MARKER) > -1) {
        ruleStartIndex = source.ruleText.indexOf(UBO_SCRIPTLET_MARKER);
      } // delete all domains from ruleText and leave just rule part


      var rulePart = source.ruleText.slice(ruleStartIndex); // prepare applied scriptlet rule for specific domain

      prefix = "".concat(source.domainName).concat(rulePart);
    } // Used to check if scriptlet uses 'hit' function for logging


    var LOG_MARKER = 'log: ';

    if (message) {
      if (message.indexOf(LOG_MARKER) === -1) {
        _log("".concat(prefix, " message:\n").concat(message));
      } else {
        _log(message.slice(LOG_MARKER.length));
      }
    }

    _log("".concat(prefix, " trace start"));

    if (trace) {
      trace();
    }

    _log("".concat(prefix, " trace end"));
  } catch (e) {// try catch for Edge 15
    // In according to this issue https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14495220/
    // console.log throws an error
  } // This is necessary for unit-tests only!


  if (typeof window.__debug === 'function') {
    window.__debug(source);
  }
}
function noopFunc() {};
        const updatedArgs = args ? [].concat(source).concat(args) : [source];
        try {
            ATInternetSmartTag.apply(this, updatedArgs);
        } catch (e) {
            console.log(e);
        }
    
})({"name":"ati-smarttag","args":[]}, []);