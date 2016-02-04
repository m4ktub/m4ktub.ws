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

Then I've read A String of Ponies, by S. Blessing, that felt as one of those movies were you're told, at the end, that everything was a dream. It's a good thesis that shows interesting results and how Concurrent Pony was extended for the distributed setting. It's major sin, though, was to avoid the big elephant in the room -- the failure of a node or the network -- until the very end. Even then, to say the problem was not addressed (which after 90 pages I'd already noticed) and without a credible path for future work.

[post-1]: /posts/2016/01/29/ponylang-actor-model/
[pony]: http://www.ponylang.org/
[dpony]: http://www.doc.ic.ac.uk/teaching/distinguished-projects/2013/s.blessing.pdf
[vapor]: https://youtu.be/KvLjy8w1G_U?t=41m10s
