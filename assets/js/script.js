const titleCardEl = document.getElementById("title-card");
const viewHighscoresEl = document.querySelector("a");
const instructionsEl = document.getElementById("card-instructions");
const startQuizEl = document.getElementById("start-quiz");
const questionCardEl = document.getElementById("question-card");
const buttonChoicesEl = document.getElementsByClassName("button-choices");
const allDoneCardEl = document.getElementById("all-done-card");
const submitEl = allDoneCardEl.querySelector("button");
const highscoresCardEl = document.getElementById("highscores-card");
const scoreListEl = document.getElementById("score-list");
const goBackEl = document.getElementById("go-back");
const clearHighscoresEl = document.getElementById("clear-highscores");
const correctOrWrongEl = document.getElementById("correct-or-wrong");
const timerEl = document.getElementById("timer");
const questionOneInfo = {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
};
const questionTwoInfo = {
    question: "The condition in an if / else statement is enclosed within ______.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "curly brackets"
};
const questionThreeInfo = {
    question: "Array in JavaScript can be used to store ______.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
};
const questionFourInfo = {
    question: "String values must be enclosed within ______ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
};
const questionFiveInfo = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console log"],
    answer: "console log"
};
let buttonCnt;
let score;
let userPickRightAnswer = true;
let viewHighscoresIsClicked = false;


populateTitleCard();


//------------BUTTON CLICK FUNCTIONS--------------------------------//
startQuizEl.addEventListener("click", function () {
    viewHighscoresIsClicked = false;
    setTimer();
    hideElement(titleCardEl);
    hideElement(startQuizEl);
    showElement(questionCardEl);
    populateQuestionCard(questionOneInfo);
    showElement(timerEl.querySelector("h2"));
});
viewHighscoresEl.addEventListener("click", function (event) {
    event.preventDefault();
    populateHighscoresCard();
    viewHighscoresIsClicked = true;
});
submitEl.addEventListener("click", function () {
    createScoreList();
    hideElement(allDoneCardEl);
    showElement(highscoresCardEl);
    populateHighscoresCard();
});
goBackEl.addEventListener("click", function () {
    populateTitleCard();
});
clearHighscoresEl.addEventListener("click", function () {
    localStorage.removeItem("playersInfo");
    scoreListEl.removeChild(scoreListEl.firstChild);
});
for (let i = 0; i < buttonChoicesEl.length; i++) {
    buttonChoicesEl[i].addEventListener("click", function () {
        if (buttonCnt === 0) {
            displayResult(buttonChoicesEl[i].textContent, questionOneInfo);
            populateQuestionCard(questionTwoInfo);
        }
        else if (buttonCnt === 1) {
            displayResult(buttonChoicesEl[i].textContent, questionTwoInfo);
            populateQuestionCard(questionThreeInfo);
        }
        else if (buttonCnt === 2) {
            displayResult(buttonChoicesEl[i].textContent, questionThreeInfo);
            populateQuestionCard(questionFourInfo);
        }
        else if (buttonCnt === 3) {
            displayResult(buttonChoicesEl[i].textContent, questionFourInfo);
            populateQuestionCard(questionFiveInfo);
        }
        else {
            displayResult(buttonChoicesEl[i].textContent, questionFiveInfo);
            populateAllDoneCard();
        }
        buttonCnt++;
    });
}
//--------POPULATE CARD FUNCTIONS-------------//
function populateTitleCard() {
    titleCardEl.querySelector("h1").textContent = "coding quiz challenge";
    viewHighscoresEl.textContent = "view highscores"
    instructionsEl.querySelector("p").textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by eight seconds."
    showElement(titleCardEl);
    showElement(startQuizEl);
    hideElement(questionCardEl)
    hideElement(allDoneCardEl);
    hideElement(highscoresCardEl);
    hideElement(correctOrWrongEl);
    hideElement(timerEl.querySelector("h2"));
    buttonCnt = 0;
    score = 0;
}
function populateQuestionCard(questionInfo) {
    questionCardEl.querySelector("h1").textContent = questionInfo.question
    buttonChoicesEl[0].textContent = `1. ${questionInfo.choices[0]}`;
    buttonChoicesEl[1].textContent = `2. ${questionInfo.choices[1]}`;
    buttonChoicesEl[2].textContent = `3. ${questionInfo.choices[2]}`;
    buttonChoicesEl[3].textContent = `4. ${questionInfo.choices[3]}`;
}
function populateAllDoneCard() {
    allDoneCardEl.querySelector("h1").textContent = "All done!"
    document.getElementById("your-score").textContent = `Your final score is ${score}`;
    allDoneCardEl.querySelector("label").textContent = "enter initials:";
    allDoneCardEl.querySelector("button").textContent = "submit";
    hideElement(questionCardEl);
    showElement(allDoneCardEl);
}
function populateHighscoresCard() {
    highscoresCardEl.querySelector("h1").textContent = "highscores";
    document.getElementById("go-back").textContent = "go back";
    document.getElementById("clear-highscores").textContent = "clear highscores";
    hideElement(titleCardEl);
    hideElement(questionCardEl);
    hideElement(allDoneCardEl);
    showElement(highscoresCardEl);
}
//--------------------------------------------------------------//

