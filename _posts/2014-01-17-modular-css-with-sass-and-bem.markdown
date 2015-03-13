---
layout: post
container-type: article
content-type: post
section: Read

title: "Modular CSS with Sass &amp; BEM"
description: "While there are already many front-end frameworks available for free, it&rsquo;s often preferable to write code ourselves. We can build a Sass and BEM based living framework to use as a basis for any project."
keywords: "Living framework"

date: 2014-01-17 09:45:00
pub-time: 2014-01-17T09:45

share-img: "blog/write-modular-css-with-sass-and-bem.jpg"
snippet: "I wrote a feature for Net magazine's December issue about creating a living modular framework."
---

I wrote a feature for <a href="http://netmagazine.com">Net magazine</a>&rsquo;s December issue about creating a living modular framework.

<figure>
    <img src="/static/images/blog/write-modular-css-with-sass-and-bem.jpg" alt="Net Magazine" class="media__item">
    <figcaption>How the featured appeared in Net magazine</figcaption>
</figure>

Here it is.

***

While there are already many frontend frameworks available for free, it&rsquo;s often preferable to write the code yourself. In this tutorial, we will explore how to use the [Sass](http://www.sass-lang.com) CSS preprocessor and the [BEM](http://bem.info/) methodology to write a ‘living framework&rsquo; that can be adapted to suit any development project.

Sass enables us to write CSS in small, easy-to-navigate modules, meaning we can start with base styles and bolt on any components we might need for the system we&rsquo;re currently building.

We can also make our code easier to understand using well-constructed comments and clear naming conventions for our classes and variables. The BEM methodology gives us this clarity. BEM stands for Block-Element-Modifier and is designed to help modularise frontend development by breaking everything into blocks containing elements, then using modifiers to tweak them.

To apply the BEM methodology, we give each element within a block a class. Consider an unordered list:

<pre><code>&lt;ul class=&quot;list&quot;&gt;
    &lt;li class=&quot;list__item&quot;&gt;Item 1&lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;Item 2&lt;/li&gt;
    &lt;li class=&quot;list__item list__item--end&quot;&gt;Item 3&lt;/li&gt;
&lt;/ul&gt;</code></pre>

<p>The unordered list has the block class list while each list item has the element class <strong>list__item</strong>. Only the final list item has the additional modifier class <strong>list__item—end</strong>. Each class follows the BEM syntax:</p>

<pre><code>.BLOCK{__ELEMENT[--MODIFIER]}</code></pre>

## Get Started
Set up the project by creating two directories: **assets** and **static**. The static directory will contain the compiled CSS and everything else that must be deployed, while the assets folder will contain any resources that don&rsquo;t need to be deployed (in this instance, our Sass files).

With Sass installed on an environment, it&rsquo;s necessary to ask it to **watch** for changes in the SCSS files and update the static CSS files accordingly. This is a pretty simple one-liner in a Terminal window:

<pre><code>sass --watch assets/sass:static/css</code></pre>

Sass should have created a **screen.css** file in our **/static/css/** directory. Although at this point the file is empty, we will link to it from our HTML. (The **assets/sass** directory must exist for this to work).

Although we want our modules to be independent, there are always variables, functions and mixins that are used by multiple modules: for example, a mixin for outputting rems with a pixel fallback, or site-wide colour variables. With this in mind, we need to create **_base.scss** in our **/assets/sass** directory and include them there.

Using BEM as a basis for variable names will reduce the number of variables used and help other developers who might pick up the framework later on. By following this convention, we can add variables for colour and text size to our **_base.scss** file. For example:

<pre><code>$color__primary--light: #DD0000 !default;
$color__primary: #C10000 !default;
$color__primary--dark: #990000 !default;

$base__font-size: 15 !default;
$base__line: 20 !default;</code></pre>

And a simple function for calculating em sizes:

<pre><code>@function calc-em($target, $context: $base__font-size) {
    @return ($target / $context) * 1em;
}</code></pre>

Next, create **_config.scss**, which will later be used to override the default module variables, and **screen.scss**, the master Sass file. This will import the modules to be compiled into CSS for use on your website. Start by simply importing the **base** and **config** modules:

<pre><code>@import &quot;base&quot;;
@import &quot;config&quot;;</code></pre>

Rather than asking Sass to create multiple CSS files and linking each one into our HTML document, use the Sass **@import** directive to combine all the modules into one master CSS file. This reduces the amount of HTTP requests required, thereby improving performance.

## Adding modules
Create a directory in **/assets/sass** called **modules**. This will house all the additional modules you add to your site for styling different forms of content. First off, add a CSS reset module (**_reset.scss**). Paste in the reset code of your choice and import it into the master file in the same way as before.

When you save the changes to the master file, notice that your Terminal process has detected changes and overwritten the **screen.css** file used by your web page. Opening the file, you can see the contents of the reset have been ported across.

At this point, you can begin to see the workflow in action. Being able to import snippets of code into a master file means we can easily toggle individual modules on or off as needed.

We can create a module called **_text.scss** and then start adding base styles for headers, paragraphs, and so on:

<pre><code>h1 {
    font-size: calc-em(36);
    line-height: (40/36);
    font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
    margin-bottom: calc-em(10, 40);
    font-weight: bold;
    color: $color__primary;
}

h2 {
    font-size: calc-em(24);
    line-height: (28/24);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin-bottom: calc-em(15, 40);
    color: $color__primary;
}

h3 {
    font-size: calc-em(20);
    line-height: (22/20);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin-bottom: calc-em(15, 40);
}

p {
    font-size: calc-em(15);
    line-height: (20/15);
    font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
    margin-bottom: calc-em(10, 15);
}</code></pre>

As there is quite a lot of repeated CSS here, we can abstract this out into variables and a mixin for text styling, reducing the amount of code used and making any future tweaks quicker.

<pre><code>$text__family-sans:  &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif !default;

$text__size--alpha: 36 !default;
$text__size--beta: 30 !default;
$text__size--gamma: 24 !default;
$text__size--delta: 15 !default;

$text__line--alpha: 40 !default;
$text__line--beta: 36 !default;
$text__line--gamma: 30 !default;
$text__line--delta: 20 !default;

$text__colour--base: #333333 !default;
$text__colour--alpha: #990000 !default;
$text__colour--beta: #990000 !default;
$text__colour--gamma: #333333 !default;
$text__colour--delta: #333333 !default;

@mixin text($size, $line, $margin: 0, $family: $text__family-sans) {
    font-size: calc-em($size);
    line-height: ($line/$size);
    font-family: $family;
    margin-bottom: calc-em($margin, $size);
}

html {
    font-size: $base__font-size * 1px;
}

body {
    @include text($base__font-size, $base__line);
}

h1 {
    @include text($text__size--delta, $text__line--delta, 15);
    font-weight: bold;
    color: $color__primary;
}

h2 {
    @include text($text__size--beta, $text__line--beta, 15);
    color: $text__colour--beta;
}

h3 {
    @include text($text__size--gamma, $text__line--gamma, 15);
    color: $text__colour--gamma;
}

p {
    @include text($text__size--delta, $text__line--delta, 10);
    color: $text__colour--delta;
}</code></pre>

The approach we&rsquo;re using for naming colour variables may not be practical when trying to remember which colours are used in context to a design. To counteract this we have used module variables with more contextual names. Each variable is given a **!default** flag, which allows us to override them in our **_config.scss** file if we prefer:

<pre><code>$text__family-sans: &quot;Proxima Nova&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
$text__size--beta: 30;
$text__line--beta: 36;

$text__colour--base: $color__neutral--dark;
$text__colour--alpha: $color__primary;
$text__colour--beta: $color__primary;
$text__colour--gamma: $text__colour--base;
$text__colour--delta: $text__colour--base;</code></pre>


You may ask what the point of declaring then overriding these variables is, and, for one-off use, there isn&rsquo;t one. But what we have now is the beginnings of a modular framework that we can use as a basis for any frontend project, adding and importing more modules as we add more elements to our system.

Redeclaring variables simply reduces the need for dependency between modules and gives us a cleaner starting point for each new project.

## Making code easier to understand
You could be forgiven for thinking that any developer could now pick up your work and understand italmost instantly, but that&rsquo;s not always the case. Fortunately, there are ways to make your code even easier to understand. Firstly, Sass comments are not compiled, so will not add any weight to our compiled CSS file, so we can write as much as we like to be extra helpful. For instance, I always like to add comment blocks to mixins and functions.

Secondly, we can use the BEM methodology. For example, we could create a Sass module for lists where inheritance is obvious:

<pre><code>.list {
    padding-left: calc-em(10);
}

.list__item {
    margin-bottom: calc-em(10);
}

.list__item--end {
    margin-bottom: 0;
}</code></pre>

To add more bullets to this list, we could then create a modifier and include that class on the unordered list element:

<pre><code>&lt;ul class="list list--bullet"&gt;
    &lt;li class="list__item"&gt;Bulleted list item 1&lt;/li&gt;
    &lt;li class="list__item"&gt;Bulleted list item 2&lt;/li&gt;
    &lt;li class="list__item list__item--end"&gt;Bulleted list item 3&lt;/li&gt;
&lt;/ul&gt;</code></pre>

<pre><code>.list--bullet {
    list-style-type: disc;
    padding-left: calc-em(25);
}</code></pre>

## Putting it all together
Using the styles we have created, let&rsquo;s put together a very simple page based on one of my favourite subjects - the quiff:

<pre><code>&lt;article class=&quot;layout__container&quot;&gt;
&lt;header&gt;
    &lt;h1&gt;Hair styling for beginners&lt;/h1&gt;
    &lt;h2&gt;Tips and tricks on creating a masterful quiff.&lt;/h2&gt;
&lt;/header&gt;
&lt;p&gt;Getting your hair to stand up, and stay up during a busy day in the office can be a bit of a hassle at times. But here&amp;rsquo;s a full-proof method to achieving follicular greatness.&lt;/p&gt;
&lt;figure class=&quot;media media--full&quot;&gt;
    &lt;img class=&quot;media__item&quot; src=&quot;http://static.fashionbeans.com/wp-content/uploads/2011/03/quiffmain1.jpg&quot; /&gt;
    &lt;figcaption class=&quot;media__caption&quot;&gt;Young Elvis had a magnificent quiff.&lt;/figcaption&gt;
&lt;/figure&gt;
&lt;h3&gt;Requirements&lt;/h3&gt;
&lt;ul class=&quot;list list--bullet&quot;&gt;
    &lt;li class=&quot;list__item&quot;&gt;Hair dryer&lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;Styling putty&lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;Finishing spray&lt;/li&gt;
&lt;/ul&gt;
&lt;h3&gt;Method&lt;/h3&gt;
&lt;ol class=&quot;list list--number list--method&quot;&gt;
    &lt;li class=&quot;list__item&quot;&gt;Wash and condition your hair as normal.&lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;Towel dry you hair until it is only slightly damp.&lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;Rub a small amount of styling putty between the tips of your fingers and style your quiff.&lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;Blow dry into shape, using a brush to pull your hair up.&lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;Add shine and extra hold by applying some finishing spray.&lt;/li&gt;
&lt;/ol&gt;
&lt;/article&gt;</code></pre>

Our HTML page needs a bit of styling, so we can go ahead and create additional modules for layout and media,
while including additional styles for the number and method list modifiers.

The following code example shows how the modifiers in **_lists.scss** may look, with module-specific variables being included at the top.
For example:

<pre><code>$list__number-color: #CC0000 !default;

.list--number {
    counter-reset: items;
    padding-top: calc-em(5);

    .list__item {
        margin-bottom calc-em(5);

        &amp;:before {
            counter-increment: items 1;
            content: counter(items, decimal) &quot;.&quot;;
            color: $list__number-color;
            margin-right: calc-em(5);
        }
    }

    .list__item--end {
        margin-bottom: 0;
    }
}

.list--method {
    @extend .list--number;

    .list__item {
        margin-bottom: calc-em(15);

        &amp;:before {
            @include text($text__size--beta, $text__line--beta);
            font-style: italic;
        }
    }

    .list__item--end {
        margin-bottom: 0;
    }
}</code></pre>

There are examples of a layout and a media module in the [Github repository](https://github.com/mathaywarduk/simple-sass-framework) that accompanies this tutorial, but I&rsquo;ll let you be creative here and decide for yourself how to build them.

<figure>
    <img src="/static/images/blog/BEM_Sass_3.png" alt="Module files" class="media__item">
    <figcaption class="media__caption">Self-contained module files set out base styles for content types. They&rsquo;re used only when needed</figcaption>
</figure>

## Converting to rems
In this framework we&rsquo;ve been using em sizing units throughout, which on smaller scale projects isn&rsquo;t a problem. But issues surrounding compounding font-sizes can crop up when we nest HTML elements. To combat this, we can use rem (root em) units. To do this, we&rsquo;d set a base font size on our HTML element. We already have a variable for this. For example:

<pre><code>html {
    font-size: $base-font-size;
}</code></pre>

Then we would write a function to calculate rems and use that in place or our original **calc-em()** function:

<pre><code>@function calc-rem($target) {
    @return ($target / $base_font-size) * 1 rem;
}</code></pre>

Rems are supported in later versions of [all major browsers](caniuse.com/rem), but for legacy support, we can use a pixel fallback.

## Going further

This is a very simple example, but the potential of a Sass and BEM-based framework is enormous.

Using the workflow outlined in this tutorial, you can create an essential building block that you can make use of for all your future projects, no matter how large they are, simply by adding modules as necessary.

It&rsquo;s important to remember that while you are building one system, you should make the base module as simple, and therefore reusable, as possible. Specificity can then be added using the **_config.scss** file and BEM modifiers.

<hr />

<p>This article originally appeared in issue 249 of <a href="http://www.netmagazine.com">Net Magazine</a>.</p>