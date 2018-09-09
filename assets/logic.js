var gameList = ["Divinity Original Sin 2", "Final Fantasy VII", "Final Fantasy IX", "World of Warcraft", "EverQuest", "Dark Souls", "Bloodborne"];

function renderButtons() {
    $("#buttonDiv").empty();
    
    for (var i = 0; i < gameList.length; i++) {
        var a = $("<button>");
        // Adding a class
        a.addClass("game");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", gameList[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(gameList[i]);
        // Adding the button to the HTML
        $("#buttonDiv").append(a);
    }
};

$("#game").on("click", function(event) {
    event.preventDefault();

    var game = $("#game-input").val().trim();
    
    gameList.push(game);

    renderButtons();
  });

renderButtons();

$("button").on("click", function() {
    event.preventDefault();
    $("#gif-view").html("");
    var gameName = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gameName + "&api_key=XJ8F9R1buQngpS44OJSMisUiYi7yzYGl&limit=10";

    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div with the class "item"
            var gifDiv = $("<div class='col-md-4'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var personImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            personImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(personImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gif-view").prepend(gifDiv);
          }
        }
      });

    });