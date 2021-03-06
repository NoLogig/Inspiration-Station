Is there a way get something like decibel levels from an audio file and transform that information into a json array?
Ask Question

So that I can use the information to coordinate a page animation like making elements brighter as the decibel levels get higher


This approach will work in Chrome / Safari:

```ts 
function(){
  
  var ctx = new AudioContext()
    , url = 'https://cf-media.sndcdn.com/OfjMZo27DlvH.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vT2ZqTVpvMjdEbHZILjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE1MTUwNDM5Njd9fX1dfQ__&Signature=FfmL2qUssAKs3Z7EPoYo0Yq8-SAg8rKLPs65EasXwuVkfsOB4joFqeCvVR2elpaG-lJaV4hXpXFiRCDWXNOYyAtO4Oz~sexiPwIoSk8-jWiVbGQRS8TMmUmj7TJzxemMOIj7ugWJKk6PHsrUdgqs9woDpHzxmkGCzk6sfqJEIsdeZJ4rWUFAh4iGWn9M6b0xfzTgndAJmytkNj9raCpWCBVmdr5u-r9nt~q5uF1easNSW9oaFilM4s1Hq2ei~VJye8zW9bzvrGm8idVdy-tiPeMWAKcE8J2VuaS1Ret6jRTRaHTDuiNgA5sZvgTzNpEpKtWI7UmAWI5TrqNVSlxpgQ__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ'  
    , audio = new Audio(url)
    // 2048 sample buffer, 1 channel in, 1 channel out  
    , processor = ctx.createScriptProcessor(2048, 1, 1)
    , meter = document.getElementById('meter')
    , source
    
  audio.crossOrigin = 'anonymous'

  audio.addEventListener('canplaythrough', function(){
    source = ctx.createMediaElementSource(audio)
    source.connect(processor)
    source.connect(ctx.destination)
    processor.connect(ctx.destination)
    audio.play()
  }, false);
  
  // loop through PCM data and calculate average
  // volume for a given 2048 sample buffer
  processor.onaudioprocess = function(evt){
    var input = evt.inputBuffer.getChannelData(0)
      , len = input.length   
      , total = i = 0
      , rms
    while ( i < len ) total += Math.abs( input[i++] )
    rms = Math.sqrt( total / len )
    meter.style.width = ( rms * 100 ) + '%'
  }
  
}()
#meter {
  width: 0%;
  height: 15px;
  margin: 2px 0;
  background: green;
  -webkit-transition: width .05s;
}
<div id="meter"></div>
 Run code snippetExpand snippet
The important stuff happens here:

processor.onaudioprocess = function(evt){
  var input = evt.inputBuffer.getChannelData(0)
    , len = input.length   
    , total = i = 0
    , rms
  while ( i < len ) total += Math.abs( input[i++] )
  rms = Math.sqrt( total / len )
  meter.style.width = ( rms * 100 ) + '%' 
}
```
Basically, you grab the raw PCM data (values from -1 to 1) every 2048 samples and you loop through them, calculating the average signal level over the given period of time.

You can then use that value to do your animations.

Kevin Ennis
Wouldn't an AnalyserNode be much better for this task?
Maybe? You could certainly profile it and find out for sure. At the very least, it's probably worth mentioning that since this post the ScriptProcessorNode has been deprecated in favor of the AudioWorkerNode.

Yes, you need to grab the raw PCM samples (like Kennis mentions). However, to calculate the overall volume levels, you want to grab the RMS (Root Mean Square) of the values. Also, you will likely want to pay attention to all the channels in the stream, not just the first channel (so you can accurately reflect the volume level for a stereo stream for example).

There are some tricks (make sure you use multiplication of the same samples across channels, not addition). Then you will be adding them all together (again like Kennis is doing). If you want it an actual decibels, there is a log step that is required as well.

There is an example as an answer to this other question.

Relevant code:
```ts
var rms = Math.sqrt(sum / (_buffer.length / 2));
var decibel = 20 * (Math.log(rms) / Math.log(10));

Thanks Jason. You're totally right about using RMS. I was being lazy. FWIW, my example actually sums the left and right channel at the processor node (unless I've misunderstood the spec) - so they should both be represented in the total. – Kevin Ennis Dec 6 '12 at 2:26
Ah cool! Thanks Kevin :). I didn't look at the spec, so I wouldn't be surprised :). – Jason Olson Dec 6 '12 at 3:40
add a comment
```

Web Audio Api working with Decibels

I wish to understand how to work with decibels in Web Audio API

Here i have an audio buffer connected to a gain node

```ts
var mybuffer = context.createBufferSource());
mybuffer.buffer = buffer; //an audio buffer

var gainNode=context.createGain();

mybuffer.connect(gainNode);
gainNode.connect(context.destination);
```

Gain volume is a range from 0(silent) to n where 1 is the default volume but as i know, usually audio is not related to such a range, its volume is measured in decibels (Db) and operations are made in Db too.

I have read something interesting in this answer but it's far to be complete for my needs: Is there a way get something like decibel levels from an audio file and transform that information into a json array?

I wonder how to determine decibel for an Audio Node, how to edit volume using decibels

Decibels are an interesting beast. Decibels aren't really a measure of volume, per se - they're a measure of gain or attentuation, as described in http://en.wikipedia.org/wiki/Decibel. The number of decibels is ten times the logarithm to base 10 of the ratio of the two power quantities.

You can get decibels out of one critical place in the Web Audio API - the RealtimeAnalyser's getFloatFrequencyData returns a float array of attenuation per frequency band, in decibels. It's not technically volume - but it's attenuation from unity (1), which would be a sine wave in that frequency at full volume (-1 to 1).

Gain controls are, of course, commonly expressed in decibels, because they're a measure of a ratio - between unity and whatever your volume knob is set to. Think of unity (0 dB, gain=1) as "as loud as your speakers will go".

To express a gain in decibels, remember that a gain of 1 (no attenuation, no gain) would equal 0 decibels - because 10^0 = 1. (Actually - it's because 10 ^ (0/10) = 1. Obviously, zero divided by anything is still zero - but remember, these are DECI-bels, there's a factor of ten in there.) The aforementioned Wikipedia article explains this in good depth.

To convert between the two - e.g., to set a gain.value when you have decibels, and to get the decibel gain from gain.value - you just need to use the formula
```ts
decibel_level = 20 * log10( gain.value );
```
aka

```ts
gain.value = Math.pow(10, (decibel_level / 20));
```

Note that base 10 log is a little more complex in Javascript, due to only having access to the natural logarithm, not the base 10 logarithm - but you can get that via

```ts
function log10(x) {
    return Math.log(x)/Math.LN10;
}
```
(There's a Math.log10() method, but it's experimental and not implemented across all browsers.)

Actually, I think it should be Math.pow(10, dB / 20) (cf. teropa.info/blog/2016/08/30/amplitude-and-loudness.html)
Oops! right you are. – cwilso Jan 26 '17 at 4:40