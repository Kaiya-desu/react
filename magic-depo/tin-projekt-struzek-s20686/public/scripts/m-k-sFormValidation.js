function validateMKSForm(){

    const mageNameInput = document.getElementById('Mage_MageID');
    const spellNameInput = document.getElementById('Spell_SpellID');
    const learnedDateInput = document.getElementById('Learned_date');
    const masteryLevelInput = document.getElementsByName('Mastery_level');
    const nullMastery = document.getElementById('null_radio');

    const errorMageName = document.getElementById('errorMageName');
    const errorSpellName = document.getElementById('errorSpellName');
    const errorLearnedDate = document.getElementById('errorLearnedDate');
    const errorMasteryLevel = document.getElementById('errorMasteryLevel');
    const errorsSummary = document.getElementById('errorsSummary');

    const errors = document.getElementById('errorMessage-errors').innerText;
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const noValueMessage = document.getElementById('errorMessage-noValue').innerText;


    resetErrors([mageNameInput, spellNameInput, learnedDateInput,nullMastery],
        [errorMageName, errorSpellName, errorLearnedDate, errorMasteryLevel],errorsSummary);

    let valid = true;
    if(!checkRequired(mageNameInput.value)){

        valid = false;
        mageNameInput.classList.add("error-input");
        errorMageName.innerText = reqMessage;
    }

    if(!checkRequired(spellNameInput.value)){
        valid = false;
        spellNameInput.classList.add("error-input");
        errorSpellName.innerText = reqMessage;
    }

    if(!checkRequired(learnedDateInput.value)){
        valid = false;
        learnedDateInput.classList.add("error-input");
        errorLearnedDate.innerText = reqMessage;
    }

    // bo zaznaczony oryginalnie jest null
    if(masteryLevelInput[0].checked){
        valid = false;
        nullMastery.classList.add("error-input");
        errorMasteryLevel.innerText = noValueMessage;
    }

    if (!valid){
        errorsSummary.innerText = errors;
    }

    return valid;
}