function setTimer() {
    const h2El = timerEl.querySelector("h2");
    let secondsLeft = 40;
    let timerInterval = setInterval(function () {
        h2El.textContent = `Timer: ${secondsLeft}`;
        if (userPickRightAnswer) { secondsLeft--; }
        else {
            secondsLeft -= 8;
            userPickRightAnswer = true;
        }
        if (secondsLeft < 0 || buttonCnt > 4) {
            h2El.textContent = "Timer: 0";
            clearInterval(timerInterval);
            populateAllDoneCard();
        }
        if (viewHighscoresIsClicked) {
            h2El.textContent = "Timer: 0";
            clearInterval(timerInterval);
        }
    }, 1000);
}
function displayResult(userChoice, questionInfo) {
    showElement(correctOrWrongEl);
    userChoice = userChoice.substring(3); //Gets rid of extra characters, Ex: (1. string => string)
    if (userChoice === questionInfo.answer) {
        correctOrWrongEl.querySelector("span").textContent = "correct!";
        score++;
    }
    else {
        correctOrWrongEl.querySelector("span").textContent = "wrong! -8 Seconds";
        userPickRightAnswer = false;
    }
    let secondsLeft = 1;
    let timerInterval = setInterval(function () {
        secondsLeft--;
        if (secondsLeft < 1) {
            clearInterval(timerInterval);
            hideElement(correctOrWrongEl);
        }
    }, 1000);
}
function createScoreList() {
    const playerName = allDoneCardEl.querySelector("input").value;
    let olEl;
    let liEl;
    let playersInfo = JSON.parse(localStorage.getItem("playersInfo"));
    if (playersInfo === null) {
        playersInfo = {
            names: [],
            scores: []
        };
    }
    playersInfo.names.push(playerName);
    playersInfo.scores.push(score);
    if (scoreListEl.hasChildNodes()) {
        olEl = scoreListEl.querySelector("ol");
        liEl = document.createElement("li");
        liEl.textContent = `${playerName} - ${score}`;
        olEl.appendChild(liEl);
    }
    else {
        olEl = document.createElement("ol");
        olEl.style.marginLeft = "19px";
        scoreListEl.appendChild(olEl);
        for (let i = 0; i < playersInfo.names.length; i++) {
            liEl = document.createElement("li");
            liEl.textContent = `${playersInfo.names[i]} - ${playersInfo.scores[i]}`;
            olEl.appendChild(liEl);
        }
    }
    localStorage.setItem("playersInfo", JSON.stringify(playersInfo));
    for (let i = 0; i < olEl.children.length; i++) {
        if (i % 2 === 0) { olEl.children[i].style.backgroundColor = "darkgrey"; }
        else { olEl.children[i].style.backgroundColor = "lightgrey"; }
    }
}
function showElement(element) { element.style.display = "block"; }
function hideElement(element) { element.style.display = "none"; }