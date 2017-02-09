---
title: 'A new space race: destination Mars'
categories: ideas
tags:
  - mars
  - space
  - future
  - colonization
  - spacex
  - nasa
  - esa
  - boeing
thumbnail: /images/mars-now-what.png
s: destination-mars
date: 2016-10-31Z
updated: 2017-02-09Z
---

It seems we officially have a new space race. Some time ago Boeing CEO [said][1]:

  > I'm convinced that the first person to step foot on Mars will arrive there 
    riding on a Boeing rocket -- Dennis A. Muilenburg, Boeing CEO

The comment seems to be a response to [the plans Elon Musk presented][2] early 
for SpaceX and it's Interplanetary Transport System. Being forced to compete
with SpaceX on NASA's public contracts and make such public statement is already
significant and will put more fuel in the idea that a human mission to Mars in
the next 20-30 years is possible and will happen.

[Mars One][3] was the first organization to publicly, and loudly say, we will 
put humans on Mars. Currently [their roadmap][4] point to the year 2027. 
[NASA's journey to Mars][3] is probably the most credible plan and puts humans 
on Mars in the late 2030s. Since Boeing is piggy backing on NASA and it's 
funding, it makes sense that the time frame is the same. For SpaceX, there are 
a lot of dates but [the latest optimistic estimate][5] is 2025. The European 
Space Agency (ESA) has an Aurora program which, according to [the Wikipedia 
page][6], also estimate 2030s for the first human mission. ESA seems to have 
scrapped the human part of the Aurora program but maybe if the hype increase it 
is reintroduced. 

There is off course much collaboration between public agencies and competition
between private organizations. The important part is that the idea of putting
people on Mars sticks and a new space race begins. Let the race begging!


<div style="margin-bottom: 20px;">
    <table>
        <tr>
            <td width="100">Wallet</td>
            <td width="100">&nbsp;</td>
            <td width="80" style="text-align: center;">NASA</td>
            <td width="80" style="text-align: center;">Space X</td>
            <td width="80" style="text-align: center;">Boeing</td>
            <td width="80" style="text-align: center;">Mars One</td>
            <td width="80" style="text-align: center;">ESA</td>
        </tr>
        <tr>
            <td><span id="twallet">100</span></td>
            <td style="text-align: right;"><strong>Bets</strong></td>
            <td style="text-align: center;"><input id="ibetnasa" type="text" size="2"/></td>
            <td style="text-align: center;"><input id="ibetspacex" type="text" size="2"/></td>
            <td style="text-align: center;"><input id="ibetboeing" type="text" size="2"/></td>
            <td style="text-align: center;"><input id="ibetmarsone" type="text" size="2"/></td>
            <td style="text-align: center;"><input id="ibetesa" type="text" size="2"/></td>
        </tr>
    </table>
    <span style="font-size: smaller;">Just put some numbers in one or more of the boxes and press "Race!". You can press "Reset!" to get the ships back at the start with new odds. From there you can try again.</span>
    <input id="brace" type="button" value="Race!" onclick="race();"/><input id="breset" type="button" value="Reset" onclick="reset();"/>
    
</div>
<div style="position: relative; height: 330px;">
    <div style="background-color: red; position: absolute; right: -10px; width: 10px; height: 320px;">&nbsp;</div>
    <div style="position: absolute; top: 8px;">NASA<br/><span id="rknasaodds" style="font-size: x-small;">Odds: 2 to 1</span></div>
    <img id="rknasa" style="position: absolute; top: 0px; left: 11%;" src="{% asset_path rocket.png %}">
    <div style="position: absolute; top: 73px;">SpaceX<br/><span id="rkspacexodds" style="font-size: x-small;">Odds: 2 to 1</span></div>
    <img id="rkspacex" style="position: absolute; top: 65px; left: 11%;" src="{% asset_path rocket.png %}">
    <div style="position: absolute; top: 138px;">Boeing<br/><span id="rkboeingodds" style="font-size: x-small;">Odds: 3 to 1</span></div>
    <img id="rkboeing" style="position: absolute; top: 130px; left: 11%;" src="{% asset_path rocket.png %}">
    <div style="position: absolute; top: 201px;">Mars One<br/><span id="rkmarsoneodds" style="font-size: x-small;">Odds: 7 to 1</span></div>
    <img id="rkmarsone" style="position: absolute; top: 195px; left: 11%;" src="{% asset_path rocket.png %}">
    <div style="position: absolute; top: 266px;">ESA<br/><span id="rkesaodds" style="font-size: x-small;">Odds: 5 to 1</span></div>
    <img id="rkesa" style="position: absolute; top: 260px; left: 11%;" src="{% asset_path rocket.png %}">
</div>

<script type="text/javascript">
    var posStart = 11;
    var posMax = 85;
    var wallet = 100;
    var rockets = {
        rknasa:    { pos: posStart, p: 0.1 },
        rkspacex:  { pos: posStart, p: 0.1 },
        rkboeing:  { pos: posStart, p: 0.2 },
        rkmarsone: { pos: posStart, p: 0.6 },
        rkesa:     { pos: posStart, p: 0.4 }
    };
   
    function reset() {
        function odds(low, high) {
            var margin = high - low;
            return low + (Math.random() * margin);
        }
    
        rockets = {
            rknasa:    { pos: posStart, p: odds(0.1, 0.3) },
            rkspacex:  { pos: posStart, p: odds(0.1, 0.4) },
            rkboeing:  { pos: posStart, p: odds(0.1, 0.5) },
            rkmarsone: { pos: posStart, p: odds(0.3, 0.9) },
            rkesa:     { pos: posStart, p: odds(0.2, 0.6) }
        };
        
        for (var name in rockets) {
            var rocket = rockets[name];
            var odd = 1 + Math.round(rocket.p * 100) / 10;
            document.getElementById(name).style.left = rocket.pos + "%";
            document.getElementById(name + "odds").innerText = "Odds: " + odd + " to 1";
        }
        
        document.getElementById("ibetnasa").disabled = "";
        document.getElementById("ibetspacex").disabled = "";
        document.getElementById("ibetboeing").disabled = "";
        document.getElementById("ibetmarsone").disabled = "";
        document.getElementById("ibetesa").disabled = "";
        document.getElementById("brace").disabled = "";
        document.getElementById("breset").disabled = "";
    }
    
    function getBet(name) {
        var val = parseInt(document.getElementById("ibet" + name.substring(2)).value)
        if (isNaN(val)) {
            document.getElementById("ibet" + name.substring(2)).value = "";
            return 0;
        } else {
            document.getElementById("ibet" + name.substring(2)).value = val.toString();
            return val;
        }
    }
    
    function race() {
        document.getElementById("ibetnasa").disabled = "disabled";
        document.getElementById("ibetspacex").disabled = "disabled";
        document.getElementById("ibetboeing").disabled = "disabled";
        document.getElementById("ibetmarsone").disabled = "disabled";
        document.getElementById("ibetesa").disabled = "disabled";
        document.getElementById("brace").disabled = "disabled";
        document.getElementById("breset").disabled = "disabled";
    
        var stop = false;
        var winner;
        
        for (var name in rockets) {
            var rocket = rockets[name];
            
            var rnd = Math.random();
            if (rnd < rocket.p) {
                continue;
            }
            
            rocket.pos = Math.min(posMax, rocket.pos + (rnd < 0.99 ? 1 : 2))
            document.getElementById(name).style.left = rocket.pos + "%";
            
            if (rocket.pos == posMax) {
                winner = rocket;
                stop = true;
            }
        }
        
        if (!stop) {
            setTimeout(race, 40);
        } else {
            var delta = 0;
            for (var name in rockets) {
                var rocket = rockets[name];
                if (rocket === winner) {
                    var odd = 1 + Math.round(winner.p * 100) / 10;
                    delta += odd * getBet(name);
                } else {
                    delta -= getBet(name);
                }
            }
            
            wallet += delta;
            var indcolor = delta > 0 ? "green" : "red";
            var indicator = " (<span style='color: " + indcolor + ";'>" + (delta > 0 ? "+" : "") +  delta + "</span>)";
            document.getElementById("twallet").innerHTML = wallet.toString() + indicator;
            document.getElementById("breset").disabled = "";
        }
    }
</script>

[1]: http://arstechnica.com/science/2016/10/boeing-ceo-first-person-to-step-onto-mars-will-ride-on-our-rocket/
[2]: https://www.theguardian.com/technology/2016/sep/27/elon-musk-spacex-mars-colony
[3]: http://www.mars-one.com/
[4]: http://www.nasa.gov/topics/journeytomars/index.html
[5]: http://www.spacenewsmag.com/feature/can-elon-musk-get-to-mars/
[6]: https://en.wikipedia.org/wiki/Aurora_programme