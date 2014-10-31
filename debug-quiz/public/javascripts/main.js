  $(document).keypress(function(e) {
    if(e.which == 13) {
      var name = $('#name').val();
      if (name) {
        $.post("/students/new", { "name": name },
          function(data){
            if (!data.err){
              document.location.href='/students/'+name;
            }
        }, 'json');
      }
    }
  });