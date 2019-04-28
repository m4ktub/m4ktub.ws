---
title: "The expectations around CashAddr"
categories: projects
tags:
  - cashaddr
  - specification
  - expectations
  - cashaccounts
thumbnail:
s: the-expectations-around-cashaddr
date: 2019-02-04Z
---

{% asset_img cashaddr.png %}

When [CashAddr][1] was introduced, my expectation for that address format was that it would replace the legacy Base58Check encoding in all its uses. The same way Bitcoin historically had addresses starting with 1 and 3, Bitcoin Cash would have addresses starting with q and p.

From early on, it was obvious that most of the ecosystem had adopted CashAddr for standard addresses but had preserved support for legacy addresses and, in particular, continued to use the legacy encoding in paper wallets, for example. My rationalization for that was that the effort was probably not worth it, but never have I questioned the ability to use CashAddr in those cases.

Recently when Cash Accounts was announced, a lot of excitement was generated around it. In particular, I was excited with the possibility that wallets, like Copay, could support Cash Accounts together with stealth addresses or payment codes. It was obvious that any such address would be a CashAddr like "bitcoincash:something" or, at least, "stealth:somethingelse". You would be able to scan those directly or just type Cash Accounts, which would be a simple way of achieving the same.

But the expectations I had for CashAddr started to be broken when Jonathan Silverblood [mentioned CashAddr could not encode a payment code][2], that is, that it could not be used to represent those addresses. When I looked at the specification, with more detail, I finally realized that it had been defined in a very specific way that was not really reusable.

The last thing I wanted was another Copay address like Csomethingagain so I started a [revision of the specification][3]. After reading it, it seemed there was a simple way to make it more general and, at the same time, make it clearer how it could be used to encode anything we could perceive as addresses.

But by trying to review the specification I've also found that not only it had been defined in a non-reusable way but it also had been done so on purpose as [the intended use was different than what I expected][4]. Boom! Minder shattered.

The idea is that "bitcoincash:..." addresses only represent the direct forms of payment that we know and that all other payment use cases should use a different prefix. Taking a step back and letting go of my previous approach, I can see the logic. It would be ok to have something like stealth... or paymentcode:... but the specification was ambiguous and inconsistent which actually made it impossible to interpret it that way. So I did [another revision][5] with that approach in mind...

The goal with all this is to have a well defined specification that is reusable for all sort of addresses. Ideally the revision would be a version 1.1, that is, a minor change that keeps everything compatible but that’s not quite possible due to how version 1.0 was written. Luckily, practice does not match theory. Most libraries implement CashAddr in a very narrow way. On the one hand, those libraries don’t implement the specification correctly. On the other hand, that possibly allows a version 1.1 (or 2.0, if we want to be correct with the semantics) to be made since those libraries would not be affected in practice. Nothing that is working would fail, the libraries would just be broken in a different way, which is curious... at least to me.

[1]: https://www.bitcoinabc.org/2018-01-14-CashAddr/
[2]: https://twitter.com/monsterbitar/status/1078931367994494976
[3]: https://github.com/bitcoincashorg/bitcoincash.org/pull/259
[4]: https://twitter.com/m4ktub2/status/1085934444509384709
[5]: https://github.com/bitcoincashorg/bitcoincash.org/pull/266
