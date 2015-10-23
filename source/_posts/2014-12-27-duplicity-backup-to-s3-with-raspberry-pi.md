---
s: duplicity-backup-to-s3-with-raspberry-pi
title: Duplicity Backup to S3 with Raspberry PI
date: 2014-12-27
categories: projects
tags: [backup, cloud, amazon, s3, rasberry-pi, duplicity]
thumbnail: /images/pi-aws.png
---

After [my search][1] for a durable online backup, the conclusion was *I need to
encrypt my files and backup them to S3*. So how do I do that? There are probably
a couple of ways to do it but a search for "encrypted backup s3", in Google,
quickly shows results for [duplicity][2].

By coincidence, my [Raspberry Pi B+][3] has just arrived and as it operates with
a power of [around 1.5 Watts][4] (with an wifi dongle) it is ideal to leave
running doing the backups. At least while I don't need it as a media center, of
course. So lets configure a backup system with the Pi (for short), duplicity and
S3 as the storage.

Base image
----------

First we need to choose a base system for the Pi. If we also want a media server
to occupy the cold nights then [Raspbmc][5] seems pretty good. Besides being a
debian and having XBCM pre-configured it has the added bonus of allowing to
pre-configure the network settings, which makes the first boot work even through
wifi.

We start by downloading and run the installer which then, in turn, downloads the
latest Raspbmc network image and writes it to the micro USB card. After that, we
just plug the Pi to the TV, plug it to the power and watch it boot. The first
boot takes a while but it is possible to monitor it's progress on the TV. Just
be sure that the DVI is connected when the Pi starts because connecting the DVI
cable afterwards didn't always work.

After a few restarts we get a configured XBMC. Tada! Anyway, today we're trying
to configure a backup system so let's move on.

First run with Duplicity
------------------------

The Raspbmc system provides an SSH server and we can connect with the user "pi"
and the password "raspberry", by default. The user "pi" is also a sudoer so
installing duplicity with support for S3 backups is rather easy.

``` bash
$ sudo apt-get install duplicity python-boto
```

After the installation is complete we can start a backup right away. Lets create
some folders and do a first run.

``` bash
$ mkdir src
$ mkdir dst
$ duplicity src file:///dst
Local and Remote metadata are synchronized, no sync needed.
Last full backup date: none
GnuPG passphrase:
Retype passphrase to confirm:
No signatures found, switching to full backup.
--------------[ Backup Statistics ]--------------
StartTime 1418687962.74 (Mon Dec 15 23:59:22 2014)
EndTime 1418687963.02 (Mon Dec 15 23:59:23 2014)
ElapsedTime 0.28 (0.28 seconds)
SourceFiles 1
SourceFileSize 4096 (4.00 KB)
NewFiles 1
NewFileSize 4096 (4.00 KB)
DeletedFiles 0
ChangedFiles 0
ChangedFileSize 0 (0 bytes)
ChangedDeltaSize 0 (0 bytes)
DeltaEntries 1
RawDeltaSize 0 (0 bytes)
TotalDestinationSizeChange 178 (178 bytes)
Errors 0
-------------------------------------------------
```

We can see that, by default, duplicity asks for a password and encrypts the
files stored in the target location. In order to have an automated backup system
it needs to be non-interactive. That can achieved easily with the use of an
environment variable.

``` bash
$ PASSPHRASE=testing duplicity src file://dst
```

Also, since duplicity uses GnuPG, the encryption is done with the CAST5 cipher
which is the default algorithm. That can be changed to AES256 by passing extra
options to GPG.

``` bash
$ PASSPHRASE=testing duplicity --gpg-options --cipher-algo=AES256 src file://dst
```

We already installed support for the Amazon storage -- with `python-boto` -- so
the file destination can be changed to an S3 URL and everything works as
before. A typical S3 URL has the form
`s3://s3-<region>.amazonaws.com/<bucket>/<path>` but there are other forms you
can check in the [S3 Documentation][6]. Using the S3 backend requires us to
setup the authentication and pass the Amazon's AWS access key id and secret
key. This can be done with the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
environment variables.

