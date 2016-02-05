---
title: 'For a Pony, failure is not an option'
s: pony-failure-not-an-option
categories: ideas
tags:
  - actor-model
  - ponylang
  - concurency
  - distribution
  - fault-tolerance
  - cap-theorem
thumbnail:
---

In [the last post][post-1] I've commented that the actor model was well suited for the kind of web applications and services being created nowadays. I've also commented that [Pony], in particular, was well positioned to allow developing applications that would automatically distribute and scale. More specifically, the aim of Distributed Pony was to allow you to create a monolithic application and have the Pony Runtime automatically identify and distribute the micro-services within (actors, really) through the available resources.

Then I've read [A String of Ponies][dpony], by Sebastian Blessing, that felt as one of those movies were you're told, at the end, that everything was a dream. It's a good thesis. It shows interesting results and how Concurrent Pony was extended for the distributed setting. It's major sin, though, was to avoid the big elephant in the room -- the failure of a node or the network -- until the very end. Even then, just to say the problem was not addressed (which after 70 pages I'd already noticed) and without a credible path for future work.

Things fail
-----------

So Distributed Pony is _vaporware_, right now. It has a prototype that works under unrealistic assumptions. It may have had progress in the last 2 years but the reality didn't change. The network is unreliable and things fail. Therefore you cannot send a message between actors (that can be in different hosts) and count on it being processed. The message may never reach the destination, the node may have failed, or the response may have been lost.

[Erlang] and [Akka] deal with it explicitly stating you have only one guarantee, and it is a local guarantee: remote nodes are monitored and local actors can know about it. There is no guarantee that a remote actor is really down, as you will never get that guarantee, but in a combination of monitoring and timeouts you can program an actor to deal with unavailability. 

The other part, is that, in those systems the topology is user-defined. When something fails, since you had to think about the topology, your program is already coded accordingly. When node _A_ fails you fall-back to _B_ because you know there is a node _B_.  

[post-1]: /posts/2016/01/29/ponylang-actor-model/
[pony]: http://www.ponylang.org/
[dpony]: http://www.doc.ic.ac.uk/teaching/distinguished-projects/2013/s.blessing.pdf
[vapor]: https://youtu.be/KvLjy8w1G_U?t=41m10s
[akka]: http://akka.io/
[erlang]: http://www.erlang.org/