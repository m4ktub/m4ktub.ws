---
title: Many Ponies Can Act Together
s: ponylang-actor-model
categories: ideas
tags:
  - actor-model
  - ponylang
  - concurrency
  - scalability
thumbnail:
---

While experimenting and reading about the recently announced [Pony Programming 
Language][pony] I started thinking about the problems the current kind of 
applications are facing.

Scalability is a major topic of interest and discussion. All web start-ups 
dream of being the next Google or Facebook so any web service needs to be 
ready, for example, to support 1 user on day 1 and a million the next day. Only 
a few services require to react to that kind of variation but any kind of 
variation presents a challenge. Either you have have resources for the maximum 
demand possible or you have to either act in anticipation or react quickly. 

Infrastructure
--------------

The infrastructure side of it, that is, the machines and networks needed to 
serve the amount of users you have and the ability to scale up or down those 
resources can be obtained as a service. The IaaS services like [AWS], [Google 
Cloud], or [Azure] allow you, in the very minimum to react from 1 user to a 
million in a day. Some of them even allow to dynamically scale scale based on a 
schedule (prediction) or metrics (reaction).

{% asset_img sstrats.png Scaling strategies %}

This is great, this is all great. The infrastructure part is still evolving 
fast but seems solved. If you don't want to think about that part, there are 
services you can buy and they will do the job. Nevertheless you need to be able
to take advantage of the infrastructure.

Scalable web applications
-------------------------

The service needs to be developed in a way that can take advantage of a dynamic
infrastructure without being so complex that, while you can scale from 1 machine
to several in minutes, you can't develop a new feature without days of testing 
or bugs. Some recent advancements - or trends - have changed how web applications are developed and allowed some of the manageable scalability that
was truly needed.

The popularization of [REST] allowed the recognition of the layered nature of the
web and the constraints needed for scalable web applications. With REST, the idea
that an application is essentially broken in two between and an explicit API is
needed between the client and the server allowed a proliferation of reusable
JSON services. The trend is still going and peeking with [single-page 
applications (SPA)][SPA].

The server provides a stateless API which allows to break the service in multiple
components or, for scale, add more servers to share the load. The client keeps
the entire application state and only communicates with HTTP requests the 
server. It's evident this scales and, from the point of view of the web 
developer, it scales perfectly as the load is beared by the client. If you jump
from 1 to 1 million users then your client layer as scaled to 1 million hosts.
This does not count getting the resources for the application but that's also 
part of the API which you can scale and optimize with cache.

Micro Services
--------------

- Micro Services
- Good Enough
- Actors

[pony]: http://www.ponylang.org/
[AWS]: https://aws.amazon.com/ec2/
[Google Cloud]: https://cloud.google.com/
[Azure]: https://azure.microsoft.com/ 
[REST]: https://en.wikipedia.org/wiki/Representational_state_transfer
[SPA]: https://en.wikipedia.org/wiki/Single-page_application