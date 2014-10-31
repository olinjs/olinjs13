console-wars
============

The ultimate console challenge.

To get started:

  Copy and paste your respective command below into your command prompt, then, before you hit enter, quit chrome. Then execute the command and, when chrome reopens, return to this page.
  
  Linux - `google-chrome --disable-web-security`
  Mac - `open -a Google\ Chrome --args --disable-web-security`
  Windows - find where the chrome exe is located and run `chrome.exe --disable-web-security`

Opening chrome with web-security disabled allows you to make cross domain request from the console, which is what console wars is all about.

Now open the [challenge_course.html](http://olinjs.github.com/console-wars/challenge_course_tricky.html) file in your browser, you should see an empty page. Hidden within the source of this page are 5 html "hints" which provide clues on where/what to post/get to my server (running at an ip I will reveal to you when the challenge begins). There are 5 endpoints you need to hit, your job is to use the chrome console to search the html and make the correct requests to each endpoint, completeing the 5 challenges which make up console-wars. You'll know you've succeeded each time when you recieve back a congratulatory response, and your name appears on the scoreboard running at the front of the room, under the challenge you have completed. Some rules to make things easier:

Every request you make needs to send the following data: {name: <your name>, value: <some value that you need to figure out>}. You will need to figure out the values based on hints given in the html source.

The url for each endpoint is always indicated by a name attribute on an html element.

The first 4 challenge hint elements are identified by either the class or id challenge<challenge#>. 

You may only use the console, no additional search functionality or view source. Otherwise you are cheating and you are a terrible person. You may use jquery and anything that pops up in the console.

As an example the hint:

```
<div id="challenge1" name="/post_to_me">
  the value you should send is david_rocks.
</div>
```

would likely indicate a post to /post_to_me with a value of david_rocks, in order to complete challenge1.

Good Luck!
