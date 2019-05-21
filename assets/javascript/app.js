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
    $("#time-box").hide();
    $("#message-box").hide();
});
$("#start-over").on("click", function () {
    $("#start-over").hide();
    newGame();
});
//function for new game
function newGame() {
    $("#time-box").show(); 
    $("#message-box").show();
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
    $("#message").empty();
    $("#time-box").show();

    $("#currentQuestionNum").html("Question #"+(currentQuestion +1) + " out of " + questions.length);
    $(".question").html(questions[currentQuestion].question)
     for (var i = 0; i < questions[currentQuestion].answerChoice.length ; i+=1) {
        var choices = $("<button>");
        var lineBreak= $("<br>");
        choices.text(questions[currentQuestion].answerChoice[i]);
        choices.attr({ "data-index": i });
        choices.addClass("userChoice ks-buttonChoices");
        $(".choices").append(choices); 
        $(".choices").append(lineBreak);

} 
    countdown();

    $(".userChoice").on('click', function () {
        userSelect = $(this).data("index")
        console.log(this);
        clearInterval(counter)
        answerStage();
    });
}

//function to countdown at each question
function countdown() {
    seconds = 15; 
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

function countdownAnswer() {
    seconds = 1;
    $('#timeLeft').html("Time Remaining: " + seconds);
    counter = setInterval(showCountdownAnswer, 1000)
}
function showCountdownAnswer() {
    seconds -= 1;
    $('#timeLeft').html("Time Remaining: " + seconds);
    if (seconds <= 0) {
        clearInterval(counter);
        scorePage ();
        //      return
        //     answered = false;
    }
}
function countdownAnswerNext() {
    seconds = 1;
    $('#timeLeft').html("Time Remaining: " + seconds);
    counter = setInterval(showCountdownAnswerNext, 1000)
}
function showCountdownAnswerNext() {
    seconds -= 1;
    $('#timeLeft').html("Time Remaining: " + seconds);
    if (seconds <= 0) {
        clearInterval(counter);
        newQuestion();
        //      return
        //     answered = false;
    }
}
function answerStage() {
    $ (".question").empty();
    $(".choices").empty();
    $("#gif").html('<img src = "assets/images/' + gifs[currentQuestion] + '.gif" width = "400px">');  //" and ' are important here

    $('#timeLeft').html("Time Remaining: " + seconds);
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
        countdownAnswer();
    }
    else {
        currentQuestion +=1;
        countdownAnswerNext();
    }
}

function scorePage () {
    $("#currentQuestionNum").empty();
    $("#time-box").hide();
    $("#timeLeft").empty();
    $("#gif").empty();
    $("#message").empty();
    $("#start-over").show();


    var doneh = $("<h3>")
    doneh.text("All Done!")

    var corDiv = $("<div>");
    corDiv.text("Correct Answers: " + correct)

    var incorDiv = $("<div>");
    incorDiv.text("Incorrect Answers: " + incorrect)
  
    var unansweredDiv = $("<div>");
    unansweredDiv.text("Unanswered Answers: " + unanswered)

    $("#message").append(doneh)
    $("#message").append(corDiv)
    $("#message").append(incorDiv)
    $("#message").append(unansweredDiv)

 
    var percentage = Math.floor((correct /questions.length) * 100);
    console.log(percentage)

-    $("#message").append("Percentage: " + percentage + "%")

}

