$(document).ready(function(){

  var PUPPIES = [];
  // scrape the top of r/aww
  function getPuppies(){
    $.get('http://www.reddit.com/r/aww/.json?jsonp=?', function (data) {
      PUPPIES = data.data.children.map(function(entry) {
        return entry.data.url;
      });
    }, 'json');
  }

  $('#done').click(function () {
    var name = $('#name');

    if (name) {
      $.post("/students/"+name+"/done", { "name": name },
        function(data){
          if (!data.err){
            $('#message').text('cool, just look at this while everyone else finishes up');
            // display some reddit image
            $('#img').attr('src', PUPPIES[Math.floor(Math.random()*PUPPIES.length)]);
          }
      }, 'json');
    }
  });
  
  $('#help').click(function () {
    var name = $('#name').text();

    if (name) {
      $.post("/students/"+name+"/help", { "name": name },
        function(data){
          if (!data.err){
            $('#message').text('Raise your hand. Do it. I already have your name. Don\'t make me track you down');
            $('#img').attr('src', '');
          }
      }, 'json');
    }
  });
});