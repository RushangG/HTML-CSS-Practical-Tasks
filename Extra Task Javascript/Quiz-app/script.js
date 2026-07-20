// questions and answers for the quiz
const questions =
    [
        {
            question: "There is one method all classes should have, which one?",
            options: ["init()", "constructor()", "onerror()", "super()"],
            answer: "constructor()"
        },
        {
            question: "What keyword do we use when we create a class?",
            options: ["class", "object", "function", "constructor"],
            answer: "class"
        },
        {
            question: "What is a common method to display information in the debugger window?",
            options: ["debug.log()", "console.log()", "document.log()", "alert.log()"],
            answer: "console.log()"
        },
        {
            question: "What is a correct JavaScript keyword to stop the execution of JavaScript?",
            options: ["stop", "goto", "debugger", "return"],
            answer: "debugger"
        },
        {
            question: "Which keyboard key will normally activate debugging in your browser?",
            options: ["F2", "F5", "F12", "F10"],
            answer: "F12"
        },




    ];

// get elements from the DOM
const queNumber = document.getElementById("que-number");
const queText = document.getElementById("que-text");
const option1 = document.getElementById("option1-text");
const option2 = document.getElementById("option2-text");
const option3 = document.getElementById("option3-text");
const option4 = document.getElementById("option4-text");
const nextButton = document.getElementById("next-button");
const scoreBox = document.getElementById("score");
const message = document.getElementById("message");
const quizForm = document.getElementById("quiz-form");

// initialize score and question index
let score = 0;
let currentQues = 0;

// load the qestions and answers
async function loadQuestion(currentQues = 0) {

    // check the quiz is completed or not
    if (currentQues >= questions.length) {
        scoreBox.innerHTML = ``;
        queNumber.innerHTML = `Quiz Completed...`;
        queText.innerHTML = `Final Score: ${score}/${questions.length}`;
        quizForm.style.display = "none";
        message.innerHTML = "";
        nextButton.textContent = "Restart Quiz";
        return;
    }


    queNumber.innerHTML = `Question ${currentQues + 1} of ${questions.length}`;
    queText.innerHTML = `Q. ${currentQues + 1}. ${questions[currentQues].question}`;

    option1.innerHTML = questions[currentQues].options[0];
    option2.innerHTML = questions[currentQues].options[1];
    option3.innerHTML = questions[currentQues].options[2];
    option4.innerHTML = questions[currentQues].options[3];

    scoreBox.innerHTML = `Score: ${score}/${questions.length}`;
}

// check the answer   
async function checkAnswer() {
    event.preventDefault();

    // reset the quiz.
    if (currentQues >= questions.length) {
        currentQues = 0;
        score = 0;
        quizForm.style.display = "block";
        nextButton.textContent = "Submit Ans";
        message.innerHTML = "";
        await loadQuestion(currentQues);
        return;
    }

    // get the selected option
    const seletedOption = document.querySelector('input[name="option"]:checked');
    if (!seletedOption) {
        alert("Please select an option");
        return;
    }

    // get current ques answer.
    const answer = questions[currentQues].answer;
    // logic to check the answer
    if (seletedOption.nextElementSibling.innerHTML === answer) {
        score++;
        message.innerHTML = `You selected the correct answer for question ${currentQues + 1}.`;
        message.style.color = "green";


    }
    else {
        message.innerHTML = `You selected the wrong answer for question ${currentQues + 1}.`;
        message.style.color = "red";
    }



    setTimeout(() => {
        message.innerHTML = "";
    }, 1000)

    seletedOption.checked = false;

    currentQues++;

    await loadQuestion(currentQues);
}





document.addEventListener("DOMContentLoaded", () => loadQuestion(currentQues));

nextButton.addEventListener("click", checkAnswer);
