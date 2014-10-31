$(document).ready(function(){

  $('#clear').click(function () {
    $.post("/admin/clear", {},
        function(data){
          if (!data.err){
            document.location.href='/admin';
          }
      }, 'json');
  });

});