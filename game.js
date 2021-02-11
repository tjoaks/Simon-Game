var gamePattern = []; //empty array to store the pattern

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"]; //array to store corresponding button colors

var started = false; //was game started?

var level = 0;  //level counter

$(document).keydown(function(){ //listen for a key press
      
   if(!started){  //if the game hasn't started run the following function

         $("#level-title").text("Level " + level);  //modify the level title using it's id and the level variable
    
          //runs nextSequence function

          nextSequence();

    started = true; //set started to true
   
    
   
    console.log(this);

      }
});

$(".btn").click(function(){ //listens for a click then calls the function below
   
   var userChosenColor = $(this).attr("id"); //declare the chosen color and assign the id of the button
   userClickedPattern.push(userChosenColor); //push the chosen color to clickedpattern array

   playSound(userChosenColor); //play sound based on the USER color

   console.log(userClickedPattern); //log the function

   currentColor = userChosenColor;

   animatePress(currentColor);

   checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){ //check to see if the clicks match 

   if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){ //if userpattern = game pattern log a success
      console.log("success")
   
      if (userClickedPattern.length === gamePattern.length){ //if the length is also correct, start the next sequence in 1000ms

         setTimeout(function() {
           nextSequence();
         }, 1000);
   }
}
   else{
      console.log("wrong")

         var audio = new Audio("sounds/wrong.mp3"); //create audio obj and play audio obj based on the chosen color
           audio.play();

      $("body").addClass("game-over");

      setTimeout(function(){
      $("body").removeClass("game-over");
      }, 200);

      $("h1").text("Game Over, Press Any Key to Restart");

      startOver();
      
   }
}

function nextSequence() { //function to add a value to the pattern

level++; //increase level count
$("#level-title").text("Level " + level); //change level text
userClickedPattern = [];  //reset user clicked array

   var randomNumber = Math.floor(Math.random() * 4); //generate random number
   

var randomChosenColor = buttonColors[randomNumber]; //declare randomChosenColor and pull data from array using the number and assign to randomChosenColor to sync to ID in next steps
gamePattern.push(randomChosenColor); //push the color picked to the game pattern

console.log(randomNumber, randomChosenColor); //log the number and color chosen


$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //apply flash animation to the color chosen .. '#" selects the ID from index.html

playSound(randomChosenColor);//play the sound
}

function playSound(name){ //create function to play sound

var audio = new Audio("sounds/" + name + ".mp3"); //create audio obj and play audio obj based on the chosen color
  audio.play();

}

function animatePress(currentColor){  //create function to animate the clicks using the currentColor chosen

   this.userChosenColor = currentColor;   //state that currentColor is the same as userChosenColor

   $("." + currentColor).addClass("pressed");  //use $ to use Jquery and choose the class using "." + 'classname' and add a new class that changes CSS

setTimeout(function() {                         //set a timeout before removing class
   $(".btn").removeClass("pressed");            // remove css class
}, 100);

}

function startOver(){

   started = false;
   level = 0;
   gamePattern = [];
}