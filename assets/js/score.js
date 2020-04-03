$(document).ready(function () {
    console.log("hello");
    var restartBtn = document.querySelector("button.restartBtn");
    var clearBtn = document.querySelector("button.clearBtn");
    // get the highScores list and turn it back into an object
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    var scoreList = document.getElementById("score-list");

    // sort scores from high to low
    highScores.sort(function (a, b) {
        return b.score - a.score
    })
    console.log(highScores);
    // display the scores
    for (var s = 0; s < highScores.length; s++) {
        var newLi = document.createElement("li")
        newLi.textContent = "Name:  " + highScores[s].name + "," + "  score: " + highScores[s].score + "," + "  time:  " + highScores[s].time

        scoreList.appendChild(newLi)
    }

    // click handlers for restart and clearing scoreboard
    clearBtn.addEventListener("click", function () {
        localStorage.clear();
    });
    restartBtn.addEventListener("click", function () {
        history.back();
    });
})
