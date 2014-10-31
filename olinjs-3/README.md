# olin.js #3 — client side JS

We'll be covering javascript on the client side. This class, we don't install anything! Cool!

## Update your Github avatars and profiles information

We're advertising you on <http://olinjs.github.com/>. This helps engage our sponsors and gives you wicked props. You'll have to go to <https://github.com/settings/profile> to update your profile and <gravatar.com> to update your avatar. Do this and you'll be famous.

## A few points, motivated by HW feedback

**Recap**:

* **Express** is a *server* library. It is an abstraction for Node. Reference is here: <http://nodejs.org/api/>
* **Jade** is a way to make *templates*, HTML pages that can have strings and other content easily added into them. Reference is here: <http://naltatis.github.com/jade-syntax-docs/>
* **Mongoose** is a *database* library. It is an abstraction for MongoDB. Reference is here: <http://mongoosejs.com/docs/guide.html>

**Mongoose queries** 

This:

```
Person.find({name,"ronald"}, function (err,person) {
  console.log(person)
})
```

is equivalent to:

```
Person.find({name,"ronald"}).exec(function (err,person) {
  console.log(person)
})
```

The second one is cleaner, and lets you chain stuff other functions inbetween the call to **find** and **exec**, like this:

```
people
  .where("name","ronald")
  .where('age').gte(25)
  .where('interests').in(['movies', 'long walks', 'mongoDB'])
  .select('name', 'age', 'interests')
  .skip(20)
  .limit(10)
  .asc('age')
  .exec(function (err,people) {
    console.log(people)
  });
```

