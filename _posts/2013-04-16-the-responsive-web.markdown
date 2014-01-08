---
layout: post
container-type: article
content-type: post

title: "The responsive web"
description: "Last month Craig and I gave a talk at Second Wednesday, a monthly Nottingham-based event for creative and digital people, entitled The Responsive Web."
keywords: "Responsive web"

date: 2013-04-16 14:42:00
pub-time: 2013-02-16T14:42
posted-on: Tribe UK
posted-on-url: http://www.tribeuk.co.uk/blog/the-responsive-web/

share-img: "social/responsive-web.jpg"
snippet: "Last month Craig and I gave a talk at Second Wednesday, a monthly Nottingham-based event for creative and digital people, entitled The Responsive Web."
---

Last month Craig and I gave a talk at [Second Wednesday](http://www.secondwednesday.org.uk/), a monthly Nottingham-based event for creative and digital people, entitled The Responsive Web.

The talk, which attracted a [record number of attendees](https://twitter.com/jhuskisson/status/311926597194240000), looked at how websites can deliver both tailored design and content for a truly responsive experience. For anyone who couldn&rsquo;t make it, below is the script (which we roughly followed) for the talk:

## Introduction

Hello everyone, thanks for coming. We&rsquo;re Craig and Mat. We&rsquo;re senior developers at Tribe, one of the largest creative agencies in the Lace Market.

We&rsquo;re going to talk today about the Responsive Web, and how we can build websites, not just for all devices but for all users too.

## Best viewed at 1024 x 768

We&rsquo;ll start with a bit of a history lesson. This is taken from Mat&rsquo;s personal portfolio back in 2002. It was common back then as the number of different screen sizes was low, and I have to admit I put something similar on a website back then.

This website is best viewed at 1024×768 resolution using Internet Explorer 6.0 or higher.

But it&rsquo;s just not acceptable nowadays, because there are so many different screen sizes (I have seven just in my house). So we can&rsquo;t afford to be complacent and expect the user to do the work. Users want it to be easy, and they want it to be quick.

And it&rsquo;s not like we can aim for one or two screen sizes and that will serve the lion&rsquo;s share. There a a lot of differing screen resolutions used on the web now and with mobile usage growing fast, we have to cater for everyone.

## The Challenge

So that&rsquo;s the challenge:

How can we keep the user happy, whatever device they might be using?

And we thought of 3 solutions for that:

## 1. Leave It

The first solution is to just leave it. It&rsquo;s the easy way out, they&rsquo;ll be no extra development costs and the device will, to some extent, make it work. And one quite well-known brand that&rsquo;s doing this right now is Apple. The [homepage of their website](http://www.apple.com/), super scales down for use on mobile. And it works to an extent, but you have to use the pinch zoom to read anything smaller than the main message.

<figure class="media media--full">
    <img src="/static/images/blog/responsive-web-apple.png" alt="The Apple website" class="media__item media__item--noshadow" />
    <figcaption class="media__caption">The apple website is not optimised for mobile in anyway</figcaption>
</figure>

## 2. Mobile version

Then the second option would be to build a separate mobile site. Two sites means we can target content to desktop and mobile users, but we have to update content twice every time we want to do it. A lot of companies that go down this route, often strip out lots of content, like [National Rail](http://www.nationalrail.co.uk/). Their mobile site shows live departures, train times and such, which will server 80% of its users&rsquo; needs. But if, for example, you wanted season ticket prices, you would have to use the desktop version, taking us back to option 1.

<figure class="media media--full">
    <img src="/static/images/blog/responsive-web-nationalrail.png" alt="The Apple website" class="media__item media__item--noshadow" />
    <figcaption class="media__caption">National Rail have a separate mobile site</figcaption>
</figure>

## 3. Make it Responsive

So the last option, which is the one we&rsquo;re going to focus on is to Make it Responsive. And to explain what Responsive Design is we&rsquo;ll use our old friend Dave.

## Dave

<figure class="media media--full">
    <img src="/static/images/blog/responsive-web-dave.jpg" alt="What is responsive design?" class="media__item" />
</figure>

Here&rsquo;s Dave, he couldn&rsquo;t be with us tonight, but he&rsquo;s useful here as an analogy. We all like Dave, in whatever capacity he&rsquo;s in, whether it&rsquo;s Olympic Ambassador, unpaid Footballer or Forgetter of Clothes, but whatever he&rsquo;s wearing, or not wearing, and whatever he&rsquo;s doing, he&rsquo;s always the same Dave. His content never changes, but the way that content is displayed changes. And it&rsquo;s always displayed in the best way for the situation.

> And that&rsquo;s the basis of Responsive Design. Change your pants, but don&rsquo;t change your content!

Here&rsquo;s a good example. This is [The Great Discontent](http://thegreatdiscontent.com/) on a large desktop monitor. You can see the large hero image and headline, and the navigation and logo are relatively small at the top.

<figure class="media media--full">
    <img src="/static/images/blog/responsive-web-tgd_1.png" alt="The Great Discontent" class="media__item media__item--noshadow" />
</figure>


Then, as it gets smaller, the hero image and headline shrink, but stay full width, multiple columns change to one column and the navigation becomes more prominent when we get down to the mobile size.

<figure class="media media--full">
    <img src="/static/images/blog/responsive-web-tgd_2.png" alt="The Great Discontent" class="media__item media__item--noshadow" />
</figure>

And this is the [Time magazine](http://www.time.com/) website. There&rsquo;s a lot of content there, a lot of different articles.

<figure class="media media--full">
    <img src="/static/images/blog/responsive-web-time_1.png" alt="Time Magazine" class="media__item media__item--noshadow" />
</figure>

But as you can see, when it gets smaller, the top stories and latest articles remain near the top. And the navigation changes from a long bar to a single button, allowing the content to be more prominent. With this site, and the previous one, it&rsquo;s worth noting that the look and feel doesn&rsquo;t change either, which for anyone in branding is very important.


<figure class="media media--full">
    <img src="/static/images/blog/responsive-web-time_2.png" alt="Time Magazine" class="media__item media__item--noshadow" />
</figure>

## How can we respond?

### Layout

Let&rsquo;s start with the most obvious part of Responsive Web Design, which is the layout. Essentially making content fit the width of the screen nicely, removing the need for zooming. We can achieve this by using percentages instead of hard pixels in our CSS and use media queries to add break-points where layouts can snap.


<figure class="media media--full">
    <img src="/static/images/blog/responsive-web-layout.png" alt="Responsive layouts" class="media__item media__item--noshadow" />
</figure>

And there are frameworks to get you started. Twitter Bootstrap has all sorts of features, including a 12 column responsive grid.

### Imagery

And then we should look at imagery. By the far the biggest zapper of bandwidth, but if you&rsquo;re on the bus or the train, you don&rsquo;t want to wait for ages for your image to load. So at Tribe we came up with a solution, showing the user a lower resolution image to begin with, so they think the page has loaded, and then loading the higher resolution image in the background on non-mobile devices and replacing it when done.

<figure class="media media--full">
    <img src="/static/images/blog/responsive-web-5.png" alt="Our responsive image solution" class="media__item media__item--noshadow" />
    <figcaption class="media__caption">The image on the left is 89KB, while the image on the right is only 8KB</figcaption>
</figure>

### Navigation

Navigation is really important too. If it&rsquo;s difficult to use, users will get annoyed and give up, so think about every iteration of the main nav. Here&rsquo;s the menu for the WWF in various stages.


<figure class="media media--full">
    <img src="/static/images/blog/responsive-web-wwf.png" alt="WWF navigation" class="media__item media__item--noshadow" />
</figure>

At the top the navigation is wide, with space to breath. As the screen gets narrower it bunches together until it disappears almost completely on the mobile version.

Donate and Adopt links are still very prominent, as they are the WWFs most important links, but the menu itself is hidden behind a menu icon in the top corner. Pressing that gets you all the same options as in the desktop site, because it&rsquo;s the same content.

And remember that as your site layout gets narrower, it&rsquo;s bound to get longer, which can be a bit of a strain on the user&rsquo;s thumb or finger. To make it easier, we can add links into sections of the content, allowing us to skip directly to comments, or jump back to the top.

### Content is King

Always remember that the content is still the most important element of any website. Content is Still King. If you&rsquo;re users can find the content they want quickly and easily, they&rsquo;ll be happy. And they&rsquo;ll come back.

## The Next Level

So that covers a lot of what&rsquo;s involved in Making it Responsive. Think about layout, bandwidth and images, easy navigation and most of all content, but what else can we do to be truly Responsive?

At Tribe, when we talk about the Responsive Web, it&rsquo;s not just about these things, it&rsquo;s also about the user experience and using different triggers like location and age to order content, not just screen size.

So let&rsquo;s look at the things we know about our users, how we can use them to tailor content, how some websites are already doing this and how some have been doing this for years.

### Location

Starting with location. We can quite easily work out the users exact location, using Geolocation. And providing they allow it, we can then give them automatic driving directions to our office. Here&rsquo;s the automated map from the new Tribe site (currently in production), showing driving directions from Antenna to the Tribe office. You&rsquo;d be pretty lazy to drive, but you get the idea.

<figure class="media media--full">
    <img src="/static/images/blog/responsive-web-map.jpg" alt="WWF navigation" class="media__item media__item--noshadow" />
</figure>

If we know the user is in Nottingham, and our site sells replica football shirts, we&rsquo;re unlikely to put Derby County shirts on the homepage we serve to them.

And as we already know the users location, we can use this to work out what the weather is like for them. We can then use this to decide which content to push to them. We&rsquo;ll have a much higher conversion rate if we push our summer holidays to user&rsquo;s in Manchester, when it&rsquo;s chucking it down outside.

[WeatherFit](http://weatherfit.co.uk/) is an addon for Google Adwords, meaning we can take this concept off our website, and into Google search, showing our ads only if the weather&rsquo;s right. It&rsquo;s an expensive option, but if it works, it may be a viable one.

### Face Recognition

Face recognition is already something Xbox Live uses to log you in and Smart TVs are using it to recognise who&rsquo;s watching and serve them the right content. So it might be something we could use online. We wouldn&rsquo;t use it for internet banking or anything, but it&rsquo;s a thought.

One good example we saw recently was [a site that recognised how far your face was from the screen](http://webdesign.maratz.com/lab/responsivetypography/realtime/), and changed the size of the text to suit.

### Time of Day

If we know the time of day or week, and we do. We can offer content based on that. For instance, a restaurant could give higher importance to its breakfast menu in the morning, then switch to lunch and dinner accordingly. Or a bar could push it&rsquo;s cocktail menu on a Friday afternoon when Pam&rsquo;s looking at what she&rsquo;s doing that weekend.

And if we&rsquo;re using time sensitive content on a more global scale, we could always use geolocation to compensate for timezones.

### Returning Visitors

We&rsquo;re sure most of you have done some form of shopping online before. And so you&rsquo;re probably used to seeing recently viewed items on ASOS, Size? or Amazon. But why shouldn&rsquo;t we use that concept on non-shopping websites. We can show recently viewed articles or portfolio pieces, and taking another idea form shopping sites, we could say, you might also like this.

And so many websites have a welcome message on their homepage. But if I&rsquo;ve visited it before, I&rsquo;ve either already read it, or I wasn&rsquo;t interested. So why not tweak that message slightly?

### Login with Facebook

<figure class="media media--full">
    <img src="/static/images/blog/responsive-web-facebook.png" alt="WWF navigation" class="media__item media__item--noshadow" />
</figure>

And this is the holy grail of information on our users. If we have a site that allows users to login, we can make it easier for them to sign up by adding a Connect with Facebook feature. It&rsquo;s a bit of work for us as developers, but the benefit is huge. We can know everything about them&hellip; age, gender, relationship status, hobbies, favourite films and music.

What if we logged into Ticketmaster and it told us <em>&ldquo;We know you like Arcade Fire and they&rsquo;re playing at the Ice Arena next Wednesday, your calendar says you&rsquo;re free.&rdquo;</em>

## Finally
The more we know about the user, the more we can structure the content to suit them. And while Responsive Web Design is a great idea, being responsive can be so much more than that. Hopefully this has given some insight into the thinking behind building a truly responsive website, on all levels.

And remember that

> &rdquo;Devices don&rsquo;t use websites, people do.&ldquo;