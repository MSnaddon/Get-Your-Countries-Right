var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var processData = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  makeQuiz(countries);
  generateQuestion();
}

var quizCounter = 0;
var quiz = [];
var score = 0;

var makeQuiz = function(countries){
  for (var i = 0; i < 11; i++){
    index = Math.floor(Math.random()*countries.length)
    
    var countryObject = {
      countryName: countries[index].name,
      population: countries[index].population,
      latlng: {
        lat: countries[index].latlng[0],
        lng: countries[index].latlng[1]
      }
    };
    console.log(countryObject.latlng)
    quiz.push(countryObject);
  }
  console.log(quiz, " quiz so far")
}

var generateQuestion = function(){
  var question=document.querySelector('#question');
  
  if((quiz.length - 1) > quizCounter){

    var questionText = "Is " + quiz[quizCounter].countryName +"'s " + quiz[quizCounter].population + " population greater or less than " + quiz[quizCounter+1].countryName + quiz[quizCounter+1].population;
    question.innerText=questionText;
    quizCounter ++
  }
  else{
    // var endGame = "End of the game"
    buttons = document.querySelectorAll("button")
    buttons.forEach(function(button){button.disabled = true})
    question.innerText = "End of the game. Your score was: " + score;
    document.querySelector("#score").style.visibility = "hidden"
  }
}

var moreClick = function(){
  // console.log("more")
  compareAnswer("more");
  generateQuestion()
}

var lessClick = function(){
  // console.log("less")
  compareAnswer("less");
  generateQuestion()
}

var compareAnswer = function(guess){

  var answer = quiz[quizCounter-1].population > quiz[quizCounter].population ? "more" : "less";

  if (guess === answer){
    score ++
  } else {
    console.log("you're bad and you should feel bad")
  }
  updateScore();
}

var updateScore = function(){
  var scoreDiv = document.querySelector("#score");
  scoreDiv.innerText = "Score : " + score;
}


var app = function(){
  var url = "http://localhost:5000";
  makeRequest(url, processData);

  var buttonMore = document.querySelector("#more");
  buttonMore.onclick = moreClick;

  var buttonLess = document.querySelector("#less");
  buttonLess.onclick = lessClick;

  // makeQuiz(countries);
  // var question = document.querySelector
}


window.onload = app;