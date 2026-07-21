
// name validation function
async function validateName() {

    const nameInput = document.getElementById('f-name');
    const name = nameInput.value.trim();
    const regex = /^[A-Za-z\s]+$/; //name should contain only letters and spaces
    const errorName = document.getElementById('error-name');


    if (name.length === 0) {

        errorName.textContent = 'Name is required';
        errorName.style.color = 'red';
    }
    else if (name.length < 3) {

        errorName.textContent = 'Name must be at least 3 characters long';
        errorName.style.color = 'red';


    } else if (!regex.test(name)) {

        errorName.textContent = 'Name can only contain letters and spaces';
        errorName.style.color = 'red';
    }
    else if (name.length >= 3 && regex.test(name)) {

        errorName.textContent = 'Valid name';
        errorName.style.color = 'green';
    }
    else {
        errorName.textContent = '';
    }

    validateForm(); //call validateFrom function


}

// email validation function
async function validateEmail() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; //Must be in a valid email format (e.g., user@example.com).

    const errorEmail = document.getElementById('error-email');

    if (!regex.test(email) && email.length > 0) {
        errorEmail.textContent = 'Please enter a valid email address (e.g., user123@example.com)';
        errorEmail.style.color = 'red';
    } else if (regex.test(email) && email.length > 0) {
        errorEmail.textContent = 'Valid email format';
        errorEmail.style.color = 'green';
    }
    else {
        errorEmail.textContent = 'Email is required';
        errorEmail.style.color = 'red';
    }

    validateForm(); //call validateFrom function


}

// password validation function
async function validatePassword() {
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value.trim();
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
    const errorPassword = document.getElementById('error-password');

    if (!regex.test(password) && password.length > 0) {
        errorPassword.textContent = '8+ chars: A-Z, a-z, 0-9, symbol.';
        errorPassword.style.color = 'red';
    } else if (regex.test(password) && password.length > 0) {
        errorPassword.textContent = 'Valid password format';
        errorPassword.style.color = 'green';
    } else {
        errorPassword.textContent = 'Password is required';
        errorPassword.style.color = 'red';
    }
    validateForm(); //call validateFrom function
}

// confirm password validation function
async function validateConfirmPassword() {

    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    const errorConfirmPassword = document.getElementById('error-confirm-password');

    if (confirmPassword !== password && confirmPassword.length > 0) {

        errorConfirmPassword.textContent = 'Passwords do not match';
        errorConfirmPassword.style.color = 'red';
    } else if (confirmPassword === password && confirmPassword.length > 0) {
        errorConfirmPassword.textContent = 'Passwords match';
        errorConfirmPassword.style.color = 'green';
    } else {
        errorConfirmPassword.textContent = 'Please confirm your password';
        errorConfirmPassword.style.color = 'red';
    }
    validateForm(); //call validateFrom function

}

// form validation function
async function validateForm() {

    const errorName = document.getElementById('error-name').textContent;
    const errorEmail = document.getElementById('error-email').textContent;
    const errorPassword = document.getElementById('error-password').textContent;
    const errorConfirmPassword = document.getElementById('error-confirm-password').textContent;

    const nameInput = document.getElementById('f-name').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const confirmPasswordInput = document.getElementById('confirm-password').value.trim();
    const messageDiv = document.getElementById('message');
    const registerButton = document.getElementById('register-button');
    if (nameInput !== '' && emailInput !== '' && passwordInput !== '' && confirmPasswordInput !== '' &&
        errorName === 'Valid name' && errorEmail === 'Valid email format' && errorPassword === 'Valid password format' && errorConfirmPassword === 'Passwords match') {


        registerButton.disabled = false;
        registerButton.classList.add('active');

        messageDiv.textContent = ''; // Clear any previous message

    } else {
        registerButton.disabled = true;
        registerButton.classList.remove('active');

        // Display failure message

        messageDiv.textContent = 'Please Fill All Valid Details';
        messageDiv.style.color = 'red';




    }
}

async function registerUser() {

    const nameInput = document.getElementById('f-name').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const confirmPasswordInput = document.getElementById('confirm-password').value.trim();

    if (nameInput === '' || emailInput === '' || passwordInput === '' || confirmPasswordInput === '') {
        return;
    }

    const user = {
        name: nameInput,
        email: emailInput,
        password: passwordInput
    };

    localStorage.setItem('user', JSON.stringify(user));



    const messageDiv = document.getElementById('message');
    messageDiv.textContent = 'Registration successful!';
    messageDiv.style.color = 'green';
    // Display success message
    setTimeout(() => {
        messageDiv.textContent = '';
    }, 2000); // Clear the message after 2 seconds

}

async function resetForm() {
    document.getElementById('f-name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirm-password').value = '';
    document.getElementById('error-name').textContent = '';
    document.getElementById('error-email').textContent = '';
    document.getElementById('error-password').textContent = '';
    document.getElementById('error-confirm-password').textContent = '';

    document.getElementById('register-button').disabled = true;
    document.getElementById('register-button').classList.remove('active');

}


document.getElementById('f-name').addEventListener('input', validateName);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('confirm-password').addEventListener('input', validateConfirmPassword);
document.getElementById('register-button').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validateForm();
    registerUser();
    resetForm();
});
