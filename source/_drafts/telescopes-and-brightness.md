---
title: Telescopes and Brightness
categories: ideas
tags:
  - telescope
  - aperture
  - brightness
  - magnitude
  - logarithm
thumbnail:
s: telescopes-and-brightness
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