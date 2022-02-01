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
        pattern: options.pattern,
    };
    
    //
    // state
    //

    var state = this.state = {
        population: 0,
        generation: 0
    };

    //
    // current cells
    //

    var cells = { };

    //
    // cell access and modification
    // 

    function getCellKey(x, y) {
        return "x" + x + "y" + y;
    }

    function getCellKeyCoords(key) {
        var yPos = key.indexOf('y');
        return { 
            x: parseInt(key.substring(1, yPos)), 
            y: parseInt(key.substring(yPos + 1))
        };
    }

    function getCell(x, y) {
        return cells[getCellKey(x, y)] || 0;
    }

    function putCell(target, x, y, alive) {
        if (!alive) {
            return;
        }

        target[getCellKey(x, y)] = 1;

        function fillNeighbor(x, y) {
            var key = getCellKey(x, y);
            target[key] = target[key] || 0;
        }

        fillNeighbor(x - 1, y - 1);
        fillNeighbor(x    , y - 1);
        fillNeighbor(x + 1, y - 1);
        fillNeighbor(x - 1, y    );
        fillNeighbor(x + 1, y    );
        fillNeighbor(x - 1, y + 1);
        fillNeighbor(x    , y + 1);
        fillNeighbor(x + 1, y + 1);
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
        // clear next
        var population = 0;
        var next = { };

        // compute next
        for (var pos in cells) {
            var coords = getCellKeyCoords(pos);
            var x = coords.x;
            var y = coords.y;

            var cell = getCell(x, y);
            var allfield = cell + neighborhood(x, y);
            
            switch (allfield) {
            case 3:
                putCell(next, x, y, true);
                population++;
                break;
            case 4:
                putCell(next, x, y, cell);
                population += cell ? 1 : 0;
                break;
            default:
                putCell(next, x, y, false);
                break;
            }
        }
        
        // update state
        state.population = population;
        state.generation += 1;

        // update cells
        cells = next;
    }

    //
    // public api
    //

    this.center = {
        x: 0,
        y: 0 
    };

    this.style = {
        background: "#fff"
    };

    this.load = function(pattern) {
        // save pattern
        config.pattern = pattern;

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
        var top = -Math.floor(lines.length / 2);
        var left = -Math.floor(maxCols / 2);

        // clear cells
        cells = {};

        // put pattern
        state.population = 0;
        for (var dy = 0; dy < lines.length; dy++) {
            var line = lines[dy];
            
            for (var dx = 0; dx < line.length; dx++) {
                if (line.charAt(dx) != " ") {
                    state.population++;
                    putCell(cells, left + dx, top + dy, true);
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
