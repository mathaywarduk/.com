---
layout: post
container-type: article
content-type: post

title: "What's in a name?"
description: "This is a real discussion within the Erskine front-end team about CSS naming conventions for a button."
keywords: "css naming conventions"

date: 2014-01-07 11:30:00
pub-time: 2014-01-07T11:30
posted-on: Erskine Design
posted-on-url: http://www.erskinedesign.com/blog/whats-name/

share-img: "social/default.jpg"
snippet: "This is a real discussion within the Erskine front-end team about CSS naming conventions for a button."
keywords: "css naming conventions"
---

This is a real discussion (with most of the swearing removed) within the Erskine front-end team about CSS naming conventions for a button. Hopefully it illustrates our attention to detail and how much we care about getting things right... or at least our stubborn and argumentative side.

**Mat:** *&ldquo;What should I call this button?&rdquo;*

**Robin:** *&ldquo;What?&rdquo;*

**M:** *&ldquo;Well it&rsquo;s a button, so has the class .button, but it&rsquo;s also the primary call to action, that&rsquo;s why it&rsquo;s red.&rdquo;*

**R:** *&ldquo;Oh, .button—red?&rdquo;*

**M:** *&ldquo;Hmmm, I was thinking .button—primary&rdquo;*

**R:** *&ldquo;Yeah, but then how does another developer know which one is &lsquo;primary&rsquo;?&rdquo;* (Robin is obsessed with the [ease of maintenance](http://erskinedesign.com/blog/front-end-maintenance-and-ladder-abstraction/)).

**M:** *&ldquo;But what if we change the button colour later on?&rdquo;*

**R:** *&ldquo;Find and replace!&rdquo;*

**Tom:** *&ldquo;Noooo!&rdquo;*

**M:** *&ldquo;???&rdquo;*

**T:** *&ldquo;I know what Robin thinks and he is wrong, use .button--primary; if we start doing .button--red, I quit!&rdquo;*

**M:** *&ldquo;I don't like it either, but .button--primary has issues too. I suppose for colours it works, but what about size?&rdquo;*

**T:** *&ldquo;.button--primary .button--alpha; .button--red is basically the same as .font-size-12px&rdquo;*

**M:** *&ldquo;That's cool, but what happens when I've made .button--alpha a certain size and then someone introduces a larger button?&rdquo;*

**R:** *&ldquo;Yeah, ‘I want this button to be dark red&rsquo; - Phil&rdquo;*

**R:**  *&ldquo;.button__primary--in-between-primary-and-secondary&rdquo;*

**T:** *&ldquo;What are the variants/axes that we typically have? Colour? Size? What else?&rdquo;*

**M:** *&ldquo;errrrr... Gender?&rdquo;*

**T:** *&ldquo;Any how&rdquo;*

**M:** *&ldquo;Primary, secondary, tertiary for colour? Alpha, beta gamma for size?&rdquo;*

**T:** *&ldquo;I guess the problem with the colour thing is that there is a hierarchy in the naming that may or may not actually be present in the design.&rdquo;*

**M:** *&ldquo;Yeah so we need a non-linear naming convention... We could name them after famous dogs!&rdquo;*

**T:** *&ldquo;The problem is we also need to make them understandable.&rdquo;*

**M:** *&ldquo;.button--lassie? .button—laika?&rdquo;*

**T:** *&ldquo;The problem is we also need to make them understandable.&rdquo;*

**R:** *&ldquo;.button--red makes sense, just admit it.&rdquo;*

**T:** *&ldquo;.button--red is evil and leads to the road to hell.&rdquo;*

**T:** *&ldquo;How about this for an example: at different breakpoints an area consistently has different background colours, sometimes red, sometimes white, so a .button--red in that area can't actually be red all the time...&rdquo;*

**R:** *&ldquo;That&rsquo;s a good point.&rdquo;*

**T:** *&ldquo;So all of a sudden you have CSS like:&rdquo;*

```
.button--red {
   background-color: white;
}
```

**T:** *&ldquo;And I go insane and kill everyone&rdquo;*

**M:** *&ldquo;So what's the conclusion? Other than Robin is dumbs.&rdquo;*

**R:** *&ldquo;.button--color-red-to-white. Done. Ship it. Open-source that mother.&rdquo;*

**T:** *&ldquo;£$%^&!&rdquo;*

**M:** *&ldquo;So... Colours: primary, secondary, tertiary... Sizes: alpha, beta, gamma, delta...&rdquo;*

**M:** *&ldquo;Just say yes!&rdquo;*

**T:** *&ldquo;With sizes is our mistake to start at one end of the range? By defining alpha to early etc.&rdquo;*

**M:** *&ldquo;Yeah but if we assume that&rsquo;s going to happen, we can prepare for it. Sorted.&rdquo;*

**R:** *&ldquo;I still don&rsquo;t agree...&rdquo;*

**M:** *&ldquo;(eyeroll)&rdquo;*

**M:** *&ldquo;So, Tom, any thoughts on a name for your pending new arrival...?&rdquo;*