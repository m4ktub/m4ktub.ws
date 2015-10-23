---
s: game-of-life-experiment
title: Game of Life
date: 2014-08-12
categories: experiments
experiment: game-of-life
tags: [cellular, automaton, gol, canvas]
thumbnail: /images/gol-glider.png
---

The [Conway's Game of Life][wp1] is a simple cellular automaton that has always
captured  my attention. So, as a first experiment I'm doing an HTML and
Javascript implementation of the game. There are several implementations out
there. A simple Google search shows me [1][gg1], [2][gg2], and [3][gg3]. The
first two are simple experiments, and the last seems interested in
performance. With [this experiment][ex1] I use simple JavaScript and the HTML 5
Canvas primitives to provide a Game Of Life implementation with basic features
like: infinite canvas, pan, zoom, and some sample patterns to load and get
going.

My main interest is to use the canvas, to play around with it's API, and to make
things reusable for the next experiments. For example, I would like to reuse all
the drag, zoom and painting logic when doing another celular automaton. I think
the reusability can be seen in the setup above bellow.

``` javascript
var loop = new AnimationLoop({
  ...
  game: new CellAutomaton({
    scale: 5.0,
    canvas: canvas,
    algorithm: new GameOfLife({
      pattern: pattern
    })
  }),
  ...
});
```

It's a composition of:

  * **an animation loop** to provide the notion of animation, starting, stoping,
    and frame by frame iteration.
  * a **cellular automaton** to integrate the visible aspect of an automaton
    (drawing, draging, zooming) with the invisible aspect (the algorithm).
  * and **game of life** itself that takes an initial pattern and calculates
    each successive generation.

Those partes where implemented from scratch but a few external dependencies
where used to complete the experiment.

External Frameworks
-------------------

This first thing I've evaluated was whether I should use a Javascript framework
or not, to provide *advanced* features. I did not have a particular criteria but
a class system and some HTML utilities seemed desirable. MooTools and Dojo are
modularized and provide a lot of features. Nevertheless, for such a simple thing
it seems too be imposing too much on everything that comes next and may want to
reuse something. An exception was made for [Prototype JS][pjs] which basically
provides some of the primitives Javascript should have and a compatibility layer
for the HTML event system. It is also relatively easy to remove if needed.

Besides Prototype, to provide a consistent interface in this time of turbulence,
I've also used [Oleg's Animation Frame][oaf]. If the browser provides
[animation frames][jaf] natively it is not needed and it does little (delegating
to the browser unless a specific frame rate is asked).

Animation Loop
--------------

The animation loop has the responsability of driving the game forward frame by
frame or step by step. But, in the tradicional *input-update-render* game loop
this object only handles the update part. This means the input processing and
rendering is left for the game object that is passed to the loop.

Since the animation loop only deals with the timing of steps and the concept of
animation it has no reference of a canvas. It simply supports:

  * control buttons,
  * animation hooks that are called before or after each step,
  * and a game object to do the rest.

First the animation frames support is ensured by activating Oleg's shim. This is
done outside of the animation loop because the browser may already support it
well enough and it quickly becomes and unecessary dependency.

``` javascript
 // provide consistent animation frames
 AnimationFrame.shim();
```

Within the animation loop, the initialization prepares all the hooks. The game
step and reset functions are also considered hooks which allows a page to
decorate those game functions without modifying the game.

``` javascript
var config = this.config = {
  ...

  step: options.step || game.step || Fn.empty,
  reset: options.reset || game.reset || Fn.empty,

  beforeStart: options.beforeStart || Fn.empty,
  beforeStep: options.beforeStep || Fn.empty,
  afterStep: options.afterStep || Fn.empty,
  afterStop: options.afterStop || Fn.empty,
  afterReset: options.afterReset || Fn.empty
};
```

The animation loop provides four main functions `start`, `stop`, `reset`, and
`reset`. For each of this a control button (or any clicable thing) is permited
as a option. Since each controls is optional the initialization is done in three
steps. First the control options are defined unitialized, in the configuration,
to enumerate the options.

``` javascript
var config = this.config = {
  controls: {
    start: undefined,
    stop: undefined,
    step: undefined,
    reset: undefined
  },
  ...
}
```

