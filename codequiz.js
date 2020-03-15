var quizNumber = 0;
var answerOptionsUL = document.querySelector("#answer-options");
var codeQuizForm = document.querySelector("#code-quiz-form");
var resultPara = document.querySelector("#result");
var resultDiv = document.querySelector("#resultDiv");


var score = 0;
//var startQuizButton = null;

var stateMachine = {
    quizInitiated: false,
    displayingScore: false,
    quizIndex: 0,
    score: 0
}

const quizQuestionBank = [
    {
        quizIndex: 0,
        question: "Who invented JavaScript?",
        answers: [
            "a: Douglas Crockford",
            "b: Sheryl Sandberg",
            "c: Brendan Eich"
        ],
        correctAnswer: "c",
        correctIndex: 2
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
        correctIndex: 2
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
        correctIndex: 3
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

    startQuizButton.setAttribute("quiz-index", 0);
    li.appendChild(startQuizButton);
    answerOptionsUL.appendChild(li);
    stateMachine.quizInitiated = true;
}



answerOptionsUL.addEventListener("click", function (event) {
    //alert("answerOptionsUL.click");
    var eventSource = event.target;
    if (eventSource.matches("button")) {
        if (stateMachine.quizIndex == 0) {
            //alert("stateMachine.quizIndex: " + stateMachine.quizIndex);
            renderNextQuiz(stateMachine.quizIndex);
            stateMachine.quizIndex++;
        } else {
            //alert("stateMachine.quizIndex: " + stateMachine.quizIndex);
            // When stateMachine.quizIndex > 0, the event source is the answer button chosen by the user
            var answerInd = eventSource.getAttribute("answer-index");
            //alert("answerInd: " + answerInd);
            //alert("quizQuestionBank[stateMachine.quizIndex].correctIndex: " + quizQuestionBank[stateMachine.quizIndex].correctIndex);
            if (answerInd == quizQuestionBank[stateMachine.quizIndex].correctIndex) {
                displayAnswer(true);
            } else {
                displayAnswer(false);
            }
            // pause() var quizNo = eventSource.getAttribute("quiz-index");
            pause(400);
            renderNextQuiz(stateMachine.quizIndex);
            stateMachine.quizIndex++;
        }
    }
});

function displayAnswer(result) {
    resultDiv.style.display = "block";
    var answer = "Correct!!";
    if (!result) {
        answer = "Wrong!!";
    }
    //var hrElem = document.createElement("hr");
    //hrElem.classList.add("bold-gray");
    //resultDiv.prepend(hrElem);
    //alert("displayAnswer + answer: " + answer);

    resultPara.textContent = answer;
}

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

function renderNextQuiz(index) {

    //Display the separator only when you display the result of first quiz
    /*if (stateMachine.quizIndex > 0) {
        resultDiv.style.display = "block";
    }*/
    resultDiv.style.display = "none";
    var quiz = quizQuestionBank[index];
    var question = quiz.question;
    //alert("question: " + question);
    var answerOptions = quiz.answers;
    answerOptionsUL.textContent = question;
    for (var i = 0; i < answerOptions.length; i++) {
        var answerI = answerOptions[i];
        //alert("answerI: " + answerI);
        var li = document.createElement("li");
        var answerButton = document.createElement("button");
        answerButton.classList.add("btn", "btn-secondary", "btn-sm");
        answerButton.textContent = answerI;

        answerButton.setAttribute("answer-index", i);
        //answerButton.setAttribute("quiz-index", index);

        li.appendChild(answerButton);
        answerOptionsUL.appendChild(li);
    }
    //answerOptions.
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
    answerOptionsUL.appendChild(li);
}*/

/* We will listen to the click event on the entire answerOptions<UL> object instead.
codeQuizForm.addEventListener("submit", function (event) {
    //event.preventDefault();
    alert("codeQuizForm form submit");
    takeQuiz(event);
});


answerOptionsUL.addEventListener("click", function (event) {
    alert("answerOptionsUL.click");
    var eventSource = event.target;
    if (eventSource.matches("button")) {
        if(stateMachine.quizInitiated == false) {
            initiateQuiz();
        } else {
            var quizNo = eventSource.getAttribute("quiz-index");
            renderNextQuiz(quizIndex);
        }
    }
});*/

