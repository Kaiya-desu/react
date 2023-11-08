function validateMageForm(){

    const nameInput = document.getElementById('Name');
    const surnameInput = document.getElementById('Surname');
    const titleInput = document.getElementById('Title');
    const certifiedDateInput = document.getElementById('Certified_date');
    const emailInput = document.getElementById('Email');
    const passwordInput = document.getElementById('Password');

    const errorName = document.getElementById('errorName');
    const errorSurname = document.getElementById('errorSurname');
    const errorTitle = document.getElementById('errorTitle');
    const errorCertified = document.getElementById('errorCertifiedDate');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    const errorsSummary = document.getElementById('errorsSummary');

    const errors = document.getElementById('errorMessage-errors').innerText;
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const length3and20Message = document.getElementById('errorMessage-wrongLength3-20').innerText;
    const maxLength50Message = document.getElementById('errorMessage-wrongLengthMax50').innerText;
    const wrongEmail = document.getElementById('errorMessage-wrongEmail').innerText;

    resetErrors([nameInput, surnameInput, titleInput, certifiedDateInput, emailInput, passwordInput],
        [errorName, errorSurname, errorTitle, errorCertified, errorEmail, errorPassword], errorsSummary);

    let valid = true;

    if(!checkRequired(nameInput.value)){
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = reqMessage;
    }else if (!checkTextLengthRange(nameInput.value, 3, 20)){
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = length3and20Message ;
    }

    if(!checkRequired(surnameInput.value)){
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = reqMessage;
    }else if (!checkTextLengthRange(surnameInput.value, 3, 20)){
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText =  length3and20Message;
    }

    if(titleInput.innerText.length > 50) {
        if (!checkTextLengthRange(titleInput.value, 0, 50)) {
            valid = false;
            titleInput.classList.add("error-input");
            errorTitle.innerText = maxLength50Message;
        }
    }

    if(!checkRequired(certifiedDateInput.value)){
        valid = false;
        certifiedDateInput.classList.add("error-input");
        errorCertified.innerText = reqMessage;
    }

    if(!checkRequired(emailInput.value)){
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage;
    }else if (!checkEmail(emailInput.value)){
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText =  wrongEmail;
    }

    if(!checkRequired(passwordInput.value)){
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage;
    }else if (!checkTextLengthRange(passwordInput.value, 3, 20)){
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText =  length3and20Message;
    }

    if (!valid){
        errorsSummary.innerText = errors;
    }

    return valid;
}