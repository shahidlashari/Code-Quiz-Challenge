var startBtn = document.getElementById("startBtn");
var submitBtn = document.querySelector("button.submitBtn")
var secondsLeft = (questions.length * 12.5 + 1);
var timerEl = document.getElementById("timer");
var submitScoreEl = document.querySelector("#submit-score");
var userScoreEl = document.getElementById("user-score");
var userNameInput;
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");
var quizScore = 0;
var timeScore = 0;
var questionNumber = -1;
var answer;


function startTimer() {
    // swap welcome msg w/ questions
    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');
    // timer set and begins 75s countdown
    setTimer();
    // create questions to display
    renderQuestions();
}

function setTimer() {

    var countdown = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || questionNumber === questions.length) {
            timeScore = secondsLeft;
            secondsLeft = 0;
            clearInterval(countdown);
            setTimeout(displayScore, 500);

        }
    }, 1000);
}

function renderQuestions() {
    questionNumber++;
    if (questions[questionNumber]) {
        answer = questions[questionNumber].answer

        questionHead.textContent = questions[questionNumber].title;
        answerChoices.innerHTML = "";

        var choices = questions[questionNumber].choices;

        for (var q = 0; q < choices.length; q++) {
            var nextChoice = document.createElement("button");

            nextChoice.textContent = choices[q]
            answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-block");
        }
    } else {
        return;
    }
}

// display option to enter name to scoreboard
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreEl.textContent = `Time score is ${timeScore}`;
    
}
submitBtn.addEventListener("click", function () {
    window.history.forward();
});
// Event Listeners for Main Buttons
startBtn.addEventListener("click", startTimer);
submitBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    
});

function addScore() {
    userNameInput = document.getElementById("userName").value

    // create a new object with name and score keys
    var newScore = {
        name: userNameInput,
        score: quizScore,
        time: timeScore,

    };
    console.log(newScore);
    // check if there are scores in local storage first(get it)
    //if not, make a new/blank array
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    console.log(highScores);
    // push object into score array
    highScores.push(newScore);
    console.log(highScores);
    // turn objects into an array of strings then put it into local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

}

function hideFeedback() {
    var pEl = document.getElementsByClassName("feedback")[0]
    pEl.style.display = 'none'
}

function showFeedback() {
    var pEl = document.getElementsByClassName("feedback")[0]
    pEl.removeAttribute('style');
}

answerChoices.addEventListener("click", function (event) {
    var pEl = document.getElementsByClassName("feedback")[0]

    // evaluation of user's answer choices & feedback
    if (answer === event.target.textContent) {
        pEl.innerHTML = "Correct!";
        setTimeout(hideFeedback, 1000);
        quizScore++;
        showFeedback();
    } else {
        pEl.innerHTML = "Sorry, that's incorrect.";
        setTimeout(hideFeedback, 1000);
        secondsLeft = secondsLeft - 10;
        showFeedback();
    }
    renderQuestions();
});