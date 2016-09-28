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




var app = function(){
  var url = "https://restcountries.eu/rest/v1";
  makeRequest(url, processData);
}




window.onload = app;