---
title: "Bitcoin Cash 101: Ownership"
categories: ideas
tags:
  - bitcoin
  - coins
  - basics
  - ownership
thumbnail:
s: bitcoin-cash-101-ownership
date: 2018-12-22Z   
---

In a [previous post][1] I've explored the concept of coins. Nevertheless, there was another important concept that I've only mentioned briefly which is that of "ownership". Using the physical wallet analogy, it's intuitive that if you have a coin in your wallet then you own it and you can spend it. Restricted physical access is the criteria used for ownership. But, in bitcoin, every coin is "out there" as publicly available information for anyone to see and inspect. What does it mean to own a coin?

{% asset_img bitcoin-bubble.jpg %}

You may have heard the phrase "if you don't have the keys then you don't own the coins" and I want to explore what does that actually mean. To do that I'll expand the physical wallet analogy a few times. Be prepared for some creative and mind bending analogies.

Addresses
---------

Every Bitcoin Cash address is like a compartment in your physical wallet where everyone can put coins but only you can take them out because only you have a key to open that compartment. It's a really secure compartment so the physical wallet analogy starts to break here. It's best we change the analogy already.

Every Bitcoin Cash address is like a vault on the Internet in which everyone can deposit coins but only you can open, to take coins out. It's not like a bank vault because you can create as many as you want. You also don't need to ask anyone permission to open it and take coins out.

The typical vault is opened with a key which makes your wallet more of a key holder. Whenever you give out a new address you're creating this vault on the Internet and you hang the key to the vault in your key holder. If you hold your wallet, you hold all the keys and, in turn, you own all the funds in the vaults you created. This takes us back to the sentence "your keys then it's your coins".

But if the vaults are on the Internet how do I reach them? How do the keys in my wallet actually open them?

Signatures
----------

Obviously, vaults on the Internet are not really opened by putting keys into locks and turning. Instead, you use a key as a "pen" to sign an authorization. That signature is then attached to a transaction and the transaction sent to the bitcoin network. Miners then check if the signature is valid for each coin being spent, that is, that it matches the expected signature for the vault that contains the coin.

Lets review out analogy once again. Every bitcoin address is like a very secure vault. The vault is protected by a contract written in bitcoin script. Everyone can put coins in that vault but only miners, after proper authorization, can move coins out of it. You authorize miners to take coins out by fulfilling the terms of the contract and including that with each input of a transaction. The most common contract just requires a signature.

Wait contracts? If vaults are protected by miner enforced contracts, who writes the contract? When is is written?

Contracts
---------

Whenever you send Bitcoin Cash to someone, you actually set the terms on how it can be spent. It's a bit weird but it's you, instead of the receiver that writes the contract. The money you send effectively has strings attached and can only be spent has you say.

Obviously, things seem to work so there must be something to it. What happens is that there are only two kind of addresses:

  * Addresses that start with a "q" are vaults protected by a key. When your wallet makes a transaction to those addresses is always sets the terms as "the one who can sign with the key for the vault can spend the funds".
  * Addresses that start with a "p" are a little different. They are vaults protected by sealed contracts. When your wallet makes a transaction to those addresses it sets the terms as "funds can be spent according to that sealed contract".

Although in theory you could set any terms, like "if you know my birthday you can spend the funds", in practice, when sending, wallets only understand those two cases. This means that, to make use of more advanced contracts like the "birthday" one, you need to have a more advanced wallet that creates "p" addresses and let's you write the contract. When you give out the "p" address for the new "birthday" vault people can send funds there but don't know the contract. Not even the miners know how the funds can be spent. All they know is that there is a contract and that, when a coin is spent, the contract must also be attached to the transaction together with whatever the contract requires. Typically it's one or more signatures but, for the "birthday" vault, that would simply be 2 numbers to form the birthday.

An important detail is that the contract would need to contain the birthday so the miners could validate what was given. Since the contract is revealed when a coin is spent then everyone would be able to see the "solution" and, as they have the solution, spend any other coin in that vault. This raises an important point. If you can lose exclusive access to a vault just be spending some coins how exactly can we define ownership of coins?

Ownership of coins
------------------

First it's important to point out that by "ownership" I'm excluding any real world legal implications. For example, if you give your house keys to someone they don't automatically own the house. But in this context they will.

The short answer: you own all the coins you know how to spend.

The key word is "know". If you know something then other people can also know it. From that it's simple to see there can be shared ownership of coins. Just by sharing information. You may also know that all the keys from your wallet can be recovered from a simple 12 word phrase (the seed). If you know that seed (and how to use it) then you can spend all the coins in the "q" vaults generated from it. You own those coins. For "p" addresses you also need to know the terms of the contract and then how to fulfil them. If you know those then you also own the funds protected by that contract.

But there are nuances. Sometimes what you know may be necessary but not sufficient to spend the coin. In multi signature coins, multiple signatures are required for the transaction to be valid. You may know one of the keys and must collaborate with others to spend the coin. In the process you don't gain more knowledge or, at least, you don't get enough knowledge to be able to spend the coin by yourself. The coin continues to be under a shared ownership.

While in a physical wallet, ownership could be thought of as exclusive physical access to the wallet, in a electronic cash system, ownership is determined by exclusive knowledge or exclusive information. As we know, information wants to be free so keeping it exclusive is a tough challenge. That's why hardware wallets are so popular. They promise that the secrets cannot ever leave the device. This means you turn information security back again into physical security. Pieces of hardware are not known to want to be free.

Knowledge is power! And in bitcoin it can be also ownership.

[1]: /posts/2018/12/15/bitcoin-cash-101-coins-and-privacy/
