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

[post-1]: /posts/2016/01/29/ponylang-actor-model/
[pony]: http://www.ponylang.org/
[dpony]: http://www.doc.ic.ac.uk/teaching/distinguished-projects/2013/s.blessing.pdf
[vapor]: https://youtu.be/KvLjy8w1G_U?t=41m10s
