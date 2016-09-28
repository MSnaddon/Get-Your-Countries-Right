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
}

var quizCounter = 0;
var quiz = [{countryName: "afghanistan", population: 7},{countryName: "edinburgh", population: 8}]

var makeQuiz = function(countries){
  for (var i = 0; i < 5; i++){
    var countryObject = {
      countryName: countries[i].name,
      population: countries[i].population
    };
    quiz.push(countryObject);
  }
  console.log(quiz, " quiz so far")
}

var generateQuestion = function(){

  var questionText = "Is " + quiz[quizCounter].countryName +"'s population greater or less than " + quiz[quizCounter+1];
  var question=document.querySelector('#question');
  question.innerText=questionText;
    
  quizCounter ++
}

var moreClick = function(){
  // console.log("more")
  
  generateQuestion()
}

var lessClick = function(){
  // console.log("less")
  
  generateQuestion()
}



var app = function(){
  var url = "http://localhost:5000";
  makeRequest(url, processData);

  var buttonMore = document.querySelector("#more");
  buttonMore.onclick = moreClick;

  var buttonLess = document.querySelector("#less");
  buttonLess.onclick = lessClick;

  // var question = document.querySelector
}


window.onload = app;