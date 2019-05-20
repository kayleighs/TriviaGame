//add questions, item is array and within each question the choices are an array.
var questions = [{
    question: "Who painted the Sistine Chapel?" ,
    answerChoice: ["Michelangelo", "Leonardo da Vinci", "Donatello", "Jan van Eyck"],
    image: ["../images/"],
    answer: 0,
},
{
    question: "Who painted the Mona Lisa?",
    answerChoice: ["Michelangelo", "Leonardo da Vinci", "Donatello", "Jan van Eyck"],
    image: ["../images/"],
    answer: 1,
}]
//array for gifs after answer
var gifs = ["1", "2","3",]
//needed var
var currentQuestion;
var correct;
var incorrect;

//on click for start
$("#start").on("click", function(){
    $(this).hide();
    newGame();
});
//on click for start over
$(document).ready(function () {
    $("#start-over").hide();
});
$("#start-over").on("click", function () {
    $("#start-over").hide();
    newGame();
});
//function for new game
function newGame() {
    currentQuestion=0;
    correct=0;
    incorrect=0;
    unanswered=0;
    newQuestion();
}

//fuction for each new question
function newQuestion() {
    $(".choices").empty();
    $("#gif").empty();
 //   $("#message").empty();

    $("#currentQuestionNum").html("Question #"+(currentQuestion +1) + " out of " + questions.length);
    $(".question").html(questions[currentQuestion].question)
     for (var i = 0; i < questions[currentQuestion].answerChoice.length ; i+=1) {
        var choices = $("<div>");
        choices.text(questions[currentQuestion].answerChoice[i]);
        choices.attr({ "data-index": i });
        choices.addClass("userChoice");
        $(".choices").append(choices); 
} 
    countdown();

    $(".userChoice").on('click', function () {
        userSelect = $(this).data("index")
  //      userSelect = $(this)
        console.log(this);
        clearInterval(counter)
        answerStage();
    });
}

//function to countdown at each question
function countdown() {
    seconds = 15; 0
    $('#timeLeft').html("Time Remaining: " + seconds);
    counter = setInterval(showCountdown, 1000)
}
function showCountdown() {
    seconds-=1;
    $('#timeLeft').html("Time Remaining: " + seconds );
    if (seconds <= 0) {
        clearInterval(counter);
  //      return
   //     answered = false;
         answerStage();
    }
}
function answerStage() {
    $ (".question").empty();
    $(".choices").empty();
    $("#timeLeft").empty();
    $("#gif").html('<img src = "assets/images/' + gifs[currentQuestion] + '.gif" width = "400px">');  //" and ' are important here
    var rightAnswerText= questions[currentQuestion].answerChoice[questions[currentQuestion].answer]
    var rightAnswerIndex= questions[currentQuestion].answer
    
    //check if correct or incorrect
    if (userSelect === rightAnswerIndex) {
        console.log("right!")
        correct +=1;
        $("#message").text("Correct!")
    }
      else if (userSelect != rightAnswerIndex) {
        incorrect +=1;
        $("#message").html("You are wrong! ")
        $("#message").append("The correct answer is: "+ rightAnswerText)
    }  
    else {
        unanswered +=1;
        $("#message").html("You didn't answer! ")
        $("#message").append("The correct answer is: " + rightAnswerText)
    }
    if (currentQuestion=== (questions.length-1)) {
        setTimeout(scorePage, 1000)
    }
    else {
        currentQuestion +=1;
        setTimeout(newQuestion, 5000)
    }
}
function scorePage () {
    $("#currentQuestionNum").empty();
    $("#gif").empty();
    $("#message").html("All Done!")
    $("#message").append("Correct Answers: " + correct)
    $("#message").append("Incorrect Answers: " + incorrect)
    $("#message").append("Unanswered Answers: " + unanswered)
    var percentage = Math.floor((correct /questions.length) * 100);
    console.log(percentage)
    $("#message").append("Percentage: " + percentage + "%")

}