Afterwards, for each control configuration, the corresponding control is
initialized from the given options. If specified then the configuration is set
with the corresponding element.

``` javascript
for (var name in config.controls) {
  var control = Fn.oget(options.controls, name);
  if (control) {
    config.controls[name] = $(control);
  }
}
```

The final step is to bind each click in the control with one of the animation
loop's public functions. The controls in the configuration and the public
functions match and it's easy to keep it that way so the type checking, for the
public function, is more of an assert that confirms the value is a valid event
handler to the `observe` function.

``` javascript
for (var name in config.controls) { 
  var control = config.controls[name];

  if (control && typeof this[name] == "function") {
    $(control).observe('click', this[name]);
  }
}
```

Each public function has the same structure. It considers if the animation is
running or paused, calls the internal function and updates the control
visibility. For example, the `start` function is show below.

``` javascript
this.start = function() {
  Fn.when(!state.running, start);
  updateControls();
};
```

The controls update is relatively simple. If the game is running then only the
*stop* button is enabled. If the game is stopped then the other buttons are
enabled. The internal function updates animation loop, calls the appropriate
hooks, and updates the internal state. In the case of the `start` function,
shown bellow, a new animation is scheduled and the state is set to *running*
after calling the `beforeStart` hook.

``` javascript
function start() {
  var animation = state.animation;
  animation.requestId = requestAnimationFrame(animate);
  config.beforeStart(self);
  state.running = true;
}
```

We can see that the `animation` function is the *core* of the animation loop. It
keeps the loop alive by continuously requesting another animation frame and
performs one step. As long as each step takes less than 16ms to complete (at
60 fps) then the animation loop is fluid. But if computing the next state and
drawing the canvas takes longer, it starts to slow down.

``` javascript
function animate(time) {
  var animation = state.animation;

  if (!animation.start) {
    animation.start = time;
  }

  animation.time = time; 
  animation.requestId = requestAnimationFrame(animate);

  step();
}
```

The `step` function does not consider the animation. It simply calls any before
and after hooks, updates the frame count and delegates to the game object (or
any step hook that was provided). This allows the step function to be the same
function called when the user presses the configured step button, when the game
is not running.

``` javascript
function step() {
  config.beforeStep(self);
  state.frame += 1;
  config.step(self);
  config.afterStep(self);
}
```

The other public functions are similar to this case. The `reset` function is
similar to the `step` in the aspect that it does not consider the animation. And
the `stop` uses `cancelAnimationFrame`, to cancel any pending request, and
resets the internal state.

Cellular automaton
-------------------

The cellular automaton uses a canvas to provide a visualization, for the Game of
Life algorithm, and to control the interactivity with the user. The colors for
each pixel are actually calculated by the algorithm but the cellular automaton
object controls scalling and other cell-to-pixel mappings and decorations.

First the cellular automaton initializes the canvas to provide the 2D drawing
context.

``` javascript
var canvas = $(options.canvas);
var ctx = canvas.getContext("2d");
```

The initial configuration is very simple and presently only captures the initial
canvas, algorithm, and provides defaults for the initial scale and the zooming
limits.

``` javascript
var config = this.config = {
  canvas: canvas,
  automaton: automaton,

  scale: 1.0,
  zoom: {
    inc: 1.1,
    dec: 0.9,
    max: 20.0,
    min: 0.2
  }
};
```

The initial state specifies the current scale, the cell position of the top left
corner of the canvas, and mouse related information which is starts
uninitialized. Initially we also assume a scale of 1 and that the top-left
position is in `(0.0, 0.0)`. The adjustements to scale and top-left position are
made when `reset` is called. That will be shown later. 

``` javascript
var state = this.state = {
  scale: 1.0,
  top: 0.0,
  left: 0.0,

  mouse: {
    ...
  }
};
```

The scale represents the number of pixels that correspond to a single cell. So a
scale of 5.0 means one cell is represented by 5 pixels, and a scale
of 0.5 means 1 pixel represents two cells. In this last case the algorithm is
responsible for producing a combined color. The top left indicates the cell
coordinate of the top left corner of the canvas. It can be a decimal value
like 0.5, specially if the scale is bigger than 1.0 because we can still drag
the canvas pixel by pixel.

