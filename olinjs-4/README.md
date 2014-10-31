olinjs-4
========

lecture #4: style and grace

## Notes from the last homework

### Mongoose models
Alright, so now that you've got multiple models you might want to split them up into different files in your `/models` folder. This will introduce you to several fun new things

`mongoose.connect` can only be called once. You only establish one connection to your database. You want to put it in `app.configure`

```js
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  ...
  mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/burgers');
});
```

But say you only have one `models.js` file that holds all your models. You should still put your `mongoose.connect` in your `app.configure`. It was my fault that I didn't put it in there as an example in the first place. I would have failed my own code review.

BUT now that you have only one `models.js` file and a bunch of models, you're going to need to export all of the different models. You need to explicitly state what is the name of each thing you're exporting

```js
module.exports.Ingredient = Ingredient;
module.exports.Order = Order;
```

### Mongoose populate
If we take the previous homework as an example, the `.populate` query allows you to have a `order` object and grab the associated `ingredient` objects. So you could do something like this

```js
var OrderSchema = new Schema({
  _ingredients : [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }]
});

Order.findOne().populate('_ingredients').exec(...)
```

The [Mongoose doc on populate](http://mongoosejs.com/docs/populate.html) is actually really well written on this, so I won't bother repeating it here.

<!--
### Updating the list of ingredients
So in the last homework we had the `orders` page that had a list of ingredients and you needed to add those ingredients as references in your order model.

The pesudocode should go something like this
```
render a list of checkboxes 
  each checkbox's value is set to the _id of the ingredient

when the user clicks submit
  do a $.post request back to your server
    get each _id of the ingredient
    check if the _id is still valid (someone could have deleted it right?)
    insert it into your orders model
    save your new order
```

If you do the checking step, you need to keep in mind that each `.find()` call is async, so you're not guarenteed any order in which the `.find()' calls will return in. However, you can asynchronously update your order. In pesudo code it'll look something like

```js
ingredients = req.params.ingredients
order = new Order({}) // save something with 0 ingredients
order.save(function (e) {
  // go through our list of ingredients and check they exist
  ingredients.forEach(function(ingredient){
    // try to find the ingredient
    Ingredient.find({_id: ingredient}, function (err, found){
      // if there isnt an error, that ingredient hasn't been created yet
      if (!err) {
        // update our order again
        order.update({$push: {ingredient: found.id}});
      }
    });
  });
});
```
-->
## Recapping what we've done
![recap](https://raw.github.com/olinjs/olinjs-4/master/images/recap.png?login=jiahuang&token=72662cb7a920eb602a67d2fc0f7b0625)

## A note on debugging
If you ever work in industry, you'll be dropped into a huge code base with no clue what's going on and be expected to fix bugs. The architecture will be weird and shitty as a result of being patched by a lot of people over months/years. It will make no sense. 

When this happens you resort to the best debugging tool ever: guessing and logging.

**Use console.log**
There is a werid error message appearing. There will usually be a stack trace that looks like this

```
TypeError: object is not a function
    at exports.create_order (/Users/jialiya/projects/test/olinjs-3-hw/routes/ingredient.js:26:15)
    at callbacks (/Users/jialiya/projects/test/olinjs-3-hw/node_modules/express/lib/router/index.js:161:37)
    at param (/Users/jialiya/projects/test/olinjs-3-hw/node_modules/express/lib/router/index.js:135:11)
    at pass (/Users/jialiya/projects/test/olinjs-3-hw/node_modules/express/lib/router/index.js:142:5)
    at Router._dispatch (/Users/jialiya/projects/test/olinjs-3-hw/node_modules/express/lib/router/index.js:170:5)
    at Object.router (/Users/jialiya/projects/test/olinjs-3-hw/node_modules/express/lib/router/index.js:33:10)
    at next (/Users/jialiya/projects/test/olinjs-3-hw/node_modules/express/node_modules/connect/lib/proto.js:199:15)
    at Object.methodOverride [as handle] (/Users/jialiya/projects/test/olinjs-3-hw/node_modules/express/node_modules/connect/lib/middleware/methodOverride.js:37:5)
    at next (/Users/jialiya/projects/test/olinjs-3-hw/node_modules/express/node_modules/connect/lib/proto.js:199:15)
    at multipart (/Users/jialiya/projects/test/olinjs-3-hw/node_modules/express/node_modules/connect/lib/middleware/multipart.js:70:58)
```

Oh balls looks like you've got a bunch of errors to trace through, right? Well... maybe. Every stack trace looks like this, from small typos to actual errors in your npm modules. But seriously, it will never be a problem with your modules. It'll almost always be in your code, so all you really need to check is the first few lines.

Furthermore, this error is gonna be real hard to look up on Google. It's too specific to your app.

Start by looking at the 26th line around `exports.create_order`.

Do a `console.log` of everything that might be important. Something that node expects to be an object is actually just a function. Find what that is and you've found your error.

**Check for consistancy**
You guys all have working Heroku apps that does most of this stuff by now. If all of the sudden you can't deploy your stuff to Heroku look for what's different between your current project and your previous ones.

**Chrome inspect & the Chrome JS console**
Use this for all your client side debugging. Right click on any element and click inspect. It'll bring up the most useful panel of your life. 

## CSS

CSS is what makes websites look pretty.  It's the difference between this:

![style](https://github.com/olinjs/olinjs-4/blob/master/twitter_tyle.png?raw=true)

and this:

![no_style](https://github.com/olinjs/olinjs-4/blob/master/twitter_no_style.png?raw=true)

For these two websites the html is the same, the Javascript running on the browser is the same, everything which went on on the server side to render this page is the same. The only difference is that one is completely lacking css styling.

So far we've been making webpages without styling, so they look alot like ugly twitter shown above. Now we're gonna start learning how to pretty them up. Take the site which you made for HW3.

![hw3 not style](https://github.com/olinjs/olinjs-4/blob/master/Screen%20Shot%202013-01-31%20at%204.58.23%20PM.png?raw=true)

Lets add some style to it!

So open up the new_ingredient.html file in this repo, and we'll just change some css attibrutes, for a few elements. To do this we'll use the chrome inspector.

1. font-size: 32px
2. text-align: center
3. font-family: Lucida Sans Unicode, Lucida Grande, sans-serif	
4. border: 4px solid black
5. border-radius: 10px
6. border: 2px solid green 
7. border: 2px solid red
8. border: none
9. padding-bottom: 12px
10. background-image: url(http://maxim061156.files.wordpress.com/2012/09/santaclaus15.jpg)

And voila! look at our beatiful website!

So this is all great and all, but refresh the page, and what happens?  All of our hard work is gone. So how do we make permanent css styles? Using a stylesheet. Fork this repo, pull it, the open up a text editor and lets make one.


##Making SublimeText Kickass
Plugins are awesome. Let's install something to help us write Jade
* Install the SublimeText Package Control: http://wbond.net/sublime_packages/package_control/installation
* Press Ctrl (or cmd for you fruit-computers) + Shift + P
* Type install (it will autocomplete to __Package Control: Install Package__
* Type Jade
* Hit enter to install and profit. Restart SublimeText and Jade should be syntax-highlighted. __Wow!__
