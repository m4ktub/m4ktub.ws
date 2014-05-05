//
// The MIT License (MIT)
//
// Copyright (c) 2014 Cláudio Gil
//

function GameOfLife(options) {
    // cache this reference
    var self = this;

    //
    // associated canvas
    //

    var canvas = $(options.canvas || 'gol');

    //
    // initialize configuration
    //
    var config = this.config = {
        canvas: canvas,
        pattern: options.pattern
    };

    //
    // state
    //
    
    var state = this.state = {
        population: 0,

        width: canvas.width,
        height: canvas.height,

        scale: 1.0,
        center: {
            x: 0,
            y: 0
        }
    };

    var ctx = canvas.getContext("2d");
    ctx.scale(state.scale, state.scale);
    
    function createCellsArray() {
        var rows = new Array(state.height);
        for (var r = 0; r < rows.length; r++) {
            var row = new Array(state.width);
            
            for (var c = 0; c < row.length; c++) {
                row[c] = 0;
            }
            
            rows[r] = row;
        };

        return rows;
    }

    var cells = {
        cur: createCellsArray(),
        nxt: createCellsArray()
    };

    //
    // game logic
    //
    
    function wrap(v, max) {
        if (v < 0) v += max;
        if (v >= max) v -= max;
        return v;
    }

    function getCell(x, y) {
        return cells.cur[wrap(y, state.height)][wrap(x, state.width)];
    }

    function putCell(x, y, alive, current) {
        var target = current ? cells.cur : cells.nxt;
        target[wrap(y, state.height)][wrap(x, state.width)] = alive ? 1 : 0;
    }

    function neighborhood(x, y) {
        return 0 +
            getCell(x - 1, y - 1) +
            getCell(x    , y - 1) +
            getCell(x + 1, y - 1) +
            getCell(x - 1, y    ) +
            getCell(x + 1, y    ) +
            getCell(x - 1, y + 1) +
            getCell(x    , y + 1) +
            getCell(x + 1, y + 1);
    }

    function evolve() {
        state.population = 0;

        for (var y = 0; y < state.height; y++) {
            for (var x = 0; x < state.width; x++) {
                var cell = getCell(x, y);
                var allfield = cell + neighborhood(x, y);
                
                switch (allfield) {
                case 3:
                    putCell(x, y, true);
                    state.population++;
                    break;
                case 4:
                    putCell(x, y, cell);
                    state.population += cell;
                    break;
                default:
                    putCell(x, y, false);
                    break;
                }
            }
        }

        var computed = cells.nxt;
        cells.nxt = cells.cur;
        cells.cur = computed;
    }
    
    //
    // drawing
    //

    function clear() {
        ctx.clearRect(0, 0, state.width, state.height);        
    }
    
    function drawCell(x, y) {
        ctx.fillRect(x, y, 1, 1);
    }

    function draw() {
        clear();
        for (var y = 0; y < state.height; y++) {
            for (var x = 0; x < state.width; x++) {
                if (getCell(x, y)) {
                    drawCell(x, y);
                }
            }
        }
    }

    //
    // public functions
    //

    this.setPattern = function(pattern) {
        if (!pattern) {
            return;
        }

        // process lines
        var lines = $A(pattern.split(/\r?\n|\r/))
            .filter(function(l) { return !l.blank(); })
            .map(function (l) {
                return l.replace(/\s*\|([^\|]*)\|\s*/, "$1");
            });

        // calculate width
        var maxCols = $A(lines).max(function(l) {
            return l.length;
        });

        // top left corner
        var top = Math.floor(state.height / 2 - lines.length / 2);
        var left = Math.floor(state.width / 2 - maxCols / 2);

        // clear cells
        for (var y = 0; y < state.height; y++) {
            for (var x = 0; x < state.width; x++) {
                putCell(x, y, false, true);
            }
        }

        // put pattern
        state.population = 0;

        for (var dy = 0; dy < lines.length; dy++) {
            var line = lines[dy];
            
            for (var dx = 0; dx < line.length; dx++) {
                if (line.charAt(dx) != " ") {
                    putCell(left + dx, top + dy, true, true);
                    state.population++;
                }
            }
        }
    }

    this.step = function(loop) {
        evolve();
        draw();
    };

    this.reset = function(loop) {
        self.setPattern(config.pattern || "");
        draw();
    };

    //
    // initialization
    //

    this.reset();

}