The scale and top-left positions are changed by zooming (by using the
mouse-wheel) and panning (by dragging), respectivly. This values impact on the
drawing of the canvas. At the start of every redraw the vancas is cleared. The
algorithm can provide a background. This allows the algorithm to provide colors
for alive cells.

``` javascript
function clear() {
  ctx.fillStyle = algorithm.style.background || "#FFFFFF";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
```

Cells are drawn as rectangles of the color provided by the algorithm. Due to
scaling, the algorithm may be asked for the color of several cells at once
(scale > 1). This means a pixel (1x1 rectangle) will have a combined color
provided by the algorithm. When the scale is between 0 and 1 then the color of a
single cell is used to fill more than 1 pixel.

``` javascript
function drawCell(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}
```

These functions are used in the main draw function as shown bellow, in
parts. First the canvas is cleared and all constants are defined. 

``` javascript
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
```

Interesting constants are:

  * **ppc**: The number of pixels per cell. The same as the scale.
  * **cpp**: The number of cells per pixel. The inverse of the scale.
  * **cx0** and **cy0**: The position of the cell visible in the top left corner
    of the canvas. This position may be something like (1.5, 2.2), meaning the
    cell (1, 2) for the algorithm.
  * **px0** and **py0**: The position of the pixel corresponding to the top left
    corner of the cell in the top left corner of the canvas. This is a mouth
    full best represented by the following image.

![](/images/gol-topleft-points.png 'Diagram of top-left points.')
{: .center}

In the image we have point `(px0, py0) = (-2.0, -2.0)`. The point `(cx0, cy0)`
has two type of coordinates. The coordinates in the canvas, in pixels, are not
interesting because they are always `(0, 0)` and we need to draw a rectangle
starting at `(px0, py0)` with a side of `pcc` length. That's why the top-left
position in kept in cell coordinates and the `pcc` is used to calculate the
position `(px0, py0)`.

With this starting values with iterate over the canvas in `ppc` increments and
over the cells in `cpp` increments. This values are obviously limited to a
minimum of 1, because we move at least 1 pixel and 1 cell. This iteration is
limited by the canvas width or height. This means we assume the cell coordinate
space is infinite and the algorithm must be prepared to accept requests for any
coordinate.

``` javascript
  // get color fox each pixel
  for (var pyf = py0, cyf = cy0; 
       pyf < canvas.height; 
       pyf += Math.max(1, ppc), cyf += Math.max(1, cpp)) 
  {
      var pyi = Math.floor(pyf);
      var cyi = Math.floor(cyf);
      var cydelta = Math.max(1, Math.floor(cyf + cpp) - cyi);
      var pydelta = Math.max(1, Math.floor(pyf + ppc) - pyi);

      for (var pxf = px0, cxf = cx0; 
           pxf < canvas.width; 
           pxf += Math.max(1, ppc), cxf += Math.max(1, cpp)) 
      {
          var pxi = Math.floor(pxf);
          var cxi = Math.floor(cxf);
          var pxdelta = Math.max(1, Math.floor(pxf + ppc) - pxi);
          var cxdelta = Math.max(1, Math.floor(cxf + cpp) - cxi);

          ...
      }
  }
```

The intermediary values calculated in each iteration are the integers:

  * **pxi** and **pyi**: The current position in pixels. A square will be drawn
    in the canvas starting at that position.
  * **cxi** and **cyi**: The current cell position. The cell at that position
    will be considered.
  * **pxdelta** and **pydelta**: The width and height of the square being drawn
    in the canvas.
  * **cxdelta** and **cydelta**: The horizontal and vertical number of cells,
    starting at *cxi* and *cyi*, for which a color will be asked.

Iterating over the floating values and then taking the floor of the value allows
for a stable and smoother step, specially when we introduce dragging and decimal
values for `(cx0, cy0)`. When we pass, for example, from the cell position
`(0.9, 0.9)` to `(1.0, 1.0)` then `(px0, py0)` jumps from a negative value to
`(0.0, 0.0)`. In the same way, with a `ppc` of 1.8, for example, we sometimes
jump in increments of 1 and other times have and increment of 2. That increment
size also defines the pixel and cell deltas used to retrive the color and paint
the result.

