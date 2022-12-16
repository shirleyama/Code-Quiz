
var currentQuestionIndex = 0;
var timeLeft = 100
var questionWrap = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choicesOutput = document.querySelector("#choices");
var startButton = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var endScreen = document.querySelector("#end-screen");
var giveFeedback = document.querySelector("#feedback");
var timer = document.querySelector("#time")
var score = 0
var finalScore = document.querySelector("#final-score");

function startQuiz() {
  var currentQuestion = questions[currentQuestionIndex];
  var choices = currentQuestion.choices;

  questionTitle.innerText = currentQuestion.title;

  choicesOutput.innerHTML = "";
  giveFeedback.classList.add("hide");

  for (var i = 0; i < choices.length; i++) {
    var choice = choices[i];
    console.log(choice);
    var isCorrect = currentQuestion.answer === choice;

    choicesOutput.insertAdjacentHTML(
      "beforeend",
      `<button data-correct=${isCorrect}>${choice}</button>`
    );
  }
  startScreen.classList.add("hide");
  questionWrap.classList.remove("hide");
  timer.textContent = timeLeft
}

function endQuiz(){
  questionWrap.classList.add("hide");
  giveFeedback.classList.add("hide");
  finalScore.textContent = score
  endScreen.classList.remove("hide");
}

function checkAnswer(event) {
  
  
  // console.log(header.getAttribute("data-color"));
  var answer = event.target.dataset.correct;
  console.log(answer);
  if (answer == 'true') {
    score = score + 10
    giveFeedback.textContent = 'Correct!'
    currentQuestionIndex = currentQuestionIndex + 1

    let hasKey = questions.hasOwnProperty(currentQuestionIndex); 
    if (hasKey) {
      startQuiz()
    } else {
      endQuiz()
    }
    
  }
  else {
    giveFeedback.textContent = 'Wrong!'
    timeLeft = timeLeft - 10
    timer.textContent = timeLeft 
    if ( timeLeft < 1) {
      endQuiz()
    }
  }
  giveFeedback.classList.remove("hide");
}

choicesOutput.addEventListener("click", checkAnswer);

//startQuiz();

startButton.addEventListener("click", startQuiz);
