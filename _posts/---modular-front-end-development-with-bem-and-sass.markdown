---
layout: post
container-type: article
content-type: post

title: "Modular front-end development with BEM and Sass"
description: "While there are already many front-end frameworks available for free, it’s often preferable to write code ourselves. We can build a Sass and BEM based living framework to use as a basis for any project."
keywords: "BEM and Sass"

date: 2013-10-01 13:07:00
pub-time: 2013-10-01T13:07

share-img: "social/default.jpg"
snippet: "While there are already many front-end frameworks available for free, it’s often preferable to write code ourselves. We can build a Sass and BEM based living framework to use as a basis for any project."
---

While there are already many front-end frameworks available for free, it’s often preferable to write code ourselves. We can build a Sass and BEM based living framework to use as a basis for any project.

Sass, a CSS preprocessor, allows us to write our CSS in small, easy to navigate modules, meaning we can start with base styles and bolt-on any components we might need for the system we’re currently building.

We can also save time by making our code easier to understand using well constructed comments and clear naming conventions for our classes and variables. The BEM methodology gives us this clarity. BEM stands for Block-Element-Modifier and is designed to help modularise front-end development by breaking everything into blocks containing elements and then using modifiers to tweak them.

To apply the BEM methodology, we give each element within a block a class. Consider an unordered list for a basic example:

<pre><code>&lt;ul class=&quot;list&quot;&gt;
    &lt;li class=&quot;list__item&quot;&gt;Item 1&lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;Item 2&lt;/li&gt;
    &lt;li class=&quot;list__item list__item--end&quot;&gt;Item 3&lt;/li&gt;
&lt;/ul&gt;</code></pre>

Our unordered list has the block class “list” while each list item has the element class “list__item”. Only the final list item has the additional modifier class “list__item--end”. Each class follows the BEM syntax:

<pre><code>.BLOCK{__ELEMENT[--MODIFIER]}</code></pre>

<figure class="media">
    <img src="/static/images/blog/BEM_Sass_4.png" alt="BEM" class="media__item" />
    <figcaption class="media__caption">BEM helps modularise front-end development by breaking everything into blocks containing elements and then using modifiers to tweak them.</figcaption>
</figure>

## Get Started
Set up the project by creating two directories; *assets* and *static*. The static directory will contain the compiled CSS and everything else that must be deployed, while the assets folder contains any resources that don’t need to be deployed (in this instance our Sass files).

To compile the Sass into CSS set a watch process running in a terminal window between /assets/sass and /static/css. (Note: The sass directory will need to exist for this to work).

Although we want our modules to be independent, there are always variables, functions and mixins that are used by multiple modules. With this in mind we create *_base.scss* in our /assets/sass directory and include them here. These might be a mixin for outputting rems with a pixel fallback or site-wide colour variables.

Using BEM as a basis for our variable names will reduce the number of variables used and further aid other developers who might pick up the framework later on.

Using this we can add some colour and sizing variables to our *_base.scss* file, for example:

<pre><code>$color__primary--light: #DD0000 !default;
$color__primary: #C10000 !default;
$color__primary--dark: #990000 !default;

$base__font-size: 15 !default;
$base__line: 20 !default;</code></pre>

Next, create *_config.scss*, which will later be used to override our default module variables, and *screen.scss*, our master Sass file. This will import the modules to be compiled into CSS for use on our website. Start by importing the base and config modules.

<pre><code>@import &quot;base&quot;;
@import &quot;config&quot;;</code></pre>

Rather than asking Sass to create multiple CSS files and linking each one into our HTML document, we’re using the Sass @import directive to combine all modules into one master CSS file. This reduces the amount of HTTP requests required, improving performance.

## Adding modules
Create a directory in /assets/sass called *modules*. This will house all the additional modules we add to our site for styling different forms of content.

First off, add a CSS reset module (*_reset.scss*), paste in the reset code of our choice and import it into our master file in the same way as before.

When you save the changes to the master file, notice that your terminal process has detected changes and overwritten the screen.css file used by our webpage. Opening the file, you can see the contents of the reset have been ported across.

At this point you can begin to see the principle in action. Being able to import snippets of code into a master file means we can easily toggle certain modules on or off as needed.

<figure class="media">
    <img src="/static/images/blog/BEM_Sass_1.png" alt="Simple Sass framework" class="media__item" />
    <figcaption class="media__caption">Base and module styles are altered by our configuration file before being imported into the master for processing into CSS.</figcaption>