The main part of the drawing algorithm is conceptually very simple. Ask the
algorithm for the color of a bunch of cells and, if there is a color for those
cells paint a square of the appropriate size. If the scale is bigger than 1.0
then, for each cell, we draw a big square. If the scale is less than 1.0 then we
get the color of several cells and draw a single pixel. Obvisouly, at 1.0 we
have deltas of 1 and a match between pixels and cells.

``` javascript
    var color = algorithm.getColor(cxi, cyi, cxdelta, cydelta);
    if (color) {
      drawCell(pxi, pyi, pxdelta, pydelta, color);
    }
```

The `draw` function is used from the automaton public `step` and `reset`
functions. These provide the connection with the game loop: for each frame there
is a step in the algorithm and a redraw. In the `reset`, the positions and
scaling are reset before reseting the algorithm and also redrawing.

``` javascript
this.step = function(loop) {
  algorithm.step();
  draw();
};

this.reset = function(loop) {
  // set the initial top-left position based on the algorithm center
  var center = algorithm.center;

  state.top = center.y - Math.floor(canvas.height / 2);
  state.left = center.x - Math.floor(canvas.width / 2);

  // apply the initial scale which might move the top-left
  applyScale(
    config.scale, 
    Math.floor(canvas.width / 2), 
    Math.floor(canvas.height / 2));

  // reset algorithm
  algorithm.reset();

  // and redraw
  draw();
};
```

The `applyScale` function sets the current scale but also updates the top-left
corner. This allows for a *centered* scaling, that is, to keep a certain cell
under the same pixel of the canvas. When using an initial scale different than
one this moves the top-left corner further way or closer to the center indicated
by the algorithm.

``` javascript
function applyScale(newscale, x, y) {
  // new and old cpp
  var oldcpp = 1 / state.scale;
  var newcpp = 1 / newscale;

  // calculate cell offset
  var cdx = x * newcpp - x * oldcpp;
  var cdy = y * newcpp - y * oldcpp;

  // apply scale and offsets
  state.scale = newscale;
  state.left -= cdx;
  state.top -= cdy;
}
```

The function shown above, updates the top-left corner by converting a pixel
position, in the canvas, to a cell position and then comparing that position,
before and after scalling, to determine an offset. Using a pixel position for
the center of the scaling is particularly useful when performing zooming with
the mouse wheel as will be shown later.

Having all the main functions ready, all we need now is a way to provide
interactivity and scroll the position of the top-left corner and the
scaling. That is done by monitoring mouse events in on the canvas. Dragging will
translate the top-lef position. The mouse wheel, in turn, changes the scale.

The events that are simple to handle are the `mousedown`, `mouseup`, and
`mouseout`. When the mouse is down we store the mouse position. Whenever the
mouse is up or leaves the canvas we disable the drag operation. 

``` javascript
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
```

Whenever the drag is active, the `mousemove` event is used to translate the
top-left position. Since the top-left position is a cell position we need to
convert the mouse position into a cell position by using the current
scale. Regardless of drag being inactive, we always store the mouse position
because that is helpful for zooming.

``` javascript
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
```

Whenever there is a `mousewheel` event, the direction of the mouse wheel is used
to zoom in or out. Zooming corresponds mainly to a change in the used scale, so
if we zoom in we are increasing the scale, that is, the number of pixels used
for a single cell and making cells bigger in the canvas.

Zooming is limited to an interval, to keep cells perceptible and visible, and is
centered on the mouse position. The position saved, when the mouse moves over
the canvas, is used as the center point of the zoom, that is, if, for example,
you place the mouse cursor in the middle of a cell and zoom in then the cursor
remains in the middle of that cell. This is handled by the `applyScale`
function, shown before, after converting the mouse global coordinate into a
canvas coordinate, in pixels.

``` javascript
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

  // find relative px and py
  var offset = Fn.getOffset(canvas);
  var px = mouse.x - offset.left;
  var py = mouse.y - offset.top;

  // apply new scale using mouse position as the center
  applyScale(newscale, px, py);

  // redraw
  draw();
});
```

With this type of drawing and interactivity the algorithm for celular automatas
can have very distinct behaviors. I could use the same automata logic and
provide an algorithm for the color deamons celular automata. It's all up to the
algorithm which must know how to evolve the pattern in each step and generate a
color for a bunch of cells.

