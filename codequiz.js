var btnStartQuiz = document.querySelector("#btn-start-quiz");
var openingPage = document.querySelector("#opening-page");
var quizPage = document.querySelector("#quiz-page");
var quizQuestionUL = document.querySelector("#quiz-question");
var closingPage = document.querySelector("#closing-page");
var showScore = document.querySelector("#score");
var codeQuizForm = document.querySelector("#code-quiz-form");
var resultPara = document.querySelector("#result");
var resultDiv = document.querySelector("#resultDiv");
var resetButtonPanel = document.querySelector("#reset-button-panel");
var btnSubmitName = document.querySelector("#btn-submit-name");
var txtUserName = document.querySelector("#txt-user-name");

var viewFinalScorePanel = document.querySelector("#view-final-score");

var viewNamePanel = document.querySelector("#view-name");
var showUserName = document.querySelector("#show-name");
var inputNamePanel = document.querySelector("#input-name");

var btnGoBack = document.querySelector("#go-back");
var btnClearScore = document.querySelector("#clear-score");
var timer = document.querySelector("#timer");


var score = 0;

// quizQuestionBank is the JSON object that holds all the questions, the options and the correct answer.  
var quizQuestionBank = [
    {
        quizIndex: 0,
        question: "Who invented JavaScript?",
        answers: [
            "a: Douglas Crockford",
            "b: Sheryl Sandberg",
            "c: Brendan Eich"
        ],
        correctAnswer: "c",
        correctIndex: 2,
        score: 0
    },
    {
        quizIndex: 1,
        question: "Which one of these is a JavaScript package manager?",
        answers: [
            "a: Node.js",
            "b: TypeScript",
            "c: npm"
        ],
        correctAnswer: "c",
        correctIndex: 2,
        score: 0
    },
    {
        quizIndex: 2,
        question: "Which tool can you use to ensure code quality?",
        answers: [
            "a: Angular",
            "b: jQuery",
            "c: RequireJS",
            "d: ESLint"
        ],
        correctAnswer: "d",
        correctIndex: 3,
        score: 0
    },
    {
        quizIndex: 3,
        question: "Which tool can you use as a code repository?",
        answers: [
            "a: GitHub",
            "b: Confluence",
            "c: JIRA"
        ],
        correctAnswer: "a",
        correctIndex: 0,
        score: 0
    }
];

var seconds = 0;
var x = "";
var quizTimeSt = 25;

btnStartQuiz.addEventListener("click", function (event) {
    openingPage.style.display = "none";
    quizPage.style.display = "block";
    seconds = 0;
    x = "";
    renderNextQuiz(0);
    x = setInterval(function () {
        runQuizTimer(quizTimeSt);
    }, 1000);
});

function runQuizTimer(quizTime) {
    // Update the count down every 1 second
    // Get today's date and time
    //var quizTime = new Date().getTime();
    var timeRemaining = quizTime - seconds;
    seconds += 1;

    timer.textContent = timeRemaining;

    // If the count down is over, Notify
    if (timeRemaining <= 0) {
        clearInterval(x);
        timer.textContent = "EXPIRED";
        renderResultsPage();
    }
}

// The caller of this function first works out the index of the quiz @ quizQuestionUL.getAttribute("quiz-index", quizIndex);
function renderNextQuiz(quizIndex) {
    //alert("quizIndex: " + parseInt(quizIndex));
    resultDiv.style.display = "none";
    var quiz = quizQuestionBank[parseInt(quizIndex)];
    var question = quiz.question;
    //alert("question: " + question);
    var answerOptions = quiz.answers;
    quizQuestionUL.textContent = question;
    quizQuestionUL.setAttribute("quiz-index", quizIndex);
    for (var i = 0; i < answerOptions.length; i++) {
        var answerI = answerOptions[i];
        //alert("answerI: " + answerI);
        var liOptions = document.createElement("li");
        var answerButton = document.createElement("button");
        answerButton.classList.add("btn", "btn-secondary", "btn-sm");
        answerButton.textContent = answerI;

        answerButton.setAttribute("answer-index", i);
        answerButton.setAttribute("quiz-index", quizIndex);

        liOptions.appendChild(answerButton);
        quizQuestionUL.appendChild(liOptions);
    }
}

