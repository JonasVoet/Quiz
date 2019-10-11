// Vælger alle elementerne
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// Spørgsmål Array
let questions = [
    {
        question: "What does HTML stand for?",
        imgSrc: "assets/images/html.png",
        choiceA: "HyperText Markup Language",
        choiceB: "Hyper Tool Markup Lanuage",
        choiceC: "Hightlight Text Markup Language",
        correct: "A"
    },

    {
        question: "What does CSS stand for?",
        imgSrc: "assets/images/css.png",
        choiceA: "Calculate Style Sheets",
        choiceB: "Cascading Style Sheets",
        choiceC: "Color Style Sheets",
        correct: "B"
    },

    {
        question: "What does JS stand for?",
        imgSrc: "assets/images/js.png",
        choiceA: "JavaStyles",
        choiceB: "Just Saying",
        choiceC: "Javascript",
        correct: "C"
    },

    {
        question: "Choose the correct HTML element for the largest heading",
        imgSrc: "assets/images/html.png",
        choiceA: "h6",
        choiceB: "h2",
        choiceC: "h1",
        correct: "C"
    },

    {
        question: "Which property is used to change the background color?",
        imgSrc: "assets/images/css.png",
        choiceA: "color",
        choiceB: "background-color",
        choiceC: "bgcolor",
        correct: "B"
    },

    {
        question: "Javascript is the same as Java",
        imgSrc: "assets/images/js.png",
        choiceA: "True",
        choiceB: "False",
        choiceC: "Of course",
        correct: "B"
    },

    {
        question: "What does UX stand for?",
        imgSrc: "assets/images/ux.png",
        choiceA: "User experience",
        choiceB: "Username Axe",
        choiceC: "Understand experince",
        correct: "A"
    },

    {
        question: "What does UI stand for?",
        imgSrc: "assets/images/ui.png",
        choiceA: "User Internet",
        choiceB: "User Intelligence",
        choiceC: "User Interface",
        correct: "C"
    },

    {
        question: "How do you change text color?",
        imgSrc: "assets/images/css.png",
        choiceA: "text-color",
        choiceB: "color",
        choiceC: "tcolor",
        correct: "B"
    },

    {
        question: "How do you declare a JavaScript variable?",
        imgSrc: "assets/images/js.png",
        choiceA: "v firstName",
        choiceB: "varable firstName",
        choiceC: "var firstName",
        correct: "C"
    }
];

// Variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

// Eventlistener til at håndtere klik function til knappen 'StartQuiz'
start.addEventListener("click", startQuiz);

// start quizzen
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms altså = 1s
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render
function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer om svaret er rigtigt eller forkert
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // Svaret er korrekt
        score++;
        // ændre progress baren til farven grøn
        answerIsCorrect();
    } else {
        // Svaret er forkert
        // ændre progress baren til farven rød
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // Slut quiz og vis scoren
        clearInterval(TIMER);
        scoreRender();
    }
}

// Svaret er korrekt
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// Svaret er forkert
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // Regner hvor mange rigtige svar brugeren har i procent
    const scorePerCent = Math.round(100 * score / questions.length);

    // viser img baseret på scorePerCent
    let img = (scorePerCent >= 80) ? "assets/images/5.png" :
        (scorePerCent >= 60) ? "assets/images/4.png" :
            (scorePerCent >= 40) ? "assets/images/3.png" :
                (scorePerCent >= 20) ? "assets/images/2.png" :
                    "assets/images/1.png";


    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
    // scoreDiv.innerHTML = "<button class='btn' onClick='refreshPage()'>Start again</button>";

}



// function refreshPage() {
//     window.location.reload();
// } 