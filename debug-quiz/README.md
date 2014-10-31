#debug-quiz

let's see how well you can google

## The app
This is the source of imdone (before Tim went and added private keys everywhere). 

You can go to http://imdone.herokuapp.com to see how it's supposed to behave, but here's a quick overview:
* `/` => that form where you enter in your name. Entering in this does creates a new user through `/students/new`
* `/students/:student` => shows you the student page where you can hit "done" or "help". This also shows pictures from /r/aww when you hit those buttons.
* `/admin` shows you who is done and who is not. Also shows you the people's names that need help
* `/admin/clear` allows you to clear off the students who are done and need help

There are bugs in code and it doesn't work correctly. Fix them.

## Installation

```
npm install;
supervisor app;
```