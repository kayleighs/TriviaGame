//add questions, item is array and within each question the choices are an array.
var questions = [{
    question: "Who painted the Sistine Chapel?" ,
    answerChoice: ["Michelangelo", "Leonardo da Vinci", "Donatello", "Jan van Eyck"],
    image: ["../images/"],
    answer: 0,
},
{
    question: "Who painted the <i>Mona Lisa</i>?",
    answerChoice: ["Rogier van der Weyden", "Leonardo da Vinci", "Boticelli", "Jan van Eyck"],
    image: ["../images/"],
    answer: 1,
    
},
{
    question: "Who painted the <i>Ghent Altarpiece</i>?",
    answerChoice: ["Boticelli", "Albrect Durer", "Raphael", "Jan van Eyck"],
    image: ["../images/"],
    answer: 3,
},
{
    question: "Who drew the famous drawing of praying hands?",
    answerChoice: ["Albrect Durer", "Leonardo da Vinci", "Donatello", "Jan van Eyck"],
    image: ["../images/"],
    answer: 0,

},
{
    question: "<i>Girl With the Pearl Earring</i> was painted by whom?",
    answerChoice: ["Albrect Durer", "Leonardo da Vinci", "Vermeer", "Jan van Eyck"],
    image: ["../images/"],
    answer: 2,
},
{
    question: "What famous figure did Donatello make in bronze?",
    answerChoice: ["Adam", "Moses", "Apollo", "David"],
    image: ["../images/"],
    answer: 3,
},
{
    question: "Michelangelo's <i>David</i>, his most iconic sculpture,is located where?",
    answerChoice: ["The Louvre, Paris", "Galleria dell'Accademia, Florence", "Uffizi Gallery, Florence", "Borghese Gallery and Museum, Rome"],
    image: ["../images/"],
    answer: 1,
},
{
    question: "<i>The Birth of Venus</i> was painted by whom?",
    answerChoice: ["Boticelli", "Leonardo da Vinci", "Fra Angelica", "Jan van Eyck"],
    image: ["../images/"],
    answer: 0,
},
{
    question: "Who painted the <i>Garden of Earthly Delights</i>?",
    answerChoice: ["Pieter Bruegel the Elder", "Rogier van der Weyden", "Hieronymus Bosch", "Jan van Eyck"],
    image: ["../images/"],
     answer: 2,
},
{
    question: "<i>Children's Games</i> was painting by which Flemish painter?",
    answerChoice: ["Pieter Bruegel the Younger", "Hans Memling", "Pieter Bruegel the Elder", "Jan van Eyck"],
    image: ["../images/"],
    answer: 2,

}]
//array for gifs after answer
var gifs = ["1.gif", "2.gif","3.gif","4.jpg", "5.gif","6.gif","7.gif","8.gif","9.gif","10.gif"]
//needed var
var currentQuestion;
var correct;
var incorrect;
var answered;
var unanswered;
var userSelect;
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
    answered= true;

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
        answered = true;
        answerStage();
        
    });
}

//function to countdown at each question
function countdown() {
    seconds = 15; 
    $('#timeLeft').html("Time Remaining: " + seconds);
    answered = true;
    counter = setInterval(showCountdown, 1000)
}
function showCountdown() {
    seconds-=1;
    $('#timeLeft').html("Time Remaining: " + seconds );
    if (seconds <= 0) {
        clearInterval(counter);
        answered = false;
        answerStage();
    }
}

function countdownAnswer() {
    seconds = 5;
    $('#timeLeft').html("Time Remaining: " + seconds);
    answered = true;
    counter = setInterval(showCountdownAnswer, 1000)
}
function showCountdownAnswer() {
    seconds -= 1;
    $('#timeLeft').html("Time Remaining: " + seconds);
    if (seconds <= 0) {
        clearInterval(counter);
        scorePage ();
         answered = false;
    }
}
function countdownAnswerNext() {
    seconds = 5;
    $('#timeLeft').html("Time Remaining: " + seconds); 
    answered = true;
    counter = setInterval(showCountdownAnswerNext, 1000)
}
function showCountdownAnswerNext() {
    seconds -= 1;
    $('#timeLeft').html("Time Remaining: " + seconds);
    if (seconds <= 0) {
        clearInterval(counter);
        newQuestion();
         answered = false;
    }
}
function answerStage() {
    $ (".question").empty();
    $(".choices").empty();
 //   $("#gif").html('<img src = "assets/images/' + gifs[currentQuestion] + '.gif" width = "400px">');  //" and ' are important here
    $("#gif").html('<img src = "assets/images/' + gifs[currentQuestion] +'" >');
    $('#timeLeft').html("Time Remaining: " + seconds);
    var rightAnswerText= questions[currentQuestion].answerChoice[questions[currentQuestion].answer]
    var rightAnswerIndex= questions[currentQuestion].answer
    
    //check if correct or incorrect
    if ((userSelect == rightAnswerIndex) && (answered == true)){
        console.log("right!")
        correct +=1;
        $("#message").text("Correct!")
    }
    else if ((userSelect != rightAnswerIndex) && (answered == true)){
        incorrect +=1;
        $("#message").html("You are wrong! ")
        $("#message").append("The correct answer is: "+ rightAnswerText)
    }  
    else {
        unanswered +=1;
        $("#message").html("You didn't answer! ")
        $("#message").append("The correct answer is: " + rightAnswerText)
        answered=true;
    }
    if (currentQuestion == (questions.length-1)) {
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

