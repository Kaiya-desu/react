function validateSpellForm(){

    const nameInput = document.getElementById('Name');
    const descriptionInput = document.getElementById('Description');
    const manaInput= document.getElementById('Mana_cost');

    const errorName = document.getElementById('errorName');
    const errorSpellDescription = document.getElementById('errorSpellDescription');
    const errorManaCost = document.getElementById('errorManaCost');

    const errorsSummary = document.getElementById('errorsSummary');

    const errors = document.getElementById('errorMessage-errors').innerText;
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const length3and40Message = document.getElementById('errorMessage-wrongLength3-40').innerText;
    const maxLength200Message = document.getElementById('errorMessage-wrongLengthMax200').innerText;
    const numberMessage = document.getElementById('errorMessage-wrongNumbers').innerText;

    resetErrors([nameInput, descriptionInput, manaInput],
        [errorName, errorSpellDescription, errorManaCost], errorsSummary);

    let valid = true;

    if(!checkRequired(nameInput.value)){
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = reqMessage;
    }else if (!checkTextLengthRange(nameInput.value, 3, 40)){
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = length3and40Message;
    }

    if(descriptionInput.innerText.length > 200) {
        if (!checkTextLengthRange(descriptionInput.value, 0, 200)) {
            valid = false;
            descriptionInput.classList.add("error-input");
            errorSpellDescription.innerText = maxLength200Message;
        }
    }

    if(!checkRequired(manaInput.value)){
        valid = false;
        manaInput.classList.add("error-input");
        errorManaCost.innerText = reqMessage;
    }else if(!checkNumber(manaInput.value,1,9990)){
        valid = false;
        manaInput.classList.add("error-input");
        errorManaCost.innerText = numberMessage;
    }

    if (!valid){
        errorsSummary.innerText = errors;
    }

    return valid;
}