const startButton = document.getElementById("start-button");
const inputTime = document.getElementById("input-time");
const message = document.getElementById("show-message");
let count = 0;
let timerId;

// start counter function
function startCounter() {

    startButton.innerText = "Start Again";
    startButton.style.backgroundColor = "#f8d76b";
    clearInterval(timerId);
    count = inputTime.value;

    //validation for input.
    if (count < 0 || count == "") {
        alert("Enter positive number >  0");
        message.style.display = "none";
        inputTime.focus();
        return;
    }

    displayCount();
    // console.log(count);

    timerId = setInterval(() => {
        console.log("count reduce", count);
        count--; // reduce count by 1;
        displayCount();
    }, 1000)


}

//display funcation 
function displayCount(text) {
    message.style.display = "block";
    if (count < 0) {
        clearInterval(timerId);
        message.innerHTML = `Time Out Again Start`;
        startButton.innerText = "Start";
        startButton.style.backgroundColor = "#d98a4d";
    }
    else {
        message.innerHTML = `Time out In <br> ${count} s`;
    }
}



startButton.addEventListener("click", startCounter);
