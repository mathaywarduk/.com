---
layout: post
container-type: article
content-type: post
section: Read

title: "What's behind the mask?"
description: "Rob Antill recently launched his website showcasing his talent for Stereographic photography. By the end of the first day it had received over 6,000 hits and the logo masking was the hottest web design topic on Reddit"
keywords: "Sexy javascript"

date: 2012-05-02 11:13:00
pub-time: 2012-05-02T11:13
posted-on: Tribe UK
posted-on-url: http://www.tribeuk.co.uk/blog/whats-behind-the-mask/

share-img: "social/mask.png"
snippet: "Rob Antill recently launched his website showcasing his talent for Stereographic photography. By the end of the first day it had received over 6,000 hits and the logo masking was the hottest web design topic on Reddit."
---

Our resident photography genius, Rob, recently launched his new website: [panodrop.com](http://www.panodrop.com/), showcasing his talent for Stereographic photography.

By the end of the first day it had received over 6,000 hits and the logo masking was the hottest web design topic on Reddit. So with all the interest, we thought we&rsquo;d share, roughly, how we did it.

We started with the basic mask, a cut out of the logo placed on top of an image of pure white using CSS. Together these created the part of logo that changes.

<figure>
    <img src="/static/images/blog/pano_hole_step_1.jpg" alt="Step 1" class="media__item">
</figure>

That was our default view. Then we inserted a hidden div between the mask and the white background, which would act as a placeholder for the dynamic background.

<figure>
    <img src="/static/images/blog/pano_hole_step_2.jpg" alt="Step 2" class="media__item">
</figure>


Then, using Javascript, all we had to do was to change the background of the hidden div to whatever the user was hovering over and change the background position to follow the cursor.

<figure>
    <img src="/static/images/blog/pano_hole_step_3.jpg" alt="Step 3" class="media__item">
</figure>

<figure>
    <img src="/static/images/blog/pano_hole_step_4.jpg" alt="Step 4" class="media__item">
</figure>

One issue we came across was when hovering near the corners of images, the corners were visible in the logo. Not nice!

To fix this we used a bit of maths in the Javascript to implement a &ldquo;safe-zone&rdquo; on the image.


<figure>
    <img src="/static/images/blog/pano_hole_step_5.jpg" alt="Step 5" class="media__item">
</figure>


Simple as that! We&rsquo;re really pleased with it and Rob is pleased with the conversation it&rsquo;s sparked online. Hopefully it will help him sell some prints&hellip;