// Uses event delegation to button object -- that way all the buttons need not be listening to the click event
quizQuestionUL.addEventListener("click", function (event) {
    var eventSource = event.target;
    if (eventSource.matches("button")) {
        var currentQuizInd = parseInt(eventSource.getAttribute("quiz-index"));
        var userAnswerInd = parseInt(eventSource.getAttribute("answer-index"));
        if (currentQuizInd < quizQuestionBank.length) {
            var answeredCorrectly = false;
            if (userAnswerInd == quizQuestionBank[currentQuizInd].correctIndex) {
                answeredCorrectly = true;
                // The below tactic ensures multiple clicks on the button does not yield more score
                quizQuestionBank[currentQuizInd].score = 1;
            } else {
                quizQuestionBank[currentQuizInd].score = 0;
            }
            displayAnswer(answeredCorrectly);
            // Call renderNextQuiz function until you reach the last question which is quizQuestionBank.length - 1 
            if ((currentQuizInd < quizQuestionBank.length - 1)) {
                setTimeout(function () {
                    renderNextQuiz(currentQuizInd + 1);
                }, 1500);
            } else {
                setTimeout(renderResultsPage, 1500);
            }
        }
        //}
    }
});

// Shows the results panel and displays whether the user has clicked correct answer
function displayAnswer(result) {
    resultDiv.style.display = "block";
    var answer = "Correct!!";
    if (!result) {
        answer = "Wrong!!";
        // Reduce the time by 10 seconds when the answer is wrong
        seconds += 10;
    }
    resultPara.textContent = answer;
}

// Hides quiz panel and displays results panel.
// Calculates the final score and displays it
function renderResultsPage() {
    quizPage.style.display = "none";
    resultDiv.style.display = "none";
    resetButtonPanel.style.display = "none";
    viewFinalScorePanel.style.display = "block";
    if (inputNamePanel.style.display == "none") {
        inputNamePanel.style.display = "block";
    }
    closingPage.style.display = "block";
    calculateScore();
    showScore.textContent = score;
}

// calculates the score by iterating through the array of quizbank
function calculateScore() {
    //reset hte score
    score = 0;
    for (var i = 0; i < quizQuestionBank.length; i++) {
        score += quizQuestionBank[i].score;
    }
}

// Listens to button click event to submit user name entered in the input field
btnSubmitName.addEventListener("click", function (event) {
    submitInputName();
});

// Listens to key enter event to submit user name entered in the input field
/*txtUserName.addEventListener("keyenter", function (event) {
    submitInputName();
});*/

// Submits the input name and displays the final scores against the name provided
function submitInputName() {
    var userName = txtUserName.value;
    //alert("userName: " + userName);
    viewFinalScorePanel.style.display = "none";
    inputNamePanel.style.display = "none";
    viewNamePanel.style.display = "block";
    showUserName.textContent = userName + " final score is: " + score;
    resetButtonPanel.style.display = "block";
}

// Clear the score marked against each question and also clear the total score
function clearHighScores() {
    score = 0;
    for (var i = 0; i < quizQuestionBank.length; i++) {
        quizQuestionBank[i].score = 0;
    }
    showUserName.textContent = "";
    txtUserName.value = "";
}

btnGoBack.addEventListener("click", function (event) {
    clearHighScores();
    viewNamePanel.style.display = "none";
    closingPage.style.display = "none";
    openingPage.style.display = "block";

});

//Clears the scores and removes the final score panel
btnClearScore.addEventListener("click", function (event) {
    clearHighScores();
    viewNamePanel.style.display = "none";
});


