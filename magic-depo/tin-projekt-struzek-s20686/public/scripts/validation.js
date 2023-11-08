function resetErrors(inputs, errorTexts, errorInfo){
    for(let i=0; i<inputs.length; i++){
        inputs[i].classList.remove("error-input")
    }
    for(let i=0; i<inputs.length; i++){
        errorTexts[i].innerText="";
    }
    errorInfo.innerText="";
}

function checkRequired(value){
    // console.log(value);
    if(!value){
        return false;
    }
    value = value.toString().trim();
    if(value===""){
        return false;
    }

    if(value==="0"){
        return false;
    }

    return true;
}

function checkEmail(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value);
}

function checkTextLengthRange(value, min, max){
    value = value.toString().trim();
    const length=value.length;
    console.log(length);
    if(max && length > max){
        return false;
    }
    if(min && length < min){
        return false;
    }
    return true;
}

function checkNumber(value, min, max){
    if(max && value > max){
        return false;
    }
    if(min && value < min){
        return false;
    }
    return true;
}