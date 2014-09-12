//
// The MIT License (MIT)
//
// Copyright (c) 2014 Cláudio Gil
//

function astar(options) {
    // default functions
    function defaultIdentity() {
        var i = 1; 
        return function() {
            return i++;
        };
    }

    function defaultDistance() {
        return 1;
    }

    // extract arguments and use defaults
    var initial = options.initial;
    var fidentity = options.fidentity || defaultIdentity;
    var fgoal = options.fgoal;
    var fsuccessors = options.fsuccessors;
    var fdistance = options.fdistance || defaultDistance;
    var fheuristic = options.fheuristic;
    var limits = options.limits || {};
    var maxNodes = limits.maxNodes || -1;
    var maxTime = limits.maxTime || -1;
    var useCurrent = limits.useCurrent || true;

    // node creator
    function node(data, parent, f, g, h) {
        return {
            id: fidentity(data),
            data: data,
            parent: parent,
            f: f,
            g: g,
            h: h
        };
    }

    // node comparator
    function comparator(a, b) {
        return a.f - b.f;
    }

    // internal structures
    var queue = new Heap(comparator);
    var costsQueue = new Object();
    var costsHistory = new Object();

    // node book keeping
    function open(node) {
        queue.push(node);
        costsQueue[node.id] = node.f;
    }

    function close(node) {
        delete costsQueue[node.id];
        costsHistory[node.id] = node.f;
    }

    // define a reusable search function
    function search() {
        // search limits
        var count = 0;
        var elapsed = 0;
        var start = new Date().getTime();
        
        function aboveLimit() {
            elapsed = new Date().getTime() - start;
            return (maxNodes > 0 && count >= maxNodes) 
                || (maxTime > 0 && elapsed >= maxTime);
        }

        // process queue
        var found = null;
        var goal = false;

        while (!queue.empty()) {
            var current = queue.peek();
            
            // have we reached the goal?
            if (fgoal(current.data)) {
                found = current;
                goal = true;
                break;
            }
            
            // have we exceeded our limit?
            if (aboveLimit()) {
                if (useCurrent) {
                    found = current;
                }
                break;
            }
            
            // count node
            queue.pop();
            count++;
            
            // get possible successors of node
            var successors = fsuccessors(current.data);
            for (var i = 0; i< successors.length; i++) {
                var successor = successors[i];
                
                // consider heuristics for successor
                var g = current.g + fdistance(successor, current.data);
                var h = fheuristic(successor);
                var f = g + h;
                
                // create node for successor
                var next = node(successor, current, f, g, h); 

                // have a better node enqueued?
                var queueCost = costsQueue[next.id];
                if (queueCost && queueCost <= f) {
                    continue;
                }
                
                // have processed a better node?
                var histCost = costsHistory[next.id];
                if (histCost && histCost <= f) {
                    continue;
                }
                
                // consider next node (add to queue)
                open(next);
            }
            
            // close current node (add cost to history)
            close(current);
        }
        
        // define helper to get node path
        function path(node) {
            var result = [];
            while (node) {
                result.unshift(node.data);
                node = node.parent;
            }
            return result;
        }
        
        // return result
        return {
            goal: goal,
            path: path(found),
            count: count,
            elapsed: elapsed,
            more: queue.empty() ? undefined : search
        };
    }

    // open with initial node
    var g = 0; // should be equivalent to fdistance(initial, initial)
    var h = fheuristic(initial);
    var f = g + h;

    open(node(initial, null, f, g, h));

    // start search
    return search();
}
