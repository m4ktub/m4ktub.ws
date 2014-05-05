//
// The MIT License (MIT)
//
// Copyright (c) 2014 Cláudio Gil
//

function GameLoop(options) {
    // cache this reference
    var self = this;

    //
    // associated game
    //

    var game = this.game = options.game;

    //
    // initialize configuration
    //
    var config = this.config = {
        controls: {
            start: undefined,
            stop: undefined,
            step: undefined,
            reset: undefined
        },
        
        beforeStart: options.beforeStart || Fn.empty,
        beforeStep: options.beforeStep || Fn.empty,
        step: options.step || game.step || Fn.empty,
        afterStep: options.afterStep || Fn.empty,
        afterStop: options.afterStop || Fn.empty,
        reset: options.reset || game.reset || Fn.empty,
        afterReset: options.afterReset || Fn.empty
    };

    for (var name in config.controls) {
        var control = (options.controls || {})[name];
        if (control) {
            config.controls[name] = $(control);
        }
    }

    //
    // state defaults
    //

    var state = this.state = {
        running: false,
        step: 0,

        animation: {
            start: undefined,
            time: undefined,
            requestId: undefined
        }
    };

    //
    // utility functions
    //

    function updateControls() {
        function enableDisable(enabled, disabled) {
            $A(enabled).compact().each(Form.Element.enable);
            $A(disabled).compact().each(Form.Element.disable);
        }

        var controls = config.controls;        

        if (state.running) {
            enableDisable(
                [ controls.stop ], 
                [ controls.start, controls.step, controls.reset ]);
        } else {
            enableDisable(
                [ controls.start, controls.step, controls.reset ], 
                [ controls.stop ]);
        }
    }

    //
    // game functions
    //

    function animate(time) {
        var animation = state.animation;

        if (!animation.start) {
            animation.start = time;
        }

        animation.time = time; 
        animation.requestId = requestAnimationFrame(animate);

        step();
    }

    function start() {
        var animation = state.animation;
        animation.requestId = requestAnimationFrame(animate);
        config.beforeStart(self);
        state.running = true;
    }

    function stop() {
        var animation = state.animation;
        cancelAnimationFrame(animation.requestId);           
        animation.requestId = undefined;
        state.running = false;
        config.afterStop(self);
    }

    function step() {
        config.beforeStep(self);
        state.step += 1;
        config.step(self);
        config.afterStep(self);
    }
    
    function reset() {
        state.step = 0;
        state.animation.start = undefined;

        config.reset(self);
        config.afterReset(self);
    }
    
    //
    // public functions
    //

    this.start = function() {
        Fn.when(!state.running, start);
        updateControls();
    };

    this.stop = function() {
        Fn.when(state.running, stop);
        updateControls();
    };
    
    this.step = function() {
        Fn.when(!state.running, step);
        updateControls();
    };
    
    this.reset = function() {
        Fn.when(!state.running, reset);
        updateControls();
    };

    //
    // initialize controls
    //

    for (var name in config.controls) {
        var control = config.controls[name];

        if (control && typeof this[name] == "function") {
            $(control).observe('click', this[name]);
        }
    }

    updateControls();
}
