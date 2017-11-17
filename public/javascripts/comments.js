$(document).ready(function(){


  $("#postComment").click(function(){
    function inDatabase(myobj){
      $.getJSON('comment', function(data){
        for(var comment in data){
          com = data[comment];
          console.log("This is myobj.Name " + myobj.Name + " and this is com.Name " + com.Name);
          if(myobj.Name == com.Name){
            console.log("im in if statement");
            return true;
          }
        }
        return false;
      })
    }
      var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      jobj = JSON.stringify(myobj);
      if(inDatabase(myobj) != true){
        console.log("im in second if statement");
      var url = "comment";
      $.ajax({
      url:url,
      type: "POST",
      data: jobj,
      contentType: "application/json; charset=utf-8",
      success: function(data,textStatus) {
        
      }
      })
      listComments();
    }else{
      alert("This restaurant is already in the database. What's another favorite?")
    }

  });

  $("#getComments").click(function() {
      listComments();
  })

var listComments = function(){
  $.getJSON('comment', function(data) {
    console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li>" + com.Name + "<br>&nbsp&nbsp&nbsp&nbsp Type - " + com.Comment + "<br><br><br></li>";
      }
      everything += "</ul>";
    
    $("#comments").html(everything);
  })
}





  $("#deleteComments").click(function() {
    var url = "delete";
    var deleted = "All items deleted";
    $.ajax({
      url:url,
      type: "POST",
      success: function(deleted){
          $("#done").empty();
          
          $("#comments").html("All restaurants deleted");
      }
    })
  })
  
});