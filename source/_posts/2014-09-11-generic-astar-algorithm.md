---
s: generic-astar-algorithm
title: Generic A* Algorithm
date: 2014-09-11Z
categories: experiments
experiment: generic-astar
thumbnail: /images/astar.png
tags: [ai, search, algorithm, path-finding]
---

While searching Google for "javascript astar algorithm" I got a a few results
but was surprised to see that all implementations where so tied up with the
pathfinding and graph-traversal domains. So I had to create yet another
implementation but one that is more generic and does not depend on a graph
structure or a matrix in any way. You can check the experiment [here][ex1],
where the generic implementation is used for -- guess what -- solving the
typical pathfinding problem.

The Wikipedia [article][wp1], about A\*, effectively says it is widely used in
those two domains and the algorithm's history is tighly coupled with
Dijkstra. But although many problems can be reduced to a graph traversal it's
convenient to avoid that step. Let the search alghoritm deal with connecting the
nodes and keeping a graph. I don't want to map my problem if I have a way of
answering some questions and get the path traversal for free. In the end I'm
still reducing the problem but without converting my structure into a graph or
matrix and the having to deal with interpreting the results.

For example, consider the change-making problem. If we have a set of coins {c1,
c2, ..., cn} and want to change a N value bill we could create a graph with all
possible uses of the coins and search for the node that sums to the desired
amount or we could answer a few questions we need to answer anyway and try not
to worry with the graph at all.

  * **Where do we start?** With an amount of 0 and a bag of coins.
    ``` javascript
    var initial = { amount: 0, coins: [ 1, 2, 5, 10, 20, 50 ] };
    ```

  * **What is hour goal?** Get an amount of N.
    ``` javascript
    function isOurGoal(x) { return x.amount == N };
    ```

  * **What can we do?** Take a coin and add it to the amount.
    ``` javascript
    function whatCanWeDo(x) { 
        var possibilities = [];
        for (var c = 0; c < x.coins.length; c++) {
            possibilities.push({ 
                amount: x.amount + x.coins[c], 
                coins: x.coins 
            });
        }
        return possibilities;
    }
    ```

  * **What does it cost to take a coin?** Taking a coin and adding the value
    takes more or less the same time for every coin.
    ``` javascript
    function effort(a, b) { return 1; };
    ```

  * **How close am I to complete the change?** The bigger the amount the closer I
    get. Unless I overshot, in which case I have to go back and choose another
    coin.
    ``` javascript
    function remainingChange(x) { 
        if (x.amount > N)
            return N; // because I must have counted wrongly
        else
            return N - x.amount;
    }
    ```

  * **Are some changes the same?** Sure. It does not matter if I first take a
    coin of 50 or of 1 as long as it sums the same.

    ``` javascript
    function whatMakesItTheSame(x) { 
        return x.amount;
    }
    ```

So, after answering the questions -- and converting the answers to Javascript --
we should be able to perform the search with as few additional information as
possible. In fact, executing the generic implementation of A\* requires no other
information.

``` javascript
var results = astar({
    initial: initial,
    fgoal: isOurGoal,
    fsuccessors: whatCanWeDo,
    fdistance: effort,
    fheuristic: remainingChange,
    fidentity: whatMakesItTheSame
});
```

<script src="/experiments/generic-astar/js/ext/heap.js"></script>
<script src="/experiments/generic-astar/js/astar.js"></script>
<script type="text/javascript">
    var N = 1;

    var initial = { amount: 0, coins: [ 1, 2, 5, 10, 20, 50 ] };
    function isOurGoal(x) { return x.amount == N };
    function whatCanWeDo(x) { 
        var possibilities = [];
        for (var c = 0; c < x.coins.length; c++) {
            possibilities.push({ 
                amount: x.amount + x.coins[c], 
                coins: x.coins 
            });
        }
        return possibilities;
    }
    function effort(a, b) { return 1; };
    function remainingChange(x) { 
        if (x.amount > N)
            return N; // because I must have counted wrongly
        else
            return N - x.amount;
    }
    function whatMakesItTheSame(x) { 
        return x.amount;
    }

    function doChange() {
        N = parseInt(document.getElementById("valueN").value);

        if (isNaN(N)) {
            return;
        }

        var results = astar({
            initial: initial,
            fgoal: isOurGoal,
            fsuccessors: whatCanWeDo,
            fdistance: effort,
            fheuristic: remainingChange,
            fidentity: whatMakesItTheSame
        });

        var coins = [];
        var step = results.path[0];
        for (var i = 1; i < results.path.length; i++) {
            coins.push(results.path[i].amount - step.amount);
            step = results.path[i];
        }

        document.getElementById("result").innerHTML = coins.join(", ");
    }

    function editedNValue() {
        document.getElementById("result").innerHTML = "";
        N = parseInt(document.getElementById("valueN").value);
        document.getElementById("goButton").disabled = isNaN(N);
    }
</script>

Try it bellow or the [experiment][ex1].

<p>
    N = <input id="valueN" 
               type="text" value="66" size="4" onkeyup="editedNValue();"/>
    <button id="goButton" onclick="doChange();">Go</button> &nbsp;
    <span id="result"></span>
</p>

[ex1]: /experiments/generic-astar/
[wp1]: http://en.wikipedia.org/wiki/A*_search_algorithm