But why do we need `exec` at the end? According to the [mongoose docs](http://mongoosejs.com/docs/2.7.x/docs/query.html) 

```
Query.exec
  Executes the query passing the results to the optional callback.
```

Mongoose tries to be smart and holds off on executing most queries. Take for example our previous query where we changed 

```
people
  .where("name","ronald")
  .where('age').gte(25)
  .where('interests').in(['movies', 'long walks', 'mongoDB'])
  .select('name', 'age', 'interests')
  .skip(20)
  .limit(10)
  .asc('age')
  .exec(function (err,people) {
    console.log(people)
  });
```

We could do this same thing by the following pesudocode

```js
people.find({"name", "ronald"}, function(err, ronalds) {
  ronalds.find({"age":{"$gt":25}}, function(err, twentyFives) {
    twentyFives.find({"interests":{"$in":['movies', 'long walks', 'mongoDB']}}, function (err, sameInterests) {
      // do more call back functions in here
      ...
      ...
    });
  });
});
```

The difference between **chaining** the method calls to people and having a bazillion callbacks is

* tons of callbacks end up looking really ugly. Imagine 7 nested callbacks. WTF is going on?
* Each callback is actually making Mongo execute the query, which makes 7 in total. If you chain, Mongoose attempts to be smart about it and creates ONE super complicated Mongo Query that it executes only once.

There are ton of commands you can chain to a Mongoose query, check out the page [here](http://mongoosejs.com/docs/2.7.x/docs/query.html) for a description of all of them.

**Text Editing**

Sublime Text is the best text editor. Get it.

*Install on Ubuntu:*

```
sudo add-apt-repository ppa:webupd8team/sublime-text-2
sudo apt-get update
sudo apt-get install sublime-text
```

*Install on OSX:*

Download it [here](http://c758482.r82.cf2.rackcdn.com/Sublime%20Text%202.0.1.dmg)

Read about all the cool things you can do with it [here](http://www.rockettheme.com/magazine/1319-using-sublime-text-2-for-development)

**Restart Server Automatically**

Install `supervisor` to automatically restart your server whenever you make a change to your code. No more having to restart your server manually!

Run:

```
sudo npm install -g supervisor
```

Then instead of `node app.js`, you can do:

```
supervisor app.js
```

**Using Git**

Stop using `git add .` This tells git to add everything. This includes all the temp files that have the `~` extension, any embarrasing photos that you might also have put in the folder, etc.

Run a `git status` to see the list of modified files. Then `git add` or `git rm` the files you want to add or delete, respectively. After that, `git commit` and `git push` as usual.

There's also a magical thing called the `.gitignore` file. It tells git to ignore any files that match names listed within the file. You can add things such as 

```
*.jpg
*~
node_modules
```

in the `.gitignore` file and those files will no longer be added when you do a `git add`

<!--

### Sessions

Last class we showed you how to use a database. This class we're going to quickly introduce the concept of sessions. A **session** is a data store that is unique to each user's web browser, but the information is only visible to the server. Think of it as giving each user a unique order number, and when they request a webpage, you can customize it to their liking&mdash;but if they lose their order number, that information is gone. Thus, it's generally only appropriate to store some kinds of data in a session, like what account the user is logged in as or temporary settings. Depending on the user's setup, the next time they close their browser the session may be cleared.

Let's compare the types of ways we can store information.

1. **Sessions.** A session is any temporary information about the person requesting a webpage. If a user logs in, you can add their username to their **session**. If they come back in a week and haven't cleared their cookies, they will still be logged in. If they clear their cookies, next time they go to your webpage, they start a new session.
1. **Database.** A database is for long-term data storage you never want deleted (unintentionally). You would store a user's username in a session, but store their name, date of birth, and dreams in a database. That way their information outlives them closing their browser window.

For completeness sake, let's consider other ways we can explore data:

1. **Cookies.** Cookies are strings of information you store on a user's computer. Unlike sessions, cookies are generally in plaintext, i.e. a user can go ahead and edit their cookies. Cookies would be useful to store a user's preferred font size, but not their username, lest someone evil go ahead and set `document.cookie = 'username=supersecretadmindad'`. Muy mal.
1. **Global variables.** You might hear them described as "bad" or "evil" but our only consideration is that global variables go away when your server resets. On Heroku, your server might reset as often as every 10 minutes! Don't expect global variables to last long.
1. **Files.** Though we haven't covered it yet, Node can read and write files on your computer. Heroku doesn't let you write files, however, so we are going to remain willfully ignorant for a while.

-->

## Quick overview on HTML

**H**yper **T**ext **M**arkup **L**anguage is what is used to describe web pages. HTML consists of a set of **tags** that tell your browser what to render on your page, interspersed with text. A *start tag* looks like this `<tag>` and is finished with an *end tag* `</tag>`. A start tag can also include *attributes*, like `<a href="http://olinjs.github.com/">Olin.js is awesome</a>`. Here `href` is an attribute with the quoted value `http://olinjs.github.com/` and the content `Olin.js is awesome`. The start tags and the content between them is also called an `HTML element`.

You can right click any webpage and click "View Source", and you'll see what HTML any page is made of. Pretty neat.

Every webpage follows this structure:

```html
<!DOCTYPE html>
<html>
 <head>
   ... some information goes here ...
 </head>
 <body>
   ... some content go here ...
 </body>
</html>
```

Inbetween head `tags` are **metadata**. The `<title>` tag sets the title of the tab you are viewing. `<meta>` tags include informations for Search Engine Optimization for showing up on Google. In addition, you can add `<script>` tags in your header; we'll get to that in your moment.

All of your content goes in your `<body>`. **`<div>`** tags are the most basic tag, and denote a box, any kind of box, that stores other tags and content. To denote text which is more specific, you can use more specific tags:

* `<p>...</p>` is a paragraph of text. `<h1>...</h1>` is a heading, the font size reflects this. There are headings `h1` through `h6`.
* `<span>...</span>` denotes a span of *inline text*. You use a span where the text is inside a paragraph and next to other text, and you use a div for entire block of text.
* `<b>...</b>` is bold text; `<i>...</i>` is italic text.
* `<a href="http://google.com/">...</a>` makes a *hyperlink*, which is the foundation of the entire internet.
* `<img src="http://avatars.io/facebook/timcameronryan">` is an image. Note that there is no `</img>` tag, in this case.

You can nest these tags arbitrarily (in most cases):

```html
<body>
  <h1>I'm a heading!</h1>
  <div>
    <p>I'm in a div!<p>
    <span> I'm also in a div!</span>
    <div><b>Divception!</b></div>
  </div>
</body>
```

Great, now you can understand these non-nerdy nerd shirts. See, I told you this class would be useful.

![http://johngushue.typepad.com/photos/uncategorized/2007/03/23/body_html_code_tshirt.gif](http://johngushue.typepad.com/photos/uncategorized/2007/03/23/body_html_code_tshirt.gif)

## Playing with HTML

Writing HTML is easy, and everyone has a web browser. There are still some tools which make this even easier. We're going to be doing some tests in this for this class. Open this address:

    http://jsfiddle.net/C7S4y/1/

Play around with typing HTML and clicking `Run` at the top. You'll see the page in the lower right update. If you're unfamiliar with HTML, do through [the W3C HTML tutorial](http://www.w3schools.com/html/html_intro.asp) and get more comfortable with it. In particular, take a look at **lists** and **tables**.

Note that JSFiddle let's you test what HTML *looks* like, but none of the repsonsibilities of a server (*submitting forms*, *databases*, etc.) We'll use this when appropriate.

## The drill

You know it. *Fork this repository*, then:

```
$ git clone https://github.com/______/olinjs-3.git
$ cd olinjs-3
$ express
$ [sudo] npm install
$ node app
Express server listening on port 3000
```

## Forms in HTML

We can use HTML to create a form. Let's make a very simple app that uses forms to POST data. First, manual labor.

Replace the routes section you have in *app.js* with this:

```
app.get('/', routes.index);
app.post('/', routes.index_post);
app.post('/delete/:id', routes.index_delete);
```

Replace the *routes/index.js* file with this:

```
var todos = [];

exports.index = function (req, res) {
  res.render('index', {
    title: 'Todo list',
    todos: todos
  });
};

exports.index_post = function (req, res) {
  todos.push(req.body.todo);
  res.redirect('/');
};

exports.index_delete = function (req, res) {
  todos.splice(parseInt(req.params.id), 1);
  res.redirect('/');
};
```

And replace the *views/index.jade* file with this:

```
extends layout

block content
  h1= title

  form(method='post', action='/', id="newform")
    | New todo item:
    input(name='todo', id="newinput")
    button('type='submit')
      | Done

  ul(id="todolist")
    each todo, i in todos
      li
        div= todo
        form(method='post', action='/delete/' + i) 
          button
            | Delete
```

We'll explain in class briefly what this Jade means and how it relates to HTML. Take a look at <http://naltatis.github.com/jade-syntax-docs/> to help follow along in class.

Right click the page and take a look at the source code. It looks like this:

```html
<form method="post" action="/">
  New todo item: <input name="todo">
  <button type=submit>Done</button>
</form>
```

When you create a form, it looks at all the `<input>` and `<button>` elements inside of it. These are the data that get sent whenever you submit the form. When you type in the `<input name="todo">` and change it to a TODO list item, that's what gets sent to the server as the value `req.body.todo`.

The two attributes on `<form>` are:

* `method="post"` &mdash; Forms submit their data as GET or POST. We want to POST this data to the server to add a new entry to the list. POSTed data shows up in `req.body`.
* `action="/"` &mdash; This controls what route handles the data you're submitting. We have an `app.post('/', routes.index_post)` that handles our data.

Can you now figure out the way in which the delete button works?

## Static Content

You don't only have to server templates to your users. You can also serve them files from your computer unmodified.

In your application folder exists a folder `public/images`. In this directory either save or `wget` this image and name it "david.jpg":

![https://twimg0-a.akamaihd.net/profile_images/1584353041/267776_10150244291269010_590714009_7743869_8142651_n.jpg](https://twimg0-a.akamaihd.net/profile_images/1584353041/267776_10150244291269010_590714009_7743869_8142651_n.jpg)

Run your server (`node app`) and go to [http://localhost:3000/images/david.jpg](http://localhost:3000/images/david.jpg). And that's how you store images! And movies, stylesheets, and scripts! Think of all the cat pictures! You'll build the next Reddit in no time.

## Client-side JavaScript

JavaScript is a language. Node (server-side) is a "platform". Your browser (client-side) is also a "platform" that runs JavaScript, with a lot of different capabilities.

**What is client-side JS good for?** Before, we used JavaScript to serve websites. Now we'll use client-side JS to add *interactivity* to a page. You used Jade in the last lesson to make templates that display content, forms, etc. After a user gets your template, though, they can't do much until they submit a form or go to a new page. With client-side JS, we can make your website much more useful and powerful.

**One important caveat:** client-side code knows nothing about your server. For all it cares you could be running Python, Ruby, ALGOL or on a [Commodore 64](www.c64web.com). So when you write JavaScript in Node.js, you can't run the same functions in your web browser. We'll explain later how to make them communicate with each other.

### Developer Console

Go to <http://jsfiddle.net/yqU6K/3>. We're going to open up the **developer console**.

* **Chrome:** Control-Shift-J/Command-Option-J
* **Firefox:** get Chrome. (I mean, Control-Shift-K/Command-Option-K)

You should see a line which reads `Hello Olin.js`! If you don't, refresh the page.

As you can see in the "JavaScript" panel on the page, `console.log` works the same as in Node.js! (This one's a freebie.) Try changing console.log to something more exciting:

`alert('Come on down to Pete\'s Pizza Shop for Sweet Pizza Beats');`

Then click "Run" at the top of the page. Cool, you made your first Popup ad!

### jQuery

We're going to learn **jQuery**. jQuery is a way to manipulate webpages. It's all JavaScript, but it's very terse&mdash;see if you can keep up. On your webpage, go to the JavaScript panel and type in the following:

```js
$('p').hide()
```

Then click "Run". Once you get it, replace that code with:

```js
$('p').css('background', 'blue')
```

And click "Run". Next, try:

```js
$('p').css('color', 'red').text("I'm sick of typing $()!")
```

Don't worry, we'll be typing this a lot! jQuery is a <s>fun</s> way to mix and mash up HTML that a user is viewing. jQuery is nearly universal, and a large, large percentage of the top 100 websites use it. The way to do this manually in (client-side) JavaScript is extremely tedious, so we're going to be willfully ignorant of that.

`$` is very powerful. It can also add elements on to your page. Run the following script:

```
$('body').append('<img src="http://i.minus.com/iFxelkyarGr5D.gif">');
```

Now try the following script:

```
$('*').css('background-image', 'url(http://omfgdogs.com/omfgdogs.gif)');
```

Oh dear god.

We can also add event listeners:

```
$('button').on('click', function () {
  alert('button click!')
})
```

Also, elements can have ids. Note the `id="first"` attribute in the HTML. IDs are referenced by `#` then the id name.

```
$('#first').css('background', 'red');
```

## Embedding JavaScript into your page

To embed JavaScript into your page, we first need to create a script.

In your `layout.jade`, you will want to make your `head` look like the following:

```
doctype 5
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src='http://code.jquery.com/jquery.js')
    script(src='/javascripts/todo.js')
  body
    block content
```

Create a new file in your `public/javascripts/` directory called `todo.js`. Save this as the contents of it:

```js
$(function () {
  $('body').html('<h1><marquee>WHEEE</marquee></h1>')
});
```

Restart your server (or if you're using supervisor, it will be done already). Note the wrapper `$(function () { ... })` around the entire script...

The `<script src="/path/to/script.js"></script>` tag embeds a script on your page. It's an individual JavaScript file.

## Communication between the Server and the Client: Ajax

**Ajax** refers to communicating between a web page and a server using JavaScript. After your page is loaded, JavaScript takes over the role of making HTTP requests in order to add interactivity to the page.

From your console, run:

```
$.post("/", {todo: 'hi'});
```

Refresh the page. We did the action of adding a TODO list item without submitting a form! Now let's be cever.

Replace your `todo.js` with:

```
$(function () {
  $('#newform').on('submit', function () {
    $.post("/", $('#newform').serialize());

    return false;
  })
})
```

Try typing in a todo item and hit enter. It doesn't do anything; this is thanks to the `return false` in our event handler. However, refresh the page, and it's there.

Since this isn't useful to the user, let's paste in this at last:

```
$(function () {
  $('#newform').on('submit', function () {
    $.post("/", $('#newform').serialize());

    var li = $('<li>' + $('#newinput').val() + '</li>')
    $('#todolist').append(li);

    return false;
  })
})
```

To create a form:

```
$(function () {
  $('#newform').on('submit', function () {
    $.post("/", $('#newform').serialize());

    var li = $('<li>' + $('#newinput').val() + '</li>')
    $('#todolist').append(li);

    var form = $('<form method="post" action="/delete/' + $('#todolist li').length + '"><button>Delete</button></form>')
    $(li).append(form);

    form.on('submit', function () {
      // ...
    })

    return false;
  })
})
```

Can you make the delete button do the same thing?
