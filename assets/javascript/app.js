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
var current;
var correct;
var incorrect;

//on click for start
$("#start").on("click", function(){
    $("#start").hide();
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

//fuction for new question

//function to countdown at each question
