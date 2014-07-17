//
// The MIT License (MIT)
//
// Copyright (c) 2014 Cláudio Gil
//

//
// Simple utility functions.
//
var Fn = {

    // shorter alias for empty function
    empty: Prototype.emptyFunction,

    // shorter alias for identity function
    K: Prototype.K,

    // execute operation when condition is true
    when: function(condition, operation) {
        var value = typeof condition == "function" 
            ? condition() 
            : condition;

        if (value) {
            operation();
        }
    },

    // execute operation when condition is not true
    unless: function(condition, operation) {
        var value = typeof condition == "function" 
            ? condition() 
            : condition;

        if (!value) {
            operation();
        }
    },
    
    // obtains a possibily nested property from an object
    oget: function(object, property, defValue) {
        // split list
        var list = typeof property == "string" 
            ? property.split(".") 
            : property;
        
        var getf = function(obj, prop) {
            if ((obj != null ? obj[prop] : undefined) == undefined) {
                return;
            }
            
            return obj[prop];
        };

        var current = object;
        for (var i = 0; i < list.length; i++) {
            // break when no more iteration is possible
            if (typeof current != "object") {
                break;
            }

            // consider null object explicitly
            if (current == null) {
                current = undefined;
                break;
            }

            // iterate
            current = current[list[i]];
        }

        // return value of default
        return current === undefined ? defValue : current;
    },

    getOffset: function(el) {
        var x = 0;
        var y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            x += el.offsetLeft - el.scrollLeft;
            y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }

        return { top: y, left: x };
    },

    limitTo: function(min, max, num) {
        return Math.max(min, Math.min(max, num));
    }

};
