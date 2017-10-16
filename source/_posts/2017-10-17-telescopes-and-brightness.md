---
title: Telescopes and Brightness
categories: ideas
tags:
  - telescope
  - resolution
  - brightness
  - contrast
  - eye
thumbnail:
s: telescopes-and-brightness
date: 2017-10-17Z
---

On [previous episodes][1], I tried to get some basic figures about the [KONUSTART-900][2] telescope. The formulas are theoretical limits for the telescope so we should expect some difference, to worse, when actually looking through the telescope. I cannot test the minimum magnification because eyepieces with focal length greater than 40mm are rare (and expensive) and, not least important, because I currently only have a 20mm eyepiece. What I can easily test is the maximum magnification and in fact, splitting doubles is simple.

Resolution
----------

Repeating the Rayleigh criteria we have ${theta = 1.220 lambda/D = 1.220 (545 nm) / (60 mm) = 2.3''}$. Nevertheless by looking at some available doubles I see that the resolution is more than 3''.

{% asset_img doubles.png "Resolution when looking to Algieba, Izar, Porrima, and Antares" %}

From the four targets I had, the first was Algieba. With it's 4.7'' of separation the split was clearly visible and defined as expected. The next target was Izar and, with the 2.9'' separation I expected to still be able to split the double. Nevertheless no luck there. Izar was a single bright star and even with some turbulence in the air it seemed a well defined single star. The next two targets were supposed to be the harder ones and, after Izar, I didn't expect much. Still, curiously, both Porrima and Antares could be discerned as doubles, although barely and only because I knew they were doubles. Porrima showed as a slightly egg shaped star which, with the air turbulence, was sometimes more pronounced. Antares showed the same elongated shape but also showed distinct red and blue colors on both ends. They were both bellow the Rayleigh criteria though.

I don't really know why Izar was so point like but from that and what I could see from the others I would estimate that the limit is around 3.5''. This means, for example, that the Great Red Spot of Jupiter should be very hard to see since it is 14000 km tall and thus has, at most, an angular size of 4.25''. With good seeing conditions it should be more of a Smallish Red Dot than a easily distinguishable feature.

Brightness and Contrast
-----------------------

And although resolution is important, when actually looking though the telescope it's easy to see that brightness and contrast are equally if not more important aspects. On the one hand, there's the somewhat counter intuitive aspect of "too much light". All the light, from the night sky, seems so precious that when I point at Jupiter when it is close to [opposition][3], I get surprised by it being too bright. On the other hand, to see detail we need contrast. It's a fact intrinsically connected with the way our eye works and which makes light pollution particularly problematic.

Obviously, the eye is the final lens and it makes a series of compromises to get such an impressive performance. One of those compromises is that we do not perceive brightness consistently, that is, our perception is constantly adapting to a certain brightness. Once adapted we have a lower limit to the intensity we can perceive, that is, we see black even if physically we could perceive that lower intensity with a better adaptation. It's common knowledge that it takes quite a few minutes (~20 minutes) to get a good adaptation to the dark environment and that a brief flash of light ruins that adaptation for some time. I've found quite an interesting [page about our perception of light intensity and contrast][4]. The thing is, once adapted our perception is quite extraordinary and defies the theoretical predictions. For example, the image bellow shows what the brightness I predicted for Jupiter with 120x magnification and the approximate brightness I perceive.

{% asset_img jupiter-brightness-real.png "Jupiter's predicted and actual brightness" %}

Get out there
-------------

Although I would like to figure things out precisely and know what I would see when I go out with the telescope, a few nights out were enough to convince me otherwise. The theory is a good starting point when you have not other reference but only with experience will I actually be able to predict what I will see when looking through the telescope. The system is very dynamic. For example, a slightly higher humidity may reflect more light from the ground and reduce transparency. A slightly more tired eye can accumulate more tear. There are a series of factors that I believe with experience you know how to manage or, at least, understand why you're not splitting a double, or seeing a galaxy. Still, I'll invest in some filters to enhance contrast and control brightness. Maybe next year, when Jupiter is gain in opposition I'll be able to see the Big Red Spot.  

<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      asciimath2jax: {
        delimiters: [['${', '}$']],
        skipTags: ["script","noscript","style","textarea"]
      },
      "HTML-CSS": {
        matchFontHeight: false
      }
    });
</script>
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=AM_HTMLorMML"></script>

[1]: /posts/2017/04/01/telescopes-and-light-pixels/
[2]: http://www.konus.com/en/Catalogue/Scienza/Telescopes/For-kids--beginners/KONUSTART-900/
[3]: https://en.wikipedia.org/wiki/Opposition_(planets)
[4]: http://www.telescope-optics.net/eye_intensity_response.htm