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

Scalability is a major topic of interest and discussion. All web start-ups dream 
of being the next Google or Facebook so any web service needs to be ready, for 
example, to support 1 user on day 1 and a million the next day. Only a few 
services require to react to that kind of variation but any kind of variation 
presents a challenge. Either you have have resources for the maximum demand 
possible or you have to either act in anticipation or react quickly. 

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

Scalable software
-----------------

The service needs to be developed in a way that can take advantage of a dynamic
infrastructure without being so complex that, while you can scale from 1 machine
to several in minutes, you can't develop a new feature without days of testing 
or bugs.

- REST
- Micro Services
- Good Enough
- Actors

[AWS]: https://aws.amazon.com/ec2/
[Google Cloud]: https://cloud.google.com/
[Azure]: https://azure.microsoft.com/ 
