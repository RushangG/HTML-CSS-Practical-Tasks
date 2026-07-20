

const sumButton = document.getElementById("sum");
const subButton = document.getElementById("sub");
const multiButton = document.getElementById("multi");
const divideButton = document.getElementById("divide");

const resultBox = document.getElementById("result-box");

resultBox.style.display = 'none';

let num1;
let num2;
let result;

async function sum() {

    if (!getInput()) {
        return;
    }



    result = parseFloat(num1) + parseFloat(num2);
    console.log(result)
    await showResult();
}

async function sub() {
    if (!getInput()) {
        return;
    }

    result = parseFloat(num1) - parseFloat(num2);
    console.log(result)
    await showResult();

}

async function multi() {
    if (!getInput()) {
        return;
    }

    result = parseFloat(num1) * parseFloat(num2);
    console.log(result)
    await showResult();

}

async function divide() {
    if (!getInput()) {
        return;
    }


    if (num2 == 0) {
        resultBox.style.display = 'none';

        alert("num2 must be valid number");

        return;
    }
    result = parseFloat(num1) / parseFloat(num2);
    console.log(result);
    await showResult();

}



async function showResult() {
    resultBox.style.display = 'inline-block';
    resultBox.innerHTML = `result : ${result}`;
}

function getInput() {
    num1 = document.getElementById("num1").value;
    num2 = document.getElementById("num2").value;


    if (num1 == '' || num2 == '') {
        resultBox.style.display = 'none';
        alert("Please Enter the number.");
        return 0;
    }

    return 1;
}

sumButton.addEventListener("click", () => sum());
subButton.addEventListener("click", () => sub());
multiButton.addEventListener("click", () => multi());
divideButton.addEventListener("click", () => divide());
