//Creating game arrays & variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var gameStart = true;

//Start game
$(document).keydown(function() {
  if (gameStart === true) {
    nextSequence();
    gameStart = false;
  }
});

//Creating function to generate a new pattern
function nextSequence() {

  //Clear userClickPattern
  userClickPattern = [];

  // Generate new tile
  var newTile = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[newTile];

  //Animate selected title
  var chosenColorClass = "#" + randomChosenColor;
  $(chosenColorClass).fadeOut(100).fadeIn(100);

  //Play sound of seleceted tile
  playSound(randomChosenColor);

  //Store sequence in array
  gamePattern.push(randomChosenColor);

  //increase Level
  $("#level-title").text("Level " + level);
  level++;

}

//Checking for user clicks
$(".btn").click(function() {
  var userChosenColor = $(this).attr("class");
  userChosenColor = userChosenColor.split(" ")[1];
  userClickPattern.push(userChosenColor);

  //play sound of user input
  playSound(userChosenColor);

  //animate the pressed button
  animatePress(userChosenColor);

  checkAnswer(level);
});


//Function to play sounds
function playSound(text) {
  var audioText = "sounds/" + text + ".mp3";
  var sound = new Audio(audioText);
  sound.play();
}

//Function to animate user presses
function animatePress(currentColor) {
  var currentColorID = "#" + currentColor;
  $(currentColorID).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Checking user answer
function checkAnswer(currentLevel) {
  var correctAnswer = true;

  if (userClickPattern.length === currentLevel) {
    for (var i = 0; i < currentLevel; i++) {

      //Users pattern is incorrect
      if (userClickPattern[i] != gamePattern[i]) {
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");

        $("#level-title").text("Gameover: press any key to restart");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 200);
        correctAnswer = false;

        //restart game
        startOver();
      }
    }

    //User gets through entire sequence correctly
    if (correctAnswer) {
      console.log("success");
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
}

//Startover
function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = true;
}
