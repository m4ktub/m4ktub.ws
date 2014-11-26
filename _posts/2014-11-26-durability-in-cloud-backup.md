---
layout: post
title:  Durability in Cloud Backup
date:   2014-11-26 02:41:55
categories: ideas
---

I've been using [Wuala][1] since 2008. I've read their [initial paper][2] and
liked the concept of the service: you don't need to trust us because we cannot
even violate your trust. In 2008, choosing Wuala for cloud backup was easy
because it was probably the only service with client-side encryption, an app to
manage things, and the possibility to still share files online. Enters the NSA
and pop! pop! pop! there other similar services now like SpiderOak or tresorit.

I'm glad those services appeared mainly because, for a long time, it seem I was
the only guy that wanted my files to be private and online. I want them to be
private because, well, they are my files. And I want them online for backup
purposes and reachability.

Changing Needs
---------------

At home I have a LaCie 2Big NAS for storage and backed up all the pictures to
Wuala. This means the other stuff was only stored in the NAS with RAID 1
redundancy. It was a nice compromise with 20GB of online storage and 100GB of
local storage and, after all, the movies where still accessible due to the
integration of the NAS with the Wuala service.

Then a few things changed.

  1. LaCie was bought by Seagate and the Wuala service integration was removed
     from the NAS. Curiously this was done in update 3.1.5.1 and that update is
     required before I can apply the security update to fix the Shell Shock and
     SSL vulnerabilities detected in September 2014.
  2. I wed and put all the photos and videos of the wedding in the NAS. That
     started me thinking that, maybe, I needed a backup.

A decent backup service
-----------------------

So what I started to value the durability of the data and looked a bit more
closely to my current situation. The 2Big NAS was configured in RAID 1 which
ensures some durability and availability of the files. At least I have that,
right? Yes... and no. The RAID 1 setup has no surprises but, in each update by
LaCie, I get the following:

    Before running the update, LaCie highly recommends that you back up all the
    data stored on your LaCie device onto another hard drive. Please note that
    LaCie is not responsible for any lost data and will not accept any claims
    for files of any kind that are believed missing from your LaCie device after
    running this update.

Yeah, I had updated the NAS before but now, after my "important stuff do not
loose" mental click this statement seemed totally unfair. Unfortunately the
disclaimer is pretty common and probably data-loss will never happen but there
are no insurances and not even a message like "the update should not touch your
data but ...". 

So the solution is to back up ALL the data. Since I'm considering a back up,
buying another NAS and placing it side by side with the first one is dumb
because it's only marginally better. I need an off-site backup and since I'm
already using Wuala I looked into the Terms of Use and found, surprise surprise:

    Customer acknowledges the inherent risks involved in online data storage,
    including without limitation the risk of destruction or loss of data. LACIE
    PROVIDES ALL SERVICES “AS IS” AND WITH ALL FAULTS. THE ENTIRE RISK
    ASSOCIATED WITH THE SERVICES IS ASSUMED BY CUSTOMER.
    
Great! How awesome. Yay! It seems the cloud is a dangerous place for data even
in a secure cloud storage and backup service. Again, it's a very common
disclaimer but here I'm a bit more skeptical. Isn't Wuala supposed to have their
own redundancy and backups? They talk about it. It just does not seem enough to
assume anything when it comes to the customer's data.

I guess that "durability" is not that *sellable* in the cloud backup space but I
could find a couple. For example, [Backupsy][3] has a VPS service specialized
for backup where they ensure all disks drives are in a RAID 50 setup. And then
there is also [Amazon's S3][4] and their 99.999999999% durability claim. It's a
commercial line, and not an exact measure, but they do make it highly visible
and say what measures are in place.

Tradeoffs
---------

In the end I have a few secure cloud backup services that say "we do our best
but you know your picture... it's gone" and a few durable cloud services that
say "you picture is perfectly fine as you and everyone else can see". These
leaves me two choices:

  1. Backup to multiple secure services.
  2. Encrypt data before backing up to a durable service.

Considering that each secure service has their own client applications and that
my current 200GB of data, the costs of encrypting and storing in S3, for
example, are way cheaper than the alternative. With Wuala, or any of the
alternatives, 100GB of data cost around 100€/year. In comparison, S3 costs
around 30€. On the other hand, S3 is just that, storage. All the other features,
like synchronization between computers or online sharing, are lost.

There are always trade-offs to be made and in this case security and durability
are more important to me than the other features. In the near future, and until
durability and encryption are demanded and *sellable* features in cloud storage,
I will need to setup a custom backup, with client side encryption, to Amazon
S3.

[1]: https://www.wuala.com/
[2]: http://dcg.ethz.ch/publications/srds06.pdf
[3]: https://backupsy.com/
[4]: http://aws.amazon.com/s3/