Scripting duplicity
-------------------

In order to control the amount of options a script comes in handy. Also, having
a script allows us to run the backup easily and control more aspects of the
backup. Lets start by putting the basics in a Bash script and accumulate logging
in a file.

``` bash
#!/bin/bash

BASEDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SOURCE="src"
TARGET="s3://s3-eu-west-1.amazonaws.com/backup/dst"

OPTIONS="$OPTIONS --gpg-options --cipher-algo=AES256"
OPTIONS="$OPTIONS --archive-dir $BASEDIR/cache"

export PASSPHRASE="<pass>"
export AWS_ACCESS_KEY_ID="<key>"
export AWS_SECRET_ACCESS_KEY="<secret>"

duplicity $OPTIONS "$SOURCE" "$TARGET" >> $BASEDIR/duplicity.log 2>&1
```

The options were expanded, for example, to specify a local cache directory with
the `--archive-dir` option. The cache directory is where duplicity keeps the
non-encrypted control files (manifest and sigtar). Keeping the cache next to the
script is a great way to keep track of progress and correct possible problems.

Scheduled Backup
----------------

Now that we have a script, a scheduled backup would be great. Cron is the
obvious choice but apparently it is not enabled by default in Raspbmc. The
easiest way to enable Cron is through the XBMC UI under *Programs -> Raspbmc
Settings -> System Configuration -> Service Management -> Cronjob
Scheduler*. After Cron is enabled we can create a file under `/etc/cron.d` with
the commands we want to schedule. Note that any file placed there will be
processed after 1 minute which means that changes and new commands will be in
effect 2 minutes later.

``` text Sample cron configuration
# min hour day  month weekday user command
  15  21   *    *     1       pi   /home/pi/backup/duplicity.sh
```

This will run the duplicity script at 9:15 PM of every Monday, that is, it will
do an incremental backup every week (after the first full backup, off
course). Any output from cron scripts are mailed to the local user and you can
use that. Nevertheless, the previous script has no outpu because duplicity's
output is redirect to a log file. We we must take care of sending email
explicitly but, then again, we have more control of the email that is sent.

Configuring Email
-----------------

The idea is to have an email, at the end of the backup, indicating if everything
happened has expected or not. That can be accomplished with the subject line
which means we can use the body of the email for the full output of the backup,
for example.

The first thing we need to do is install the missing software. There are a few
options but one of the simplest and most common is sSMTP.

``` bash
$ sudo apt-get install ssmtp mailutils
```

We need to configure sSMTP to send email through some server. To use GMail, for
example, we need to change the configuration file in `/etc/ssmtp/ssmtp.conf`.

``` bash
#
# Config file for sSMTP sendmail
#
# The person who gets all mail for userids < 1000
# Make this empty to disable rewriting.
root=your.account@gmail.com

# The place where the mail goes. The actual machine name is required no
# MX records are consulted. Commonly mailhosts are named mail.domain.com
mailhub=smtp.gmail.com:587
AuthUser=your.account@gmail.com
AuthPass=<password>
UseSTARTTLS=Yes

# Where will the mail seem to come from?
#rewriteDomain=gmail.com

# The full hostname
hostname=raspbmc

# Are users allowed to set their own From: address?
# YES - Allow the user to specify their own From: address
# NO - Use the system generated From: address
FromLineOverride=YES
```

We also need to change `/etc/ssmtp/revaliases` to give a valid address to the
local users `root` (running cron and other services) and `pi` running the backup
with duplicity (and XBMC). The revaliases file is pretty simple.

``` text
root:your.account@gmail.com:smtp.gmail.com:587
pi:your.account@gmail.com:smtp.gmail.com:587
```

There are several sources online that can help fine-tuning the configuration but
this is enough to be able to send emails. To test the configuration we can use
the `mail` command.

``` bash
$ echo Hello | mail -s "World of Mail" "your.account@gmail.com"
```

If you received the email then we can change the backup script and add a mail
notification at the end of it. If the backup had no problems we include "OK" in
the subject. Otherwise we add "ERR" to make it clear that something did not work
as expected.

