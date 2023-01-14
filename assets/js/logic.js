var currentQuestionIndex = 0;
var timeLeft = 100;
var questionWrap = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choicesOutput = document.querySelector("#choices");
var highScores = document.querySelector("#highscores");
var startButton = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var endScreen = document.querySelector("#end-screen");
var giveFeedback = document.querySelector("#feedback");
var timer = document.querySelector("#time");
var score = 0;
var finalScore = document.querySelector("#final-score");
var userInitials = document.getElementById("initials");
var audioCorrect = document.getElementById("audio-correct");
var audioInCorrect = document.getElementById("audio-incorrect");
var submitButton = document.querySelector("#submit");

function startQuiz() {
  var currentQuestion = questions[currentQuestionIndex];
  var choices = currentQuestion.choices;
  console.log("currentQuestion.choices : " + currentQuestion.choices); //writes the answer options

  questionTitle.innerText = currentQuestion.title;
  console.log("currentQuestion.title : " + currentQuestion.title);

  choicesOutput.innerHTML = "";
  giveFeedback.classList.add("hide");

  for (var i = 0; i < choices.length; i++) {
    var choice = choices[i];
    console.log("Choice: " + choice); //loops through and outputs choices
    var isCorrect = currentQuestion.answer === choice; //if answer chosen is equal to answer

    choicesOutput.insertAdjacentHTML(
      "beforeend",
      `<button data-correct=${isCorrect}>${choice}</button>`
    );
  }
  startScreen.classList.add("hide");
  questionWrap.classList.remove("hide");
  timer.textContent = timeLeft;
}

function endQuiz() {
  questionWrap.classList.add("hide");
  giveFeedback.classList.add("hide");

  if (score < 0) {
    //prevents score from going below zero
    score = 0;
  }

  finalScore.textContent = score;

  console.log(score); //writes the score
  endScreen.classList.remove("hide");
}

function checkAnswer(event) {
  // console.log(header.getAttribute("data-color"));
  var answer = event.target.dataset.correct;
  console.log("Answer: " + answer);
  if (answer == "true") {
    score = timeLeft;
    giveFeedback.textContent = "Correct!";
    currentQuestionIndex = currentQuestionIndex + 1;
    audioCorrect.play();

    // let hasKey = questions.hasOwnProperty(currentQuestionIndex);
    // console.log("is haskey", hasKey);
    if (currentQuestionIndex < questions.length) {
      startQuiz();
    } else {
      endQuiz();
    }
  } else {
    giveFeedback.textContent = "Wrong!"; //set timeout vs setinterval
    timeLeft = timeLeft - 10;
    timer.textContent = timeLeft;
    score = timeLeft;
    if (timeLeft == 0) {
      //timeLeft < 1
      endQuiz();
    }
    // audioInCorrect.play();
  }
  giveFeedback.classList.remove("hide");
}

choicesOutput.addEventListener("click", checkAnswer);

function saveScore() {
  console.log("score: ", score); //reads
  console.log("final score: ", score); //reads

  //initials: userInitials.value;

  var userData = {
    initials: userInitials.value,
    finalScore: finalScore.textContent,
  };

  localStorage.setItem("user_scores", JSON.stringify(userData)); // converts to string and stores to local storage
  console.log("userData from set should be an object: ", userData);
  //var userScores = JSON.parse(localStorage.getItem("user_scores"));

  console.log("highscores.innerHTML should be an object: ", highScores);

  location.href = "highscores.html";
}

submitButton.addEventListener("click", saveScore);
startButton.addEventListener("click", startQuiz);

var downloadTimer = setInterval(function () {
  // alert("test");
  if (timeLeft <= 0) {
    clearInterval(downloadTimer);
    endQuiz();
  }
  timer.innerHTML = timeLeft;
  timeLeft -= 1;
}, 1000);

submitButton.onclick = function () {
  //location.href = "highscores.html";
};
