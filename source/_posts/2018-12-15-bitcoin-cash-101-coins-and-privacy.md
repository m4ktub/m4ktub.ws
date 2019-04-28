---
title: "Bitcoin Cash 101: Coins and Privacy"
categories: ideas
tags:
  - bitcoin
  - privacy
  - coins
  - basics
  - wallets
thumbnail:
s: bitcoin-cash-101-coins-and-privacy
date: 2018-12-15Z   
---

One of the most fundamental but least intuitive concepts regarding Bitcoin is the "coin". Most wallets show users a balance and a history of transactions, so it's normal for people to think that it works like a bank account. Isn't the motto "be your own bank"?

The "bank account" model works reasonably well for every day's usage but, even if you don't peek behind the curtain, you can see it breaking if you pay close enough attention. The real problem with that model, though, is that it abstracts away the "coin" and that limits your privacy to what the wallet automatically does. In other words, it unintentionally prevents a user from asking for more privacy.

Transactions
------------

The concept of "transaction" is initially pretty easy to grasp. After all, when we want to pay for something we make a transaction and it appears in the wallet's history.

{% asset_img 01-wallet-out.png %}

But the reverse is where things get tricky and the "bank" idea starts to fail. It is problematic to think, for example, that when you receive a payment you receive a transaction. For example, remember you can set up a lemonade stand with a printed QR Code, so the transaction does not need really need to reach your wallet for the payment to occur. Something that is less frequently noticed is that transactions can pay multiple people. The "green line" in your wallet's history represents a transaction that contains a payment to you but also to someone else.

{% asset_img 02-wallet-in-no.png %}

This means, a transaction does not decrease the balance of your "account" and increases the balance in another "account". What it does is spend enough of your coins (called inputs) and create new coins (called outputs). Typically, you give one coin to someone else, as payment, and the other coin you give back to yourself as change.

Coins
-----

What your wallet actually does is keep track the coins you own. The sum of the coins you spend is shown in red in the wallet's history, the sum of the ones you receive is shown in green, and your balance is a sum of the value in all the coins you currently own.

Instead of the "bank" account model, a better way to think about your bitcoin wallet is like your regular physical wallet... with some differences.

Just like your regular wallet, you have coins of several denominations that you can combine to make a payment. But unlike your regular wallet you never need change because you can create coins of any value. You can, for example, combine a 10 and a 20 to make a coin of 17, with which you pay, and another of 3 that you leave in your wallet. That's the reason why, typically, a transaction has two outputs.

{% asset_img 03-wallet-out-merge-change.png %}

So what exactly is a coin, in bitcoin? A coin is a transaction output that has not yet been used as input. In other words, a coin is an unspent transaction output. The set of all coins is called the Unspendable Transaction (tx) Output set or UTXO set for short.

Privacy
-------

So how does knowing about this abstract thing called coins help with privacy? Because all transactions are publicly available and the spending and creation of new coins can be tracked by anyone.

Imagine you paid for lunch for a friend and she pays the $10 lunch back. If you use (spend) that $10 coin, and combine it with more of the coins in your wallet, your friend can actually see how much money you have in your wallet and possible know where you spend you address next if, for example, it’s a donation to a public known address.

{% asset_img 04-wallet-out-chaining.png %}

Tumblers
--------

So how can we improve privacy? A typically technique is to use a tumbler service. A tumbler service breaks the link by using different wallets, that is by using different unconnected coins. Instead of paying directly, you pay the mixing service and the service does your final payment with some other coins it contains in a separate wallet.

{% asset_img 05-wallet-tumbler.png %}

Obviously there’s a service to trust... and the experience may be worse. Typically the tumbler service will explicitly delay the transactions to further break the link between transaction 1 and transaction 2. There’s also the possibility that the actual coins use to make the payment came from worse sources than your friend. If, for example, you are funding your Coinbase wallet, instead of possibly letting your friend know you use Coinbase, you may make Coinbase believe you got your money from funds stolen from some exchange. A good tumbler service will obviously ensure the least of problems to users but the fact is, the privacy is being managed by a third party and trust is involved.

Mixing
------

An alternative to using a tumbling service is to use mixing. The main difference to tumblers is that, instead of trusting in a third party service, a group of people collaborate into making a single transaction mixing the coins of everyone. The advantage is you don’t need to trust a service or the other people involved. The disadvantage is that you need to find another people to mix when you need to mix and this typically involves using a matching service for mixing.

A mixing transaction still keeps the link between the coins. Nevertheless, if you follow a specific coin going into the transaction you have a harder time knowing which of the other coins, that go in, are from the same person since you know multiple people are contributing with coins. Similarly, it’s harder to know which output coin contains value from a certain input although it’s not impossible if the values of the coins are all different since only a few combinations are valid. A way to improve this is to produce coins with the same value. Then, it’s a matter of guessing. You may know how many people participated, and you may follow the change coins, but for the regular outputs there’s no way to determine which coins are connected to a specific input coin.

In the example below, you can actually figure out that the pink 10 coin was combined with the 13 one resulting in a 20 and a 3. There is no other combination that results in a change of 3. Nevertheless, the produced 20 coin can be any of the two. When used at large, by many people and recurrently, it becomes costly to follow all possibilities and some degree of privacy is achieved in practice, without relying on any external service.

{% asset_img 06-wallet-mixing.png %}

Conclusion
----------

Although the "bank account" model, promoted by many mobile wallets, is convenient and easy to use it has drawbacks. Your privacy is managed by the wallet and, although it may do a good job, it is bound to leak information that you may care.

For example, memopay has sent several coins to apparently random people. Most wallets when running low on funds, will use those coins and, even if not intended, will allow memopay to know more about your wealth than arguably they should. Since the coins sent by memopay are worth less than a cent, a simple way to ensure you privacy is to donate those, and only those coins.

Knowing about the coins you receive, how they mix, and how they connect allows you a much greater control over your privacy. It may be that things like CashShuffle integration in wallets result in a good amount of automated privacy. But while if you know about the coins you spend you can decide to compromise privacy for convenience, the other way around is not possible. Knowledge is power, after all.
