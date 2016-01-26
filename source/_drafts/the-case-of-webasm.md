---
title: The case of Web Assembly
s: the-case-of-webasm
categories: ideas
tags:
  - webasm
  - open-source
  - binary-web
  - tos
thumbnail:
---

Not so recently ago I've read about the [Web Assembly][1] (webasm) initiative. My first 
reaction was to think "binary web... oh no"! My second reaction was "why did I think 
that"? Only now, with the news about [TiSA][2] and it's source code provisions, did I 
realize why.

My reaction was not the binary format in itself. As a developer, that presents a tooling 
problem more than anything else. If the performance gains are significant then it may be 
worth it. And the user is already receiving several binary resources (e.g. images, fonts, 
or videos) so one more makes little difference in that regard. My reaction was to the 
growing "we know best" attitude, from service providers, and that is being associated with 
the web platform. This attitude is shifting control from the user to services and 
application creators.

The web platform
----------------

The browser is growing into a full virtual machine that gives web applications access to 
many native resources in the user's device of choice. The goal of the no-install and 
always available universal application has been tried many times before but is finally 
here with the web. Hurray! Why was it not successful before? I can only speculate.

Network speed was one of the reasons but the previous schemes (Java Applets, Flash, 
Silverlight, Microsoft OnClickInstall, etc) either depended on a native bridge, that 
needed to be maintained by only one provider, tried to provide assurances that the code 
was safe to run, or both. The web platform throws that away and everything is much 
simpler. But simpler comes with a trade-off. One the one hand, you have standards being 
defined collaboratively and implemented by multiple providers (the native bridge) but, on 
the other hand, you have no assurances on how applications make use of those native 
functionalities.

There is nothing stopping, for example, an application from occupying several GB of data 
in your drive, using a lot of RAM,  100% of the CPU, or the GPU to break encryption keys. 
And although Google, Apple, Mozilla, et al do their best to define safe APIs and ensure 
reasonable limits you still have no clue what will happen when you visit a URL.

The fashion of auto-updating
----------------------------

The Terms of Service typically associated with a web service only broadly define the service
and the application involved. Consider, for example, [Facebook's ToS][3]. Those terms say applications exist and they can change automatically without confirmation. Since the user
has not control over it, the web application is already auto-updating. Other applications,
like the mobile application, are increasingly auto-updating. In those cases, the user has
some control over the device and the applications that run it. So, a common strategy is
showing "You must update to continue using the service" and force the updated. But even the
typical "Update All" button is there to ease that case.

The always-updated application paradigm is great for service providers. They can push
changes and innovate very quickly and also have to deal with less legacy, which is a cost.
For the user, getting all the essential security updates is good. But what about the
learning curve of new designs or features? What about features that went missing?

Just recently a Chrome update, for example, removed the possibility to choose the language
of a text field and get the appropriate spell-checking. The idea is that it now auto-detects
the language and thus saves you the trouble of specifying it. Nevertheless, with mixed 
languages, it is not perfect. It can be better, apparently, if you send every text field you write to Google... right! Because right-click, Spanish was such an enormous hassle that
now I want to share all my text fields with Google's services.

Control e Regulation
--------------------

In particular for web applications that given access to a service I argue that the user 
needs more control. The auto-updating should stop somewhere. Security updates are important
to spread around quickly. And once you get those it's hard to define a line. But the 
shuffling of features is really what I want.

Control
-------

- User Control
- Open Source
- TOS

[1]: https://www.w3.org/community/webassembly/
[2]: https://en.wikipedia.org/wiki/Trade_in_Services_Agreement
[3]: https://www.facebook.com/legal/terms