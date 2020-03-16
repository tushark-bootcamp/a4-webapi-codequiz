var quizQuestionUL = document.querySelector("#quiz-question");
var codeQuizForm = document.querySelector("#code-quiz-form");
var resultPara = document.querySelector("#result");
var resultDiv = document.querySelector("#resultDiv");
//var lastQuestionAnswered

var score = 0;
//var startQuizButton = null;

var stateMachine = {
    quizInitiated: false,
    displayingScore: false,
    quizIndex: 0
}

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
    }
];

initiateQuiz();

// This function initiates the start of taking quiz. Adds start quiz button with an action listener
function initiateQuiz() {
    var li = document.createElement("li");
    //li.textContent = todo;

    var startQuizButton = document.createElement("button");
    startQuizButton.classList.add("btn", "btn-secondary", "btn-sm");
    startQuizButton.textContent = "Start Quiz";

    //startQuizButton.setAttribute("quiz-index", 0);
    startQuizButton.setAttribute("id", "start-quiz");
    li.appendChild(startQuizButton);
    quizQuestionUL.appendChild(li);
    stateMachine.quizInitiated = true;
}

quizQuestionUL.addEventListener("click", function (event) {
    //alert("quizQuestionUL.click");
    var eventSource = event.target;
    if (eventSource.matches("button")) {
        //alert("stateMachine.quizIndex: " + stateMachine.quizIndex);
        if (eventSource.getAttribute("id") == "start-quiz") {
            renderNextQuiz(0);
        } else if (eventSource.getAttribute("id") == "quiz-question") {
            var quizInd = eventSource.getAttribute("quiz-index");
            var userAnswerInd = eventSource.getAttribute("answer-index");
            if (quizInd < quizQuestionBank.length - 1) {
                var answeredCorrectly = false;
                if (userAnswerInd == quizQuestionBank[quizBankInd].correctIndex) {
                    answeredCorrectly = true;
                }
                displayAnswer(answeredCorrectly, quizBankInd);
                if ((stateMachine.quizIndex < quizQuestionBank.length)) {
                    setTimeout(renderNextQuiz, 1500);
                }

            }
        }
        if (stateMachine.quizIndex == 0) {
            //alert("stateMachine.quizIndex: " + stateMachine.quizIndex);
            renderNextQuiz();
        } else if (stateMachine.quizIndex <= quizQuestionBank.length) {
            //alert("stateMachine.quizIndex: " + stateMachine.quizIndex);
            // When stateMachine.quizIndex > 0, the event source is the answer button chosen by the user
            var userAnswerInd = eventSource.getAttribute("answer-index");
            //alert("answerInd: " + answerInd);
            //alert("quizQuestionBank[stateMachine.quizIndex].correctIndex: " + quizQuestionBank[stateMachine.quizIndex].correctIndex);
            var quizBankInd = 0;
            if (stateMachine.quizIndex == quizQuestionBank.length) {
                quizBankInd = quizQuestionBank.length - 1;
            } else {
                quizBankInd = stateMachine.quizIndex;
            }
            var answeredCorrectly = false;
            if (userAnswerInd == quizQuestionBank[quizBankInd].correctIndex) {
                answeredCorrectly = true;
            }
            displayAnswer(answeredCorrectly, quizBankInd);
            if ((stateMachine.quizIndex < quizQuestionBank.length)) {
                setTimeout(renderNextQuiz, 1500);
            }
        } else {
            alert("All questions answered");
        }
    }
});

function renderNextQuiz(quizIndex) {
    //var index = stateMachine.quizIndex;
    //alert("stateMachine.quizIndex: " + stateMachine.quizIndex);
    resultDiv.style.display = "none";
    var quiz = quizQuestionBank[quizIndex];
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
    // Only increment quizIndex until it reaches the length - 1 of the Array of quizbank
    if (stateMachine.quizIndex < quizQuestionBank.length) {
        stateMachine.quizIndex++;
    }
}

function renderNextQuiz(quizInd) {
    //var index = stateMachine.quizIndex;
    //alert("stateMachine.quizIndex: " + stateMachine.quizIndex);
    resultDiv.style.display = "none";
    var quiz = quizQuestionBank[stateMachine.quizIndex];
    var question = quiz.question;
    //alert("question: " + question);
    var answerOptions = quiz.answers;
    quizQuestionUL.textContent = question;
    quizQuestionUL.setAttribute("quiz-index", quiz.quizIndex);
    for (var i = 0; i < answerOptions.length; i++) {
        var answerI = answerOptions[i];
        //alert("answerI: " + answerI);
        var liOptions = document.createElement("li");
        var answerButton = document.createElement("button");
        answerButton.classList.add("btn", "btn-secondary", "btn-sm");
        answerButton.textContent = answerI;

        answerButton.setAttribute("answer-index", i);
        //answerButton.setAttribute("quiz-index", index);

        liOptions.appendChild(answerButton);
        quizQuestionUL.appendChild(liOptions);
    }
    // Only increment quizIndex until it reaches the length - 1 of the Array of quizbank
    if (stateMachine.quizIndex < quizQuestionBank.length) {
        stateMachine.quizIndex++;
    }
}




function displayAnswer(result, quizBankInd) {
    resultDiv.style.display = "block";
    var answer = "Correct!!";
    if (!result) {
        answer = "Wrong!!";
    } else {
        quizQuestionBank[quizBankInd].score = 1;
    }
    resultPara.textContent = answer;
}

function displayResult() {

}



/*function startQuiz(quizIndex) {
    var eventSource = event.target;
    if (eventSource.matches("button")) {
        var quizNo = eventSource.getAttribute("quiz-index");
        alert("quizNo: " + quizNo);
        renderQuiz(quizIndex);
    }
}*/

/*renderQuizAnswer(answer) {
    var li = document.createElement("li");
    li.textContent = answer;
    quizQuestion.appendChild(li);
}*/

/* We will listen to the click event on the entire answerOptions<UL> object instead.
codeQuizForm.addEventListener("submit", function (event) {
    //event.preventDefault();
    alert("codeQuizForm form submit");
    takeQuiz(event);
});


quizQuestionUL.addEventListener("click", function (event) {
    alert("quizQuestionUL.click");
    var eventSource = event.target;
    if (eventSource.matches("button")) {
        if(stateMachine.quizInitiated == false) {
            initiateQuiz();
        } else {
            var quizNo = eventSource.getAttribute("quiz-index");
            renderNextQuiz(quizIndex);
        }
    }
});

function pause(ms) {
    var snapshot = new Date().getMilliseconds();
    var now = new Date().getMilliseconds();
    //alert("now: " + now);
    //alert("snapshot: " + snapshot);
    var shouldPause = ((now - snapshot) > ms);
    //alert("shouldPause: " + shouldPause);
    while (!shouldPause) {
        now = new Date().getMilliseconds();
        shouldPause = ((now - snapshot) > ms);
        alert("inner now: " + now);
        alert("inner snapshot: " + snapshot);
        alert("inner shouldPause: " + shouldPause);
        continue;
    }
}

*/

