//
// The MIT License (MIT)
//
// Copyright (c) 2014 Cláudio Gil
//

function Automaton(options) {

    // cache this reference
    var self = this;

    //
    // associated canvas and context
    //

    var canvas = $(options.canvas || 'gol');
    var ctx = canvas.getContext("2d");

    //
    // associated automaton
    //

    var automaton = this.automaton = options.automaton;

    //
    // initialize configuration
    //

    var config = this.config = {
        canvas: canvas,
        automaton: automaton,

        zoom: {
            inc: 1.1,
            dec: 0.9,
            max: 20.0,
            min: 0.2
        }
    };

    //
    // state
    //
    
    var state = this.state = {
        width: canvas.width,
        height: canvas.height,
        
        scale: 1.0,
        top: 0.0,
        left: 0.0,

        mouse: {
            x: undefined,
            y: undefined,
            drag: {
                active: false,
                x: undefined,
                y: undefined,
            }
        }
    };

    var mouse = state.mouse;
    var drag = mouse.drag;

    //
    // drawing
    //

    function clear() {
        ctx.fillStyle = automaton.view.style.background || "#FFFFFF";
        ctx.clearRect(0, 0, state.width, state.height);        
    }
    
    function drawCell(x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    function draw() {
        // clear everything so we only need to draw the pixels
        clear();

        // resolutions
        var ppc = state.scale;     // pixels per cell (float)
        var cpp = 1 / state.scale; // cells per pixel (float)
        
        // cell position in the top left corner
        var cx0 = state.left;
        var cy0 = state.top;

        // offset for the top left pixel of the cell in the top left corner
        var px0 = ppc * (Math.floor(cx0) - cx0);
        var py0 = ppc * (Math.floor(cy0) - cy0);

        // get color fox each pixel
        for (var pyf = py0, cyf = cy0; 
             pyf < state.height; 
             pyf += Math.max(1, ppc), cyf += Math.max(1, cpp)) 
        {
            var pyi = Math.floor(pyf);
            var cyi = Math.floor(cyf);
            var cydelta = Math.max(1, Math.floor(cyf + cpp) - cyi);
            var pydelta = Math.max(1, Math.floor(pyf + ppc) - pyi);

            for (var pxf = px0, cxf = cx0; 
                 pxf < state.width; 
                 pxf += Math.max(1, ppc), cxf += Math.max(1, cpp)) 
            {
                var pxi = Math.floor(pxf);
                var cxi = Math.floor(cxf);
                var pxdelta = Math.max(1, Math.floor(pxf + ppc) - pxi);
                var cxdelta = Math.max(1, Math.floor(cxf + cpp) - cxi);

                // The automaton is asked to generate a color representing
                // the combination of all cells in a square cxdelta x cydelta 
                // starting at (cxi, cyi). If scale >= 1 then delta = 1 and
                // this obtains the color for a single cell.
                var color = automaton.getColor(cxi, cyi, cxdelta, cydelta);
                if (color) {
                    drawCell(pxi, pyi, pxdelta, pydelta, color);
                }
            }
        }
    }

    //
    // events
    //

    $(canvas).observe('mousedown', function(event) {
        if (!event.isLeftClick()) {
            return;
        }

        drag.active = true;
        drag.x = event.pointerX();
        drag.y = event.pointerY();
    });

    $(canvas).observe('mouseup', function(event) {
        drag.active = false;
        drag.x = undefined;
        drag.y = undefined;
    });

    $(canvas).observe('mouseout', function(event) {
        drag.active = false;
        drag.x = undefined;
        drag.y = undefined;
    });

    $(canvas).observe('mousemove', function(event) {
        // save position whenever mouse moves around
        var px = mouse.x = event.pointerX();
        var py = mouse.y = event.pointerY();

        // avoid doing anything else if drag is not active
        if (!drag.active) {
            return;
        }

        // calculate drag in pixels
        var pdx = px - drag.x;
        var pdy = py - drag.y;

        // save current position
        drag.x = px;
        drag.y = py;

        // pixels to cells
        var cpp = 1 / state.scale; // cells per pixel (float)
        var cdx = pdx * cpp;
        var cdy = pdy * cpp;
        
        // translate view
        state.left -= cdx;
        state.top -= cdy;

        // draw
        draw();
    });

    $(canvas).observe('mouseout', function(event) {
        drag.active = false;
        drag.x = undefined;
        drag.y = undefined;
    });

    $(canvas).observe('mousewheel', function(event) {
        // stop page from scrolling
        Event.stop(event);

        // choose factor according to wheel direction
        var zoomfactor = event.wheelDelta > 0 
            ? config.zoom.inc
            : config.zoom.dec;

        // new scale and conversion factors
        var newscale = Fn.limitTo(config.zoom.min, 
                                  config.zoom.max, 
                                  state.scale * zoomfactor);

        var oldcpp = 1 / state.scale;
        var newcpp = 1 / newscale;

        // find relative px and py
        var offset = Fn.getOffset(canvas);
        var px = mouse.x - offset.left;
        var py = mouse.y - offset.top;

        // calculate cell offset
        var cdx = px * newcpp - px * oldcpp;
        var cdy = py * newcpp - py * oldcpp;

        // apply scale and offsets
        state.scale = newscale;
        state.left -= cdx;
        state.top -= cdy;

        // redraw
        draw();
    });

    //
    // public functions
    //

    this.step = function(loop) {
        automaton.step();
        draw();
    };

    this.reset = function(loop) {
        state.scale = 1.0;
        state.top = automaton.view.top;
        state.left = automaton.view.left;

        automaton.reset();
        draw();
    };
}
