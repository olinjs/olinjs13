Homework 3
===========

## Reading

### Mongo embedding vs referencing

Let's say for example that you owned a series of bookstores each with a location, a manager, and tons of books. Each book has an author and a price. So our data structure so far looks like

```
bookstore
  location
  manager
  book
    author
    price
```

Keep in mind that a lot of books will be repeated across bookstores. How would we convert this to a Mongo datastore? There are 2 main ways: **Referencing** and **Embedding**.

**Referencing**
Referencing is when you reference a Mongo document (usually by _id) inside of another document. We could split up the `bookstore` into two separate Mongo collections, a `store` and a `book`. Then our collections will look like

```
store
  location
  manager
  items
```

```
book
  author
  price
```

This decouples stores with what they carry. We now have 1 book object that can be referenced from multiple stores. This is useful when you are lacking in space (because you don't repeat books). It is also useful when the object being shared changes often. Imagine that this bookstore based the price of their books on the Amazon.com price of the book (which fluctuates constantly). Now every time the price of the book changes you have to make only one change to one object, and the next time a store looks up the book it will see the updated price.

**Embedding**
Embedding is when you store a Mongo document inside of another Mongo document. This is the default way to do things in Mongo, and is the most obvious. Instead of creating two collections for your bookstore, you'll just have one bookstore collection that has a list of every book inside of the bookstore.

```
bookstore
  location
  manager
  book
    author
    price
```

This will lead you to repeat books across bookstores (but who cares because space is cheap). However, it will also mean that if you want to change the price of a book across all bookstores you have to go through each bookstore, search for the book, then change the attribute of the book. This isn't too bad if the book changes price very rarely, or if there are only a few stores which stock the book. However, if we think back to the Amazon.com example, if the price of the book changes every hour, and you have 1000 bookstores which stock the book. That means you have to go update 1000 objects every hour, compared to 1 per hour if you had used referencing. This becomes an even bigger problem when you're a product like Twitter and your "bookstores" are users and books are people those users follow. Let's say you want to update information about the book "Lady Gaga", which is stocked by 33 million "bookstores". This would be nearly impossible with embedded data, but is a cynch with references.

In the end which way you use (reference or embedding) depends what your data access patterns will be like. You'll likely be using embeds 80% of the time, but references also have their place, so know how to do both. 

The Mongo documentation has further details about [when to embed vs reference](http://docs.mongodb.org/manual/core/data-modeling/).


## Assignment

Great news! We started shopping around your last two homeworks (hope you don't mind) and although no one was interested in buying your cat tracking software, we did get an email from a local burger joint, looking for some help. Jessica's Burgers is looking to update their aging ordering system to the 21st century. So in an effort to ~~make us loads of cash~~ improve your coding skills, this homework will focus on making a web app which will help Jessica's customers get their delicous burgers even quicker (and more delicously). Your application will allow users to build orders for single burger from a list of ingredients (which will need to be updated as new stock arrives). Then it will allow Jessica's chefs to see all the pending orders, fill them, and alert customers that their burger is ready.

Your application will need the following http endpoints:
* `/ingredient/new` => shows a form that allows someone to add a new ingredient into the system. An ingredient object consists of an ingredient name and a cost, for example {ingredient: cheese, cost:2}. 
 
* `/order/new` => shows a form which will allow customers to create a new burger. There should be a checklist of all available ingredients and a "submit order" button. Clicking on the "submit order" button should submit the customer's order WITHOUT refreshing the page. i.e., with an [AJAX $.post request](http://api.jquery.com/jQuery.post/). 

* `/orders` will show a list of all the pending orders. There should be a "completed" button beside each order that does another $.post request to your server and completes the order. Clicking this button should also remove this order from the list of orders in the browser (again, without refreshing the page).

Deploy your application to heroku and add your hame to the [Homework 3 sheet](https://docs.google.com/spreadsheet/ccc?key=0AjqGw-pw5UuudFhQSmJhZlRZWEhRTWcwYmxBVld6c1E#gid=3)

## A tutorial to you get you started on the first endpoint (you should probably read this).

`/ingredient/new`

So this should probably be the first endpoint you make, as all your other endpoints rely on the data which this endpoint creates.

So what are we looking for here? Basically something simple, like this:


![ingredient form](https://github.com/olinjs/olinjs-3-hw/blob/master/Screen%20Shot%202013-01-29%20at%2010.42.09%20PM.png?raw=true)

into which you can enter a food name, such as "alfalfa" and a reasonble cost (forget units for now) like "12". Then when you hit submit the data entered should be posted to the server and the use should be redirected to a simple page which looks like this

![sucess!](https://github.com/olinjs/olinjs-3-hw/blob/master/Screen%20Shot%202013-01-29%20at%2010.42.43%20PM.png?raw=true)

with some sort of congradulatory statement. Simple yea? Cool, lets see how we're gonna make this.

First, we're gonna need to make a new express app, add all our dependencies to our package.json, and npm install (see the other homeworks if you forget how to do all this). Don't forget to add Mongoose as a dependency. Next, we're gonna start up our server, using `supervisor app`. Supervisor is that swank program we introduced in the last class which auto restarts your server whenever you change a file. Make sure it's installed globally (`npm install -g supervisor`), and use it from now on to run your server.

Alright, so we're done with setup, let's make our first route. This route is going to take requests to `/ingredient/new` and route them to a function which renders the new ingredient page. So we're gonna want something like `app.get('/ingredient/new', ingredient.new);` in our app.js. Now I know what your thinking, "But normally we just put a function there, what is this ingredient.new thing?". Ingredient.new is a function, we just haven't defined it yet. In the past we've put all our routing methods right in app.js, so we had things like `app.get('/cats', function(){something...}). However, when you start making bigger websites this can get messy. Imagine if you had to scroll through 100 different routing functions in app.js, to find the one your want to edit. That would suck yea? So from now we're gonna be putting routing functions in the handy routes folder which express makes for us.

So let's go ahead and define `ingredient.new`. To do this, add a require at the top of app.js (where all the requires are), which assigns a new variable `ingredient` to equal `require("./routes/ingredient")`. Now go ahead and save this file. If you're running supervisor (which you should be) then you should see this error in your server terminal.

```
Cannot find module './routes/ingredient'
```

Cool, yep that error makes sense. Node can't find the module, because we haven't created it yet. So now lets go ahead and create this module, which will contain the function for rendering the new ingredient form. Just make a new file in the routes folder, and call it `ingredient.js`. Then add a stub for the function we are trying to create:

```
exports.new = function(req, res){
  console.log("hey thar");
  res.send("hey thar");
};
```

Save the file, and go check the supervisor output. If all is well you should see

```
Express server listening on port 3000
```

Otherwise, if you still see errors, try to track those errors down. If you can't find the error try restarting supervisor, sometimes supervisor gets behind and stops restarting the server, which can make it seem like you have errors when you don't.

So now if you hit `localhost:3000/ingredient/new` you should see "hey thar". Cool, looks like all our plumbing is working, so now we need to render our new ingredient form. First lets change our `res.send` in our new method to a `res.render(\<jade template name\>,{})`. This will, if you remember, render the given jade template, and pass it no variables to render (as seen by the empty brackets). Now I'm gonna let you make the Jade file yourself. I will say, however, that you need to put it in the views folder, and that it should probably have the following types of tags:

```
form
input 
submit
```

Play around with these tags until you have something which kind of looks like the picture we started with. Once you're set, there a few things you'll need to do to the form you've made, in order to get it ready for posting. First, you need to set the action and method attibrutes of the form. The action attribute specifies where the form will be sent to, and the method specifies whether the form will submit as a GET, POST, PUT, DELETE or some other kind of HTTP method. We're gonna want our action to be "/ingredient/create", which is a new function we will create to add new ingredients to our DB. We're gonna want our method to be POST. Assigning tags methods in Jade is pretty simple, just put parentheses next to the tag and inside define your attributes. For example:

```
form(action="/bankity/boop", method=MADNESS)
```

Don't forget the comma when defining attributes, otherwise you will break jade in a very ambiguous and hard to debug way.

So, now that we have our form all set and ready to go, lets give it a whirr. Enter something into the ingredient name and cost field, then hit submit. You should get an error on the page which says that the route doens't exist. Well, I think our next step is clear.

Go back to app.js and add a new route which takes posts to `/ingredient/create` and routes them to `ingredient.create`. In express routing a post is pretty simple, it's basically like routing a get:

```
app.post("/path/to/route", function.toRouteTo);
```

Once that route is defined go back to your ingredient.js file and make the ingredient.create method. Put a `console.log()` in it and send back a simple response, just so you can make sure all the piping is working again. Hit the submit button again and you should this time see the simple response you sent back from the create method. Good, so the server is getting the post you're sending, now lets actually do something with the post information. 

To get data from a POST, just call `req.body.\<name of attribute\>`. Where \<name of attribute\> is the name attribute which is assigned in the form doing the posting. We haven't actually assigned names to our inputs yet, so if you `console.log(req.body)` right now you'll actually just see an empty hash (`{}`). Go back to your ingredient jade file and add a name to each input tag. You do this in the same way you added the method and action attibrutes to the form tag, just `input(name=someValue)`. If you want to check to make sure the name attributes are appearing correctly, right click the input in chrome and say "inspect element". You should then be able to see all the attibrutes the input has. If you don't see `name=something` then your jade file is probably messed up. Once you've assigned names, you should be able to submit again, and this time `console.log(request.body) should print out your POST submission. Now you just need to grab the data out of request.body, and actually do stuff with it, namely, save it in your database.

Now seems like a good time to set up our schemas and models for this app. Following the trend we established earlier of not putting everything in app.js, we're gonna put all our schema/model declarations in their own file. So, make a new file called models.js. Put all your database setup stuff in this file. Start with a `var something = require('mongoose')` then connect to mongo using the following command:

```
mongoose.connect('mongodb://localhost/burgers')
```

This `connect` command might be new for you. In the past we usually left it out. It just says that we're going to be storing all our data in the "burgers" database, which mongoose creates automatically if it doesn't already exist. If you don't include the connect command then mongoose will just connect to the `admin` database by default, and store all your stuff there. However, to avoid weird data contamination issues, you should always use this connect command, and have a separate DB for each app. 

Now add a schema for an ingredient. Every ingredient should have a name and a cost. Make this schema into a model, then export the model using the command:

```
exports.Ingredient = \<ingredient model\>
```

Now whenever you require this file the Ingredient model will be available for use.

So now go back to your ingredient.js file and require models.js. If you put models.js within the parent folder for your app then you will need to `require(../models)`.  The `..` indicates the Node should look up one directory to find the file. Assign the required file to a variable, say, `models`. Now create a new var called `Ingredient`, outside of all your functions, and assign to it `models.Ingredient`. Now you should be able to use Ingredient as a model, the same way you did with the Cat model in the last assignment. Use this model to save the post data you receive in the create method to your DB, the same way we did before. 

Once you're able to save ingredients to the database you are done with the first route for this HW. 

## Some Notes for the next two endpoints

Now that you're all warmed up from making the new ingredient page, it shouldn't be too hard to get through the next two endpoints. However, here are a few notes to help you on your way:

**`/order/new`

For this page you're likely going to want to check out the `input(type=checkbox)` tag. Then in order to make a customer's order submit without refreshing use [jQuery post](http://api.jquery.com/jQuery.post/). Receiving the post data from jQuery is the same on the server side as when receiving a form submission. The main difference on the server side is that you will need to send back JSON data as a response, instead of html. Luckily, express automatically converts javascript arrays and objects to JSON. So you can just call `res.send(["some","data","here",{cool:"man"})` and express will convert the array into JSON and send it to the client. If you don't know what JSON is, it's a way of organizing data, similar to a hash or python dictionary in structure, which is good for sending information of networks. You can read about it [here](http://www.json.org/). In the end though, you don't need to know too much about it. Express will take care of converting javascript stuff into JSON on the serverside, then jQuery will take care of converting the JSON received from your sever back into javascript objects and arrays.

This route will need take care of saving orders to the DB. If you read the mongoose reading at the beginning of this homework then you should know something about embedded vs. referenced objects in a DB. Here you are going to be using references. So you will be making a new model called `order` which will have references to many `ingredients`. You declare this using a schema which looks like this:

```
var orderSchema = new Schema({
  customerName    : String,
  ingredients : [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }]
});
```

to learn how assign and access referenced objects read the documentation [here](http://mongoosejs.com/docs/populate.html). 

**`/order/new`

For this page you will need to again use jQuery post to send a request to the server, whenever a order is "completed". There will also need to be some clientside jQuery which removes the completed order from the list of orders in the browser. jQuery remove will probably be useful. 


