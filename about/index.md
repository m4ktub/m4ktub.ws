---
layout: post
title:  About
date:   2014-04-26 03:02:03
description: About the blog and experiments
---

![m4ktub](/images/avatar.jpg){:width="100px"}
{:.left}

<div>
<ul>
{% for link in site.links %}
    <li>
        <a href="{{ link.url }}">{{ link.name }}</a>
    </li>
{% endfor %}
</ul>
</div>
{:.right}

I'm a software engineer living in Portugal. My brother initiated me in the art
of programming. My academic education gave me knowledge about computer science
and information systems engineering. My day-to-day work introduces me to
enterprise information management systems. And my curiosity makes me learn about
everything else.

This blog is a way of persisting ideas, research and experiments in a more
consistent and structured way. Most things will be related to computers or
programming in some way.

In the beginning the earth was void and without form ... a little latter
------------------------------------------------------------------------

I've started to be interested in computers and programming, in a
[ZX Spectrum][zx] 128K. The Spetrum was mostly for gaming but some lines,
squares and circles where created with BASIC. Most of my programming experiments
started in a 33 Mhz 386 PC with Turbo Pascal.

![Amazing Graphics!](/images/about-lander.png){:width="100px"}
{:.right}

The initial programs asked your name and produced a scripted output with colored
messages and progress indicators, for fun. Later programs where a little more
complex. I wish I still had my lander implementation which featured procedural
terrain (just a zig zag at the bottom), configurable gravity force, sprite
animation and [CMF][cmf] sounds for burner activation, crashes and successful
landings. Much more fun making it than playing the damn thing.

Off course it was a mess of Pascal and assembly code but at the end of that
period I already had great concern for the [correct alignment][xkcd276] of
code. Eventually I was presented to cellular automatons and, in particular, to
[Conway's Game of Life][cgol]. It was very simple to understand and
fascinating. It represented what I like about programming. Very simple rules can
produce very complex, unpredictable and life-like structures.

Learning languages and thinking *meta*
--------------------------------------

So I've learned and experimented with a few programming languages for an hobby.
Making sense of all the different programs, languages and patterns made me start
to see things in a more conceptual level: the meta level of programming. I still
remember by hearth how I initiated VGA 320x200 graphics mode within a Pascal
program. It was a piece of assembly.

{% highlight asm %}
mv  ax, 13h
int 10h
{% endhighlight %}

Those initial constructs are still applied but are under several layers of
software. Nowadays there are little to many moving parts to know them all by
hearth. So I try to think about the individual responsibilities of components,
how they interact and the properties of that interaction. Languages that allow
to express different concepts like sound or images directly are very
interesting. Reinventing drag-and-drop for the fourth time in a Web OS not so
much.

Having fun
----------

Nevertheless most things programming are fun for me. Be it micro, macro, infra
or meta some things are just made for fun like all those little hello worlds or,
in my case, the various implementations of the Game of Life like
[the first experiment here][m4kgol].

[zx]: http://en.wikipedia.org/wiki/ZX_Spectrum
[matrix]: http://en.wikipedia.org/wiki/Matrix_digital_rain
[cmf]: http://en.wikipedia.org/wiki/Creative_Music_File
[xkcd276]: https://xkcd.com/276/
[cgol]: http://en.wikipedia.org/wiki/Conway's_Game_of_Life
[m4kgol]: /experiments/game-of-life
