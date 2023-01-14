var ol = document.querySelector("#highscores");

var userScores = JSON.parse(localStorage.getItem("user_scores"));
console.log(userScores);

// if (userScores) {
//   ol.insertAdjacentHTML(
//     "afterbegin",
//     `<li>${userScores.initials} - ${userScores.finalScore}</li>`
//   );
// }
if (userScores) {
  var li = document.createElement("li");
  li.innerText = userScores.initials + " - " + userScores.finalScore;
  ol.appendChild(li);
}

const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", clearScores);

function clearScores() {
  ol.innerHTML = "";
  localStorage.removeItem("user_scores");
}