</figure>

We can create a module called *_text.scss* and start adding base styles for headers and paragraphs etc.

<pre><code>h1 {
    font-size: calc-em(36);
    line-height: (40/36);
    font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
    margin-bottom: calc-em(10, 40);
    font-weight: bold;
    color: $color__primary;
}

p {
    font-size: calc-em(15);
    line-height: (20/15);
    font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
    margin-bottom: calc-em(10, 15);
}</code></pre>

                Abstracting these out into variables and a mixin for text styling, reduces the amount of code used and makes any future tweaks quicker.

<pre><code>$text__family-sans:  &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif !default;

$text__size--alpha: 36 !default;
$text__size--beta: 30 !default;
$text__size--gamma: 24 !default;
$text__size--delta: 15 !default;

$text__line--alpha: 40 !default;
$text__line--beta: 36 !default;
$text__line--gamma: 30 !default;
$text__line--delta: 20 !default;

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

p {
    @include text($text__size--delta, $text__line--delta, 10);
}</code></pre>

Each variable is given a <code>!default</code> flag, which allows us to override them in our *_config.scss* file if we prefer:

<pre><code>$text__family-sans: &quot;Proxima Nova&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
$text__size--beta: 30;
$text__line--beta: 36;</code></pre>

You might ask what the point of declaring and then overriding these variables is, and for one-off use there really isn’t any. But what we now have is the beginnings of a modular framework that we can use regularly as a basis for any front-end project adding and importing more modules as we add more elements to our system.

<figure class="media">
    <img src="/static/images/blog/BEM_Sass_3.png" alt="Module files" class="media__item" />
    <figcaption class="media__caption">Module files, which set out base styles for different content types, are self-contained, meaning they are used only when needed.</figcaption>
</figure>

<figure class="media">
    <img src="/static/images/blog/BEM_Sass_2.png" alt="Modular design" class="media__item" />
    <figcaption class="media__caption">Building a modular framework is much easier when design is approached in a modular sense.</figcaption>
</figure>

## Make it easy to understand
With the foundations built and modules being added as and when we need them, you could be forgiven for thinking that any developer could pick up your work and understand it almost instantly, but that’s not always the case.

Fortunately there are ways to make it even easier to understand. Firstly,  Sass comments will not add any weight to our compiled CSS file, and so we can write as much as we like to be helpful.

Secondly, as mentioned before, we can use the BEM methodology. As an example we could create a Sass module for lists where inheritance is obvious:

<pre><code>.list {
    padding-left: calc-em(10);
}

.list__item {
    margin-bottom: calc-em(10);
}

.list__item--end {
    margin-bottom: 0;
}</code></pre>

To add bullets to this list we could then create a modifier and include that class on the unordered list element.

<pre><code>&lt;ul class=&quot;list list--bullet&quot;&gt;...&lt;/ul&gt;</code></pre>

<pre><code>.list--bullet {
    list-style-type: disc;
    padding-left: calc-em(25);
}</code></pre>

## Putting it all together
Using the styles we have created, let’s put together a very simple page based on one of my favourite subjects:

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

In our browser our HTML page needs a bit of styling, so we can go ahead and create additional modules for layout and media, while including additional styles for the number and method list modifiers.

Here’s how the modifiers in *_lists.scss* might look, with module specific variables being included at the top.

<pre><code>$list__number-color: #CC0000 !default;

.list--number {
    counter-reset: items;

    .list__item {
        padding-top: calc-em(5);

        &amp;:before {
            counter-increment: items 1;
            content: counter(items, decimal) &quot;.&quot;;
            color: $list__number-color;
            margin-right: calc-em(5);
        }
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
}</code></pre>

You can decide yourself how to build the layout and media modules, but there are examples in the Github repository.

<figure class="media">
    <img src="/static/images/blog/BEM_Sass_5.png" alt="Elvis" class="media__item" />
    <figcaption class="media__caption">The finished ‘page’ looks very simple, but behind it is a Sass and BEM based framework that can be scaled easily.</figcaption>
</figure>

## The next step
Obviously this is a very simple example of how we can build our own Sass and BEM based front-end framework, but the opportunity here is huge.

It’s important to remember that while you are building one system, you should make the base module as simple, and therefore reusable, as possible. Specificity can then be added using the **_config.scss** file and BEM modifiers.

By using this method we can build a starting block to use on all our projects, however large or small, which will expand over time as new modules are included.