The algorithm
-------------

The Game Of Life algorithm loads an initial pattern into a current generation
and, in each step, calculates the next generation from the current. The current
implementation is very simple and not very performance although it fulfills the
initial goal of allowing several patterns and provide an infinite space for the
cells.

The initial configuration consist only of the starting pattern, that is, the
pattern that is available immediatly when the game is reset. The algorithm state
is also simple and contains the current generation and population.

``` javascript
var config = {
  pattern: options.pattern,
};

var state = this.state = {
  population: 0,
  generation: 0
};
```

The current generation of cells treated as a map between position and cell
value. The infinite space is provided by infinite number of positions, or
properties, in the map and the corresponding "alive" or "dead" value. As we use
standard Javascript objects and their properties to provide the *map* then the
initial definition is very minimal.

``` javascript
var cells = { };
```

Each position is encoded to a string to be easily usable as a map property. The
xy position of a cell is *stringified* to obtain the cell key -- or property
name -- in the object. The following code shows that function and the simple
conversion used.

``` javascript
function getCellKey(x, y) {
  return "x" + x + "y" + y;
}
```

This function is used in the cell accessor `getCell`. This function obtains the
current value of a cell in the current generation. If a value is not defined for
that position (empty space) then a "dead" value of 0 is assumed.

``` javascript
function getCell(x, y) {
  return cells.cur[getCellKey(x, y)] || 0;
}
```

There is also a mutator `putCell` to change the value of a cell at a given
position. This mutator accepts a target generation in order to be usable by both
the evolution logic, that updates the next generation, and the initial loading
logic, that updates the current generation. 

``` javascript
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
```

The `putCell` function also updates neighbor cells with 0, or "dead", if they
are undefined. This is done in order to explicitly define the space that needs
to be considered in each generation. Since cells can only born next to other
cells, if we define all the neighboring space then we just need to iterate
through all those positions, in the current generation, and calculate the
corresponding value for the next generation. If a cell becomes alive then it is
set as alive, in the next generation, and all it's negbors are set as dead so
they are considered next time around. This algorithm is shown in the main
`evolve` function shown below.

``` javascript
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
        
  // update state
  state.population = population;
  state.generation += 1;

  // update cells
  cells = next;
}
```

As you can see, first the population count and the next generation is
reset. Then the algorithm iterates through all the positions of the current
generation and obtains the corresponding coordinates with the function
`getCellKeyCoords`, which provides the inverse of `getCellKey`.

``` javascript
function getCellKeyCoords(key) {
  var yPos = key.indexOf('y');
  return { 
    x: parseInt(key.substring(1, yPos)), 
    y: parseInt(key.substring(yPos + 1))
  };
}
```

For each position an all-field value is computed. An all-field value if
basically a sum of the cell and all it's neighbors. At this point, the "dead"
value of 0 and "alive" value of 1 become helpful and we just need to add the
cell's values. This is done in the `neighborhood` function shown next.

``` javascript
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
```

This eggocentric way of computing the cell state -- as described in Wikipedia --
allows a more streamlined computation with easy to read cases instead of range
comparisons with if statements. If the all-field is 3, then either the cell is
alive and has 2 alive neighbors or is dead and has the required 3 neighbors. In
any case, the cell is alive in the next generation. If the all-field is 4 then
cell value keeps the same for the next generation. And in all the other cases
the cell is dead. At the end of this cyle the next generation is computed and we
have the resulting population count. So we just need to update the internal
state and the cells representing the current generation.

With these function we already have a functioning Game of Life simulation once
we load a pattern into the current generation. This is done by the public `load`
function. Curently no [standard game of life format][ggf] is supported. A new
one, which is very simple, was invented in a minute:

  * Blank lines are ignored.
  * Each line with some non-space caracter is considered part of the pattern.
  * The pattern may be enclosed between pairs of \|.
  * The character \| is ignored but any other character is an alive cell.

For example, a blinker can be represented as `| *** |`, `| xxx |`, or simply
`ooo`. The pattern will be interpreted and and placed in the middle of the
space. This is done by considering the number of lines and the maximum length of
all lines.

