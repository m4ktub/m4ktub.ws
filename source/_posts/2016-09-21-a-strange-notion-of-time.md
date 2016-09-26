---
title: A strange notion of time
categories: ideas
tags:
  - time
  - perception
s: a-strange-notion-of-time
date: 2016-09-21Z
thumbnail:
---

Recently during a conversation someone made the following observation.

> Did you know that, in terms of years, the premier of <span id="movie_name"> 
> Terminator 2</span> is closer to <span id="event_name">the moon 
> landing</span> than it is to the present?
> <p>
> In what year were you born? <input type="text" id="yearB" name="yearB" value="1982">
> <input type="button" value="&nbsp;Generate&nbsp;" onclick="generate(); return false;">
> </p>

It is true and very simple to verify. Nevertheless, somehow, it feels extremely
counter intuitive. I grew up thinking of the moon landing as an historical event.
On the other hand, I watched T2 when it came out on TV and grew up watching 
constant reruns of the movie. Nevertheless despite all that reinforcement, the 
premier is also a specific event that occurred in 1991 and is only getting 
further away from the present.

My completely uninformed theory is that memories of things you grew up with, 
and therefore to which you have some emotional connection, are always 
subjectively considered closer to the present than events you learned about but 
to which you have no other connection (like historical events).

![The different moments of memory](/images/emotional-memory.png "Emotional memory")

There are these different moments in our memory and events that are within 
certain boundaries -- boundaries that define your strong emotional connection -- 
are felt as closer than other non-personal or historical events. Those 
emotional events, that help define you, are felt as moving with you. This can 
also extend to the future. Events that have not happened yet are felt has 
already having an impact.
 
Well, I digress. That something like the movie Terminator 2 is also 
getting *historical* still feels strange and after sharing that factoid with 
other people I checked that they all frowned initially with a tough like "no, it 
can't be" mirrored on their faces. It can. It does not matter much but it keeps 
getting worst. For example, Jurassic Park will be closer to the moon landing 
that to the present next year.

<script type="text/javascript" src="{% asset_path movies.js %}"></script>
<script type="text/javascript" src="{% asset_path events.js %}"></script>
<script type="text/javascript">

var yearsM = Object.keys(movies).map(function(v) { return parseInt(v); }).sort();
var yearsE = Object.keys(events).map(function(v) { return parseInt(v); }).sort();

function generate() {
    var minYearM = yearsM[0];
    var maxYearM = yearsM[yearsM.length - 1];
    var minYearE = yearsE[0];
    var maxYearE = yearsE[yearsE.length - 1];
    
    var yearB = parseInt(document.getElementById('yearB').value);
    if (isNaN(yearB)) {
        return;
    }
    
    var moviePick = undefined;
    for (var i = 0; i < 12 && moviePick === undefined; i++) {
        var yearM = Math.min(Math.max(Math.floor(Math.random()*12 + yearB + 8), minYearM), maxYearM);
        if (movies[yearM] === undefined) {
            continue;
        }
        moviePick = movies[yearM][Math.floor(Math.random()*movies[yearM].length)];
    }
    
    if (moviePick === undefined) {
        return;
    }
    
    var present = new Date().getFullYear();
    var yearDiff = present - yearM;
    var yearEMin = yearM - yearDiff;
    
    var eventPick = undefined;
    for (var i = 0; i < yearDiff && eventPick === undefined; i++) {
        var yearE = Math.floor(Math.random() * (yearM - yearEMin) + yearEMin);
        if (events[yearE] === undefined) {
            continue;
        }
        eventPick = events[yearE][Math.floor(Math.random()*events[yearE].length)];
    }
    
    if (eventPick === undefined) {
        return;
    }
    
    document.getElementById('movie_name').innerText = moviePick;
    document.getElementById('event_name').innerText = eventPick;
}
</script>