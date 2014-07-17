//
// The MIT License (MIT)
//
// Copyright (c) 2014 Cláudio Gil
//

function GameOfLife(options) {

    //
    // config
    //

    var config = {
        height: options.height,
        width: options.width,
        pattern: options.pattern
    };
    
    //
    // state
    //

    var state = this.state = {
        population: 0,
        generation: 0
    };

    //
    // current and next generation cells
    //

    function createCellsArray() {
        var rows = new Array(config.height);
        for (var r = 0; r < rows.length; r++) {
            var row = new Array(config.width);
            
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
    // cell access and modification
    // 

    function wrap(v, max) {
        while (v < 0) v += max;
        while (v >= max) v -= max;
        return v;
    }

    function getCell(x, y) {
        return cells.cur[wrap(y, config.height)][wrap(x, config.width)];
    }

    function putCell(target, x, y, alive) {
        target[wrap(y, config.height)][wrap(x, config.width)] = alive ? 1 : 0;
    }

    //
    // evolution
    //

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
        // compute next
        var population = 0;

        for (var y = 0; y < config.height; y++) {
            for (var x = 0; x < config.width; x++) {
                var cell = getCell(x, y);
                var allfield = cell + neighborhood(x, y);
                
                switch (allfield) {
                case 3:
                    putCell(cells.nxt, x, y, true);
                    population++;
                    break;
                case 4:
                    putCell(cells.nxt, x, y, cell);
                    population += cell ? 1 : 0;
                    break;
                default:
                    putCell(cells.nxt, x, y, false);
                    break;
                }
            }
        }
        
        // update state
        state.population = population;
        state.generation += 1;

        // swap cells
        var computed = cells.nxt;
        cells.nxt = cells.cur;
        cells.cur = computed;
    }

    //
    // public api
    //

    this.view = {
        // the view coords
        top: 0,
        left: 0,
        bottom: config.height - 1,
        right: config.width - 1,

        // the colors
        style: {
            background: "#fff"
        }
    };

    this.load = function(pattern) {
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

        // top left corner of pattern
        var top = Math.floor(config.height / 2 - lines.length / 2);
        var left = Math.floor(config.width / 2 - maxCols / 2);

        // clear cells
        for (var y = 0; y < config.height; y++) {
            for (var x = 0; x < config.width; x++) {
                putCell(cells.cur, x, y, false);
            }
        }

        // put pattern
        state.population = 0;
        for (var dy = 0; dy < lines.length; dy++) {
            var line = lines[dy];
            
            for (var dx = 0; dx < line.length; dx++) {
                if (line.charAt(dx) != " ") {
                    state.population++;
                    putCell(cells.cur, left + dx, top + dy, true);
                }
            }
        }
    };

    this.reset = function() {
        state.generation = 0;
        this.load(config.pattern);
    };

    this.step = function() {
        evolve();
    };
    
    this.getColor = function(x, y, width, height) {
        var count = 0;

        for (var h = 0; h < height; h++) {
            for (var w = 0; w < width; w++) {
                if (getCell(x + h, y + h)) {
                    count++;
                }
            }
        }

        var area = width * height;
        var color = 255 - Math.round(255 * count / area);
        if (count > 0) {
            return "rgb(" + color + "," + color + "," + color + ")";
        }
        else {
            return false;
        }
    };
}