``` bash
#!/bin/bash

BASEDIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

SOURCE="src"
TARGET="s3://s3-eu-west-1.amazonaws.com/backup/dst"

OPTIONS="$OPTIONS --archive-dir $BASEDIR/cache"
OPTIONS="$OPTIONS --gpg-options --cipher-algo=AES256"
OPTIONS="$OPTIONS --asynchronous-upload"
OPTIONS="$OPTIONS --volsize 100"

export PASSPHRASE="<pass>"
export AWS_ACCESS_KEY_ID="<key>"
export AWS_SECRET_ACCESS_KEY="<secret>"

LOG=duplicity.p$$.log
START=`date +"%F %T"`

duplicity $OPTIONS "$SOURCE" "$TARGET" >> $BASEDIR/$LOG 2>&1
RESULT=$?

MAILTO=your.account@gmail.com
MAILTAG=`(( $RESULT )) && echo "[ERR]" || echo "[ok]"`

cat $LOG | mail -s "$MAILTAG backup @ $START" "$MAILTO"
cat $LOG >> $BASEDIR/duplicity.log
rm -f $LOG
```

You can test it from the command line. To make things a little more interesting
we can increase the verbosity of the backup.

``` bash
$ OPTIONS="-v info" ./duplicity.sh
```

While it is running you can see that the script creates a log file based on the
PID. At the end of it the mail is sent, that log file is added to the main log
and then removed.

Rotating the Log
----------------

Although the amount of logging is small, by default, in order to be able to
leave the Rasberry Pi completely alone we still need to ensure the log does not
grow forever. Rotating the log is a matter of creating a new file under
`/etc/logrotate.d` like the following.

``` text
/home/pi/backup/duplicity.log {
  daily
  missingok
  rotate 2
  minsize 1M
}
```

We can check logrotate man page and adjust the directives to our liking but
anything that ensures a constant overall size of the log files is OK.

Real Life
---------

All of the above provides a reasonably reliable and secure backup, in theory. In
reality not everything works as expected with duplicity. 

In my particular case the source files are in a NAS that is mounted locally
through CIFS. The NAS goes to sleep at midnight and, when the backup is still
running, duplicity fails. That was expected and should not be a problem because
duplicity has support resume a backup. Nevertheless it so happens that
version 0.6.18 (included in Rasbian Wheezy) has a bug and the restart is not so
great. For example, after a full backup of 200GB, which took a couple of days
and experienced a few restarts, the next incremental backup uploaded almost
100GB. Not a good signal, since no file was changed in the source location.

So, next stop, upgrade. There is a version 0.6.24 in the Raspbian repositories
under the Jessie distribution. Instead of adding the distribution to the
`sources.list` I've just downloaded the package and installed it directly. All
the dependencies are satisfied so no problem there. Using that new version I've
run a few tests just to find out that, although the restarts seem to work, this
version has another bug. When a system error is encountered duplicity does not
exit completely because a GPG process is left hanging and this forced me to kill
the process by hand.