``` javascript
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
```

Having a way of loading a pattern and a function to evolve the pattern into the
next generation we can provide the public `reset` and `step` functions that
connect the algorithm to the automaton or the game loop.

``` javascript
this.reset = function() {
  state.generation = 0;
  this.load(config.pattern);
};

this.step = function() {
  evolve();
};
```

The only thing that is missing is the function `getColor` that produces a color
for the cells. This function must be generic and accept any position. It must
also be able to provide a color for square of cells indicated by the width and
height. Since we are using black for cells that are alive we must calculate a
gradient, between black and white, that represents the proportion of alive cells
and dead cells.

``` javascript
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
```

Whenever we only have dead cells then we don't produce a color and rely on the
background color. That was specified, together with what we consider the center
of the space, with the public properties `center` and `style`.

``` javascript
this.center = {
  x: 0,
  y: 0 
};

this.style = {
  background: "#fff"
};
```

Putting it all together
-----------------------

To put it all together, and actually run the first code sample shown, a simple
HTML page was created. The main element of the page is the HTML canvas. Together
with the canvas, some information is provided about the current state of the
algorithm. Currently the number of steps -- or generation -- and the population
is shown. There are also some controls to control the animation and choose the
current pattern.

``` html
<div class="instructions">
  <p>You can scrool to zoom and drag to move the pattern around.</p>
</div>

<div class="game">
  <canvas id="gol" width="400px" height="300px"></canvas>
   
  <table class="information">
    <tr>
      <th scope="row">Steps:</th>
      <td><span id="step">0</span></td>
    </tr>
    <tr>
      <th>Population:</th>
      <td><span id="population">0</span></td>
    </tr>
  </table>
</div>

<div class="controls">
  <button id="bRun">Run</button>
  <button id="bPause" disabled="disabled">Pause</button>
  <button id="bStep">Step</button>
  <button id="bReset">Reset</button>
  <select onchange="selectPattern(this.value);">
    <option value="pat-ggg">Gosper Glider Gun</option>
    <option value="pat-rpentamino">R-pentamino</option>
    <option value="pat-diehard">Diehard</option>
    <option value="pat-acorn">Acorn</option>
  </select>
</div>
```

All the buttons are controlled by the game loop. When the loops is initialized
it binds the button `click` event to the game's functions. The pattern
selections uses an helper function to change the pattern and that is shown
bellow. 

``` javascript
function selectPattern(value) {
  loop.game.algorithm.load($(value).innerHTML);
  loop.reset();
}
```

The global object `loop` is used to reach the algoritm and load the
pattern. This means that the pattern is the content of an HTML element. For
example, the Acorn pattern is defined as shown bellow. 

``` html
<div id="pat-acorn" class="pattern" title="Acorn">
  |  x      |
  |    x    |
  | xx  xxx |
</div>
```

The other important parts of the page are the game loop's hooks passed in the
initialization. These are used to update the game's information after each step.

``` javascript
var loop = new AnimationLoop({
  ...

  afterStep: function(loop) {
    var state = loop.game.algorithm.state;
    $('step').innerHTML = state.generation;
    $('population').innerHTML = state.population;
  },

  afterReset: function(loop) {
    var state = loop.game.algorithm.state;
    $('step').innerHTML = state.generation;
    $('population').innerHTML = state.population;
  }

 });
```

With all this setup we just need to put the key in the engine and start
it. Therefore the last element is the initialization of the loop, automaton, and algorithm by calling the public `reset`.

``` javascript
loop.reset();
```

That's it. Everything else are smaller details so you can check the entire
source at [GitHub][gh1] and try [the live experiment][ex1]. Have fun!

[wp1]: http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
[gg1]: http://xefer.com/gameoflife
[gg2]: http://www.julianpulgarin.com/canvaslife/
[gg3]: http://pmav.eu/stuff/javascript-game-of-life-v3.1.1/
[ex1]: #experiment
[pjs]: http://prototypejs.org/
[oaf]: https://github.com/kof/animation-frame
[jaf]: https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame
[glf]: http://psoup.math.wisc.edu/mcell/ca_files_formats.html
[gh1]: https://github.com/m4ktub/m4ktub.ws/tree/master/experiments/game-of-life
