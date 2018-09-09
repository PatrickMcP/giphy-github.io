var gameList = ["Divinity Original Sin 2", "Final Fantasy VII", "Final Fantasy IX", "World of Warcraft", "EverQuest", "Dark Souls", "Bloodborne"];

function renderButtons() {
  $("#buttonDiv").empty();
  for (var i = 0; i < gameList.length; i++) {
    var gameButton = $("<button>");
    gameButton.addClass("game");
    gameButton.addClass("btn btn-info mx-2 text-dark my-1");
    gameButton.attr("data-name", gameList[i]);
    
    gameButton.text(gameList[i]);
    
    $("#buttonDiv").append(gameButton);
  }
};

renderButtons();

$("button").on("click", function () {
  event.preventDefault();

  $("#gif-view").html("");

  var gameName = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gameName + "&api_key=XJ8F9R1buQngpS44OJSMisUiYi7yzYGl&limit=10";

  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {

      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
    
        var gifDiv = $("<div class='col-md-4'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var gameImage = $("<img>");

        gameImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
        gameImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
        gameImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
        gameImage.attr("data-state", "still"); // set the image state
        gameImage.addClass("image");

        gifDiv.append(p);
        gifDiv.append(gameImage);

        $("#gif-view").prepend(gifDiv);
      }
    }
  });
});

$("#add-game").on("click", function () {
  event.preventDefault();

  var game = $("#game-input").val().trim();

  gameList.push(game);

  renderButtons();
});

$(document).on("click", ".image", function(){
  var state = $(this).attr('data-state');
  if ( state == 'still'){
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
  }else{
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
  }
});