This problem does not seemed known and there is not more recent package to try
so hard luck. I found [duplicity's page at Launchpad][7] and checked that the
last source version (0.6.25) had no bug-fix for that error. That lead to the
creation of and account and opening bug [#1395341][8]. While I was exploring
Launchpad and the source code for duplicity, I decided to give it a try in
fixing the bug. After learning the basics of Bazaar and installing the required
dependencies, in a virtual machine, the bug turned out to be simple to spot and
fix. This resulted in [a patch][9], [a branch][10], and [a merge proposal][11]
which, by the way, was eventually accepted and is added to both [0.6][12] and
[0.7][13] branches. Woo hoo!

Looking at the packages we can see that the next Ubuntu release will include
version 0.6.23 of duplicity which means it will take a while before 0.6.26
or 0.7 are included in a stable (or event testing) Debian release. The
alternative is to download the 0.6.25 tarball, apply the patch, install the
required build tools, build duplicity from source and use the custom version by
setting `PATH` and `PYTHONPATH`. It's actually simpler than it looked at first
despite the fact you have to bring development tools into the system.

``` bash
$ sudo apt-get install gcc patch librsync-dev python-dev
... 
$ mkdir source
$ cd source
$ wget --no-check-certificate https://launchpad.net/duplicity/0.6-series/0.6.25/+download/duplicity-0.6.25.tar.gz
...
$ tar -zxvf duplicity-0.6.25.tar.gz
$ wget --no-check-certificate https://bugs.launchpad.net/duplicity/+bug/1395341/+attachment/4265793/+files/duplicity-0.6.25.patch
...
$ cat duplicity-0.6.25.patch | patch -d duplicity-0.6.25 -p0
patching file duplicity/gpg.py
$ cd duplicity-0.6.25
$ cd duplicity
$ $ python compilec.py
running build
running build_ext
building '_librsync' extension
creating build
creating build/temp.linux-armv6l-2.7
gcc -pthread -fno-strict-aliasing -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -fPIC -I/usr/include/python2.7 -c _librsyncmodule.c -o build/temp.linux-armv6l-2.7/_librsyncmodule.o
creating build/lib.linux-armv6l-2.7
gcc -pthread -shared -Wl,-O1 -Wl,-Bsymbolic-functions -Wl,-z,relro build/temp.linux-armv6l-2.7/_librsyncmodule.o -lrsync -o build/lib.linux-armv6l-2.7/_librsync.so
$ cd ../..
$ PATH=$PWD/duplicity-0.6.25/bin:$PATH PYTHONPATH=$PWD/duplicity-0.6.25 duplicity --version

Duplicity 0.6 series is being deprecated:
See http://www.nongnu.org/duplicity/

duplicity 0.6.25
```

The deprecation warning was added recently to the 0.6 branch of duplicity. You
can always try the new 0.7.x versions. Nevertheless, if you define `PATH` and
`PYTHONPATH` as above at the start of the backup script the new patched
duplicity will be used.

Wrapping up
-----------

Despite all the problems in the last step, it's obvious that with duplicity we
can setup a simple, secure, and efficient backup system to the cloud. All the
tools are readily available -- including the development tools -- and are easy
to setup in the Raspberry Pi.

When you know what to do, setting up the backup from scratch would take less
than 1 hour. But then, all the testing and modifications of the script take days
or weeks. We can expand the script to allow restoring files and purging old
backups from the remote storage. We can also change the encryption to use public
key encryption and the GPG agent. The sky (or your shell script skills) is the
limit. Projects like [Duply][14], I guess, started much in the same way and now
provides a very advanced script with a lot of extra features. It does not include
custom mail notifications, though, an relies on cron emails.

It all depends on your needs. If you are trying to keep things simple or totally
under your control you may want to start your script. Otherwise starting with a
powerful foundation and grow from there may be approprate. In all cases, though,
you will need to read a bit of documentation because most configuration options
are important. In the end, we want a backup that is simple, fast, secure and,
most of all, that we can restore when we actually need it which by definition is
the worst moment possible.


[1]: /blog/2014/11/26/durability-in-cloud-backup/
[2]: http://duplicity.nongnu.org/
[3]: http://www.raspberrypi.org/products/model-b-plus/
[4]: http://raspi.tv/2014/how-much-less-power-does-the-raspberry-pi-b-use-than-the-old-model-b
[5]: http://www.raspbmc.com/
[6]: http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html#access-bucket-intro
[7]: https://launchpad.net/duplicity
[8]: https://bugs.launchpad.net/duplicity/+bug/1395341
[9]: https://bugs.launchpad.net/duplicity/+bug/1395341/+attachment/4265793/+files/duplicity-0.6.25.patch
[10]: https://code.launchpad.net/~m4ktub/duplicity/0.6-reliability
[11]: https://code.launchpad.net/~m4ktub/duplicity/0.6-reliability/+merge/242575
[12]: http://bazaar.launchpad.net/~duplicity-team/duplicity/0.6-series/revision/998
[13]: http://bazaar.launchpad.net/~duplicity-team/duplicity/0.7-series/revision/1030
[14]: http://duply.net/
