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
    }

};
