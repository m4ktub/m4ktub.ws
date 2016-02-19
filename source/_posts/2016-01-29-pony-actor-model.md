---
title: Many Ponies Can Act Together
categories: ideas
tags:
  - actor-model
  - ponylang
  - concurrency
  - scalability
  - micro-services
s: ponylang-actor-model
date: 2016-01-29Z
updated: 2016-02-04Z
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
million in a day. Some of them even allow to dynamically scale based on a 
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
to several in minutes, you can't develop a new feature without days of 
integrations, testing, or bugs. Some recent advancements - or trends - have 
changed how web applications are developed and led to some of the manageable 
scalability that was truly needed.

The popularization of [REST] allowed the recognition of the layered nature of 
the web and the constraints needed for scalable web applications. With REST, 
the idea that an application is essentially broken in two, and that an explicit 
API is needed between the client and the server, allowed a proliferation of 
reusable JSON services. The trend is still going and peeking with [single-page 
applications (SPA)][SPA].

The server provides a stateless API which allows to break the service in multiple
components or, for scale, add more servers to share the load. The client keeps
the entire application state and only communicates with HTTP requests to the 
server. It's evident this scales and, from the point of view of the web 
developer, it scales perfectly as the load is beared by the client. If you jump
from 1 to 1 million users then your client layer has scaled to 1 million hosts.
This does not count getting the resources for the application but that's also 
part of the API which you can scale and optimize with cache.

It's a little more complex to develop and maintain. You have to to use a lot of
simple patterns the communication between server and client. But simple patterns
and a explicit interface still keep things predictable and manageable.

Micro Services
--------------

More recently that scalability was expanded with [Micro Services]. It defends the
same style of decoupling but now between several pieces of the server. It also
addresses the ability to replace a particular function of the system without 
affecting the rest (continuously deliver small improvements). Nevertheless, once
you decouple components with a clear REST interface you have micro scalability.
You can scale only some functional components and not everything together.

Life was great if not for the burden of keeping it all up. Yes, you can quickly 
fix and roll out the problem with the "moderation service" without affecting 
any of the other, in the application. But you have to be able to manage it all. 
It requires good design and organization because if you miss it, then all those 
APIs that where there to allow quick and independent change and to permit 
scaling out the component, turn against you.

Good Enough
-----------

... And it's all communicating with HTTP request-replies. The amazing thing is 
that it works most of the time. Sometimes the user gets created, in the store, 
but sending the confirmation email fails? Just let the user register again and 
reuse the account. Or let the user do a "Recover Password" to get to a known 
state again. You would probably implement those features anyway anyway and it's 
easier than to make a distributed transaction.

This "is good enough" strategy is a power-full strategy. It allows to just do 
something and then, at the end, realize the problem you didn't want to happen, 
like losing data, is quite rare and there are simple ways to minimize it even 
further. If you started by solving the problem, so that it never happens, you 
could not have started at all. For example, all those [eventually consistent] 
systems optimize for availability. What is important is to be there, and not to 
always be right. For most users, in Facebook for example, missing one post or 
not having the true number of likes shown in a post is not life-or-death. And 
the realization that this is acceptable by users, in many scenarios, allowed a 
proliferation of eventually consistent solutions.

Still, it would be nice to be able to be both. Be able to always respond with the right answer. 

Actors
------

So what does the actor model brings to the table. The model exists since the 
70s but is particularly relevant now because of the kind of architectures being 
used. The massively parallel and distributed solutions have to deal essentially
with massive concurrency and faults. Since the actor model is based on
concurrency units - the actors - and asynchronous messages I would say it fits
very well. At least the problems of distribution and concurrency do not even
exist in the actor model. Obviously you get new problems but not the ones we
know are though in these kind of applications.

If we adopt a micro-service architecture, with all its management cost, for the
benefits of continuous delivery. Adopting the actor model seems a safer bet. For
example, in Pony, the aim is to allow you to write and maintain what is 
essentially a monolithic application and have the runtime identity, distribute, 
and scale the micro-services automatically. At least that is the expectation and
it would be fun.

[pony]: http://www.ponylang.org/
[AWS]: https://aws.amazon.com/ec2/
[Google Cloud]: https://cloud.google.com/
[Azure]: https://azure.microsoft.com/ 
[REST]: https://en.wikipedia.org/wiki/Representational_state_transfer
[SPA]: https://en.wikipedia.org/wiki/Single-page_application
[Micro Services]: https://en.wikipedia.org/wiki/Microservices
[eventually consistent]: https://en.wikipedia.org/wiki/Microservices