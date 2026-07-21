
let randomNumber, attempts = 0;
const InputNum = document.getElementById("number-input");
const submitButton = document.getElementById("submit-button");
const attemptScore = document.getElementById("attempts");
const correctMessage = document.getElementById("correct-number");
const hintMessage = document.getElementById("message");

// range 1 to 100;
function getrandomNumber() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log(randomNumber);
}

//check the number 
async function checkNumber() {

    // if correct guees reset game.
    if (submitButton.innerText == "Again play") {
        resetGame();
        return;
    }

    // get input and validate
    const number = InputNum.value;
    if (number == "") {
        alert("Enter number");
        InputNum.focus();
        return;
    }



    InputNum.value = "";
    console.log(number);

    await attemptsCount();
    let diffrence = (randomNumber - number);

    diffrence = diffrence < 0 ? -1 * diffrence : diffrence;

    // check the number with random number
    if (number == randomNumber) {
        console.log("match");
        InputNum.value = number;
        correctMessage.innerHTML = `correct number : ${randomNumber} Congratulations!`;
        submitButton.innerText = "Again play";
        hintMessage.innerHTML = `Perfect Guess...`;

    }
    else if (diffrence <= 10) {
        hintMessage.innerHTML = `Near to correct Guess...`;
    }
    else if (number < randomNumber) {
        hintMessage.innerHTML = `Too Low to correct Guess...`;
        console.log("notmatch < random")
    }
    else {
        hintMessage.innerHTML = `Too High to correct Guess...`;
        console.log("notmatch > random")
    }

}

//reset the game
async function resetGame() {
    getrandomNumber();
    submitButton.innerText = "Submit Guess";
    hintMessage.innerHTML = "";
    InputNum.value = "";
    correctMessage.innerHTML = `correct number = ?`;
    attemptScore.innerHTML = "";
    attempts = 0;
    return;

}

// update the attempts count
async function attemptsCount() {
    attempts++;
    attemptScore.innerHTML = `Attempt : ${attempts}.`;

}

//dom loaded.
document.addEventListener("DOMContentLoaded", getrandomNumber);
submitButton.addEventListener("click", checkNumber);