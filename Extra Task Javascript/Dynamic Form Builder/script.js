
// variable declaration
const form = document.getElementById("dynamic-form");
const addButton = document.getElementById("add-button");
const inputBox = document.getElementById("fields-container");
const messageDiv = document.getElementById("message-div");
const submitButton = document.getElementById("submit-button");

const addToForm = document.getElementById("add-to-form");


const formBuilderBox = document.getElementById("form-builder");
const inputForm = document.getElementById("input-form");
const inputFieldForm = document.getElementById("input-field");

let i = 0;
let inputNumber = 0;

//submit dynamic form data.
function submitDynamicForm() {


    const formData = new FormData(form); // create a form data object of dynamic form
    console.log("Form Data:", formData);
    const data = {};
    //conver form object to json object
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    console.log("Form Data:", data);
    form.reset(); // reset the form after submission

    localStorage.setItem("formData", JSON.stringify(data));
    console.log("Form Data:", data);



    confirm("Form Submitted Successfully");
}


// get total number of input using prompt 
function getNumberOfInput() {

    inputBox.innerHTML = "";
    i = 0;
    formBuilderBox.style.display = "none";
    inputForm.style.display = "none";


    inputNumber = prompt("Enter total number of Fields In form : ", "3");

    showFormBuilder(inputNumber);

    console.log(inputNumber);




}


//show Builder form.
function showFormBuilder(inputNumber) {

    if (inputNumber <= 0) {
        alert("Enter positive number");
        return;
    }



    i++;
    if (i > inputNumber) {
        formBuilderBox.style.display = "none";

    }
    else {
        formBuilderBox.style.display = "inline-block";

        messageDiv.innerHTML = `Enter detail of ${i}/${inputNumber} input field: `;
        messageDiv.style.fontSize = "20px";
        messageDiv.style.fontWeight = "bold";
    }

}

// get field input 
function formBuilder() {


    const labelName = document.getElementById("label-name").value;
    const placeholderText = document.getElementById("placeholder-text").value;
    const inputType = document.getElementById("input-type").value;

    if (labelName == '' || placeholderText == '' || inputType == '') {

        return;
    }

    inputForm.style.display = "inline-block";

    console.log(labelName, placeholderText, inputType);



    createInputFields(labelName, placeholderText, inputType);

    document.getElementById("label-name").value = "";
    document.getElementById("placeholder-text").value = "";
    document.getElementById("input-type").value = "text";
}




// switch case base on type.
function createInputFields(labelName, placeholderText, inputType) {


    switch (inputType) {

        case "text":
        case "number":
        case "password":
        case "color":
        case "date":
        case "datetime-local":
        case "email":
        case "month":
        case "time":
        case "url":
        case "week":
        case "checkbox":
        case "radio":
            console.log(`case : ${inputType}`);
            getInputType(labelName, placeholderText, inputType);
            break;
        case "textarea":
            console.log("text area case");
            createTextArea(labelName, placeholderText, inputType);
            break;
        default:
            console.log("no match");
            break;
    }
}


// crete input field based on type.
function getInputType(labelName, placeholderText, inputType) {

    // let inputType = prompt("Enter input type", "text");


    let inputlabel = document.createElement("label");
    inputlabel.setAttribute("for", `${labelName}`);
    inputlabel.textContent = ` ${labelName} `;

    let inputText = document.createElement("input");
    inputText.setAttribute("type", `${inputType}`);
    inputText.setAttribute("name", `${labelName}`);
    inputText.setAttribute("placeholder", ` ${placeholderText} `);
    inputText.setAttribute("required", "required");

    inputBox.appendChild(document.createElement("br"));
    if (inputType === "checkbox" || inputType === "radio") {
        inputBox.appendChild(inputText);
        inputBox.appendChild(inputlabel);
    } else {
        inputBox.appendChild(inputlabel);
        inputBox.appendChild(inputText);
    }

    inputBox.appendChild(document.createElement("br"));

    showFormBuilder(inputNumber);

}

// create text area field.
function createTextArea(labelName, placeholderText, inputType) {
    let inputlabel = document.createElement("label");
    inputlabel.setAttribute("for", `${labelName}`);
    inputlabel.textContent = ` ${labelName} `;

    let inputText = document.createElement("textarea");
    inputText.setAttribute("name", `${labelName}`);
    inputText.setAttribute("placeholder", ` ${placeholderText} `);
    inputText.setAttribute("required", "required");

    inputBox.appendChild(document.createElement("br"));
    inputBox.appendChild(inputlabel);
    inputBox.appendChild(inputText);
    inputBox.appendChild(document.createElement("br"));

    showFormBuilder(inputNumber);
}


addButton.addEventListener("click", getNumberOfInput);


form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitDynamicForm();

})

inputFieldForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formBuilder();
})

window.addEventListener("beforeunload", function (e) {

    e.preventDefault();

});