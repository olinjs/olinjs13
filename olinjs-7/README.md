# olinjs lecture 7

lecture #7: Bootstrap

We don't have homeworks anymore now since you guys will be working on projects, but we'll drop in a few short lectures from time to time to introduce some cool things.

You guys don't have to use anything that we cover, but these things will probably speed up your development time.

Alright, so lets take the lowest hanging fruit first...

## Bootstrap

[Twitter Bootstrap](http://twitter.github.com/bootstrap/) is some CSS (and optional JS) that make your site look like Twitter.

Why is this good? Because instead of you spending a ton of time designing something that looks half decent for a demo, you get it for free.

In order to use Boostrap, you just have to include the CSS. So in `layout.jade`

```jade
head
  link(href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap-combined.min.css", rel="stylesheet")
  script(src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/js/bootstrap.min.js")
```

This makes your express site now look like this
![bootstrapped](https://raw.github.com/olinjs/olinjs-7/master/imgs/bootstrapped.png?login=jiahuang&token=6da1da7a337d8f4e0bcd86700bbbb505)

Yay. Look at that. Now all your text is way over to the site. Isn't that just great? 

Either we're blind or that's still terrible. We need to go to the [Twitter Bootstrap docs](http://twitter.github.com/bootstrap/getting-started.html#examples) to make it better. 
Let's make it look like this 
![starter-template](https://raw.github.com/olinjs/olinjs-7/master/imgs/starter-template.png?login=jiahuang&token=805f6af8da06ab95d69227c80a539e78)

First, let's go to the example page for that [http://twitter.github.com/bootstrap/examples/starter-template.html](http://twitter.github.com/bootstrap/examples/starter-template.html).

Right click and inspect the source. Copy that source. We could just paste that into our site, but that's raw HTML and we need jade. So go to an [HTML -> jade converter](http://html2jade.aaron-powell.com/) and convert it. 

Now we have all this jade code. We don't want the javascript includes at the end... or really any of the includes because we don't have those assets.

In the end, our `layout.jade` file should look like this

```jade
!!! 5
html(lang='en')
  head
    title= title
    meta(charset='utf-8')
    link(href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap-combined.min.css", rel="stylesheet")
    script(src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/js/bootstrap.min.js")

    style
      body {
        padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
      }
  
  body
    .navbar.navbar-inverse.navbar-fixed-top
      .navbar-inner
        .container
          button.btn.btn-navbar(type='button', data-toggle='collapse', data-target='.nav-collapse')
            span.icon-bar
            span.icon-bar
            span.icon-bar
          a.brand(href='#') Project name
          .nav-collapse.collapse
            ul.nav
              li.active
                a(href='#') Home
              li
                a(href='#about') About
              li
                a(href='#contact') Contact
    .container
      block content
```

Now when we re-render our Express homepage, we get something that looks way better

![way-better](https://raw.github.com/olinjs/olinjs-7/master/imgs/way-better.png?login=jiahuang&token=7d192f8358ab91c27e370f57bc32f07b)

## Making Bootstrap look better

This is great and all, but if you haven't noticed every website made by everyone is using Bootstrap. We don't want to be like everyone else. Luckily for us, we can be a tad more unique with other Bootstrap styles.

Here's where [Bootswatch](http://bootswatch.com/) comes in. It has a few additional styles for Bootstrap. All you need to do is copy their CSS and apply it instead of the regular Bootstrap CSS. So for example, if we wanted to use the Slate style, all we would do is change `layout.jade`

```jade
head
  link(href="http://bootswatch.com/slate/bootstrap.min.css", rel="stylesheet")
```

Except you'd probably want to save that CSS to your own app so you don't call bootswatch every time it loads. 
