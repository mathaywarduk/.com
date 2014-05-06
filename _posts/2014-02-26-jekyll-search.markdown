---
layout: post
container-type: article
content-type: post

title: "Jekyll search with JSON"
description: "Without a database there's nothing to query when wanting a search function, so I went about building a work around."
keywords: "Jekyll search JSON"

date: 2014-02-26 17:33:00
pub-time: 2014-02-26T17:33

share-img: "social/search.png"
snippet: "Without a database there's nothing to query when wanting a search function, so I went about building a work around."
---

You may or may not know that this site is built using [Jekyll](http://jekyllrb.com), a static site generator. That means there's no database, so page load speed is much faster.

Without a database though, there's nothing to query when needed, i.e. when wanting a [search function](/search), so I went about building a work around.

With the [Liquid templating](http://jekyllrb.com/docs/templates/) language, used by Jekyll, I built a [JSON encoded feed](/feeds/feed.json) for posts and pages on the site which I wanted to show up in search results.

{% raw %}
<pre><code>[
    {
        "title": "{{post.title}}",
        "content": "{{post.content | markdownify | strip_html"}}",
        "link": "{{site.url}}{{post.url}}",
        "date": "{{post.date}}",
        "excerpt": "{{post.snippet}}"
    }
    ...
]</code></pre>
{% endraw %}

I then wrote a Javascript plugin which receives a search term, either from a querystring or a form submission, and looks for the term within the JSON feed.

With this data, it's pretty simple to output the results directly into the DOM using a template partial.

<figure class="media">
    <img src="/static/images/blog/jekyll-search.png" alt="Jekyll search" class="media__item">
</figure>

That's it explained in it's simplest form anyway. Try it out for yourself over on the [search page](/search) and let me know what you think.

If you're interested in exactly how I've gone about this, you're in luck. It's definitely not perfect yet, but, regardless, I have released the code [on GitHub](https://github.com/mathaywarduk/jekyll-search) so other Jekyll users can use it, alter it, even improve on it.

There are a few things things I'd like to fix/tidy up in the future, like:

* The JSON feed isn't very 'pretty' - I know this isn't important, but I'm all for well-formed markup.

* Date formatting would be nice. - I've done this on this site myself by tweaking the Javascript file, but it's not ideal to force people to use my date formatting, so it's not in the repo. 

* Make the script into a jQuery plugin - This would make it possible to customise your search function without having to change the plugin itself.