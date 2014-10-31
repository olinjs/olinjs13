# olin.js #1 — git init

The first lesson for this class will be a litmus test to see if your development "environment" is set up properly. In the process, we'll learn the most important tool in a programmer's toolbox: version control. Programming is iterative.

Read this cute explanation of version control at <http://www-cs-students.stanford.edu/~blynn/gitmagic/ch01.html#_version_control>.

Our version control system (VCS) of choice is Git, which is one of Linus Torvalds' babies. Git is a distributed VCS, which means that you store a full copy of the repository (all the code) on your local computer.  You can them make all the changes you want and save them on your local repository. You can then send this code along with all your changes to another server whenever you want. This contrasts with a a central VCS, which requires you to be connected to a server that allows you to check in each change as you make it.  To learn more about Git, check out [Pro Git](http://git-scm.com/book), which is written by Scott Chacon, CIO at GitHub.

For the examples below, lines prefixed by `$ ` are those you type in. Following lines are what you should expect to see in response:

```
$ echo hello world
hello world
```

## 1. Forking

"Forking" is to copy a repository. It's termed "forking" because you copy the entire history of the project, but from here on out, any changes you make to your new repository are distinct from those you make in the original repository. It's totally fine to keep two repositories ongoing with the same history, it's just data! 

Github makes this very easy. Do this:

![http://i.imgur.com/AnpW5Bx.png](http://i.imgur.com/AnpW5Bx.png)

This will bring you to your own copy of this lesson (e.g. **tcr/olinjs-1-git**). When you make changes to your version, it won't mess with anyone else's work.

## 2. Cloning

Now that you have your own copy of the repository, it's time to "clone" it, aka, download a copy to your computer. It's termed "cloning" because your downloaded copy and the version that exists on Github have a special relationship: you can "push", aka upload, all of your changes to the server with a single command. Cloned repositories exist to push and be pushed.

We want to clone your copy of this lesson's repository. Replace the `_____` in the below example with your Github username. If this is the first time you run this command, you'll be asked for your Github username and password,

```sh
$ cd ~ # go to your home directory
$ git clone https://github.com/_____/olinjs-1.git
Username:
Password:
```

## 3. Testing

There's code in this repository! Check it out by opening `app.js`. To test it out, run the command `node app.js`.

```sh
$ node app.js
Open the address http://localhost:8080/
```

Check it out. If you go to the address `http://localhost:8080/` in your web browser, it should greet you with a warm message.

## 4. Pushing

```
git push -u origin master
```

## 5. Heroku

Heroku is a web host. They'll run your website for you on a permanent server that runs 24/7 (most of the time), and give you a URL you can access it at.

```
$ heroku create
$ git push heroku master
```

## 6. Taking control of your own destiny

Change the text in app.js from `"Hello"` to `"I can see you, "`.

Test it:

```
$ node app.js
```

Commit your changes:

```
$ git add .
$ git status
$ git commit -am "My first change"
```

Push to Github:

```
$ git push origin master
```

Push to Heroku:

```
$ git push heroku master
$ heroku open
```

Horray!

**Note:** Unlike other academic institutions, it is totally encouraged that as a programmer, you copy other people's code (if it's licensed accordingly). Never pass off someone else's work as your own—just give them credit! Often you'll find a solution that someone else has made is the right answer. Github makes finding code to work off of easy. 

**Note:** Sign up for the [devtalk mailing list](https://lists.olin.edu/mailman/listinfo/devtalk).

## References

1. <https://devcenter.heroku.com/articles/nodejs> — Heroku article on developing with Node.js
2. <http://marklodato.github.com/visual-git-guide/index-en.html> — Advanced graphical guide explaining what Git commands do.
