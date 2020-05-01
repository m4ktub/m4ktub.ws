---
title: The Bitcoin Cash Room
categories: ideas
tags:
  - bitcoin
  - scuttlebutt
  - manyverse
  - patchwork
  - collaboration
thumbnail:
s: the-bitcoin-cash-room
date: 2020-05-01Z
---

Who wants to try (yet) another social network?

Here me out.

The next step for Bitcoin Cash development is one of unprecedented collaboration. One of the things that enables collaboration is a a social platform for open participation and discussion. There's no shortage of social platforms like <insert names of social platforms here until you feel tired> but I've been monitoring [Scuttlebutt][1] and I think it fits the culture of the Bitcoin Cash development and wider communities very well.

Anyone can join. You just need an app. But it obviously helps - being a social network and all - if you can also find another person.

  * **It's peer-to-peer.** You can exchange messages via Bluetooth or Wi-Fi directly.
  * **You can't be banned.** At most you can block people or be blocked but that does not affect anyone else. Everyone following you will see your messages the same.
  * **No content can be censored.** All messages are stored in your and your followers' devices. As long as someone is available your messages are available.
  * **No blockchain is hurt in the process.** Although messages are public and immutable that is achieved the "normal" way. No proof-of-work is required.

## A meeting place

A common "problem" with these kind of networks, for very distributed communities, is how to find other people. You just can't connect to others directly through the Internet so you need some kind of meeting place.

For that reason I've setup [the Bitcoin Cash Room][2]. It simply allows people that connect to it to find other people and exchange messages.

To connect to room just copy and paste the following invite code into [Manyverse][3] or [Patchwork][4]. This invite code and a QR code is also available at [the room's landing page][1].

**EDIT**: You might not be able to see other people in the room, if you use Patchwork. Click on the room and follow it. It will not follow you back, as the Pub, but if everyone does that then you can discover people the same.

    net:bch-room.m4ktub.ws:8008~shs:8eyMoHDDGcbxHPc8tUs971k59LZyBoHqwNyJvNwnVAc=:SSB+Room+PSK3TLYC2T86EHQCUHBUHASCASE18JBV24=

With a Scuttlebutt room the server never stores any of the messages. This is the more private option but it also means people need to be online at the same time. Remember that you and your followers are the ones that store your messages so you and another follower need to be online for her to get your messages. Then, either you or that follower can be online for another follower to get your messages. And so on.

## Your friendly bartender

Although rooms are a great addition to Scuttlebutt it does make it harder to bootstrap the relations initially. Specially if people are in different time zones, which they are. It also diminishes the user experience somewhat because, when you finally have the time to check what's new, you might actually miss everyone that might have new messages for you.

To help with that, I've also setup what in Scuttlebutt is called a Pub. Like your local pub, it's the place for all the gossip to spread. It achieves that because the "bartender" will always be your friend (follow you back) when you join the pub. That means it will get and store all your new messages when you connect and also give you new messages from the people you follow.

Obviously, in this case, the Pub (or the bartender) stores all the messages from its friends. Although the Scuttlebutt network is public, in the sense that anyone can see your feed, the more privacy oriented people might want to avoid the Pub sine that reduces the exposure somewhat. The plan is to close the Pub once a network of people is formed as it should no longer be needed.

As with the Room, to connect to the Pub just copy and paste the following invite code into [Manyverse][3] or [Patchwork][4]. You will then be able to see all the Pub's friends and follow them regardless if they are online or not.

    bch-room.m4ktub.ws:9008:@bja5QOu5uqT/MC8udTZbE21fI+L0R2KH0QDJRTHwkYM=.ed25519~UKrMEEE+S6rSEUyefJjz5fc3yj271ldNtd3bQKXK+yc=

## Invitation

The most popular platforms and channels are not doing any favors to themselves by filtering information and banning people with dissident opinions.

Let's join? What about just trying new thing?

The future will be person-to-person!

[1]: https://scuttlebutt.nz/
[2]: https://bch-room.m4ktub.ws/
[3]: https://www.manyver.se/
[4]: https://github.com/ssbc/patchwork/releases
